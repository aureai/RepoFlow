"use client";

import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface StepContent {
  id: string;
  title: string;
  instructions: string[];
  diagramUrl?: string;
  diagramAlt?: string;
  diagramHint?: string;
  commands?: string[];
  Icon?: LucideIcon;
}

interface WalkthroughStepProps {
  step: StepContent;
  isCompleted: boolean;
  onToggleComplete: (id: string, completed: boolean) => void;
  stepNumber: number;
}

export function WalkthroughStep({ step, isCompleted, onToggleComplete, stepNumber }: WalkthroughStepProps) {
  const { Icon } = step;
  return (
    <AccordionItem value={`step-${step.id}`} className="border-b-0 mb-4 last:mb-0">
      <Card className={cn(
        "transition-all duration-300 ease-in-out",
        isCompleted ? "bg-secondary/50 border-primary/50" : "bg-card",
        "shadow-md hover:shadow-lg"
      )}>
        <AccordionTrigger className="p-6 hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              {Icon && <Icon className={cn("h-8 w-8", isCompleted ? "text-primary" : "text-muted-foreground")} />}
              {!Icon && <div className={cn("flex items-center justify-center h-8 w-8 rounded-full border-2 text-lg font-semibold", isCompleted ? "border-primary text-primary bg-primary/10" : "border-muted-foreground text-muted-foreground")}>{stepNumber}</div>}
              <h4 className={cn("text-xl font-semibold", isCompleted ? "text-primary" : "text-foreground")}>{step.title}</h4>
            </div>
            <div className="flex items-center space-x-2 ml-auto pl-4">
              <Checkbox
                id={`step-checkbox-${step.id}`}
                checked={isCompleted}
                onCheckedChange={(checked) => onToggleComplete(step.id, !!checked)}
                onClick={(e) => e.stopPropagation()} // Prevent accordion toggle when clicking checkbox
                aria-label={`Mark step ${step.title} as complete`}
                className={cn(isCompleted ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" : "")}
              />
              <Label htmlFor={`step-checkbox-${step.id}`} className={cn("text-sm", isCompleted ? "text-primary" : "text-muted-foreground")}>
                {isCompleted ? "Completed" : "Mark as complete"}
              </Label>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-4">
            {step.instructions.map((instr, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">{instr}</p>
            ))}

            {step.diagramUrl && (
              <div className="my-4 p-4 border rounded-lg bg-secondary/30 flex justify-center items-center">
                <Image
                  src={step.diagramUrl}
                  alt={step.diagramAlt || `Diagram for ${step.title}`}
                  width={600}
                  height={300}
                  className="rounded-md object-contain max-h-[300px]"
                  data-ai-hint={step.diagramHint || "process diagram"}
                />
              </div>
            )}

            {step.commands && step.commands.length > 0 && (
              <div className="mt-4">
                <h5 className="font-medium text-foreground mb-2">Example Commands:</h5>
                <div className="bg-muted p-3 rounded-md space-y-1">
                  {step.commands.map((cmd, index) => (
                    <code key={index} className="block text-sm font-mono text-muted-foreground break-all">{cmd}</code>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
}
