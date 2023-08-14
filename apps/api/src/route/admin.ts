import { adminSignupInput } from 'common';
import express from 'express';
import { Admin } from '../db/db';
import jwt from 'jsonwebtoken';
const route = express.Router();

export const AdminSecretKey = "kdjnk";


route.post('/signup', async (req, res) => {
    try {
        const parsedInput = adminSignupInput.safeParse(req.body);
        if(!parsedInput.success) {
            return res.status(400).json({message: "Validation Error", err: parsedInput.error});
        }
        const isAdmin = await Admin.findOne({username: parsedInput.data.username});
        if(isAdmin) {
            return res.status(400).json({message: "Username already used :("});
        }
        const newAdmin = new Admin(parsedInput.data);
        await newAdmin.save();
        const token = jwt.sign({_id: newAdmin._id}, AdminSecretKey);
        return res.status(200).json({message: "Admin created successfully", token});
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }

})

export default route;