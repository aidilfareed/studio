
"use client";

import { GitMerge, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { MouseEvent } from 'react';
import { ThemeToggle } from '../theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/#features", label: "Features", isPageLink: false, scrollTarget: true },
  { href: "/#what-youll-build", label: "What You'll Build", isPageLink: false, scrollTarget: true },
  { href: "/idea-generator", label: "Idea Generator", isPageLink: true, scrollTarget: false },
  { href: "/chat", label: "Chat", isPageLink: true, scrollTarget: false },
  { href: "/#faq", label: "FAQ", isPageLink: false, scrollTarget: true },
];

const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const elementId = href.substring(1); 
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export function Header() {
  const pathname = usePathname();

  const renderLink = (link: typeof navLinks[0], isMobile: boolean = false) => {
    if (link.isPageLink) {
      return (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "transition-colors hover:text-foreground",
            pathname === link.href ? "text-foreground" : "text-foreground/60",
            isMobile && "py-2 text-lg"
          )}
        >
          {link.label}
        </Link>
      );
    }
    // Only render scroll links on the homepage
    if (pathname === '/') {
      return (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleScroll(e, link.href)}
          className={cn(
            "transition-colors hover:text-foreground text-foreground/60",
            isMobile && "py-2 text-lg"
          )}
        >
          {link.label}
        </a>
      );
    }
    return null;
  }

  const registerButton = (
    <Button asChild>
      {pathname === '/' ? (
         <a href="#waitlist-form" onClick={(e) => handleScroll(e, '#waitlist-form')}>Register</a>
      ) : (
        <Link href="/#waitlist-form">Register</Link>
      )}
    </Button>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GitMerge className="h-6 w-6 text-primary" />
          <span className="font-bold">Project Forge</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {navLinks.map(link => renderLink(link)).filter(Boolean)}
        </nav>
        
        <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            {registerButton}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden flex-1 justify-end">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-4 h-full flex flex-col">
                <Link href="/" className="mb-8 flex items-center space-x-2">
                    <GitMerge className="h-6 w-6 text-primary" />
                    <span className="font-bold">Project Forge</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(link => renderLink(link, true)).filter(Boolean)}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                   <ThemeToggle />
                   {registerButton}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
