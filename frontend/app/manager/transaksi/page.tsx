import { IOrder } from "../../../app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import Search from "./search";
import EditTransaksi from "./editTransaksi";
import { JSX } from "react";

// Fetch orders from API
const getOrder = async (search: string): Promise<IOrder[]> => {
  try {
    const TOKEN = getCookies("token");
    const url = `${BASE_API_URL}/order?search=${search}`;
    const response = await get(url, await TOKEN) as {
      data: { status: boolean; data: IOrder[] };
    };
    return response.data?.status ? [...response.data.data] : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Render status badge
const renderStatus = (status: string): JSX.Element => {
  const baseClass = "text-sm font-semibold px-3 py-1 rounded-full inline-block";
  switch (status) {
    case "NEW":
      return (
        <span className={`${baseClass} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`}>
          New
        </span>
      );
    case "PAID":
      return (
        <span className={`${baseClass} bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300`}>
          Paid
        </span>
      );
    default:
      return (
        <span className={`${baseClass} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`}>
          Done
        </span>
      );
  }
};

// Main component
const TransaksiPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search?.toString() || "";
  const orders = await getOrder(search);

  return (
    <div className="bg-slate-900 p-6 border-t-4 border-primary shadow-lg">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Order Transactions</h2>
        <p className="text-sm text-secondary">
          This page displays all order transactions with detailed information
          such as customer, price, payment method, status, and address.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <Search url="/manager/transaksi" search={search} />
        </div>
      </div>

      {/* Order List */}
      {orders.length === 0 ? (
        <AlertInfo title="Informasi">No data available</AlertInfo>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order, index) => (
            <div
              key={`order-${index}`}
              className="bg-slate-800 p-4 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-2">
                  <p className="text-xs text-primary font-bold">Customer</p>
                  <p className="text-white">{order.customer}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-primary font-bold">Total Price</p>
                  <p className="text-white">Rp {order.total_price.toLocaleString()}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-primary font-bold">Payment Method</p>
                  <p className="text-white">{order.payment_method}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-primary font-bold">Alamat</p>
                  <p className="text-white">{order.alamat}</p>
                </div>

                <div className="md:col-span-1">
                  <p className="text-xs text-primary font-bold">Status</p>
                  {renderStatus(order.status)}
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-primary font-bold">Actions</p>
                  <div className="flex gap-2 mt-1">
                    <EditTransaksi selectedOrder={order} />
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

export default TransaksiPage;
