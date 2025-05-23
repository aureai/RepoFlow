
"use client";

import React, { useState, useEffect } from 'react';
import { Github, GitBranch, Cloud, UploadCloud, Settings, CheckCircle, Package, Rocket, Link as LinkIcon, Info, Lightbulb, AlertTriangle, MonitorPlay, Save, TerminalSquareIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { Accordion } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { WalkthroughStep, type StepContent } from './WalkthroughStep';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialSteps: StepContent[] = [
  {
    id: 'open-code-tools',
    title: 'Switch to Code & Open Your Tools',
    Icon: MonitorPlay,
    instructions: [
      "Now that you're in your project's 'Code View' (seeing all the files and folders), the next step is to open your coding tools.",
      "In your code editor (like Firebase Studio, often shown when you switch to Code View), you need to open two key things:",
      <ul key="tools-list" className="list-disc list-inside pl-4 my-2 space-y-1">
        <li><strong className="text-primary">Terminal:</strong> Where you'll type commands.</li>
        <li><strong className="text-primary">Source Control:</strong> Where you can see file changes.</li>
      </ul>,
      "Go to the 'View' menu at the top. From there, select 'Terminal' and then 'Source Control'. (Shortcuts are often `Ctrl+\`` for Terminal and `Ctrl+Shift+G` for Source Control on Windows/Linux, or `Cmd+\`` and `Cmd+Shift+G` on Mac).",
      <div key="editor-image" className="my-4 rounded-md overflow-hidden border border-border shadow-md">
        <Image
          src="https://placehold.co/600x350.png"
          alt="Code editor view menu showing Terminal and Source Control options"
          width={600}
          height={350}
          className="w-full h-auto"
          data-ai-hint="code editor view menu"
        />
      </div>
    ],
  },
  {
    id: 'save-work-git',
    title: 'Save Your Work with Git',
    Icon: Save,
    instructions: [
      "Before sending your code to GitHub, you need to officially 'save' it using Git. This is like taking a snapshot of your project.",
      "In the Terminal you just opened, type these commands one by one. Press Enter after each one:",
    ],
    commands: [
      'git init',
      'git add .',
      'git commit -m "My first project version"'
    ],
    alerts: [
      {
        type: 'info',
        title: 'What these commands do:',
        message: "`git init`: Sets up Git tracking (if it's not already).\n`git add .`: Gets all your project files ready to be saved.\n`git commit -m \"...\"`: Saves your files with a message. You can change the message inside the quotes!"
      }
    ]
  },
  {
    id: 'create-github-repo',
    title: 'Create a Home for Your Code on GitHub',
    Icon: Github,
    instructions: [
      "Go to GitHub.com. If you don't have an account, create one – it's free!",
      "Once you're signed in, look for a `+` icon (usually in the top right corner) and select 'New repository'.",
      "Give your repository a name (like `my-cool-app`). You can write a short description if you want.",
      "Choose if you want your project to be public (anyone can see it) or private (only you and people you choose can see it).",
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Super Important!',
        message: "When GitHub asks if you want to add files like a README, .gitignore, or license, **do NOT check any of those boxes!** Your project already has these, and we'll upload them from your computer."
      }
    ],
  },
  {
    id: 'push-to-github',
    title: 'Send Your Code to GitHub',
    Icon: UploadCloud,
    instructions: [
      "After creating your repository on GitHub, it will show you a page with some commands. Look for a section that says something like '…or push an existing repository from the command line'.",
      "You'll see a few lines of code there. They will look similar to this (but with YOUR username and YOUR repository name):",
    ],
    commands: [
      'git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git',
      'git branch -M main',
      'git push -u origin main'
    ],
    alerts: [
       {
        type: 'note',
        title: 'Copy & Paste Carefully!',
        message: "Copy ALL those lines exactly as GitHub shows them. Then, go back to the Terminal in your code editor (Firebase Studio) and paste them in. Press Enter. This sends your code to GitHub!"
      },
      {
        type: 'info',
        title: 'Branch Name Note',
        message: "GitHub might suggest `main` or `master` for your branch name. The commands usually handle this correctly. `main` is the modern standard."
      }
    ],
  },
  {
    id: 'deploy-vercel',
    title: 'Go Live with Vercel!',
    Icon: Rocket,
    instructions: [
      "Awesome! Your code is safe on GitHub. Now, let's make your website live for everyone to see using Vercel.",
      "Go to Vercel.com. Sign up (using your GitHub account is the easiest way) or log in.",
      "Once in Vercel, click on 'Add New...' and then 'Project'.",
      "Vercel will ask to connect to your GitHub. Allow it, and then choose the repository you just pushed your code to.",
      "Vercel is smart and usually figures out it's a Next.js project. The default settings are typically perfect.",
      "Click the 'Deploy' button!",
    ],
    alerts: [
      {
        type: 'info',
        title: 'How Vercel and Firebase Work Together',
        message: "Vercel will build and host your Next.js website (the frontend). All your Firebase backend stuff (like databases, user logins, Cloud Functions) still lives in Firebase and is managed from your Firebase console. Your Vercel site will talk to Firebase just like you set it up!"
      },
      {
        type: 'note',
        title: 'Your App is Live!',
        message: "Vercel will show you the progress. When it's done, you'll get a special web address (URL) where your app is live on the internet! 🎉"
      }
    ],
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
