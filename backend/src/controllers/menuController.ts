import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../global";
import fs from "fs"

const prisma = new PrismaClient()

export const getAllMenus = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { search } = request.query;

        const allMenus = await prisma.menu.findMany({
            where: { name: { contains: search?.toString() || "" } }
        });

        response.status(200).json({
            status: true,
            data: allMenus,
            message: `Menus has retrieved`
        });
    } catch (error) {
        response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
};

export const createMenu = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        /** get requested data (data has been sent from request) */
        const { name, price, category, description } = request.body
        const uuid = uuidv4()

        /** variable filename use to define of uploaded file name */
        let filename = ""
        if (request.file) filename = request.file.filename /** get file name of uploaded file */

        /** process to save new menu, price and stock have to convert in number type */
        const newMenu = await prisma.menu.create({
            data: { uuid, name, price: Number(price), category, description, picture: filename }
        })

        response.json({
            status: true,
            data: newMenu,
            message: `New Menu has created`
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

export const updateMenu = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = request.params;
        const { name, price, category, description } = request.body;

        const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } });
        if (!findMenu) {
            response.status(404).json({ status: false, message: `Menu is not found` });
            return;
        }

        let filename = findMenu.picture;
        if (request.file) {
            filename = request.file.filename;
            let path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`;
            let exists = fs.existsSync(path);
            if (exists && findMenu.picture !== ``) fs.unlinkSync(path);
        }

        const updatedMenu = await prisma.menu.update({
            data: {
                name: name || findMenu.name,
                price: price ? Number(price) : findMenu.price,
                category: category || findMenu.category,
                description: description || findMenu.description,
                picture: filename
            },
            where: { id: Number(id) }
        });

        response.status(200).json({
            status: true,
            data: updatedMenu,
            message: `Menu has updated`
        });
    } catch (error) {
        response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
};

export const deleteMenu = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = request.params;

        const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } });
        if (!findMenu) {
            response.status(404).json({ status: false, message: `Menu is not found` });
            return;
        }

        let path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`;
        let exists = fs.existsSync(path);
        if (exists && findMenu.picture !== ``) fs.unlinkSync(path);

        const deletedMenu = await prisma.menu.delete({
            where: { id: Number(id) }
        });

        response.status(200).json({
            status: true,
            data: deletedMenu,
            message: `Menu has deleted`
        });
    } catch (error) {
        response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
};