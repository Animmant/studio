
'use client';

import Image from 'next/image';
import type { Console } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppState } from '@/context/AppStateContext';
import { CheckCircle } from 'lucide-react';

const consolesData: Console[] = [
  {
    id: 'ps5-standard',
    name: 'PlayStation®5 Console',
    type: 'Standard',
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.',
    price: 499.99,
    imageUrl: '/images/ps5_console_with_controller.png', // Updated image path
    storage: '825GB Custom SSD',
    dataAiHint: 'playstation console controller', // Updated AI hint
  },
  {
    id: 'ps5-digital',
    name: 'PlayStation®5 Digital Edition',
    type: 'Digital Edition',
    description: 'An all-digital version of the PS5 console with no disc drive. Sign into your PlayStation Network account and go to PlayStation®Store to buy and download games.',
    price: 399.99,
    imageUrl: 'https://placehold.co/500x400/C77DFF/121E33',
    storage: '825GB Custom SSD',
    dataAiHint: 'digital console',
  },
];

const ConsoleShowcaseSection = () => {
  const { addToCart } = useAppState();

  const features = [
    "Ultra-High Speed SSD",
    "Haptic Feedback & Adaptive Triggers",
    "Ray Tracing",
    "4K-TV Gaming & Up to 120fps with 120Hz output",
    "Tempest 3D AudioTech"
  ];

  return (
    <section id="consoles" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Choose Your PlayStation®5" subtitle="Two distinct PS5 models. Same incredible power." />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {consolesData.map((consoleItem) => (
            <Card key={consoleItem.id} className="flex flex-col overflow-hidden shadow-2xl hover:shadow-accent/20 transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={consoleItem.imageUrl}
                    alt={consoleItem.name}
                    layout="fill"
                    objectFit={consoleItem.id === 'ps5-standard' && consoleItem.imageUrl === '/images/ps5_console_with_controller.png' ? "contain" : "cover"}
                    className="transition-transform duration-500 hover:scale-105"
                    data-ai-hint={consoleItem.dataAiHint}
                  />
                </div>
                 <div className="p-6">
                  <CardTitle className="text-3xl mb-2">{consoleItem.name}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground h-20">{consoleItem.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <h4 className="font-semibold mb-3 text-lg text-primary-foreground">Key Features:</h4>
                <ul className="space-y-2">
                  {features.map(feature => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-accent mr-2 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                   {consoleItem.type === 'Digital Edition' && (
                     <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-accent mr-2 shrink-0" />
                        <span className="text-muted-foreground">No Disc Drive (All-Digital)</span>
                     </li>
                   )}
                </ul>
              </CardContent>
              <CardFooter className="p-6 flex flex-col sm:flex-row justify-between items-center bg-background/50">
                <p className="text-3xl font-bold text-primary mb-4 sm:mb-0">${consoleItem.price.toFixed(2)}</p>
                <AnimatedButton variant="default" size="lg" onClick={() => addToCart(consoleItem)}>
                  Add to Cart
                </AnimatedButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsoleShowcaseSection;
