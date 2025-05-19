'use client';

import Link from 'next/link';
import { Gamepad2, Home, HelpCircle, ShoppingCart, Gift } from 'lucide-react';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { useAppState } from '@/context/AppStateContext';

const Header = () => {
  const { setScrollToFormItem } = useAppState();

  const handleBuyNowClick = () => {
    setScrollToFormItem(null); // Clear any specific item, just scroll to form
    const orderForm = document.getElementById('order-form-section');
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const navLinks = [
    { href: '#consoles', label: 'Consoles', icon: <Gamepad2 className="w-4 h-4" /> },
    { href: '#games', label: 'Games', icon: <Gift className="w-4 h-4" /> },
    { href: '#accessories', label: 'Accessories', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-10Z"/><path d="M7 8V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v2"/></svg> }, // Placeholder icon for Headset
    { href: '#recommend', label: 'Recommend', icon: <Gift className="w-4 h-4" /> },
    { href: '#faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl text-primary-foreground">PS5 Showcase</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary-foreground flex items-center gap-1"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-3">
           <AnimatedButton onClick={handleBuyNowClick} variant="accent" size="sm">
             <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
           </AnimatedButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
