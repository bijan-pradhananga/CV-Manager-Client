"use client"
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormSuccess } from "@/components/ui/formsuccess";
import { FormError } from "@/components/ui/formerror";
import { register } from "@/actions/user";
// import Socials from "@/components/ui/socials";

const Register = () => {
    const [isPending, startTransition] = useTransition();
    const [success,setSuccess] = useState('');
    const [error,setError] = useState('');
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values) =>{
        setSuccess("");
        setError("");
        startTransition(() => {
            register(values)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
        })
    }
    
    return (
        <Card className="w-full max-w-md shadow-input">
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Joe Russo" type="name" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mb-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="joe@gmail.com" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="*************" type="password" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button type="submit" className="w-full mt-4">Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            {/* <Socials /> */}
            <CardFooter className="flex flex-col gap-2">
                <p>Already have an account? <Link className="underline" href={'/auth/login'}>Login</Link></p>
            </CardFooter>
        </Card>
    )
}

export default Register