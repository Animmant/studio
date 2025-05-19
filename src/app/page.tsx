import HeroSection from '@/components/sections/HeroSection';
import ConsoleShowcaseSection from '@/components/sections/ConsoleShowcaseSection';
import GamesShowcaseSection from '@/components/sections/GamesShowcaseSection';
import AccessoriesShowcaseSection from '@/components/sections/AccessoriesShowcaseSection';
import GameRecommendationSection from '@/components/sections/GameRecommendationSection';
import FaqSection from '@/components/sections/FaqSection';
import OrderFormSection from '@/components/sections/OrderFormSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ConsoleShowcaseSection />
      <GamesShowcaseSection />
      <AccessoriesShowcaseSection />
      <GameRecommendationSection />
      <FaqSection />
      <OrderFormSection />
    </>
  );
}
