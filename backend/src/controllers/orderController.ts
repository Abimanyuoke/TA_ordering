import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient({ errorFormat: "pretty" })
export const getAllOrders = async (request: Request, response: Response): Promise<void> => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query
        
        /** process to get order, contains means search name or table number of customer's order based on sent keyword */
        const allOrders = await prisma.order.findMany({
            where: {
                OR: [
                    { customer: { contains: search?.toString() || "" } },
                ]
            },
            orderBy: { createdAt: "desc" }, /** sort by descending order date */
            include: { 
                User: true,
                orderLists: {
                    include: { Menu: true }
                }
            }
        })
        response.json({
            status: true,
            data: allOrders,
            message: `Order list has retrieved`
        }).status(200)
    } catch (error) {
        response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const createOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const { customer, payment_method, status, orderlists } = request.body;
        const user = request.body.user;
        const uuid = uuidv4();

        let total_price = 0;
        for (let index = 0; index < orderlists.length; index++) {
            const { menuId } = orderlists[index];
            const detailMenu = await prisma.menu.findFirst({
                where: { id: menuId }
            });
            
            if (!detailMenu) {
                response.status(404).json({ 
                    status: false, 
                    message: `Menu with id ${menuId} is not found` 
                });
                return;
            }
            
            total_price += (detailMenu.price * orderlists[index].quantity);
        }

        const newOrder = await prisma.order.create({
            data: { 
                uuid, 
                customer, 
                total_price, 
                payment_method, 
                status, 
                userId: user.id 
            }
        });

        for (let index = 0; index < orderlists.length; index++) {
            const uuid = uuidv4();
            const { menuId, quantity, note } = orderlists[index];
            await prisma.orderList.create({
                data: {
                    uuid, 
                    orderId: newOrder.id, 
                    menuId: Number(menuId), 
                    quantity: Number(quantity), 
                    note
                }
            });
        }

        response.status(201).json({
            status: true,
            data: newOrder,
            message: "New order has been created"
        });
    } catch (error) {
        response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
};

export const updateStatusOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const { id } = request.params;
        const { status } = request.body;
        const user = request.body.user;

        const findOrder = await prisma.order.findFirst({ 
            where: { id: Number(id) } 
        });
        
        if (!findOrder) {
            response.status(404).json({ 
                status: false, 
                message: "Order is not found" 
            });
            return;
        }

        const updatedStatus = await prisma.order.update({
            data: {
                status: status || findOrder.status,
                userId: user.id ? user.id : findOrder.userId
            },
            where: { id: Number(id) }
        });

        response.status(200).json({
            status: true,
            data: updatedStatus,
            message: "Order status has been updated"
        });
    } catch (error) {
        response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
};

export const deleteOrder = async (request: Request, response: Response): Promise<void> => {
    try {
        const { id } = request.params;

        const findOrder = await prisma.order.findFirst({ 
            where: { id: Number(id) } 
        });
        
        if (!findOrder) {
            response.status(404).json({ 
                status: false, 
                message: "Order is not found" 
            });
            return;
        }

        await prisma.orderList.deleteMany({ 
            where: { orderId: Number(id) } 
        });
        
        const deleteOrder = await prisma.order.delete({ 
            where: { id: Number(id) } 
        });

        response.status(200).json({
            status: true,
            data: deleteOrder,
            message: "Order has been deleted"
        });
    } catch (error) {
        response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
};