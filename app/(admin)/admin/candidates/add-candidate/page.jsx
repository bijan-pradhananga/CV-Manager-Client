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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { candidateFormSchema } from "@/schemas/candidate";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addCandidate, clearError, clearSuccess } from "@/lib/features/candidate";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";

const AddCandidatePage = () => {
    const dispatch = useAppDispatch();
    const { success, error } = useAppSelector((state) => state.candidate);
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(candidateFormSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            references: '',
            technology: '',
            level: 'Junior',
            salaryExpectation: null,
            experience: null,
            cvFile: null,
            interviewStatus: 'Shortlisted'
        },
    });

    const onSubmit = async (data) => {
        startTransition(() => {
            dispatch(addCandidate(data));
            form.reset();
        })
    };

    return (
        <div className="container mx-auto px-4 ">
            <Header />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
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

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="john.doe@example.com" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="+1234567890" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Level */}
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience Level</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                        {/* Technology */}
                        <FormField
                            control={form.control}
                            name="technology"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Technologies (comma separated)</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="React,Node,JavaScript"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Salary Expectation */}
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
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Experience */}
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
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* CV File */}
                        <FormField
                            control={form.control}
                            name="cvFile"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>CV (PDF/DOC/DOCX)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => onChange(e.target.files?.[0] || null)}
                                            className="cursor-pointer"
                                            {...rest}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {value && (
                                        <div className="text-sm text-muted-foreground mt-1">
                                            Selected file: {value.name}
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        />

                        {/* References */}
                        <FormField
                            control={form.control}
                            name="references"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>References</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="LinkedIn profile or other references" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
                        {isPending ? 'Submitting...' : 'Add Candidate'}
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
        <header className="w-full bg-gray-100 rounded-lg py-6 px-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Add New Candidate</h1>
            <p className="text-gray-600 mt-2">Fill in the candidate details and upload their CV</p>
        </header>
    )
}

export default AddCandidatePage