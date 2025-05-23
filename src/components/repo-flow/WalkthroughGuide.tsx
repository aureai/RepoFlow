
"use client";

import React, { useState, useEffect } from 'react';
import { Github, GitBranch, Cloud, UploadCloud, Settings, CheckCircle, Package, Rocket, Link as LinkIcon, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { WalkthroughStep, type StepContent } from './WalkthroughStep';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialSteps: StepContent[] = [
  {
    id: 'init-git',
    title: 'Start Tracking Your Project with Git',
    instructions: [
      "First things first! If you were just using a Firebase visual prototyper, make sure you've clicked on the 'Switch to Code' option (you might see an icon for this, maybe in the top right corner of your tool). This guide is for when you can see all your project's files and folders (the code!).",
      "Open your project's main folder in a terminal. (Your code editor, like VS Code, often has a built-in terminal, or you can use a separate one like Terminal on Mac or Command Prompt on Windows).",
      "Time to tell Git to start keeping track of your project! Type `git init` in your terminal. This command sets up Git in your project folder so it can start saving your work's history."
    ],
    commands: ['git init'],
    Icon: GitBranch,
  },
  {
    id: 'add-files',
    title: 'Get Your Files Ready for Saving',
    instructions: [
      "Now that Git is set up, you need to tell it which files you want to include in your next save.",
      "Type `git add .` (don't forget the dot!) in your terminal. This tells Git to get *all* your project files ready to be saved. Think of it like putting all your documents in a pile before you file them away."
    ],
    commands: ['git add .'],
    Icon: Package,
  },
  {
    id: 'commit-changes',
    title: 'Save Your Changes (Make a "Commit")',
    instructions: [
      "Now, let's officially save the files you just prepared. This is called a 'commit' in Git language.",
      "Type `git commit -m \"Initial commit\"` in your terminal. This saves your files. The part in quotes is a message to remind you (or others) what this save was about. 'Initial commit' is a common message for the very first save."
    ],
    commands: ['git commit -m "Initial commit"'],
    Icon: CheckCircle,
  },
  {
    id: 'create-github-repo',
    title: 'Create a Home for Your Code on GitHub',
    instructions: [
      "Head over to GitHub and sign in to your account (or create one if you're new!).",
      "Click the `+` icon in the top right corner and select 'New repository'.",
      "Choose a name for your project on GitHub (like `my-cool-app`). You can also write a short description if you like.",
      "Decide if you want your project to be public (anyone can see it) or private (only you and people you choose can see it). Either way is fine for Vercel."
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Super Important!',
        message: "When GitHub asks if you want to add files like a README, .gitignore, or license, **don't check any of those boxes!** Your project already has these, and we'll upload them from your computer."
      }
    ],
    Icon: Github,
  },
  {
    id: 'link-remote',
    title: "Connect Your Computer's Project to GitHub",
    instructions: [
      "After creating your project on GitHub, you'll see a special web address (URL) for it. It usually starts with `https://`.",
      "Back in your terminal, type `git remote add origin <your-repo-url>`. This command tells Git on your computer where your project lives on GitHub."
    ],
    alerts: [
      {
        type: 'info',
        title: 'Remember!',
        message: "Replace `<your-repo-url>` with the actual URL from your GitHub repository page. Just copy and paste it!"
      }
    ],
    commands: ['git remote add origin https://github.com/your-username/your-repo-name.git'],
    Icon: LinkIcon,
  },
  {
    id: 'push-github',
    title: 'Send Your Code to GitHub',
    instructions: [
      "Now it's time to send all the changes you've saved on your computer up to GitHub.",
      "Type `git push -u origin main` in your terminal. This 'pushes' (sends) your code. The `-u origin main` part is just a way to tell Git to remember this connection for next time, making future pushes simpler."
    ],
    alerts: [
      {
        type: 'note',
        title: 'Branch Name Check',
        message: "Heads up: Your project's main code line (called a 'branch') might be named `main` or `master`. Make sure the command uses the correct name for your project. `main` is most common these days."
      }
    ],
    commands: ['git push -u origin main'],
    Icon: UploadCloud,
  },
  {
    id: 'vercel-signup',
    title: 'Get Ready with Vercel',
    instructions: [
      "Now, let's go to Vercel.",
      "If you don't have a Vercel account, sign up for one. If you do, just log in. The easiest way is often to use your GitHub account to sign up or log in – it makes things smoother!"
    ],
    Icon: Cloud,
  },
  {
    id: 'vercel-import',
    title: 'Bring Your GitHub Project into Vercel',
    instructions: [
      "After logging into Vercel, look for a button like 'Add New...' or 'Import Project'. This is usually on your main dashboard.",
      "Vercel will ask to connect to your GitHub. Allow it, and then pick the project (repository) you just put on GitHub.",
      "Vercel is smart and usually figures out it's a Next.js project all by itself!"
    ],
    Icon: Settings,
  },
  {
    id: 'vercel-deploy',
    title: 'Set Up and Launch Your Next.js App on Vercel',
    instructions: [
      "Vercel will show some settings for your project. For most Next.js apps that work with Firebase, the standard settings Vercel suggests are usually perfect.",
      "If your app needs any secret codes or special settings for Firebase (like API keys), you can add them here in Vercel. For Next.js, these often start with `NEXT_PUBLIC_` if your website's visitors need to use them (otherwise, keep them secret!).",
      "Hit the 'Deploy' button! Vercel will then work its magic, get your Next.js app ready, and put it online."
    ],
    alerts: [
       {
        type: 'info',
        title: 'How Vercel and Firebase Work Together',
        message: "Good to know: Vercel takes care of putting your Next.js website online. All your Firebase stuff (like databases, user logins, and special functions) still lives in Firebase and is managed from your Firebase console. Your website will talk to Firebase just like you set it up."
      },
      {
        type: 'note',
        title: 'Your App is Live!',
        message: "Once Vercel is done, it will give you a special web address (URL) where your app is live on the internet! You can watch its progress, and soon you'll have a link to share."
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
          Your Friendly Deployment Walkthrough
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
