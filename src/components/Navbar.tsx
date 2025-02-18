
import { Heart, Settings, UserCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: "Error logging out. Please try again.",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          MACAIDO RENTAL'S
        </Link>
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors">
            <Heart className="w-6 h-6" />
          </button>
          <button className="hover:text-primary transition-colors">
            <Settings className="w-6 h-6" />
          </button>
          {user ? (
            <>
              <button className="hover:text-primary transition-colors">
                <UserCircle className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="hover:text-primary transition-colors"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
