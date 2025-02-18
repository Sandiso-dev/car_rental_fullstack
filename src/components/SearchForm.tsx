
import { Calendar, Clock, MapPin } from "lucide-react";

const SearchForm = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="w-4 h-4" />
          Locations
        </label>
        <select className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Select your city</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-4 h-4" />
          Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4" />
          Time
        </label>
        <input
          type="time"
          className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default SearchForm;
