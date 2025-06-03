"use client";

import { IOrder } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { put } from "@/lib/bridge";
import { getCookies } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { ButtonPrimary, ButtonDanger, ButtonInfo } from "@/components/button";
import Modal from "@/components/modal";
import Select from "@/components/select";
import { toast } from "sonner";

const EditTransaksi = ({ selectedOrder }: { selectedOrder: IOrder }) => {
    const [isShow, setIsShow] = useState(false);
    const [order, setOrder] = useState<IOrder>({ ...selectedOrder });
    const router = useRouter();
    const TOKEN = getCookies("token") || "";
    const formRef = useRef<HTMLFormElement>(null);

    const openModal = () => {
        setOrder({ ...selectedOrder });
        setIsShow(true);
        if (formRef.current) formRef.current.reset();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { status } = order;

        if (!status || status.trim() === "") {
            toast.warning("Please select a valid status.", { duration: 2000 });
            return;
        }

        try {
            const url = `${BASE_API_URL}/order/${selectedOrder.id}`;

            // Using JSON instead of FormData
            const payload = { status };

            const response = await put(url, payload, TOKEN);
            const data = response.data as { status: boolean; message: string };

            if (data?.status) {
                setIsShow(false);
                toast.success(data?.message, { duration: 2000 });
                setTimeout(() => router.refresh(), 1000);
            } else {
                toast.warning(data?.message, { duration: 2000 });
            }
        } catch (error) {
            console.error("Update order error:", error);
            toast.error(`Something went wrong`, { duration: 2000 });
        }
    };

    return (
        <div>
            <ButtonInfo type="button" onClick={openModal}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                </svg>
            </ButtonInfo>

            <Modal isShow={isShow} onClose={setIsShow}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    {/* Header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <strong className="font-bold text-2xl text-black">Update Transaksi</strong>
                                <p className="text-sm text-slate-400">
                                    Managers can update the status of this transaction.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="text-slate-400"
                                onClick={() => setIsShow(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 text-black">
                        <Select
                            id="status"
                            value={order.status || ""}
                            label="Status"
                            required
                            onChange={(val) => setOrder({ ...order, status: val })}
                        >
                            <option value="">--- Select Status ---</option>
                            <option value="NEW">NEW</option>
                            <option value="PAID">PAID</option>
                            <option value="DONE">DONE</option>
                        </Select>
                    </div>

                    {/* Footer */}
                    <div className="w-full p-5 flex justify-end gap-2 rounded-b-2xl shadow">
                        <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                            Cancel
                        </ButtonDanger>
                        <ButtonPrimary type="submit">Save</ButtonPrimary>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EditTransaksi;
