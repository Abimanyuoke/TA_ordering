import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { BASE_URL, SECRET } from "../global";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import jwt, { sign } from "jsonwebtoken"
import path from "path";


const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllUsers = async (request: Request, response: Response): Promise<void> => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get user, contains means search name of user based on sent keyword */
        const allUser = await prisma.user.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        response.json({
            status: true,
            data: allUser,
            message: `user has retrieved`
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

export const getUserById = async (request: Request, response: Response): Promise<void> => {
    try {
        /** get requested data (data has been sent from request) */
        const { id } = request.body.user

        if (!id) {
            response
                .json({
                    status: false,
                    message: `User Not Found`
                })
                .status(400)
        }

        /** process to get user, contains means search name of user based on sent keyword */
        const allUser = await prisma.user.findFirst({
            where: { id: Number(id) }
        })

        response.json({
            status: true,
            data: allUser,
            message: `user has retrieved`
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

export const createUser = async (request: Request, response: Response): Promise<void> => {
    try {
        /** get requested data (data has been sent from request) */
        const { name, email, password, role, alamat, telephone } = request.body
        const uuid = uuidv4()

        /** variable filename use to define of uploaded file name */
        let filename = ""
        if (request.file) filename = request.file.filename /** get file name of uploaded file */

        /** process to save new user */
        const newUser = await prisma.user.create({
            data: { uuid, name, email, password: md5(password), role, profile_picture: filename, alamat, telephone }
        })

        response.json({
            status: true,
            data: newUser,
            message: `New user has created`
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

// export const createUser = async (request: Request, response: Response): Promise<void> => {
//     try {
//         const { name, email, password, role } = request.body
//         const uuid = uuidv4()

//         let filename = ""
//         if (request.file) filename = request.file.filename

//         const newUser = await prisma.user.create({
//             data: {
//                 uuid,
//                 name,
//                 email,
//                 password: md5(password),
//                 role,
//                 profile_picture: filename
//             }
//         })

//         const tokenPayload = {
//             id: newUser.id,
//             uuid: newUser.uuid,
//             name: newUser.name,
//             role: newUser.role,
//             alamat: newUser.alamat,
//             telephone: newUser.telephone,

//         }

//         const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "default_secret", {
//             expiresIn: "7d"
//         })

//         return response.status(200).json({
//             status: true,
//             message: `User created successfully`,
//             token,
//             data: {
//                 id: newUser.id,
//                 name: newUser.name,
//                 role: newUser.role,
//                 profile_picture: newUser.profile_picture,
//                 alamat: newUser.alamat,
//                 telephone: newUser.telephone
//             }
//         })

//     } catch (error) {
//         return response.status(400).json({
//             status: false,
//             message: `There is an error. ${error}`
//         })
//     }
// }

export const updateUser = async (request: Request, response: Response): Promise<void> => {
    try {
        const { id } = request.params;
        const { name, email, password, role, alamat, telephone } = request.body;

        // Check if user exists
        const findUser = await prisma.user.findFirst({
            where: { id: Number(id) }
        });

        if (!findUser) {
            response.status(404).json({
                status: false,
                message: "User not found"
            });
            return;
        }

        // Handle file upload if exists
        let filename = findUser.profile_picture;
        if (request.file) {
            filename = request.file.filename;
            const path = `${BASE_URL}/../public/profile_picture/${findUser.profile_picture}`;

            // Delete old picture if it exists
            if (fs.existsSync(path) && findUser.profile_picture) {
                fs.unlinkSync(path);
            }
        }

        // Update user data
        const updatedUser = await prisma.user.update({
            data: {
                name: name || findUser.name,
                email: email || findUser.email,
                password: password ? md5(password) : findUser.password,
                role: role || findUser.role,
                profile_picture: filename,
                alamat: alamat || findUser.alamat,
                telephone: telephone || findUser.telephone
            },
            where: { id: Number(id) }
        });

        response.status(200).json({
            status: true,
            data: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                profile_picture: updatedUser.profile_picture,
                alamat: updatedUser.alamat,
                telephone: updatedUser.telephone,
                // Exclude password from response
            },
            message: "User updated successfully"
        });

    } catch (error) {
        console.error("Error updating user:", error);
        response.status(500).json({
            status: false,
            message: "An error occurred while updating user"
        });
    }
};

export const changePicture = async (request: Request, response: Response): Promise<void> => {
    try {
        const { id } = request.params;

        // Verify user exists
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });

        if (!user) {
            response.status(404).json({
                status: false,
                message: "User not found"
            });
            return;
        }

        // Check if file was uploaded
        if (!request.file) {
            response.status(400).json({
                status: false,
                message: "No image file provided"
            });
            return;
        }

        // Delete old picture if exists
        if (user.profile_picture) {
            const oldPath = path.join(BASE_URL, 'public', 'profile_picture', user.profile_picture);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // Update profile picture
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { profile_picture: request.file.filename },
            select: {
                id: true,
                name: true,
                email: true,
                profile_picture: true,
                role: true
            }
        });

        response.status(200).json({
            status: true,
            data: updatedUser,
            message: "Profile picture updated successfully"
        });

    } catch (error) {
        console.error('Error changing profile picture:', error);

        // Clean up uploaded file if error occurred
        if (request.file) {
            const newPath = path.join(BASE_URL, 'public', 'profile_picture', request.file.filename);
            if (fs.existsSync(newPath)) {
                fs.unlinkSync(newPath);
            }
        }

        response.status(500).json({
            status: false,
            message: "Failed to update profile picture"
        });
    }
};

export const deleteUser = async (request: Request, response: Response): Promise<void> => {
    try {
        const { id } = request.params;

        // Verify user exists
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });

        if (!user) {
            response.status(404).json({
                status: false,
                message: "User not found"
            });
            return;
        }

        // Delete profile picture if exists
        if (user.profile_picture) {
            const filePath = path.join(BASE_URL, 'public', 'profile_picture', user.profile_picture);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Delete user from database
        await prisma.user.delete({
            where: { id: Number(id) }
        });

        response.status(200).json({
            status: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        response.status(500).json({
            status: false,
            message: "Failed to delete user"
        });
    }
};

export const authentication = async (request: Request, response: Response): Promise<void> => {
    try {
        const { email, password } = request.body /** get requested data (data has been sent from request) */

        /** find a valid admin based on username and password */
        const findUser = await prisma.user.findFirst({
            where: { email, password: md5(password) }
        })

        /** check is admin exists */
        if (!findUser) {
            response
                .status(200)
                .json({ status: false, logged: false, message: `Email or password is invalid` });
            return;
        }

        let data = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
            profile_picture: findUser.profile_picture,
            alamat: findUser.alamat,
            telephone: findUser.telephone,
        }

        /** define payload to generate token */
        let payload = JSON.stringify(data)

        /** generate token */
        let token = sign(payload, SECRET || "joss")

        response
            .status(200)
            .json({ status: true, logged: true, data: data, message: `Login Success`, token })
    } catch (error) {
        response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
};