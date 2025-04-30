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
import { Suspense, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { InterviewerSchema } from "@/schemas/interviewer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearError, clearSuccess, fetchSingleInterviewer, updateInterviewer } from "@/lib/features/interviewer";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import { useSearchParams } from 'next/navigation';
import NotFound from "@/components/not-found";
import GlobalLoader from "@/components/loader/globalLoader";

const PageContent = () => {
    const dispatch = useAppDispatch();
    const { singleData, success, error, isLoading } = useAppSelector((state) => state.interviewer);
    const [isPending, startTransition] = useTransition();
    const params = useSearchParams();
    const id = params.get('id');

    if (!id) {
        return null;
    }

    const onSubmit = async (data) => {
        if (singleData?._id) {
            const formData = {
                name: data.name,
                email: data.email,
            };

            startTransition(() => {
                dispatch(updateInterviewer({ id: singleData._id, formData }));
            });
        }
    };

    const form = useForm({
        resolver: zodResolver(InterviewerSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleInterviewer(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (singleData && Object.keys(singleData).length > 0) {
            form.setValue('name', singleData.name);
            form.setValue('email', singleData.email);
        }
    }, [singleData]);

    if (isLoading) {
        return <GlobalLoader/>;
    }

    if (error) {
        return <NotFound />;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <Header />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
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
                     <div className="flex gap-4 mt-8">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Interviewer"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    </div>
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
            <h1 className="text-2xl font-bold text-gray-800">Edit Interviewer</h1>
            <p className="text-gray-600 mt-2">Update interviewer information</p>
        </header>
    );
};

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
    </Suspense>
);

export default Page