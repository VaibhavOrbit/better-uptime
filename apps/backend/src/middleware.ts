import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization!;
    try {
        let decoded = jwt.verify(header, JWT_SECRET as string);
        // @ts-ignore
        req.userId = decoded.userId 
        next();

    }
     catch(e) {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
   
}