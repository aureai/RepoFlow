"use client";

import React, { useState } from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { handleTroubleshoot } from '@/app/actions/handleTroubleshoot';
import type { TroubleshootOutput } from '@/ai/flows/troubleshooter';
import { Separator } from '../ui/separator';

export function AITroubleshooter() {
  const [errorMessage, setErrorMessage] = useState('');
  const [relevantContext, setRelevantContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<TroubleshootOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResponse(null);
    setError(null);

    const result = await handleTroubleshoot({ errorMessage, relevantContext });

    if (result.success && result.data) {
      setAiResponse(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" />
          AI Troubleshooter
        </CardTitle>
        <CardDescription>
          Encounter an issue? Describe the error message and context, and let AI suggest solutions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="errorMessage">Error Message</Label>
            <Textarea
              id="errorMessage"
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              placeholder="Paste the error message you received..."
              rows={3}
              required
              className="min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relevantContext">Relevant Context (Optional)</Label>
            <Textarea
              id="relevantContext"
              value={relevantContext}
              onChange={(e) => setRelevantContext(e.target.value)}
              placeholder="Provide any relevant context, like the command you ran, your OS, etc."
              rows={3}
              className="min-h-[80px]"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Diagnosing...
              </>
            ) : (
              'Get AI Assistance'
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      
      {aiResponse && (
        <>
          <Separator className="my-6" />
          <CardFooter className="flex flex-col items-start gap-4 pt-0">
            <h3 className="text-xl font-semibold text-foreground w-full">AI Diagnosis:</h3>
            <Card className="w-full bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{aiResponse.summary}</p>
              </CardContent>
            </Card>
            <Card className="w-full bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{aiResponse.suggestedSolution}</p>
              </CardContent>
            </Card>
            <Card className="w-full bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg">Potential Causes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{aiResponse.potentialCauses}</p>
              </CardContent>
            </Card>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
