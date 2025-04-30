"use server"

import { compare, hash } from "bcryptjs";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {  DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import { prisma } from "@/lib/database";
import { passwordSchema } from "@/schemas/password";


export const login = async (values) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Field" }
    }
    const { email, password } = validatedFields.data;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (!existingUser || !existingUser.email || !existingUser.password) {
            return { error: "Email does not exist" }
        }
        const isMatched = await compare(password, existingUser.password);
        if (!isMatched) {
            return { error: "Invalid Password" }
        }
        
        await signIn("credentials", {
            email, password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "Internal server error" }
            }
        }
        throw error;
    }
}

export const register = async (values) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Field" };
    }
    const { name, email, password } = validatedFields.data;
    const hashedPassword = await hash(password, 10);
    try {

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (existingUser) {
            return { error: "User already exists with this email" };
        };
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { success: "User Registered Successfully" }
    } catch (error) {
        console.error("Error inserting user:", error);
        return { error: "Internal server error" };
    }

}




export const changePassword = async (values) => {
    const validatedFields = passwordSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Fields" };
    }
    const { email, currentPassword, newPassword } = validatedFields.data;
    try {
        // Fetch the user by email
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (!existingUser || !existingUser.password) {
            return { error: "User not found" };
        }
        // Compare the current password with the stored password hash
        const isMatched = await compare(currentPassword, existingUser.password);
        if (!isMatched) {
            return { error: "Current password is incorrect" };
        }
        // Hash the new password
        const hashedNewPassword = await hash(newPassword, 10);

        // Update the user's password
        await prisma.user.update({
            where: { email },
            data: { password: hashedNewPassword },
        });

        return { success: "Password updated successfully" };
    } catch (error) {
        console.error("Error updating password:", error);
        return { error: "Internal server error" };
    }
};