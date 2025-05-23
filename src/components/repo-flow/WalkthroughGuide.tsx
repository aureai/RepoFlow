
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
    title: "Let's Open Your Coding Tools",
    Icon: MonitorPlay,
    instructions: [
      "Alright, you're in 'Code View' and can see all your project's files and folders – fantastic! Now, let's get your main coding tools ready.",
      "Inside your code editor (which might be Firebase Studio itself if you just switched, or another editor you like), we need to open two important panels:",
      <ul key="tools-list" className="list-disc list-inside pl-4 my-2 space-y-1">
        <li><strong className="text-primary">Terminal:</strong> This is where you'll type commands (like telling your computer what to do).</li>
        <li><strong className="text-primary">Source Control:</strong> This helps you keep track of changes to your files.</li>
      </ul>,
      "Usually, you can find these by going to the 'View' menu at the top of your editor. From there, select 'Terminal' and then 'Source Control'.",
      "(Handy shortcuts are often `Ctrl+\`` for Terminal and `Ctrl+Shift+G` for Source Control on Windows/Linux, or `Cmd+\`` and `Cmd+Shift+G` on a Mac).",
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
      "Before we send your code to GitHub, let's save a snapshot of your project using Git. Think of it like creating a named version of your work so you can always come back to it.",
      "In the Terminal you just opened, type these commands one by one. Press Enter after each line:",
    ],
    commands: [
      'git init',
      'git add .',
      'git commit -m "My first project version"'
    ],
    alerts: [
      {
        type: 'info',
        title: "What are these commands doing?",
        message: "`git init`: This sets up Git to start tracking your project (you usually only do this once).\n`git add .`: This tells Git to get all your current project files ready for saving.\n`git commit -m \"...\"`: This actually saves the snapshot with a message. You can change the message inside the quotes to describe what you did!"
      }
    ]
  },
  {
    id: 'create-github-repo',
    title: 'Create a Home for Your Code on GitHub',
    Icon: Github,
    instructions: [
      "Time to head over to GitHub.com. If you don't have an account yet, no worries – it's free and quick to create one!",
      "Once you're signed in, look for a `+` icon (it's usually in the top right corner) and click on 'New repository'.",
      "Give your repository (your project's online home) a name. Something like `my-awesome-app` works great. You can add a short description too, if you like.",
      "You'll also choose if your project is public (anyone can see the code) or private (only you and people you invite can see it). For starting out, private is often a good choice.",
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Super Important!',
        message: "When GitHub asks if you want to add files like a README, .gitignore, or license, **please do NOT check any of those boxes!** Your project already has these important files, and we'll send them up from your computer in the next step."
      }
    ],
  },
  {
    id: 'push-to-github',
    title: 'Send Your Code to GitHub',
    Icon: UploadCloud,
    instructions: [
      "Great! After you create your repository on GitHub, it'll show you a page with some commands. We're interested in the part that says something like '…or push an existing repository from the command line'.",
      "You'll see a few lines of code there. They will look similar to this, but with YOUR GitHub username and YOUR repository name:",
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
        message: "This is the magic part! Copy ALL those lines exactly as GitHub shows them. Then, pop back to the Terminal in your code editor (like Firebase Studio) and paste them in. Press Enter. This uploads your local code to your new GitHub repository!"
      },
      {
        type: 'info',
        title: 'Quick Note on "main"',
        message: "GitHub might use `main` or `master` for the main branch name in its examples. The commands they provide usually handle this for you. `main` is the modern standard, so you'll see that a lot."
      }
    ],
  },
  {
    id: 'deploy-vercel',
    title: 'Go Live with Vercel!',
    Icon: Rocket,
    instructions: [
      "Fantastic! Your code is now safely stored on GitHub. The final step is to get your website live on the internet using Vercel.",
      "Head over to Vercel.com. If you're new, you can sign up (using your GitHub account makes it super easy!) or just log in.",
      "Once you're on your Vercel dashboard, look for a button like 'Add New...' and then choose 'Project'.",
      "Vercel will ask to connect to your GitHub account. Go ahead and allow it. Then, you'll be able to pick the GitHub repository you just created and pushed your code to.",
      "Vercel is pretty smart and usually detects that you have a Next.js project. The default settings it suggests are almost always perfect to get started.",
      "All that's left is to hit the 'Deploy' button!",
    ],
    alerts: [
      {
        type: 'info',
        title: 'How Vercel and Firebase Play Together',
        message: "Just so you know, Vercel will take care of building and hosting your Next.js website (the part users see and interact with). All your Firebase backend magic (like databases, user sign-ins, Cloud Functions) still lives in Firebase and is managed from your Firebase console. Your Vercel site will talk to your Firebase services just like you've set it up in your code!"
      },
      {
        type: 'note',
        title: 'Your App is Live!',
        message: "Vercel will show you its progress. When it's all done (usually just a few minutes), it'll give you a special web address (URL). That's where your app is live on the internet for anyone to visit! 🎉 Pretty cool, right?"
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
