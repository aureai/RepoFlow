// src/ai/flows/troubleshooter.ts
'use server';
/**
 * @fileOverview An AI troubleshooter that analyzes error messages and suggests solutions.
 *
 * - troubleshoot - A function that handles the troubleshooting process.
 * - TroubleshootInput - The input type for the troubleshoot function.
 * - TroubleshootOutput - The return type for the troubleshoot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TroubleshootInputSchema = z.object({
  errorMessage: z.string().describe('The error message to analyze.'),
  relevantContext: z.string().optional().describe('Any relevant context related to the error.'),
});
export type TroubleshootInput = z.infer<typeof TroubleshootInputSchema>;

const TroubleshootOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the error.'),
  suggestedSolution: z.string().describe('A detailed suggestion for resolving the error.'),
  potentialCauses: z.string().describe('Potential causes of the error.'),
});
export type TroubleshootOutput = z.infer<typeof TroubleshootOutputSchema>;

export async function troubleshoot(input: TroubleshootInput): Promise<TroubleshootOutput> {
  return troubleshootFlow(input);
}

const prompt = ai.definePrompt({
  name: 'troubleshootPrompt',
  input: {schema: TroubleshootInputSchema},
  output: {schema: TroubleshootOutputSchema},
  prompt: `You are an AI troubleshooter that analyzes error messages and suggests solutions.

You will be provided with an error message and any relevant context. Your goal is to provide a brief summary of the error, a detailed suggestion for resolving the error, and potential causes of the error.

Error Message: {{{errorMessage}}}
Relevant Context: {{{relevantContext}}}

Respond in a structured format with the following fields:

Summary: A brief summary of the error.
SuggestedSolution: A detailed suggestion for resolving the error.
PotentialCauses: Potential causes of the error.
`,
});

const troubleshootFlow = ai.defineFlow(
  {
    name: 'troubleshootFlow',
    inputSchema: TroubleshootInputSchema,
    outputSchema: TroubleshootOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
