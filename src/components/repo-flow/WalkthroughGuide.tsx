
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Github, GitBranch, Cloud, UploadCloud, Settings, CheckCircle, Package, Rocket, Link as LinkIcon, Info, Lightbulb, AlertTriangle, MonitorPlay, Save, TerminalSquareIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { WalkthroughStep, type StepContent } from './WalkthroughStep';
import { Button } from '@/components/ui/button';

const initialSteps: StepContent[] = [
  {
    id: 'open-code-tools',
    title: "Let's Open Your Coding Tools",
    Icon: MonitorPlay,
    instructions: [
      "Hey there! So, you've switched to 'Code View' in your Firebase tool (or you've got your project files open in your favorite editor) – awesome! You should be seeing all your project's files and folders. Now, let's get your main coding tools ready.",
      "Inside your code editor, we need to open two important panels:",
      <ul key="tools-list" className="list-disc list-inside pl-4 my-2 space-y-1">
        <li><strong className="text-primary">Terminal:</strong> This is like a command center where you'll type instructions for your computer.</li>
        <li><strong className="text-primary">Source Control:</strong> This handy panel helps you keep track of changes to your files (think of it as a history book for your code).</li>
      </ul>,
      "Usually, you can find these by going to the 'View' menu at the top of your editor. From there, select 'Terminal' (or 'New Terminal'), and then 'Source Control' (it might also be called 'Git' or show a branch icon).",
      "(Handy shortcuts are often `Ctrl+\`` (backtick) for Terminal and `Ctrl+Shift+G` for Source Control on Windows/Linux, or `Cmd+\`` and `Cmd+Shift+G` on a Mac).",
    ],
  },
  {
    id: 'save-work-git',
    title: 'Save Your Work with Git',
    Icon: Save,
    instructions: [
      "Before we send your code to its new online home on GitHub, let's save a snapshot of your project right here on your computer using Git. Think of it like creating a named checkpoint for your work, so you can always come back to this version if you need to.",
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
        message: <><code>git init</code>: This tells Git to start keeping track of your project (you usually only do this once at the very beginning).<br/><code>git add .</code>: This command tells Git to get ALL your current project files ready for saving (it 'stages' them).<br/><code>git commit -m "..."</code>: This actually saves the snapshot (the 'commit') with a message. You can change the message inside the quotes to describe what you did! Something like "Initial setup of my app" is perfect.</>
      }
    ]
  },
  {
    id: 'create-github-repo',
    title: 'Create a Home for Your Code on GitHub',
    Icon: Github,
    instructions: [
      "Alright, time to visit GitHub! If you don't have an account yet, no worries – it's free and quick to create one.",
      "Once you're signed in to GitHub, look for a `+` icon (it's usually in the top right corner of the page) and click on 'New repository'.",
      "A 'repository' (or 'repo' for short) is just what GitHub calls a project's online home. Give your repository a name – something like `my-cool-firebase-app` or `my-project` works great. You can add a short description too, if you like.",
      "You'll also choose if your project is public (anyone on the internet can see the code) or private (only you and people you specifically invite can see it). For starting out, private is often a good choice, and you can always make it public later if you want.",
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Heads Up! Super Important!',
        message: "When GitHub asks if you want to 'Initialize this repository with:' things like a README, .gitignore, or license, **please do NOT check any of those boxes!** Your project already has these important files, and we'll send them up from your computer in the next step. Adding them now on GitHub can cause a bit of a mix-up later."
      }
    ],
  },
  {
    id: 'push-to-github',
    title: 'Send Your Code to GitHub',
    Icon: UploadCloud,
    instructions: [
      "Great job! After you create your new (empty) repository on GitHub, it'll show you a page with some instructions. We're interested in the part that says something like '…or push an existing repository from the command line'.",
      "You'll see a few lines of code there. They will look very similar to this, but with YOUR GitHub username and YOUR repository name filled in automatically:",
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
        message: "This is the magic part! Carefully copy ALL those lines exactly as GitHub shows them (usually there's a handy copy button next to them). Then, pop back to the Terminal in your code editor and paste them in. Press Enter after pasting. This tells your local Git where your GitHub repo is and then uploads your local code to it!"
      },
      {
        type: 'info',
        title: 'Quick Note on "main"',
        message: "You might see GitHub use `main` or sometimes `master` for the primary branch name in its examples. The commands GitHub provides usually handle this for you by renaming your local branch to `main` if needed. `main` is the modern standard, so that's what we're aiming for."
      }
    ],
  },
  {
    id: 'deploy-vercel',
    title: 'Go Live with Vercel!',
    Icon: Rocket,
    instructions: [
      "Woohoo! Your code is now safely backed up and stored on GitHub. The final big step is to get your website live on the internet using Vercel.",
      "Head over to Vercel. If you're new, you can sign up (using your GitHub account makes it super easy!) or just log in.",
      "Once you're on your Vercel dashboard, look for a button like 'Add New...' or 'Import Project' and then choose 'Project'.",
      "Vercel will ask to connect to your GitHub account (if it's not already connected). Go ahead and allow it. Then, you'll be able to 'Import' or select the GitHub repository you just created and pushed your code to.",
      "Vercel is pretty smart and usually detects the type of project you have. The default settings it suggests (like the 'Framework Preset' and 'Build and Output Settings') are almost always perfect to get started. You usually don't need to change anything here.",
      "All that's left is to hit the 'Deploy' button!",
    ],
    alerts: [
      {
        type: 'info',
        title: 'How Vercel and Firebase Play Together',
        message: "Just so you know: Vercel will take care of building your web app (the part users see and interact with – the 'frontend') and hosting it online. All your Firebase backend magic (like your database, user sign-ins, Cloud Functions, etc.) still lives in Firebase and is managed from your Firebase console. Your Vercel-hosted site will talk to your Firebase services just like you've set it up in your code! You might need to add your Firebase project's configuration details (like API keys) as 'Environment Variables' in your Vercel project settings for it to connect properly."
      },
      {
        type: 'note',
        title: 'Your App is Live!',
        message: "Vercel will show you its progress as it builds and deploys your app. When it's all done (usually just a few minutes), it'll give you a special web address (URL). That's it – your app is live on the internet for anyone to visit! 🎉 Pretty cool, right?"
      }
    ],
  },
];

export function WalkthroughGuide() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [animationClass, setAnimationClass] = useState('animate-fade-in-step');

  const totalSteps = initialSteps.length;

  const completedCount = useMemo(() => {
    return Object.values(completedSteps).filter(Boolean).length;
  }, [completedSteps]);

  const progress = useMemo(() => {
    return totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;
  }, [completedCount, totalSteps]);

  const handleToggleComplete = (id: string, completed: boolean) => {
    setCompletedSteps(prev => ({ ...prev, [id]: completed }));
  };

  const goToNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setAnimationClass('animate-fade-out-step');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
        setAnimationClass('animate-fade-in-step');
      }, 300); // Match fade-out duration
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setAnimationClass('animate-fade-out-step');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev - 1);
        setAnimationClass('animate-fade-in-step');
      }, 300); // Match fade-out duration
    }
  };
  
  const currentStepData = initialSteps[currentStepIndex];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center relative overflow-hidden mb-8">
        <div key={currentStepIndex} className={`w-full max-w-3xl ${animationClass}`}>
          <WalkthroughStep
            step={currentStepData}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            isCompleted={!!completedSteps[currentStepData.id]}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      <div className="flex justify-between w-full max-w-3xl">
        <Button onClick={goToPrevStep} disabled={currentStepIndex === 0} variant="outline" size="lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Previous
        </Button>
        <Button onClick={goToNextStep} disabled={currentStepIndex === totalSteps - 1} variant="default" size="lg">
          Next
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
