"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Lightbulb,
  Menu,
  PlusCircle,
  User,
  Sun,
  Moon,
  LogOut,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Explore" },
  { href: "/post", label: "Post" },
  { href: "/profile", label: "My Page" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl grain-overlay">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-amber shadow-lg shadow-amber-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-xl font-black tracking-tight">
            Idea<span className="gradient-text">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive(link.href) ? "secondary" : "ghost"}
                size="sm"
                className={`rounded-full px-4 text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>

          <Link href="/post">
            <Button className="rounded-full gap-1.5 gradient-amber hover:opacity-90 transition-opacity shadow-md shadow-amber-500/20">
              <PlusCircle className="h-4 w-4" />
              <span className="font-medium">Post Idea</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8 ring-2 ring-amber-200 dark:ring-amber-800 cursor-pointer">
                <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-bold dark:bg-amber-900 dark:text-amber-300">
                  U
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  My Page
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/post" className="flex items-center gap-2 cursor-pointer">
                  <Lightbulb className="h-4 w-4" />
                  Post Idea
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-muted-foreground cursor-pointer">
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                    <Button
                      variant={isActive(link.href) ? "secondary" : "ghost"}
                      className={`w-full justify-start rounded-lg text-base font-medium ${
                        isActive(link.href)
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <div className="mt-4">
                  <Link href="/post" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-full gap-2 gradient-amber">
                      <PlusCircle className="h-4 w-4" />
                      Post Idea
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
