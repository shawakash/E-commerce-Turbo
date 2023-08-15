import { legerInput, userLogin, userSignupInput } from "common";
import express, { NextFunction, Request, Response } from "express";
import { Leger, Product, User } from "../db/db";
import jwt from 'jsonwebtoken';
import { log } from "logger";
const route = express.Router();

export const UserSecretKey = "dkjf";

const userAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        let { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (authorization.startsWith("Bearer")) {
            authorization = authorization.split(" ")[1];
        }
        jwt.verify(authorization, UserSecretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            if (!decoded || typeof decoded == 'string' || !decoded._id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.headers["userId"] = decoded._id;
            next();
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal Error", err: error });
    }
}

route.post('/auth', (req, res) => {
    try {
        let {authorization} = req.headers;
        if(!authorization) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        if(authorization.startsWith("Bearer")) {
            authorization = authorization.split(" ")[1];
        }
        jwt.verify(authorization, UserSecretKey, (err, decoded) => {
            if(err) {
                return res.status(401).json({message: "Unauthorized", status: false});
            }
            if(!decoded || typeof decoded == 'string' || !decoded._id) {
                return res.status(401).json({message: "Unauthorized", status: false});
            }
            req.headers["userId"] = decoded._id;
            return res.status(200).json({message: 'Authorized', status: true});
        })
    } catch (error) {
        return res.status(500).json({message: "Internal Error", err: error});
    }
});

route.post('/signup', async (req, res) => {
    try {
        const parsedInput = userSignupInput.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(400).json({ message: "Validation Error", err: parsedInput.error });
        }
        const isUser = await User.findOne({ username: parsedInput.data.username });
        if (isUser) {
            return res.status(400).json({ message: "Username already used :(" });
        }
        const newUser = new User(parsedInput.data);
        await newUser.save();
        const token = jwt.sign({ _id: newUser._id }, UserSecretKey, { expiresIn: '1h' });
        return res.status(200).json({ message: "User created successfully", token });
    } catch (error) {
        return res.status(500).json({ message: "Internal Error", err: error });
    }

});

route.post('/login', async (req, res) => {
    try {
        const parsedInput = userLogin.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(400).json({ message: "Validation Error", err: parsedInput.error });
        }
        const isUser = await User.findOne({ username: parsedInput.data.username });
        if (!isUser) {
            return res.status(404).json({ message: "User does not exists :(" });
        }
        if (isUser.password !== parsedInput.data.password) {
            return res.status(400).json({ message: "Wrong Password :(" });
        }
        const token = jwt.sign({ _id: isUser._id }, UserSecretKey, { expiresIn: '1h' });
        return res.status(200).json({ message: "Logged In successfully", token });
    } catch (error) {
        return res.status(500).json({ message: "Internal Error", err: error });
    }

});

route.get('/prod/:prodId', userAuth, async (req, res) => {
    try {
        const { prodId } = req.params;
        const prod = await Product.findById(prodId);
        if (!prod) {
            return res.status(400).json({ message: "No such Product" });
        }
        return res.status(200).json({ message: "Prod found", prod });

    } catch (error) {
        return res.status(500).json({ message: "Internal Error", err: error });
    }
})


route.get('/prods', userAuth, async (req, res) => {
    try {
        const prods = await Product.find({ stock: { $gt: 0 } });
        return res.status(200).json({ message: 'Prods', prods });
    } catch (error) {
        return res.status(500).json({ message: "Internal Error", err: error });
    }
});

route.post('/prod/:prodId', userAuth, async (req, res) => {
    // logic to purchase a course
    const parsedInput = legerInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(400).json({ message: "Validation Error", err: parsedInput.error });
    }
    const { prodId } = req.params;
    const { userId } = req.headers;
    const userData = await User.findById(userId);
    const prod = await Product.findById(prodId);
    if (!prod || Object.keys(prod).length == 0) {
        return res.status(400).json({ message: "Invalid Params" });
    }
    if (userData) {
        // Check for Transcations
        userData.purchasedProd.push(prod._id);
        await userData.save();
        const total = parsedInput.data.quantity * prod.price;
        const leger = new Leger({...parsedInput.data, product: prod._id, total, buyer: userId, seller: prod.creator});
        await leger.save();
        return res.status(200).json({ message: 'Product purchased successfully', leger });
    } else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

route.get('/prod/purchased', userAuth, async (req, res) => {
    try {
        log("userId");
        const { userId } = req.headers;
        const data = await Leger.find({buyer: userId}).populate("product");
        return res.status(200).json({ purchasedProd: data });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default route;

