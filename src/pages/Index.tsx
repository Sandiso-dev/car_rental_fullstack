
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import CarCard from "@/components/CarCard";

const Index = () => {
  const cars = [
    {
      name: "Koenigsegg",
      type: "Sport",
      image: "/lovable-uploads/9e6e9feb-da61-4238-9bc6-c8f055b93044.png",
    },
    {
      name: "Nissan GT-R",
      type: "Sport",
      image: "/lovable-uploads/9e6e9feb-da61-4238-9bc6-c8f055b93044.png",
    },
    {
      name: "Rolls-Royce",
      type: "Sedan",
      image: "/lovable-uploads/9e6e9feb-da61-4238-9bc6-c8f055b93044.png",
    },
  ];

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
            {cars.map((car) => (
              <CarCard key={car.name} {...car} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
