"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addInterviewer, clearError, clearSuccess } from "@/lib/features/interviewer";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import { InterviewerSchema } from "@/schemas/interviewer";

const AddInterviewerPage = () => {
    const dispatch = useAppDispatch();
    const { success, error } = useAppSelector((state) => state.interviewer);
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(InterviewerSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    const onSubmit = async (data) => {
        startTransition(() => {
            dispatch(addInterviewer(data));
            form.reset();
        })
    };

    return (
        <div className="container mx-auto px-4">
            <Header />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        placeholder="Interviewer Name" 
                                        disabled={isPending} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        placeholder="interviewer@example.com" 
                                        type="email"
                                        disabled={isPending} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        className="w-full md:w-auto" 
                        disabled={isPending}
                    >
                        {isPending ? "Adding..." : "Add Interviewer"}
                    </Button>
                </form>
            </Form>
            <AlertSuccess
                isOpen={success}
                message={success}
                onClose={() => dispatch(clearSuccess())}
            />
            <AlertFailure
                isOpen={error}
                message={error}
                onClose={() => dispatch(clearError())}
            />
        </div>
    )
}

const Header = () => {
    return (
        <header className="w-full bg-gray-100 rounded-lg py-4 px-4 mb-6">
            <h1 className="text-2xl font-semibold ">Add New Interviewer</h1>
        </header>
    )
}

export default AddInterviewerPage