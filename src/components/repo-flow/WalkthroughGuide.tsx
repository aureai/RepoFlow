
"use client";

import React, { useState, useEffect } from 'react';
import { Github, GitBranch, Cloud, UploadCloud, Settings, CheckCircle, Package, Rocket, Link as LinkIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { WalkthroughStep, type StepContent } from './WalkthroughStep';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialSteps: StepContent[] = [
  {
    id: 'init-git',
    title: 'Initialize Git Repository',
    instructions: [
      "Open your project's root folder in your terminal.",
      "Run the command `git init` to initialize a new Git repository. This creates a hidden `.git` directory that tracks your project's history."
    ],
    commands: ['git init'],
    Icon: GitBranch,
  },
  {
    id: 'add-files',
    title: 'Add Files to Staging',
    instructions: [
      "After initializing Git, you need to tell Git which files to track.",
      "Run `git add .` to add all files in the current directory and subdirectories to the staging area. Staging is like a draft space for your next commit."
    ],
    commands: ['git add .'],
    Icon: Package,
  },
  {
    id: 'commit-changes',
    title: 'Commit Your Changes',
    instructions: [
      "Commit your staged changes to the local repository's history.",
      "Run `git commit -m \"Initial commit\"` to save your changes. The message should briefly describe the changes made in this commit."
    ],
    commands: ['git commit -m "Initial commit"'],
    Icon: CheckCircle,
  },
  {
    id: 'create-github-repo',
    title: 'Create GitHub Repository',
    instructions: [
      "Go to GitHub and log in.",
      "Click the `+` icon in the top right corner and select 'New repository'.",
      "Give your repository a name (e.g., `my-awesome-app`). You can add an optional description.",
      "Choose public or private. For deploying to Vercel, public or private works.",
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Critical Step!',
        message: "Do NOT initialize this new GitHub repository with a README, .gitignore, or license file. You have already done this locally and will push your existing project files."
      }
    ],
    Icon: Github,
  },
  {
    id: 'link-remote',
    title: 'Link Local to Remote Repository',
    instructions: [
      "On your new GitHub repository page, find the repository URL (HTTPS or SSH).",
      "In your local terminal, run `git remote add origin <your-repo-url>`. This command tells your local Git repo where the remote 'origin' is located."
    ],
    alerts: [
      {
        type: 'info',
        title: 'Placeholder Alert',
        message: "Remember to replace `<your-repo-url>` with the actual URL from your GitHub repository page."
      }
    ],
    commands: ['git remote add origin https://github.com/your-username/your-repo-name.git'],
    Icon: LinkIcon,
  },
  {
    id: 'push-github',
    title: 'Push to GitHub',
    instructions: [
      "Upload your local commits to the remote repository on GitHub.",
      "Run `git push -u origin main`. The `-u` flag sets the upstream branch for future pushes and pulls."
    ],
    alerts: [
      {
        type: 'note',
        title: 'Branch Name Check',
        message: "Your default branch might be named `main` (common now) or `master` (older default). Ensure you use the correct one for your repository. If you're unsure, GitHub will usually show the default branch name on the repository page after creation."
      }
    ],
    commands: ['git push -u origin main'],
    Icon: UploadCloud,
  },
  {
    id: 'vercel-signup',
    title: 'Sign Up/Log In to Vercel',
    instructions: [
      "Go to Vercel.",
      "Sign up for a new account or log in. It's often easiest to sign up/log in using your GitHub account for seamless integration."
    ],
    Icon: Cloud,
  },
  {
    id: 'vercel-import',
    title: 'Import Project to Vercel',
    instructions: [
      "Once logged into Vercel, find the 'Add New...' button or 'Import Project' option on your dashboard.",
      "Select your GitHub account and then choose the repository you just pushed.",
      "Vercel will typically auto-detect that it's a Next.js project."
    ],
    Icon: Settings,
  },
  {
    id: 'vercel-deploy',
    title: 'Configure and Deploy',
    instructions: [
      "Vercel will show you project settings. For most Next.js apps, the defaults are fine.",
      "You can set environment variables here if your application needs them (e.g., API keys).",
      "Click the 'Deploy' button. Vercel will build your project and deploy it."
    ],
    alerts: [
       {
        type: 'info',
        title: 'Deployment Process',
        message: "After Vercel finishes building, it will assign your project a unique URL. You can monitor the build logs in real-time. Once deployed, you'll get a live link!"
      }
    ],
    Icon: Rocket,
  },
];

export function WalkthroughGuide() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const [openAccordionItem, setOpenAccordionItem] = useState<string | undefined>(initialSteps[0]?.id ? `step-${initialSteps[0].id}` : undefined);


  useEffect(() => {
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    setProgress(initialSteps.length > 0 ? (completedCount / initialSteps.length) * 100 : 0);
  }, [completedSteps]);

  const handleToggleComplete = (id: string, completed: boolean) => {
    setCompletedSteps(prev => ({ ...prev, [id]: completed }));
  };
  
  const handleOpenNext = (currentId: string) => {
    const currentIndex = initialSteps.findIndex(step => step.id === currentId);
    if (currentIndex !== -1 && currentIndex < initialSteps.length - 1) {
      setOpenAccordionItem(`step-${initialSteps[currentIndex + 1].id}`);
    } else if (currentIndex === initialSteps.length - 1) {
       // Optionally, close the last one or do nothing
       // setOpenAccordionItem(undefined); 
    }
  };


  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <GitBranch className="h-7 w-7 text-primary" />
          Deployment Walkthrough
        </CardTitle>
        <div className="pt-2">
          <Progress value={progress} className="w-full h-3" />
          <p className="text-sm text-muted-foreground mt-1">{Math.round(progress)}% Complete</p>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion 
          type="single" 
          collapsible 
          className="w-full space-y-0"
          value={openAccordionItem}
          onValueChange={(value) => setOpenAccordionItem(value)}
        >
          {initialSteps.map((step, index) => (
            <WalkthroughStep
              key={step.id}
              step={step}
              stepNumber={index + 1}
              isCompleted={!!completedSteps[step.id]}
              isOpen={openAccordionItem === `step-${step.id}`}
              onToggleComplete={(id, completed) => {
                handleToggleComplete(id, completed);
                if (completed) {
                  handleOpenNext(id);
                }
              }}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
