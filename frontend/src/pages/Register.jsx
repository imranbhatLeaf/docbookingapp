import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/services/api";

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const { login } = useAuth(); // optional: auto-login after registration

  const onSubmit = async (data) => {
    try {
      // Call your backend registration endpoint
      const response = await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // If your API returns a token directly, store it and log the user in
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Optionally update auth context
        await login(data.email, data.password); // or set user from response.data.user
        toast.success("Registration successful! Welcome.");
        navigate("/dashboard");
      } else {
        // If registration doesn't return token, redirect to login
        toast.info("Account created! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error("Registration failed", {
        description: message,
      });
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Sign up to start booking appointments</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 text-center">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Register"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
            <div className="w-full mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Are you a doctor?{" "}
                <Link to="/doctor/register" className="text-primary font-medium hover:underline">
                  Apply as a new doctor
                </Link>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Already approved? <Link to="/doctor/login" className="text-primary hover:underline">Sign in to Dashboard</Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
