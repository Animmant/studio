'use server';

/**
 * @fileOverview An AI-powered FAQ suggestion agent.
 *
 * - suggestQuestions - A function that handles the FAQ suggestion process.
 * - SuggestQuestionsInput - The input type for the suggestQuestions function.
 * - SuggestQuestionsOutput - The return type for the suggestQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestQuestionsInputSchema = z.object({
  popularQuestions: z
    .array(z.string())
    .describe('A list of popular or frequently asked questions.'),
  currentUserQuestion: z
    .string()
    .describe('The question the current user is asking (optional).')
    .optional(),
});
export type SuggestQuestionsInput = z.infer<typeof SuggestQuestionsInputSchema>;

const SuggestQuestionsOutputSchema = z.object({
  suggestedQuestions: z
    .array(z.string())
    .describe('A list of suggested questions that might be relevant to the user.'),
  reasoning: z
    .string()
    .describe('The reasoning behind why these questions were suggested.'),
});
export type SuggestQuestionsOutput = z.infer<typeof SuggestQuestionsOutputSchema>;

export async function suggestQuestions(input: SuggestQuestionsInput): Promise<SuggestQuestionsOutput> {
  return suggestQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestQuestionsPrompt',
  input: {schema: SuggestQuestionsInputSchema},
  output: {schema: SuggestQuestionsOutputSchema},
  prompt: `You are an AI assistant helping users find answers to their questions in an FAQ section.

  Given a list of popular questions and the current question from the user, you will suggest other questions that might be relevant to the user.

  Popular Questions:
  {{#each popularQuestions}}
  - {{{this}}}
  {{/each}}

  {{#if currentUserQuestion}}
  Current User Question: {{{currentUserQuestion}}}
  {{/if}}

  Based on the above information, suggest other questions that the user might find helpful. Explain the reasoning for suggesting these questions in the reasoning field.

  Format your response as a JSON object that conforms to the following schema:
  ${JSON.stringify(SuggestQuestionsOutputSchema.describe)}
  `,
});

const suggestQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestQuestionsFlow',
    inputSchema: SuggestQuestionsInputSchema,
    outputSchema: SuggestQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
