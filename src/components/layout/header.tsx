
"use client";

import { GitMerge } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { MouseEvent } from 'react';
import { ThemeToggle } from '../theme-toggle';

const navLinks = [
  { href: "#features", label: "Features", isPageLink: false },
  { href: "#what-youll-build", label: "What You'll Build", isPageLink: false },
  { href: "/chat", label: "Chat", isPageLink: true },
  { href: "#faq", label: "FAQ", isPageLink: false },
];

export function Header() {
  const pathname = usePathname();

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const elementId = href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderLink = (link: typeof navLinks[0]) => {
     if (link.isPageLink) {
      return (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === link.href ? "text-foreground" : "text-foreground/60"
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
          className="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          {link.label}
        </a>
      );
    }
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GitMerge className="h-6 w-6 text-primary" />
            <span className="font-bold">Project Forge</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(renderLink)}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          {pathname === '/' ? (
             <Button onClick={(e) => handleScroll(e as any, '#waitlist-form')}>Register</Button>
          ) : (
            <Link href="/#waitlist-form">
              <Button>Register</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
