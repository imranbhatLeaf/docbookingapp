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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function DoctorLogin() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back, Doctor!");
      navigate("/doctor/dashboard");
    } catch (error) {
      toast.error("Login failed", {
        description: error.response?.data?.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Doctor Login</CardTitle>
          <CardDescription>Enter your credentials to access your portal</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="doctor@example.com" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••" {...register("password")} />
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Not registered as a doctor yet?{" "}
              <Link to="/doctor/register" className="text-primary hover:underline">
                Apply here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
