import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, ShieldCheck, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left side: Text + CTA */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Book Appointments
              </span>
              <br />
              with Trusted Doctors
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Find the right specialist, choose a convenient time, and get the care you need – all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/doctors">Find a Doctor</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 md:justify-start">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Secure Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right side: 3D Doctor Image */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md animate-float">
              <img
                src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?t=st=1714223400~exp=1714227000~hmac=6b9b3b8b6b8b6b8b6b8b6b8b6b8b6b8b6b8b6b8b6b8b6b8b6b8b6b8b6b8b6b8b"  // Placeholder for now
                alt="3D Doctor illustration"
                className="h-auto w-full drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional floating elements for extra modern feel */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
