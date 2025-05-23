
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Github, Cloud, Rocket, ArrowLeft, ArrowRight, TerminalSquareIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { WalkthroughStep, type StepContent } from './WalkthroughStep';
import { Button } from '@/components/ui/button';

const initialSteps: StepContent[] = [
  {
    id: 'prepare-code',
    title: "1. Get Your Code Ready & Tools Open",
    Icon: TerminalSquareIcon,
    instructions: [
      "First things first! If you were using a Firebase visual tool, make sure you've switched to **'Code View'**. This is where you see all your project's files and folders.",
      "Now, in your code editor (like the one in Firebase Code View), open two important things:",
      <ul key="tools-list-step1" className="list-disc list-inside pl-4 my-2 space-y-1">
        <li><strong className="text-primary">Terminal:</strong> Your command center for typing instructions.</li>
        <li><strong className="text-primary">Source Control (or Git):</strong> Helps track code changes.</li>
      </ul>,
      "You can usually find these in the 'View' menu of your editor. (Hint: Look for icons or menu options like 'Terminal' and 'Source Control' or 'Git').",
      "Next, let's save your current work as a starting point. In the Terminal, type these commands one by one and press Enter after each:",
    ],
    commands: [
      'git init',
      'git add .',
      'git commit -m "Initial version of my app"'
    ],
    alerts: [
      {
        type: 'info',
        title: "What do these commands do?",
        message: <><code>git init</code> tells Git to start keeping track of your project (you usually only do this once at the very beginning).<br/><code>git add .</code> gets ALL your current project files ready for saving.<br/><code>git commit -m "..."</code> actually saves this snapshot of your files with a short message. You can change the message in quotes!</>
      }
    ]
  },
  {
    id: 'connect-github',
    title: '2. Link Your Code to GitHub',
    Icon: Github,
    instructions: [
      "Time for GitHub! This is where your code will live online. If you don't have an account, it's free and quick to sign up.",
      "Once you're signed in to GitHub, look for a `+` icon (it's usually in the top right corner) and click on 'New repository'.",
      "A 'repository' (or 'repo') is just what GitHub calls a project's online home. Give your repository a name – something like `my-cool-app` works great. You can add a short description too, if you like, and decide if it's public or private (private is fine to start!).",
      "After creating your new (empty) repository, GitHub will show you a page with some instructions. We're interested in the part that says something like '…or push an existing repository from the command line'.",
      "You'll see a few lines of code there. They will look very similar to this (but with YOUR GitHub username and YOUR repository name automatically filled in):",
    ],
    commands: [
      'git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git',
      'git branch -M main',
      'git push -u origin main'
    ],
    alerts: [
       {
        type: 'warning',
        title: 'Super Important: Keep GitHub Repo Empty!',
        message: "When GitHub asks if you want to 'Initialize this repository with:' things like a README, .gitignore, or license, **please do NOT check any of those boxes!** Your project already has these files. Adding them now on GitHub can cause mix-ups. We want an empty box to put your code into."
      },
      {
        type: 'note',
        title: 'Copy & Paste Magic!',
        message: "This is the magic part! Carefully copy ALL those lines GitHub shows you (usually there's a handy copy button). Then, go back to the Terminal in your code editor and paste them in. Press Enter. This tells your computer where your GitHub repo is and uploads your code to it!"
      }
    ],
  },
  {
    id: 'deploy-vercel',
    title: '3. Go Live with Vercel!',
    Icon: Rocket,
    instructions: [
      "Woohoo! Your code is now safely on GitHub. The final big step is to get your app live on the internet using Vercel.",
      "Head over to Vercel. If you're new, signing up with your GitHub account makes things super easy!",
      "Once you're on your Vercel dashboard, look for a button like 'Add New...' or 'Import Project' and then choose 'Project'.",
      "Vercel will ask to connect to your GitHub account (if it's not already). Go ahead and allow it. Then, you'll be able to 'Import' or select the GitHub repository you just created.",
      "Vercel is pretty smart and usually figures out the settings for your project. The defaults are almost always perfect to get started. You usually don't need to change anything here.",
      "All that's left is to hit the 'Deploy' button!",
    ],
    alerts: [
      {
        type: 'info',
        title: 'How Vercel and Firebase Work Together',
        message: "Just so you know: Vercel takes care of building the visual part of your app (the 'frontend') and hosting it online. All your Firebase backend magic (like your database, user sign-ins, etc.) still lives in Firebase and is managed from your Firebase console. Your Vercel-hosted site will talk to your Firebase services just like you've set it up in your code! You might need to add your Firebase project's details (like API keys) as 'Environment Variables' in your Vercel project settings for it to connect properly."
      },
      {
        type: 'note',
        title: 'Your App is Live! 🎉',
        message: "Vercel will show you its progress as it builds and deploys your app. When it's all done (usually just a few minutes), it'll give you a special web address (URL). That's it – your app is live on the internet for anyone to visit! Pretty cool, right?"
      }
    ],
  },
];

export function WalkthroughGuide() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [animationClass, setAnimationClass] = useState('animate-fade-in-step');

  const totalSteps = initialSteps.length;

  const handleToggleComplete = (id: string, completed: boolean) => {
    setCompletedSteps(prev => ({ ...prev, [id]: completed }));
  };

  const goToNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setAnimationClass('animate-fade-out-step');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
        setAnimationClass('animate-fade-in-step');
      }, 300); 
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setAnimationClass('animate-fade-out-step');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev - 1);
        setAnimationClass('animate-fade-in-step');
      }, 300); 
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
