
"use client";

import React, { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, Lightbulb, Copy, Check as CheckIcon } from 'lucide-react'; // Renamed Check to CheckIcon
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export interface StepAlert {
  type: 'warning' | 'info' | 'note';
  title?: string; // Title is now pre-selected for language
  Icon?: LucideIcon;
  message: React.ReactNode; // Message is now pre-selected for language
}

export interface StepContent {
  id: string;
  title: string; // Title is now pre-selected for language
  instructions: React.ReactNode[]; // Instructions are now pre-selected for language
  Icon?: LucideIcon;
  commands?: string[];
  alerts?: StepAlert[];
}

interface WalkthroughStepProps {
  step: StepContent;
  currentLanguage: 'en' | 'es';
  isCompleted: boolean;
  onToggleComplete: (id: string, completed: boolean) => void;
  stepNumber: number;
  totalSteps: number;
}

const uiTextGenerators: Record<'en' | 'es', {
  markComplete: () => string;
  completed: () => string;
  exampleCommands: () => string;
  copy: () => string;
  copied: () => string;
  copySuccessTitle: () => string;
  copySuccessDesc: () => string;
  copyFailTitle: () => string;
  copyFailDesc: () => string;
}> = {
  en: {
    markComplete: () => "Mark as complete",
    completed: () => "Completed!",
    exampleCommands: () => "Example Command(s):",
    copy: () => "Copy",
    copied: () => "Copied!",
    copySuccessTitle: () => "Copied!",
    copySuccessDesc: () => "Command copied to clipboard.",
    copyFailTitle: () => "Copy Failed",
    copyFailDesc: () => "Could not copy command to clipboard.",
  },
  es: {
    markComplete: () => "Marcar como completo",
    completed: () => "¡Completado!",
    exampleCommands: () => "Comando(s) de Ejemplo:",
    copy: () => "Copiar",
    copied: () => "¡Copiado!",
    copySuccessTitle: () => "¡Copiado!",
    copySuccessDesc: () => "Comando copiado al portapapeles.",
    copyFailTitle: () => "Error al Copiar",
    copyFailDesc: () => "No se pudo copiar el comando.",
  }
};


export function WalkthroughStep({ step, currentLanguage, isCompleted, onToggleComplete, stepNumber }: WalkthroughStepProps) {
  const { Icon: StepIconComponent } = step;
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const cardRef = React.useRef<HTMLDivElement>(null);

  const currentUiText = uiTextGenerators[currentLanguage];

  useEffect(() => {
    setCopied(false);
  }, [step]);

  const handleCopyCommand = () => {
    if (!step.commands || step.commands.length === 0) return;
    const commandText = step.commands.join('\n');
    navigator.clipboard.writeText(commandText).then(() => {
      setCopied(true);
      toast({
        title: currentUiText.copySuccessTitle(),
        description: currentUiText.copySuccessDesc(),
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        variant: "destructive",
        title: currentUiText.copyFailTitle(),
        description: currentUiText.copyFailDesc(),
      });
    });
  };

  const renderInstructionPart = (part: React.ReactNode, partKey: string | number): React.ReactNode => {
    if (typeof part !== 'string') {
      return part; // It's already a ReactNode (e.g., a Fragment with a <strong> tag)
    }
    
    const keywordMap: Record<string, {url: string; displayText: string}> = {
      'github': { url: 'https://github.com', displayText: 'GitHub' },
      'github.com': { url: 'https://github.com', displayText: 'GitHub' },
      'vercel': { url: 'https://vercel.com', displayText: 'Vercel' },
      'vercel.com': { url: 'https://vercel.com', displayText: 'Vercel' },
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
        const keywordConfig = keywordMap[matchedKeyword] || keywordMap[match[0]]; 

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
      ref={cardRef}
      className={cn(
        "shadow-2xl border-primary/30 ring-1 ring-primary/20",
        "bg-card/80 backdrop-blur-md", 
        "h-full flex flex-col",
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-2">
          {StepIconComponent && <StepIconComponent className="h-10 w-10 text-primary flex-shrink-0" />}
          {!StepIconComponent && 
            <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-primary text-xl font-semibold text-primary bg-primary/10 flex-shrink-0">
              {stepNumber}
            </div>
          }
          <CardTitle className="text-3xl font-bold text-primary">{step.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto space-y-4">
        {step.instructions.map((instrNode, index) => (
            <div key={index} className="leading-relaxed text-foreground/90">
              {typeof instrNode === 'string' ? renderInstructionPart(instrNode, index) : instrNode}
            </div>
        ))}

        {step.alerts && step.alerts.length > 0 && (
          <div className="space-y-3 mt-4">
            {step.alerts.map((alert, index) => {
              let alertIconElement, alertVariant: "default" | "destructive", defaultTitle;
              const AlertIconComponent = alert.Icon;

              switch (alert.type) {
                case 'warning':
                  alertIconElement = AlertIconComponent ? <AlertIconComponent className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />;
                  alertVariant = 'destructive';
                  defaultTitle = currentLanguage === 'es' ? '¡Advertencia!' : 'Warning!';
                  break;
                case 'info':
                  alertIconElement = AlertIconComponent ? <AlertIconComponent className="h-5 w-5" /> : <Info className="h-5 w-5" />; 
                  alertVariant = 'default';
                  defaultTitle = currentLanguage === 'es' ? 'Información Importante' : 'Important Info';
                  break;
                case 'note':
                  alertIconElement = AlertIconComponent ? <AlertIconComponent className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />; 
                  alertVariant = 'default';
                  defaultTitle = currentLanguage === 'es' ? 'Consejo Rápido' : 'Quick Tip';
                  break;
                default:
                  alertIconElement = <Info className="h-5 w-5" />;
                  alertVariant = 'default';
                  defaultTitle = currentLanguage === 'es' ? 'Nota' : 'Note';
              }
              return (
                <Alert key={index} variant={alertVariant} className={cn(alert.type === 'info' || alert.type === 'note' ? "border-primary/30 bg-primary/10" : "")}>
                  {React.cloneElement(alertIconElement, { className: cn(alertIconElement.props.className, alert.type === 'warning' ? "" : "text-primary") })}
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
              <h5 className="font-medium text-foreground">{currentUiText.exampleCommands()}</h5>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCommand}
                className="text-muted-foreground hover:text-primary"
                aria-label="Copy command to clipboard"
              >
                {copied ? (
                  <>
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    {currentUiText.copied()}
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    {currentUiText.copy()}
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
            {isCompleted ? currentUiText.completed() : currentUiText.markComplete()}
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}
