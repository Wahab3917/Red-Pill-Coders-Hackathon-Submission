import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/user/login', {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <main>
      <div className="relative h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="bg-background text-foreground min-h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm p-6">
          <CardHeader className="flex justify-center">
            <Logo width={150} />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg text-primary mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-lg text-primary mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary text-primary-foreground rounded-full w-full py-3"
                >
                  Login
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary font-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
