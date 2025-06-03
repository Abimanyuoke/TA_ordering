import { get } from "@/lib/bridge";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL } from "@/global";
import Link from "next/link";

interface CountResponse<T> {
    status: boolean;
    data: T[];
}

const getSummaryData = async () => {
    const token = getCookies("token");
    const [menuRes, transaksiRes, userRes] = await Promise.all([
        get(`${BASE_API_URL}/menu`, await token),
        get(`${BASE_API_URL}/order`, await token),
        get(`${BASE_API_URL}/user`, await token),
    ]);

    const menuCount = (menuRes.data as CountResponse<any>).data.length;
    const transaksiData = (transaksiRes.data as CountResponse<any>).data;
    const userCount = (userRes.data as CountResponse<any>).data.length;

    const transaksiStats = {
        total: transaksiData.length,
        NEW: transaksiData.filter((t: any) => t.status === "NEW").length,
        PAID: transaksiData.filter((t: any) => t.status === "PAID").length,
        DONE: transaksiData.filter((t: any) => t.status === "DONE").length,
    };

    return { menuCount, transaksiStats, userCount };
};

const DashboardPage = async () => {
    const { menuCount, transaksiStats, userCount } = await getSummaryData();

    const Card = ({ title, value, href }: { title: string; value: any; href: string }) => (
        <Link href={href}>
            <div className="bg-slate-800 hover:bg-slate-700 transition-colors  p-6 rounded-xl shadow-md cursor-pointer">
                <p className="text-sm text-secondary mb-1">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </Link>
    );

    return (
        <div className="p-6 bg-slate-900 border-primary border-t-4 shadow-lg min-h-screen">
            <h2 className="text-2xl font-bold text-white mb-4">Dashboard Manager</h2>
            <p className="text-sm text-secondary mb-6">
                Welcome to your dashboard. Here's an overview of system activity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card title="Total Menu" value={menuCount} href="/manager/menu" />
                <Card title="Total Transaksi" value={transaksiStats.total} href="/manager/transaksi" />
                <Card title="Total Pengguna" value={userCount} href="/manager/user" />
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">Status Transaksi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="New" value={transaksiStats.NEW} href="/manager/transaksi?search=NEW" />
                <Card title="Paid" value={transaksiStats.PAID} href="/manager/transaksi?search=PAID" />
                <Card title="Done" value={transaksiStats.DONE} href="/manager/transaksi?search=DONE" />
            </div>
        </div>
    );
};

export default DashboardPage;
