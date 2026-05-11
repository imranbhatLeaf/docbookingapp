import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Hero from "@/components/common/Hero";
import FeedbackForm from "@/components/common/FeedbackForm";
import { Search, CalendarCheck, UserRoundCheck, Stethoscope, Baby, Activity, Heart, Brain, Bone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="pb-12">
      <Hero />

      <div className="container mx-auto px-4">
        {/* Features Section */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 md:mt-16">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>Easy Booking</CardTitle>
              <CardDescription>Select date & time – instant confirmation.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>Trusted Doctors</CardTitle>
              <CardDescription>Verified professionals with real patient reviews.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:border-primary/50 transition-colors sm:col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Manage Online</CardTitle>
              <CardDescription>View, reschedule, or cancel your appointments.</CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* How It Works Section */}
        <section className="mt-20 md:mt-32 py-8 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to your next medical visit</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Search className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">1. Search</h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-[250px]">Find the perfect specialist by name or specialty in your area.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <CalendarCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">2. Book</h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-[250px]">Choose a convenient date and time and book your appointment instantly.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <UserRoundCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">3. Meet</h3>
              <p className="text-sm md:text-base text-muted-foreground max-w-[250px]">You're all set! Meet your doctor and get the quality care you deserve.</p>
            </div>
          </div>
        </section>

        {/* Search by Category Section */}
        <section id="categories" className="mt-20 md:mt-32 py-8 md:py-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 gap-4 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Search by Category</h2>
              <p className="text-lg text-muted-foreground">Find specialists across various medical fields</p>
            </div>
            <Link to="/doctors" className="text-primary font-medium hover:underline flex items-center gap-1">
              View all categories <span className="text-xl">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Gynecologist", icon: Stethoscope, color: "bg-pink-50 text-pink-600" },
              { name: "Pediatrician", icon: Baby, color: "bg-blue-50 text-blue-600" },
              { name: "Gastro", icon: Activity, color: "bg-orange-50 text-orange-600" },
              { name: "Cardiologist", icon: Heart, color: "bg-red-50 text-red-600" },
              { name: "Neurologist", icon: Brain, color: "bg-purple-50 text-purple-600" },
              { name: "Orthopedic", icon: Bone, color: "bg-green-50 text-green-600" },
            ].map((cat, i) => (
              <Link 
                key={i} 
                to={`/doctors?specialty=${cat.name}`}
                className="group flex flex-col items-center p-6 bg-card border rounded-2xl hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <div className={`h-14 w-14 md:h-16 md:w-16 rounded-2xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <span className="font-semibold text-sm text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Trusted by Kashmir Section (About) */}
        <section id="about" className="mt-20 md:mt-32 text-center py-12 md:py-20 bg-muted/30 rounded-[2rem] px-4 scroll-mt-20">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Trusted by Kashmir</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            We are committed to providing the best healthcare experience in the valley. Thousands of patients trust Kashdocs for their medical appointments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-1 p-6 bg-background/50 rounded-2xl shadow-sm">
              <h3 className="text-4xl font-bold text-primary">50k+</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Patients Served</p>
            </div>
            <div className="space-y-1 p-6 bg-background/50 rounded-2xl shadow-sm">
              <h3 className="text-4xl font-bold text-primary">200+</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Top Doctors</p>
            </div>
            <div className="space-y-1 p-6 bg-background/50 rounded-2xl shadow-sm">
              <h3 className="text-4xl font-bold text-primary">10+</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Specialties</p>
            </div>
            <div className="space-y-1 p-6 bg-background/50 rounded-2xl shadow-sm">
              <h3 className="text-4xl font-bold text-primary">4.9/5</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">User Rating</p>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mt-20 md:mt-32 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground">We value your feedback and strive to improve our service.</p>
          </div>
          <FeedbackForm />
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-20 md:mt-32 py-16 px-4 bg-primary text-primary-foreground rounded-[2rem] text-center scroll-mt-20 mb-12">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Our support team is here to help you 24/7. Reach out to us for any assistance with your bookings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="font-bold">
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-primary transition-colors font-bold">
              FAQ
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
