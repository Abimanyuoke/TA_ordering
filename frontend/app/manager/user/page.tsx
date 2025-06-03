import { IUser } from "@/app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import Search from "./search";
import AddUser from "./addUser";
import EditUser from "./editUser";
import DeleteUser from "./deleteUser";

interface ApiResponse {
    status: boolean;
    data: IUser[];
}

const getUser = async (search: string): Promise<IUser[]> => {
    try {
        const TOKEN = getCookies("token");
        const url = `${BASE_API_URL}/user?search=${search}`;
        const response = await get(url, await TOKEN);
        const data = response.data as ApiResponse;
        return data.status ? [...data.data] : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const UserPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search?.toString() || "";
    const users: IUser[] = await getUser(search);

    return (
        <div className="p-6 bg-slate-900 border-t-4 border-primary shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">User Data</h2>
                <p className="text-sm text-secondary">
                    This page displays user data and allows managing users by searching, adding, editing, or deleting them.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-1/2">
                    <Search url="/manager/user" search={search} />
                </div>
                <AddUser />
            </div>

            {users.length === 0 ? (
                <AlertInfo title="Informasi">No data available</AlertInfo>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {users.map((data, index) => (
                        <div
                            key={`user-${index}`}
                            className="bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="md:col-span-1 flex justify-center md:justify-start">
                                    <Image
                                        width={60}
                                        height={60}
                                        src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}`}
                                        className="rounded-full object-cover"
                                        alt="User Profile"
                                        unoptimized
                                    />
                                </div>

                                <div className="md:col-span-3">
                                    <p className="text-xs text-primary font-bold">Name</p>
                                    <p className="text-white">{data.name}</p>
                                </div>

                                <div className="md:col-span-3">
                                    <p className="text-xs text-primary font-bold">Email</p>
                                    <p className="text-white">{data.email}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-primary font-bold">Role</p>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                        {data.role}
                                    </span>
                                </div>

                                <div className="md:col-span-3">
                                    <p className="text-xs text-primary font-bold">Actions</p>
                                    <div className="flex gap-2 mt-1">
                                        <EditUser selectedUser={data} />
                                        <DeleteUser selectedUser={data} />
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

export default UserPage;
