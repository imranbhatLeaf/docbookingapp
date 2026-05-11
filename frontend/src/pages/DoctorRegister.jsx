import { useState } from "react";
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

const doctorRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  specialty: z.string().min(2, "Specialty is required"),
  documentUrl: z.string().min(5, "Please provide a document URL (or 'manual' to request manual review)"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function DoctorRegister() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(doctorRegisterSchema),
  });
  const navigate = useNavigate();
  const { setToken, fetchUser } = useAuth(); 

  const onSubmit = async (data) => {
    try {
      // 1. Register user as a doctor
      const authResponse = await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "doctor"
      });

      if (authResponse.data.token) {
        // Set token manually for the next API call to work
        localStorage.setItem("token", authResponse.data.token);
        
        // Update axios defaults so the next call uses the token
        api.defaults.headers.common['Authorization'] = `Bearer ${authResponse.data.token}`;

        // 2. Submit Doctor Application
        await api.post("/doctors/apply", {
          name: data.name,
          specialty: data.specialty,
          documentUrl: data.documentUrl
        });

        // Update auth state
        if (setToken) setToken(authResponse.data.token);
        if (fetchUser) await fetchUser();

        toast.success("Application submitted successfully! Please wait for admin approval.");
        navigate("/doctor/dashboard");
      } else {
        toast.info("Account created! Please log in to complete your application.");
        navigate("/doctor/login");
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error("Registration failed", {
        description: message,
      });
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Doctor Application</CardTitle>
          <CardDescription>Sign up and submit your details for verification</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Dr. John Doe" {...register("name")} />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
            </div>

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

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-3">Verification Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="specialty">Medical Specialty</Label>
                  <select
                    id="specialty"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    {...register("specialty")}
                  >
                    <option value="">Select a specialty</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Dentist">Dentist</option>
                  </select>
                  {errors.specialty && <p className="text-sm text-destructive mt-1">{errors.specialty.message}</p>}
                </div>
                
                <div>
                  <Label htmlFor="documentUrl">Verification Document Link</Label>
                  <Input id="documentUrl" placeholder="Link to your medical license (or type 'manual')" {...register("documentUrl")} />
                  <p className="text-xs text-muted-foreground mt-1">
                    Provide a URL to your license. If you cannot upload it right now, type "manual" and an admin will contact you.
                  </p>
                  {errors.documentUrl && <p className="text-sm text-destructive mt-1">{errors.documentUrl.message}</p>}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting Application..." : "Apply"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/doctor/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
