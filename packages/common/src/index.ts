import { z } from 'zod'

export const userSignupInput = z.object({
    username: z.string().min(4),
    password: z.string().min(4),
    email: z.string().min(5),
    phone: z.number(),
    address: z.string()
});

export type UserSignup = z.infer<typeof userSignupInput>;

export const adminSignupInput = z.object({
    username: z.string().min(4),
    password: z.string().min(4),
    email: z.string().min(5),
    phone: z.number(),
});

export type AdminSignup = z.infer<typeof adminSignupInput>;

export const productSignup = z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    category: z.string(),
    brand: z.string(),
    stock: z.number(),
    imageUrls: z.array(z.string())
});

export type productType = z.infer<typeof productSignup>;

export const userLogin = z.object({
    username: z.string().min(4),
    password: z.string().min(4)
});

export type UserLogin = z.infer<typeof userLogin>;


export const adminLogin = z.object({
    username: z.string().min(4),
    password: z.string().min(4)
});

export type adminLogin = z.infer<typeof adminLogin>;
