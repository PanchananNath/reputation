"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

enum LoadingState {
    Idle,
    Loading,
    }

export default function SignUp() {
    const { toast } = useToast()
    const [loadingState, setLoadingState] = useState(LoadingState.Idle);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    type: "subscriber", // Default value
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoadingState(LoadingState.Loading);
    try {
      const response = await fetch("/api/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User created successfully");
        toast({
            title: "User created successfully",
            variant: "success",
          })
          setLoadingState(LoadingState.Idle);
          router.push("/login");
      } else {
        console.error("Error creating user");
        toast({
            title: "Error creating user",
            variant: "destructive",
          })
          setLoadingState(LoadingState.Idle);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error creating user",
        variant: "destructive",
      })
      setLoadingState(LoadingState.Idle);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <CardHeader className="text-2xl font-bold mb-6 text-center">Sign Up</CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium" htmlFor="username">
              Username
            </label>
            <Input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="type">
              Type
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="vendor">Vendor</option>
              <option value="isp">ISP</option>
              <option value="subscriber">Subscriber</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {
            loadingState === LoadingState.Loading ? (
              <div className="w-full flex justify-center">
               <Spinner/>
              </div>
            ) : <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
          }
          
        </form>
        </CardContent>
      </Card>
      <Toaster />
    </main>
  );
}
