import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32 lg:py-40">
      {/* Background radial gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:bg-slate-950 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-20"></div>

      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-8 bg-muted/50 text-muted-foreground backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Modern Healthcare Platform
        </div>
        
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl mb-6">
          Healthcare at your
          <span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent pb-2">
            fingertips.
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl mb-10 leading-relaxed">
          Find the right specialist, choose a convenient time, and get the care you need – all in one place. Your well-being is our top priority.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
            <Link to="/doctors">
              Find a Doctor <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
            <Link to="/how-it-works">How It Works</Link>
          </Button>
        </div>
        
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-border/50 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-green-100/50 dark:bg-green-900/20 rounded-full">
              <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium text-sm">Secure Booking</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
              <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium text-sm">Instant Confirmation</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-purple-100/50 dark:bg-purple-900/20 rounded-full">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-medium text-sm">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
