'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from 'next-auth/react'
import { toast } from '@/hooks/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'



type FormData = {
  username: string
  password: string
}

export default function SignInPage() {
  const Router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [isSubmiting, setIsSubmiting] = useState(false);
  const onSubmit = async (data: FormData) => {
    setIsSubmiting(true);
    try {
      const result = await signIn("credentials", { ...data, redirect: false });
      if (result?.status === 200) {
        toast({
          title: "Signed in successfully",
        })
        Router.push("/dashboard");
      } else if (result?.status === 401) {
        toast({
          title: "Invalid credentails",
          description: "Please enter right username and password",
        })
      } else {
        toast({
          title: "unexpected error happended",
        })
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
      });
      console.error("Sign-in error:", error);
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
                className="bg-background"
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="bg-background"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isSubmiting}>
            {isSubmiting ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-purple-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

