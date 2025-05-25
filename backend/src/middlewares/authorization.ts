import {  Request, Response, NextFunction, RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { SECRET } from "../global";

interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: string;
}

// export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
//     const token = request.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return response.status(403).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const secretKey = SECRET || ""
//         const decoded = verify(token, secretKey);
//         request.body.user = decoded as JwtPayload;
//         next();
//     } catch (error) {
//         return response.status(401).json({ message: 'Invalid token.' });
//     }
// };

export const verifyToken = (request: Request, response: Response, next: NextFunction): void => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        response.status(403).json({ message: 'Access denied. No token provided.' });
        return; // Just return after sending response
    }

    try {
        const secretKey = SECRET || "";
        const decoded = verify(token, secretKey);
        request.body.user = decoded as JwtPayload;
        next();
    } catch (error) {
        response.status(401).json({ message: 'Invalid token.' });
    }
};

export const verifyRole = (allowedRoles: string[]): RequestHandler => {
    return (request: Request, response: Response, next: NextFunction): void => {
        const user = request.body.user;

        if (!user) {
            response.status(403).json({ message: 'No user information available.' });
            return;
        }

        if (!allowedRoles.includes(user.role)) {
            response.status(403)
                .json({ message: `Access denied. Requires one of the following roles: ${allowedRoles.join(', ')}` });
            return;
        }

        next();
    };
};