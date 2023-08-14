import mongoose from "mongoose";

const connect = () => {
    mongoose.connect(`mongodb+srv://admin-akash:220104008@cluster0.kcycili.mongodb.net/`, { dbName: 'ecommerce' });
}

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: Number,
        required: true
    },
    createdProd: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
}, {
    timestamps: true
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    purchasedProd: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    imageUrls: [{
        type: String,
    }],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}
})

const User = mongoose.model("store_user", userSchema);
const Admin = mongoose.model("store_admin", adminSchema);
const Product = mongoose.model("product", productSchema);

export {
    User,
    Admin,
    Product,
    connect
}