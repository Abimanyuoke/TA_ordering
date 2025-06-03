import { IMenu } from "@/app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import Search from "./search";
import AddMenu from "./addMenu";
import EditMenu from "./editMenu";
import DeleteMenu from "./deleteMenu";

interface ApiResponse {
    status: boolean;
    data: IMenu[];
}

const getMenu = async (search: string): Promise<IMenu[]> => {
    try {
        const TOKEN = getCookies("token");
        const url = `${BASE_API_URL}/menu?search=${search}`;
        const response = await get(url, await TOKEN);
        const data = response.data as ApiResponse;
        return data.status ? [...data.data] : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const category = (cat: string): React.ReactNode => {
    const categories: Record<string, { label: string; color: string; text: string }> = {
        TANAMAN_HIAS: { label: "Tanaman Hias", color: "bg-green-100", text: "text-green-800" },
        PUPUK_PESTISIDA: { label: "Pupuk Pestisida", color: "bg-yellow-100", text: "text-yellow-800" },
        ALAT_PERLENGKAPAN: { label: "Alat Perlengkapan", color: "bg-purple-100", text: "text-purple-800" },
        TANAMAN_HERBAL: { label: "Tanaman Herbal", color: "bg-teal-100", text: "text-teal-800" },
        BENIH_BIBIT: { label: "Benih Bibit", color: "bg-pink-100", text: "text-pink-800" }
    };
    const item = categories[cat];
    if (!item) return null;
    return (
        <span className={`${item.color} ${item.text} text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}>
            {item.label}
        </span>
    );
};

const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search?.toString() || "";
    const menu: IMenu[] = await getMenu(search);

    return (
        <div className="p-6 bg-slate-900  border-t-4 border-primary shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Menu Data</h2>
                <p className="text-sm text-secondary">
                    Manage your menus here by searching, adding, editing, or deleting items.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-1/2">
                    <Search url="/manager/menu" search={search} />
                </div>
                <AddMenu />
            </div>

            {menu.length === 0 ? (
                <AlertInfo title="Informasi">No data available</AlertInfo>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {menu.map((data, index) => (
                        <div
                            key={`menu-${index}`}
                            className="bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="md:col-span-1 flex justify-center md:justify-start">
                                    <Image
                                        width={60}
                                        height={60}
                                        src={`${BASE_IMAGE_MENU}/${data.picture}`}
                                        className="rounded-md object-cover"
                                        alt="Menu Preview"
                                        unoptimized
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-primary font-bold">Name</p>
                                    <p className="text-white">{data.name}</p>
                                </div>

                                <div className="md:col-span-1">
                                    <p className="text-xs text-primary font-bold">Price</p>
                                    <p className="text-white">{data.price}</p>
                                </div>

                                <div className="md:col-span-4">
                                    <p className="text-xs text-primary font-bold">Description</p>
                                    <p className="text-white line-clamp-2">{data.description}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-primary font-bold">Category</p>
                                    <div>{category(data.category)}</div>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-primary font-bold">Actions</p>
                                    <div className="flex gap-2 mt-1">
                                        <EditMenu selectedMenu={data} />
                                        <DeleteMenu selectedMenu={data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuPage;
