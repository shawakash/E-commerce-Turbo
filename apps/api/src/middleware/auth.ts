import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AdminSecretKey } from "../route/admin";


export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        let {authorization} = req.headers;
        if(!authorization) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        if(authorization.startsWith("Bearer")) {
            authorization = authorization.split(" ")[1];
        }
        jwt.verify(authorization, AdminSecretKey, (err, decoded) => {
            if(err) {
                return res.status(401).json({message: "Unauthorized"});
            }
            if(!decoded || typeof decoded == 'string' || !decoded._id) {
                return res.status(401).json({message: "Unauthorized"});
            }
            req.headers["adminId"] = decoded._id;
            next();
        })
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }
}