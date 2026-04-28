import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/services/api";

export default function BookingForm({ doctorId }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!time) {
      toast.error("Please select a time");
      return;
    }
    setLoading(true);
    try {
      await api.post("/appointments", { doctorId, date, time });
      toast.success("Booking confirmed!", {
        description: "Check your dashboard.",
      });
      navigate("/dashboard");
    } catch (err) {
      toast.error("Booking failed", {
        description: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label>Select Time</Label>
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Booking..." : "Confirm Booking"}
      </Button>
    </form>
  );
}
