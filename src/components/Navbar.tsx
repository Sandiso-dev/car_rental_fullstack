
import { Heart, Settings, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">MORENT</Link>
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors">
            <Heart className="w-6 h-6" />
          </button>
          <button className="hover:text-primary transition-colors">
            <Settings className="w-6 h-6" />
          </button>
          <button className="hover:text-primary transition-colors">
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
