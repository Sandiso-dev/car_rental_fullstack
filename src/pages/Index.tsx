
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import CarCard from "@/components/CarCard";
import { supabase } from "@/integrations/supabase/client";

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
  available: boolean;
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching cars:", error);
          return;
        }

        setCars(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12 space-y-12">
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary rounded-lg p-8 text-white space-y-4">
              <h1 className="text-4xl font-bold">The Best Platform for Car Rental</h1>
              <p className="text-white/90">
                Ease of doing a car rental safely and reliably. Of course at a low price.
              </p>
              <button className="bg-white text-secondary px-6 py-2 rounded-lg hover:bg-white/90 transition-colors">
                Rental Car
              </button>
            </div>
            <div className="bg-primary rounded-lg p-8 text-white space-y-4">
              <h2 className="text-4xl font-bold">Easy way to rent a car at a low price</h2>
              <p className="text-white/90">
                Providing cheap car rental services and safe and comfortable facilities.
              </p>
              <button className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-white/90 transition-colors">
                Rental Car
              </button>
            </div>
          </div>
          <SearchForm />
        </section>
        
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Popular Cars</h2>
            <button className="text-primary hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading cars...</p>
            ) : (
              cars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
