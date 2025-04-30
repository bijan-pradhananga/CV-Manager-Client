"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    clearError,
    clearSuccess,
    fetchSingleCandidate,
    updateCandidate,
} from "@/lib/features/candidate";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import { editCandidateFormSchema } from "@/schemas/candidate";
import { useSearchParams } from "next/navigation";
import NotFoundPage from "@/components/design/404notFound";
import { z } from "zod";
import GlobalLoader from "@/components/loader/globalLoader";


const PageContent = () => {
    const dispatch = useAppDispatch();
    const { singleData: candidate, success, error, singleLoading } = useAppSelector(
        (state) => state.candidate
    );
    const [isPending, startTransition] = useTransition();
    const params = useSearchParams();
    const id = params.get("id");


    if (!id) {
        return <NotFoundPage />;
    }

    const form = useForm({
        resolver: zodResolver(editCandidateFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            references: "",
            technology: [],
            level: "Junior",
            salaryExpectation: undefined,
            experience: undefined,
            interviewStatus: "Shortlisted",
            cvFile: null
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await dispatch(fetchSingleCandidate(id));
            }
        };
        fetchData();
    }, [id, dispatch]);

    useEffect(() => {
        if (candidate && Object.keys(candidate).length > 0) {
            form.reset({
                name: candidate.name,
                phone: candidate.phone,
                email: candidate.email,
                references: candidate.references,
                technology: candidate.technology,
                level: candidate.level,
                salaryExpectation: candidate.salaryExpectation,
                experience: candidate.experience,
                interviewStatus: candidate.interviewStatus,
            });
        }
    }, [candidate]);

    if (singleLoading) {
        return <GlobalLoader/>;
    }

    if (error) {
        return <NotFoundPage />;
    }


    const onSubmit = async (data) => {
        const formData = new FormData();
        if (candidate?._id) {

            // Append all fields
            Object.keys(data).forEach(key => {
                if (key === 'cvFile' && data[key] instanceof File) {
                    formData.append(key, data[key]);
                } else {
                    formData.append(key, data[key]);
                }
            });

            startTransition(() => {
                dispatch(updateCandidate({ id: candidate._id, formData: formData }));
            });
        }

    };

    return (
        <div className="container mx-auto px-4 py-6">
            <Header />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="John Doe" disabled={isPending} />
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
                                            placeholder="john@example.com"
                                            disabled={isPending}
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="+1234567890"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience Level</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={isPending}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Junior">Junior</SelectItem>
                                            <SelectItem value="Mid">Mid</SelectItem>
                                            <SelectItem value="Senior">Senior</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="technology"
                            render={({ field }) => {

                                return (
                                    <FormItem>
                                        <FormLabel>Technologies (comma separated)</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="React, Node, JavaScript"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="salaryExpectation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary Expectation</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="80000"
                                            disabled={isPending}
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value === "" ? undefined : Number(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Years of Experience</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="5"
                                            disabled={isPending}
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value === "" ? undefined : Number(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cvFile"
                            render={({ field: { value, onChange, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>CV (PDF/DOC/DOCX - max 5MB)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                            className="cursor-pointer"
                                            disabled={isPending}
                                            {...rest}
                                        />
                                    </FormControl>
                                    {value && !(value instanceof File) && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Current file: {value}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="interviewStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Interview Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={isPending}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                            <SelectItem value="First Interview Complete">
                                                First Interview Complete
                                            </SelectItem>
                                            <SelectItem value="Second Interview Complete">
                                                Second Interview Complete
                                            </SelectItem>
                                            <SelectItem value="Hired">Hired</SelectItem>
                                            <SelectItem value="Rejected">Rejected</SelectItem>
                                            <SelectItem value="Blacklisted">Blacklisted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="references"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>References</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="LinkedIn profile or other references"
                                            disabled={isPending}
                                            rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-4 mt-8">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Candidate"}
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
                isOpen={!!success}
                message={success}
                onClose={() => dispatch(clearSuccess())}
            />
            <AlertFailure
                isOpen={!!error}
                message={error}
                onClose={() => dispatch(clearError())}
            />
        </div>
    );
};

const Header = () => {
    return (
        <header className="w-full bg-gray-100 rounded-lg py-4 px-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Edit Candidate</h1>
            <p className="text-gray-600 mt-2">Update candidate information</p>
        </header>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
};

export default Page;