
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Calendar } from "@/components/ui/calendar";
import { addDays, differenceInDays } from "date-fns";
import { Loader2 } from "lucide-react";

interface Car {
  id: string;
  name: string;
  type: string;
  image: string;
  price_per_day: number;
  seats: number;
  transmission: string;
  fuel_type: string;
  description: string | null;
  location: string;
}

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load car details. Please try again.",
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate, toast]);

  const handleBooking = async () => {
    const [startDate, endDate] = dateRange;
    if (!startDate || !endDate || !car) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both start and end dates.",
      });
      return;
    }

    const days = differenceInDays(endDate, startDate);
    const totalPrice = days * car.price_per_day;

    setBookingLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      console.log("Current user:", user); // Debug log
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to book a car.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      console.log("Attempting to create booking with data:", {
        car_id: car.id,
        user_id: user.id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        total_price: totalPrice,
      }); // Debug log

      const { data, error } = await supabase.from("bookings").insert({
        car_id: car.id,
        user_id: user.id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        total_price: totalPrice,
        status: 'pending' // Add a default status
      }).select();

      if (error) {
        console.error("Supabase error details:", error); // Debug log
        throw error;
      }

      console.log("Booking created successfully:", data); // Debug log

      toast({
        title: "Success",
        description: "Your booking has been confirmed!",
      });
      navigate("/");
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not create booking. Please try again.",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Car not found</h1>
            <p className="mt-2">The car you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{car.name}</h1>
              <p className="text-gray-600">{car.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Type:</span> {car.type}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {car.location}
                </div>
                <div>
                  <span className="font-medium">Seats:</span> {car.seats}
                </div>
                <div>
                  <span className="font-medium">Transmission:</span> {car.transmission}
                </div>
                <div>
                  <span className="font-medium">Fuel Type:</span> {car.fuel_type}
                </div>
                <div>
                  <span className="font-medium">Price:</span> ${car.price_per_day}/day
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold">Book this car</h2>
            <div className="space-y-4">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange[0],
                  to: dateRange[1],
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange([range.from, range.to]);
                  }
                }}
                numberOfMonths={2}
                disabled={(date) => date < addDays(new Date(), -1)}
              />
              {dateRange[0] && dateRange[1] && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Total Price:</p>
                  <p className="text-2xl font-bold">
                    ${differenceInDays(dateRange[1], dateRange[0]) * car.price_per_day}
                  </p>
                  <p className="text-sm text-gray-500">
                    for {differenceInDays(dateRange[1], dateRange[0])} days
                  </p>
                </div>
              )}
              <button
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleBooking}
                disabled={!dateRange[0] || !dateRange[1] || bookingLoading}
              >
                {bookingLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetails;
