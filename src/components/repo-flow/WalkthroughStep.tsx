
"use client";

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepContent {
  id: string;
  title: string;
  instructions: string[];
  commands?: string[];
  Icon?: LucideIcon;
  alerts?: { type: 'warning' | 'info' | 'note'; title?: string; message: string }[];
}

interface WalkthroughStepProps {
  step: StepContent;
  isCompleted: boolean;
  isOpen: boolean;
  onToggleComplete: (id: string, completed: boolean) => void;
  stepNumber: number;
}

export function WalkthroughStep({ step, isCompleted, isOpen, onToggleComplete, stepNumber }: WalkthroughStepProps) {
  const { Icon } = step;

  const renderInstruction = (instruction: string) => {
    // Split by backticks, capturing the content within them
    const parts = instruction.split(/(`[^`]+`)/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) { // Content within backticks
        return (
          <code
            key={index}
            className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70"
          >
            {part.slice(1, -1)} {/* Remove backticks */}
          </code>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <AccordionItem value={`step-${step.id}`} className="border-b-0 mb-4 last:mb-0">
      <Card className={cn(
        "transition-all duration-300 ease-in-out", // Base transition
        isOpen
          ? "border-primary ring-2 ring-primary/30 shadow-2xl scale-[1.01]" // Open: specific border, ring, prominent shadow, scale
          : "shadow-md hover:shadow-lg", // Not open: default shadow behavior
        isOpen
          ? (isCompleted ? "bg-primary/10" : "bg-primary/5") // Open: background based on completion
          : (isCompleted ? "bg-secondary/50 border-primary/50" : "bg-card") // Not open: existing logic for background and completed border
      )}>
        <AccordionTrigger className="p-6 hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              {Icon && <Icon className={cn("h-8 w-8 transition-colors", (isOpen || isCompleted) ? "text-primary" : "text-muted-foreground")} />}
              {!Icon && 
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full border-2 text-lg font-semibold transition-colors", 
                  (isOpen || isCompleted) ? "border-primary text-primary bg-primary/10" : "border-muted-foreground text-muted-foreground"
                )}>
                  {stepNumber}
                </div>
              }
              <h4 className={cn("text-xl font-semibold text-left transition-colors", (isOpen || isCompleted) ? "text-primary" : "text-foreground")}>{step.title}</h4>
            </div>
            <div className="flex items-center space-x-2 ml-auto pl-4 flex-shrink-0">
              <Checkbox
                id={`step-checkbox-${step.id}`}
                checked={isCompleted}
                onCheckedChange={(checked) => onToggleComplete(step.id, !!checked)}
                onClick={(e) => e.stopPropagation()} 
                aria-label={`Mark step ${step.title} as complete`}
                className={cn(isCompleted ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" : "")}
              />
              <Label 
                htmlFor={`step-checkbox-${step.id}`} 
                className={cn("text-sm transition-colors", (isOpen || isCompleted) ? "text-primary" : "text-muted-foreground")}
              >
                {isCompleted ? "Completed" : "Mark complete"}
              </Label>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            {step.instructions.map((instr, index) => (
              <p key={index} className={cn("leading-relaxed", isOpen ? "text-foreground/90" : "text-muted-foreground")}>
                {renderInstruction(instr)}
              </p>
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
                      <AlertDescription className={cn(alert.type === 'warning' ? "" : "text-foreground/80")}>
                        {renderInstruction(alert.message)}
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </div>
            )}

            {step.commands && step.commands.length > 0 && (
              <div className="mt-6">
                <h5 className="font-medium text-foreground mb-2">Example Command(s):</h5>
                <pre className="bg-black text-green-400 p-4 rounded-md overflow-x-auto shadow-inner">
                  <code className="text-sm font-mono whitespace-pre-wrap">
                    {step.commands.join('\n')}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
}
