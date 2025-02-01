const { z } = require("zod");

const signupSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" }),
    email: z
        .string()
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    contact: z
        .string()
        .length(10, { message: "Contact number must be exactly 10 digits" })
        .regex(/^\d+$/, { message: "Contact number must contain only digits" }),
    gender: z
        .enum(["male", "female", "other"], { message: "Gender must be male, female, or other" }),
    city: z
        .string()
        .min(3, { message: "City name must be at least 3 characters long" })
        .max(50, { message: "City name must be at most 50 characters long" }),
});

const signinSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

const adminSignupSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).max(50, { message: "Name must be at most 50 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    contact: z.string()
        .length(10, { message: "Contact number must be exactly 10 digits" })
        .regex(/^\d+$/, { message: "Contact number must contain only digits" }),
    gender: z.enum(["male", "female", "other"], { message: "Gender must be male, female, or other" }),
    key: z.string()
        .length(4, { message: "Admin key must be exactly 4 characters long" })
        .regex(/^[a-zA-Z0-9]{4}$/, { message: "Admin key must contain only letters and numbers" }),
});

const adminSigninSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    key: z.string()
        .length(4, { message: "Admin key must be exactly 4 characters long" })
        .regex(/^[a-zA-Z0-9]{4}$/, { message: "Admin key must contain only letters and numbers" }),
});

module.exports = { signupSchema, signinSchema, adminSignupSchema, adminSigninSchema };
