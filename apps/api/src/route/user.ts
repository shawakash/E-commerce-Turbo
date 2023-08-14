import { userLogin, userSignupInput } from "common";
import express from "express";
import { Product, User } from "../db/db";
import jwt from 'jsonwebtoken';
import { userAuth } from "../middleware/auth";
const route = express.Router();

export const UserSecretKey = "dkjf";


route.post('/signup', async (req, res) => {
    try {
        const parsedInput = userSignupInput.safeParse(req.body);
        if(!parsedInput.success) {
            return res.status(400).json({message: "Validation Error", err: parsedInput.error});
        }
        const isUser = await User.findOne({username: parsedInput.data.username});
        if(isUser) {
            return res.status(400).json({message: "Username already used :("});
        }
        const newUser = new User(parsedInput.data);
        await newUser.save();
        const token = jwt.sign({_id: newUser._id}, UserSecretKey, {expiresIn: '1h'});
        return res.status(200).json({message: "User created successfully", token});
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }

});

route.post('/login', async (req, res) => {
    try {
        const parsedInput = userLogin.safeParse(req.body);
        if(!parsedInput.success) {
            return res.status(400).json({message: "Validation Error", err: parsedInput.error});
        }
        const isUser = await User.findOne({username: parsedInput.data.username});
        if(!isUser) {
            return res.status(404).json({message: "User does not exists :("});
        }
        if(isUser.password !== parsedInput.data.password) {
            return res.status(400).json({message: "Wrong Password :("});
        }
        const token = jwt.sign({_id: isUser._id}, UserSecretKey, {expiresIn: '1h'});
        return res.status(200).json({message: "Logged In successfully", token});
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }

});

// route.get('/prod/:prodId', userAuth, async (req, res) => {
//     try {
//         const {prodId} = req.params;
//         const prod = await Product.findById(prodId);
//         if(!prod) {
//             return res.status(400).json({message: "No such Product"});
//         }
//         return res.status(200).json({message: "Prod found", prod});
        
//     } catch (error) {
//         return res.status(500).json({message: "Internal Error", err: error});
//     }
// });

// route.get('/prods', userAuth, async (req, res) => {
//     try {
//         const prods = await Product.find({ stock: { $gt: 0 } });
//         return res.status(200).json({ message: 'Prods', prods });
//     } catch (error) {
//         return res.status(500).json({message: "Internal Error", err: error});
//     }
// });

// route.post('/prod/:prodId', userAuth, async (req, res) => {
//     // logic to purchase a course
//     const { prodId } = req.params;
     
//     const {userId} = req.headers;
//     const userData = await User.findById(userId);
//     const prod = await Product.findById(prodId);
//     if (!prod || Object.keys(prod).length == 0) {
//         return res.status(400).json({ message: "Invalid Params" });
//     }
//     if(userData) {
//         // Check for Transcations
//         userData.purchasedProd.push(prod._id);
//         await userData.save();
//         return res.status(200).json({ message: 'Product purchased successfully' });
//     } else {
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// route.get('/prod/purchased', userAuth, async (req, res) => {
//     const {userId} = req.headers;
//     const data = await User.findById(userId).populate('purchasedProd');
//     return res.status(200).json({ purchasedProd: data?.purchasedProd });
// });

export default route;

