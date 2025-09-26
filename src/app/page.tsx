"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("api/auth", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userName,
          password: password
        })
      })
      if (!response.ok) {
        alert("Login failed. Please check your credentials and try again.");
        return;
      }

      const isAuthenticated = await response.json();

      if (!isAuthenticated) {
        return;
      }

      route.push("/dashboard");

    } catch(error) {
      alert("There was an error logging in. Please try again.");
      return;
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-center mb-4 gap-1">
            <CardTitle>Tech Academy</CardTitle>
            <Image src="/philippines.png" alt="Tech Academy Logo" width={25} height={25} />
          </div>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
