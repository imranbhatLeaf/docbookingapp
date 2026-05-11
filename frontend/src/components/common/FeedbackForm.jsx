import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MessageSquare, Star } from "lucide-react";
import api from "@/services/api";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/user/feedback", formData);
      toast.success("Thank you for your feedback!");
      setFormData({ name: "", email: "", message: "", rating: 5 });
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-lg">
          <MessageSquare className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">Share Your Experience</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({...formData, rating: star})}
                className="transition-transform hover:scale-110"
              >
                <Star 
                  className={`w-8 h-8 ${star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} 
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <textarea 
            className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="How was your experience using Kashdocs?"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          />
        </div>

        <Button type="submit" className="w-full font-bold h-12" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Feedback"}
        </Button>
      </form>
    </div>
  );
}
