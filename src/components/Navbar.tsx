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
import { User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"startup" | "investor" | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Check if we're on an auth page
    const isAuthPage = pathname?.startsWith("/auth");
    setIsAuthenticated(!isAuthPage);

    // Get user type and name from localStorage
    const startupId = localStorage.getItem("StartupId");
    const investorId = localStorage.getItem("InvestorId");
    setUserType(startupId ? "startup" : investorId ? "investor" : null);
    
    // For now, we'll just use a placeholder name
    // In a real app, you'd fetch this from your API
    setUserName(localStorage.getItem("userName") || "User");
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

  // Don't render the navbar on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Investygram
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
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
        </div>
      </div>
    </nav>
  );
}
