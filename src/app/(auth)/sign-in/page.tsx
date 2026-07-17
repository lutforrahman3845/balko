"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useCallback } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Successfully signed in!");
            router.push("/");
        }, 1500);
    };

    return (
        <div
            className="absolute inset-0 w-full min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: 'url(/Login-bgCover.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Login Card */}
            <div className="relative z-10 w-full max-w-sm mx-auto overflow-hidden">
                <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 dark:border-zinc-800">
                    {/* Logo at Top */}
                    <div className="flex justify-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2.5 hover:opacity-80 transition-opacity group">
                            <div className="dark:hidden flex items-center">
                                <Image
                                    width={160}
                                    height={48}
                                    src="/logo/balcofullwhite.svg"
                                    alt="Balko"
                                    className="h-11 w-auto max-w-none transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="hidden dark:flex items-center">
                                <Image
                                    width={160}
                                    height={48}
                                    src="/logo/balcofullblack.svg"
                                    alt="Balko"
                                    className="h-11 w-auto max-w-none transition-transform group-hover:scale-105"
                                />
                            </div>
                        </Link>
                    </div>

                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
                            <p className="text-sm text-muted-foreground mt-2">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    defaultValue="ceo@balko.com"
                                    required
                                    className="h-12 rounded-lg border-border bg-background shadow-sm focus-visible:ring-2 focus-visible:ring-blue-600/20"
                                    disabled={isLoading}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        defaultValue="@123456"
                                        required
                                        className="h-12 pr-12 rounded-lg border-border bg-background shadow-sm focus-visible:ring-2 focus-visible:ring-blue-600/20"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                                        onClick={togglePasswordVisibility}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            <Button
                                type="submit"
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                        
                        <p className="text-center text-sm text-muted-foreground pt-2">
                            Don't have an account?{" "}
                            <Link href="/sign-up" className="text-blue-600 hover:text-blue-500 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
