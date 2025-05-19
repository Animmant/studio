
'use client';

import Image from 'next/image';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { useAppState } from '@/context/AppStateContext';

const HeroSection = () => {
  const { setScrollToFormItem } = useAppState();

  const handleBuyNowClick = () => {
    setScrollToFormItem({
      id: 'ps5-standard', name: 'PlayStation 5 Console',
      description: 'Experience lightning-fast loading with an ultra-high speed SSD.',
      price: 499.99,
      imageUrl: 'https://placehold.co/800x600/121E33/C77DFF',
      dataAiHint: 'playstation console'
    });
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-background to-secondary overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1920x1080/000000/333333" 
          alt="Abstract technology background"
          layout="fill"
          objectFit="cover"
          className="opacity-10" 
          data-ai-hint="tech pattern"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="block text-primary-foreground">Play Has</span>
              <span className="block text-primary">No Limits</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-lg mx-auto md:mx-0">
              Experience lightning-fast loading, deeper immersion with haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation® games.
            </p>
            <AnimatedButton
              onClick={handleBuyNowClick}
              variant="accent"
              size="lg"
              className="px-10 py-4 text-lg"
            >
              Order Yours Now
            </AnimatedButton>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute w-full h-full bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <Image
              src="https://placehold.co/600x450/C77DFF/121E33" 
              alt="PS5 DualSense Controller"
              width={600}
              height={450}
              priority
              className="rounded-lg shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
              data-ai-hint="ps5 controller" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
