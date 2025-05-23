
"use client";

import React, { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, Lightbulb, ChevronRight, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export interface StepContent {
  id: string;
  title: string;
  instructions: React.ReactNode[];
  Icon?: LucideIcon;
  commands?: string[];
  alerts?: { type: 'warning' | 'info' | 'note'; title?: string; message: string | React.ReactNode }[];
}

interface WalkthroughStepProps {
  step: StepContent;
  isCompleted: boolean;
  onToggleComplete: (id: string, completed: boolean) => void;
  stepNumber: number;
  totalSteps: number;
}

export function WalkthroughStep({ step, isCompleted, onToggleComplete, stepNumber }: WalkthroughStepProps) {
  const { Icon } = step;
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Effect for resetting copied state when step changes, if needed
    setCopied(false);
  }, [step]);

  const handleCopyCommand = () => {
    if (!step.commands || step.commands.length === 0) return;
    const commandText = step.commands.join('\n');
    navigator.clipboard.writeText(commandText).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Command copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy command to clipboard.",
      });
    });
  };

  const renderInstructionPart = (part: React.ReactNode, partKey: string | number): React.ReactNode => {
    if (typeof part !== 'string') {
      return part;
    }
    
    const keywordMap: Record<string, {url: string; displayText: string}> = {
      'github': { url: 'https://github.com', displayText: 'GitHub' },
      'github.com': { url: 'https://github.com', displayText: 'GitHub.com' },
      'vercel': { url: 'https://vercel.com', displayText: 'Vercel' },
      'vercel.com': { url: 'https://vercel.com', displayText: 'Vercel.com' },
    };

    const escapedKeywords = Object.keys(keywordMap).map(k => k.replace('.', '\\.'));
    const keywordRegex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
    
    const segments = part.split(/(`[^`]+`)/g); 

    return segments.map((segment, segmentIndex) => {
      if (segmentIndex % 2 === 1) { 
        return (
          <code
            key={`code-${step.id}-${partKey}-${segmentIndex}`}
            className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70"
          >
            {segment.slice(1, -1)}
          </code>
        );
      }

      const textNodes: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      
      const localKeywordRegex = new RegExp(keywordRegex); 
      while ((match = localKeywordRegex.exec(segment)) !== null) {
        const matchedKeyword = match[0].toLowerCase();
        const keywordConfig = keywordMap[matchedKeyword];

        if (match.index > lastIndex) {
          textNodes.push(segment.substring(lastIndex, match.index));
        }

        if (keywordConfig) {
          textNodes.push(
            <a
              key={`link-${step.id}-${partKey}-${segmentIndex}-${match.index}`}
              href={keywordConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              {keywordConfig.displayText}
            </a>
          );
        } else {
           textNodes.push(match[0]); 
        }
        lastIndex = localKeywordRegex.lastIndex;
      }
      
      if (lastIndex < segment.length) {
        textNodes.push(segment.substring(lastIndex));
      }
      
      return textNodes.map((node, nodeIndex) => (
        <React.Fragment key={`textnode-${step.id}-${partKey}-${segmentIndex}-${nodeIndex}`}>
          {node}
        </React.Fragment>
      ));
    });
  };

  return (
    <Card 
      className={cn(
        "shadow-2xl border-primary/30 ring-1 ring-primary/20",
        "bg-card/80 backdrop-blur-md", 
        "h-full flex flex-col" 
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-2">
          {Icon && <Icon className="h-10 w-10 text-primary flex-shrink-0" />}
          {!Icon && 
            <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-primary text-xl font-semibold text-primary bg-primary/10 flex-shrink-0">
              {stepNumber}
            </div>
          }
          <CardTitle className="text-3xl font-bold text-primary">{step.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto space-y-4">
        {step.instructions.map((instrNode, index) => (
          <div key={index} className="flex items-start">
            <ChevronRight className="h-5 w-5 mr-2 mt-[3px] flex-shrink-0 text-primary" />
            <p className="leading-relaxed text-foreground/90">
              {renderInstructionPart(instrNode, index)}
            </p>
          </div>
        ))}

        {step.alerts && step.alerts.length > 0 && (
          <div className="space-y-3 mt-4">
            {step.alerts.map((alert, index) => {
              let alertIcon, alertVariant: "default" | "destructive", defaultTitle;
              switch (alert.type) {
                case 'warning':
                  alertIcon = <AlertTriangle className="h-5 w-5" />;
                  alertVariant = 'destructive';
                  defaultTitle = 'Warning!';
                  break;
                case 'info':
                  alertIcon = <Info className="h-5 w-5" />; 
                  alertVariant = 'default';
                  defaultTitle = 'Important Info';
                  break;
                case 'note':
                  alertIcon = <Lightbulb className="h-5 w-5" />; 
                  alertVariant = 'default';
                  defaultTitle = 'Quick Tip';
                  break;
                default:
                  alertIcon = <Info className="h-5 w-5" />;
                  alertVariant = 'default';
                  defaultTitle = 'Note';
              }
              return (
                <Alert key={index} variant={alertVariant} className={cn(alert.type === 'info' || alert.type === 'note' ? "border-primary/30 bg-primary/10" : "")}>
                  {React.cloneElement(alertIcon, { className: cn(alertIcon.props.className, alert.type === 'warning' ? "" : "text-primary") })}
                  <AlertTitle className={cn(alert.type === 'warning' ? "" : "text-primary/90")}>{alert.title || defaultTitle}</AlertTitle>
                  <AlertDescription className={cn(alert.type === 'warning' ? "" : "text-foreground font-medium")}>
                     {typeof alert.message === 'string' ? renderInstructionPart(alert.message, `alert-${index}`) : alert.message}
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        )}

        {step.commands && step.commands.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium text-foreground">Example Command(s):</h5>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCommand}
                className="text-muted-foreground hover:text-primary"
                aria-label="Copy command to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <pre className="bg-black text-green-400 p-4 rounded-md overflow-x-auto shadow-inner">
              <code className="text-sm font-mono whitespace-pre-wrap">
                {step.commands.join('\n')}
              </code>
            </pre>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-6">
        <div className="flex items-center space-x-2 ml-auto">
          <Checkbox
            id={`step-checkbox-${step.id}`}
            checked={isCompleted}
            onCheckedChange={(checked) => onToggleComplete(step.id, !!checked)}
            aria-label={`Mark step ${step.title} as complete`}
            className={cn(isCompleted ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" : "")}
          />
          <Label 
            htmlFor={`step-checkbox-${step.id}`} 
            className={cn("text-sm", isCompleted ? "text-primary" : "text-muted-foreground")}
          >
            {isCompleted ? "Completed!" : "Mark as complete"}
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
