import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const registerSchema = z
    .object({
        first_name: z
            .string()
            .min(2, "first name minimum contains 2 character"),
        last_name: z.string(),
        phone_number: z
            .string()
            .min(12, "phone_number number minimum contains 2 character"),
        email: z.string().email("Email must be a valid email."),
        password: z.string().min(4, "Password minimum contains 4 character"),
        password_confirmation: z
            .string()
            .min(4, "Confirm password minimum contains 4 characters"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password and confirm password don't match",
        path: ["password_confirmation"],
    });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Register() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone_number: "+62",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const { handleSubmit, control } = form;

    const submit = handleSubmit((values) => {
        setIsSubmitted(true);

        const promise = axios.post("/register", values);

        toast.promise(promise, {
            loading: "Registering...",
            success: () => {
                setIsSubmitted(false);
                window.location.replace("/");
                return "Register Success!";
            },
            error: (err) => {
                console.log(err);
                setIsSubmitted(false);
                return err?.response?.data?.message || "Something went wrong";
            },
        });
    });

    return (
        <div className="w-full h-screen lg:grid lg:grid-cols-2">
            <Head title="Register" />
            <div className="hidden bg-muted lg:block"></div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Register</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={submit} className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="phone number"
                                                type="tel"
                                                pattern="\+62[0-9]{9,13}"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="******"
                                                    type="password"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="password_confirmation"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>
                                                Confirmation Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="******"
                                                    type="password"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full"
                            >
                                Register
                            </Button>
                        </form>
                    </Form>
                    <div className="text-sm text-center ">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
