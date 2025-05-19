'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gameRecommendation, type GameRecommendationInput, type GameRecommendationOutput } from '@/ai/flows/game-recommendation';
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const recommendationSchema = z.object({
  preferences: z.string().min(3, { message: 'Please list some preferences (e.g., action, RPG).' }),
  gamingHistory: z.string().min(3, { message: 'Please list some games you enjoyed.' }),
});

type RecommendationFormData = z.infer<typeof recommendationSchema>;

const GameRecommendationSection = () => {
  const [recommendationResult, setRecommendationResult] = useState<GameRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RecommendationFormData>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      preferences: '',
      gamingHistory: '',
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setRecommendationResult(null);
    try {
      const result = await gameRecommendation(data as GameRecommendationInput);
      setRecommendationResult(result);
    } catch (e) {
      console.error('Error fetching game recommendations:', e);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="recommend" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Personalized Game Recommendations"
          subtitle="Tell us what you like, and our AI will suggest your next favorite game!"
        />
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Wand2 className="mr-2 h-6 w-6 text-accent" />
                Find Your Next Adventure
              </CardTitle>
              <CardDescription>
                Enter your favorite genres, themes, or similar games, and games you've loved playing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="preferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Your Preferences</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., open-world, sci-fi, stealth, story-rich" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gamingHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Games You've Enjoyed</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., The Witcher 3, Cyberpunk 2077, Uncharted 4"
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AnimatedButton type="submit" variant="accent" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-5 w-5" />
                    )}
                    Get Recommendations
                  </AnimatedButton>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-8 md:mt-0">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full p-8 bg-card rounded-lg shadow-lg">
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                <p className="text-xl text-primary-foreground">Finding perfect games for you...</p>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {recommendationResult && (
              <Card className="bg-secondary shadow-xl animate-fadeIn">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Here Are Your Recommendations!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-accent">Recommended Games:</h4>
                    {recommendationResult.recommendations.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-primary-foreground">
                        {recommendationResult.recommendations.map((game, index) => (
                          <li key={index}>{game}</li>
                        ))}
                      </ul>
                    ) : (
                       <p className="text-muted-foreground">No specific game titles matched, but here's why...</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-accent">Reasoning:</h4>
                    <p className="text-muted-foreground whitespace-pre-line">{recommendationResult.reason}</p>
                  </div>
                </CardContent>
              </Card>
            )}
             {!isLoading && !error && !recommendationResult && (
                <div className="flex flex-col items-center justify-center h-full p-8 bg-card rounded-lg shadow-lg text-center">
                    <Wand2 className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-xl text-muted-foreground">Your game recommendations will appear here.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameRecommendationSection;
