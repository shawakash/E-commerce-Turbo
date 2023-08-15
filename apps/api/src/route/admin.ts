import { adminLogin, adminSignupInput, productSignup } from 'common';
import express from 'express';
import { Admin, Product } from '../db/db';
import jwt from 'jsonwebtoken';
import { adminAuth } from '../middleware/auth';
import { log } from 'logger';
import path from 'path';
const route = express.Router();

export const AdminSecretKey = "kdjnk";

route.post('/auth', (req, res) => {
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
                return res.status(401).json({message: "Unauthorized", status: false});
            }
            if(!decoded || typeof decoded == 'string' || !decoded._id) {
                return res.status(401).json({message: "Unauthorized", status: false});
            }
            req.headers["adminId"] = decoded._id;
            return res.status(200).json({message: 'Authorized', status: true});
        })
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }
});

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
        const token = jwt.sign({_id: newAdmin._id}, AdminSecretKey, {expiresIn: '1h'});
        return res.status(200).json({message: "Admin created successfully", token});
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }

});

route.post('/login', async (req, res) => {
    try {
        const parsedInput = adminLogin.safeParse(req.body);
        if(!parsedInput.success) {
            return res.status(400).json({message: "Validation Error", err: parsedInput.error});
        }
        const isAdmin = await Admin.findOne({username: parsedInput.data.username});
        if(!isAdmin) {
            return res.status(404).json({message: "Admin does not exists :("});
        }
        if(isAdmin.password !== parsedInput.data.password) {
            return res.status(400).json({message: "Wrong Password :("});
        }
        const token = jwt.sign({_id: isAdmin._id}, AdminSecretKey, {expiresIn: '1h'});
        return res.status(200).json({message: "Logged In successfully", token});
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }

});


route.post('/prod/create', adminAuth, async (req, res) => {
    try {
        const parsedInput = productSignup.safeParse(req.body);
        if(!parsedInput.success) {
            return res.status(400).json({message: "Validation Error", err: parsedInput.error});
        }
        const isProd = await Product.findOne({title: parsedInput.data.title});
        if(isProd) {
            return res.status(404).json({message: "Change the product title :("});
        }
        const {adminId} = req.headers;
        const newProd = new Product({...parsedInput.data, creator: adminId});
        await newProd.save();
        const admin = await Admin.findById(adminId);
        admin?.createdProd.push(newProd._id);
        await admin?.save();
        return res.status(200).json({message: "Product Created Successfully", _id: newProd._id});
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }
});

route.get('/prod/prods', adminAuth, async (req, res) => {
    try {
        const {adminId} = req.headers;
        const prod = await Product.find({ creator: adminId });
        return res.status(200).json({message: "Prod found", prods: prod});
        
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }
});

route.get('/prod/:prodId', adminAuth, async (req, res) => {
    try {
        const {prodId} = req.params;
        const prod = await Product.findById(prodId);
        if(!prod) {
            return res.status(400).json({message: "No such Product"});
        }
        return res.status(200).json({message: "Prod found", prod});
        
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }
});

route.put('/prod/:prodId', adminAuth, async (req, res) => {
    try {
        const parsedInput = productSignup.safeParse(req.body);
        if(!parsedInput.success) {
            return res.status(400).json({message: "Validation Error", err: parsedInput.error});
        }
        const {prodId} = req.params;
        const {adminId} = req.headers;
        const prod = await Product.findById(prodId);
        if(!prod) {
            return res.status(400).json({message: "No such Product"});
        }
        const updateProd = await Product.findByIdAndUpdate(prodId, parsedInput.data);
        return res.status(200).json({message: 'Product Updated Successfully', _id: prodId})
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }
});

route.delete('/prod/:prodId', adminAuth, async (req, res) => {
    try {
        const {prodId} = req.params;
        const prod = await Product.findByIdAndDelete(prodId);
        return res.status(200).json({message: 'Product Deleted Successfully'})
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }
});





export default route;