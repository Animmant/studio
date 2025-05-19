
'use client';

import Image from 'next/image';
import type { Game } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppState } from '@/context/AppStateContext';
import { Star } from 'lucide-react';

// Placeholder data for PlayStation API integration
const gamesData: Game[] = [
  {
    id: 'spider-man-2',
    name: "Marvel's Spider-Man 2",
    description: "Swing through Marvel's New York with Peter Parker and Miles Morales.",
    price: 69.99,
    imageUrl: 'https://placehold.co/300x400/1A2A40/FAFAFA', // Updated image
    genre: 'Action-Adventure',
    platform: 'PS5',
    releaseDate: '2023-10-20',
    dataAiHint: 'spiderman game'
  },
  {
    id: 'horizon-forbidden-west',
    name: 'Horizon Forbidden West',
    description: 'Explore distant lands, fight bigger and more awe-inspiring machines.',
    price: 59.99,
    imageUrl: 'https://placehold.co/300x400/C77DFF/121E33',
    genre: 'Action RPG',
    platform: 'PS5',
    releaseDate: '2022-02-18',
    dataAiHint: 'horizon game'
  },
  {
    id: 'god-of-war-ragnarok',
    name: 'God of War Ragnarök',
    description: 'Embark on a mythic journey for answers and allies before Ragnarök arrives.',
    price: 69.99,
    imageUrl: 'https://placehold.co/300x400/121E33/FFFFFF',
    genre: 'Action-Adventure',
    platform: 'PS5',
    releaseDate: '2022-11-09',
    dataAiHint: 'ragnarok game'
  },
  {
    id: 'returnal',
    name: 'Returnal',
    description: 'Break the cycle of chaos on an ever-changing alien planet.',
    price: 49.99,
    imageUrl: 'https://placehold.co/300x400/FFFFFF/121E33',
    genre: 'Roguelike Shooter',
    platform: 'PS5',
    releaseDate: '2021-04-30',
    dataAiHint: 'sci-fi game'
  },
];

const GamesShowcaseSection = () => {
  const { addToCart } = useAppState();

  return (
    <section id="games" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Featured PS5 Games" subtitle="Discover the latest and greatest titles for your PlayStation 5." />
        {/*
          PlayStation API Integration Point:
          The 'gamesData' array is currently mock data. In a real application,
          this data would be fetched dynamically from the PlayStation API.
          Example:
          useEffect(() => {
            fetchPlayStationGames().then(data => setGames(data));
          }, []);
        */}
        <div className="flex overflow-x-auto space-x-6 pb-8 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
          {gamesData.map((game) => (
            <Card key={game.id} className="min-w-[300px] max-w-[300px] flex flex-col overflow-hidden shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  width={300}
                  height={400}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  data-ai-hint={game.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl mb-1 truncate">{game.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground h-12 overflow-hidden">
                  {game.description}
                </CardDescription>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">(100+ Reviews)</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center border-t mt-auto">
                <p className="text-xl font-semibold text-primary">${game.price.toFixed(2)}</p>
                <AnimatedButton variant="default" size="sm" onClick={() => addToCart(game)}>
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

export default GamesShowcaseSection;
