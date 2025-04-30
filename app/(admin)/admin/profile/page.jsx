"use client"
import { useSession } from "next-auth/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/ui/formerror";
import { FormSuccess } from "@/components/ui/formsuccess";
import { changePassword } from "@/actions/user";
import { useState, useTransition } from "react";
import { passwordSchema } from "@/schemas/password";

const ProfileEdit = () => {
    const { data: session } = useSession();
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const form = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            email: session?.user?.email || "",
            currentPassword: "",
            newPassword: "",
        }
    });

    const onSubmit = (values) => {
        setSuccess("");
        setError("");
        startTransition(() => {
            changePassword(values)
                .then((data) => {
                    setSuccess(data?.success ?? '');
                    setError(data?.error ?? '');
                })
        })

    }
    return (
        <div className="h-[90vh] w-full grid place-items-center">
            <Card className="w-full max-w-md shadow-input">
                <Header />
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="*************" type="password" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="*************" type="password" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormSuccess message={success} />
                            <FormError message={error} />
                            <Button type="submit" className="mt-4 w-full -mb-1" disabled={isPending}>Change Password</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    )
}

export default ProfileEdit

const Header = () => {
    return (
        <CardHeader>
            <CardTitle className="text-2xl">Change Your Password</CardTitle>
        </CardHeader>
    )
}


