import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PS5 Showcase. All rights reserved. Not affiliated with Sony Interactive Entertainment.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Github" className="text-muted-foreground hover:text-primary-foreground transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground/70 mt-6">
          PS5 and PlayStation are trademarks of Sony Interactive Entertainment Inc. This is a concept website.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
