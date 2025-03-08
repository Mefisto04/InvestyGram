"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Menu, X, UploadCloud } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"startup" | "investor" | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if we're on an auth page
    const isAuthPage = pathname?.startsWith("/auth");
    setIsAuthenticated(!isAuthPage);

    // Get user type and name from localStorage
    const startupId = localStorage.getItem("StartupId");
    const investorId = localStorage.getItem("InvestorId");
    setUserType(startupId ? "startup" : investorId ? "investor" : null);
    
    // For now, we'll just use a placeholder name
    setUserName(localStorage.getItem("userName") || "User");

    // Add scroll listener
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear localStorage
      localStorage.removeItem("UserId");
      localStorage.removeItem("StartupId");
      localStorage.removeItem("InvestorId");
      localStorage.removeItem("userName");

      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Don't render the navbar on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <nav className={`w-full z-50 transition-all duration-300 border-b ${
      isScrolled ? "fixed bg-background/95 backdrop-blur-sm shadow-sm" : "relative bg-background"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1.5">
              <UploadCloud className="h-6 w-6 text-primary-foreground" />
            </div>
            <Link href="/" className="text-2xl font-bold text-foreground">
              InvestyGram
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <Link href="#startup-flow" className="text-muted-foreground hover:text-foreground transition-colors">
                  Startup
                </Link>
                <Link href="#investor-flow" className="text-muted-foreground hover:text-foreground transition-colors">
                  Investor
                </Link>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                  Testimonials
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="mr-2">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button>Get Started</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {userName.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userType === "startup" ? "Startup" : "Investor"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="#startup-flow"
                    className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Startup
                  </Link>
                  <Link
                    href="#investor-flow"
                    className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Investor
                  </Link>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="#testimonials"
                    className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonials
                  </Link>
                  <div className="flex space-x-2 pt-2">
                    <Link href="/auth/login" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/auth/login" className="flex-1">
                      <Button className="w-full">Sign up</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start">
                    Log out
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
