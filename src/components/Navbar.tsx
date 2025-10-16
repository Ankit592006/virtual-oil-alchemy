import { Link, useLocation } from "react-router-dom";
import { Home, Image, Video, Users, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/photos", label: "Product Photos", icon: Image },
    { to: "/videos", label: "Product Videos", icon: Video },
    { to: "/students", label: "Student Details", icon: Users },
  ];

  if (session) {
    links.push({ to: "/admin", label: "Admin", icon: Lock });
  } else {
    links.push({ to: "/auth", label: "Login", icon: Lock });
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">BL</span>
            </div>
            <span className="font-semibold text-lg">Biodiesel Lab</span>
          </Link>
          
          <div className="flex gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
