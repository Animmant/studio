
'use client';

import Image from 'next/image';
import type { Accessory } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppState } from '@/context/AppStateContext';

const accessoriesData: Accessory[] = [
  {
    id: 'dualsense-controller',
    name: 'DualSense™ Wireless Controller',
    description: 'Immersive haptic feedback, dynamic adaptive triggers and a built-in microphone, all integrated into an iconic comfortable design.',
    price: 69.99,
    imageUrl: 'https://placehold.co/400x300/121E33/FFFFFF',
    category: 'Controller',
    dataAiHint: 'game controller'
  },
  {
    id: 'pulse-3d-headset',
    name: 'PULSE 3D™ Wireless Headset',
    description: 'Enjoy a seamless, wireless experience with a headset fine-tuned for 3D Audio on PS5 consoles.',
    price: 99.99,
    imageUrl: 'https://placehold.co/400x300/FFFFFF/121E33',
    category: 'Audio',
    dataAiHint: 'audio headset'
  },
  {
    id: 'media-remote',
    name: 'Media Remote',
    description: 'Conveniently navigate entertainment on your PlayStation®5 console with an intuitive layout.',
    price: 29.99,
    imageUrl: 'https://placehold.co/400x300/2979FF/FFFFFF',
    category: 'Remote',
    dataAiHint: 'media remote'
  },
  {
    id: 'hd-camera',
    name: 'HD Camera',
    description: 'Add yourself to your gameplay videos and broadcasts with smooth, sharp, full-HD capture.',
    price: 59.99,
    imageUrl: 'https://placehold.co/400x300/C77DFF/121E33',
    category: 'Camera',
    dataAiHint: 'streaming camera'
  },
];

const AccessoriesShowcaseSection = () => {
  const { addToCart } = useAppState();

  return (
    <section id="accessories" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Essential PS5 Accessories" subtitle="Elevate your PlayStation 5 experience with these must-have accessories." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessoriesData.map((accessory) => (
            <Card key={accessory.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={accessory.imageUrl}
                  alt={accessory.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48 transition-transform duration-500 hover:scale-105"
                  data-ai-hint={accessory.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg mb-1">{accessory.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground h-20 overflow-hidden">
                  {accessory.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center border-t mt-auto">
                <p className="text-lg font-semibold text-primary">${accessory.price.toFixed(2)}</p>
                <AnimatedButton variant="default" size="sm" onClick={() => addToCart(accessory)}>
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

export default AccessoriesShowcaseSection;
