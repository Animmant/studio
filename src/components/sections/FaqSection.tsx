import type { FAQItem } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const faqData: FAQItem[] = [
  {
    question: 'What is the difference between PS5 Standard and Digital Edition?',
    answer: 'The main difference is the disc drive. The PS5 Standard Edition includes an Ultra HD Blu-ray disc drive, while the PS5 Digital Edition does not. Gameplay performance is identical between the two consoles.',
  },
  {
    question: 'Can I play PS4 games on the PS5?',
    answer: 'Yes, the PS5 is backward compatible with the vast majority of PS4 games. Some PS4 games will even benefit from the PS5\'s Game Boost, offering higher or smoother frame rates.',
  },
  {
    question: 'What is 3D Audio and how do I experience it?',
    answer: 'Tempest 3D AudioTech on the PS5 delivers immersive soundscapes, making it feel like sound is coming from every direction. You can experience 3D Audio with compatible headphones, and support for TV speakers is also available.',
  },
  {
    question: 'What are adaptive triggers and haptic feedback?',
    answer: 'Adaptive triggers on the DualSense controller provide varying levels of force and tension, mimicking in-game actions like drawing a bowstring. Haptic feedback provides rich, responsive physical sensations to your actions in compatible games.',
  },
  {
    question: 'How much storage does the PS5 have and can I expand it?',
    answer: 'The PS5 comes with an 825GB custom SSD. After system software and other essential files, usable space is around 667GB. You can expand storage by installing a compatible NVMe SSD in the M.2 slot or by using an external USB drive for PS4 games.',
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Frequently Asked Questions" subtitle="Find answers to common questions about the PlayStation 5." />
        
        <Alert className="mb-8 bg-primary/10 border-primary/30 text-primary-foreground">
          <AlertCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-semibold">AI-Powered FAQ Insights!</AlertTitle>
          <AlertDescription>
            This FAQ section is currently static. In a future version, AI will analyze common user queries to suggest and prioritize the most relevant questions for you.
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
              <AccordionTrigger className="text-lg text-left hover:no-underline text-primary-foreground hover:text-accent">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
