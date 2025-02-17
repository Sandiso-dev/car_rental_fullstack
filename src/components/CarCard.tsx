
import { Heart } from "lucide-react";

interface CarCardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  price_per_day: number;
  seats: number;
  transmission: string;
  fuel_type: string;
}

const CarCard = ({ name, type, image, price_per_day, seats, transmission, fuel_type }: CarCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4 animate-fade-up hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
        <button className="hover:text-primary transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-medium">Seats:</span>
          <span>{seats}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Transmission:</span>
          <span>{transmission}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Fuel:</span>
          <span>{fuel_type}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Price:</span>
          <span>${price_per_day}/day</span>
        </div>
      </div>
      <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
        Rent Now
      </button>
    </div>
  );
};

export default CarCard;
