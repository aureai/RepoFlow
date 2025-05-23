
"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, TerminalSquareIcon, Github, Rocket, AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { WalkthroughStep, type StepContent } from './WalkthroughStep';
import { Button } from '@/components/ui/button';

const initialSteps: StepContent[] = [
  {
    id: 'prepare-code',
    title: "1. Get Your Code Ready & Tools Open",
    Icon: TerminalSquareIcon,
    instructions: [
      <>First up! If you were using a visual tool, make sure you've switched to '<strong key="code-view-step1" className="text-primary">Code View</strong>' (look for an icon, often in the top-right!). This guide is for when you can see all your project's files.</>,
      <>In your code editor, open the <strong className="text-primary">Terminal (Command Line)</strong> and have your <strong className="text-primary">Project's File Directory</strong> visible.</>,
      <>Time to save your app's current version. In your Terminal, type these commands one by one:</>,
    ],
    commands: [
      'git init',
      'git add .',
      'git commit -m "Initial version of my app"'
    ],
    alerts: [
      {
        type: 'info',
        Icon: Info,
        title: "What these commands do:",
        message: <>
          <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git init</code>: Sets up Git for your project (you only do this once per project).<br/>
          <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git add .</code>: Gets all your current project files ready to be saved.<br/>
          <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git commit -m "..."</code>: Saves a snapshot (a version) of your files with a short note about what you did.
        </>
      }
    ]
  },
  {
    id: 'connect-github',
    title: '2. Link Your Code to GitHub',
    Icon: Github,
    instructions: [
      <>Next, let's get your code onto <strong className="text-primary">GitHub</strong>.</>,
      <>If you don't have a GitHub account, create one. Then, on <strong className="text-primary">GitHub</strong>, click '<strong className="text-primary">New repository</strong>'.</>,
      <>Give your repository a name (like `my-cool-app`). You can choose if it's <strong className="text-primary">public</strong> (anyone can see) or <strong className="text-primary">private</strong> (only you and people you invite). A description is optional.</>,
      <>After creating the repository, GitHub will show you some instructions. Look for the section that says '<strong className="text-primary">…or push an existing repository from the command line</strong>'.</>,
      <>GitHub will give you a few commands. They'll look something like this (but use <strong className="text-primary">YOUR actual GitHub username and repository name</strong> from the page!):</>,
    ],
    commands: [
      'git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git',
      'git branch -M main',
      'git push -u origin main'
    ],
    alerts: [
       {
        type: 'warning',
        Icon: AlertTriangle,
        title: 'IMPORTANT: Keep Your Repo Empty on GitHub!',
        message: "When creating the new repository on GitHub, do NOT check any boxes to add a README, .gitignore, or license. Your project already has these files. You need an empty canvas on GitHub for this step."
      },
      {
        type: 'warning',
        Icon: AlertTriangle,
        title: 'CRITICAL: DO NOT SHARE YOUR API KEYS OR SECRETS!',
        message: "Before you push your code, double-check your project files. Make absolutely sure you are NOT uploading any API keys, passwords, or other sensitive information. Check your `.gitignore` file (it's in your project's main folder) to ensure files or folders containing secrets are listed there. If they aren't, add them! This is very important to keep your app and accounts secure."
      },
      {
        type: 'note',
        Icon: Lightbulb,
        title: 'Copy & Paste from GitHub',
        message: "Carefully copy all three commands GitHub gives you under '…or push an existing repository...'. Paste them into your Terminal (the one in your code editor) and press Enter. This tells your local project where your GitHub repository is and uploads your code to it."
      }
    ],
  },
  {
    id: 'deploy-vercel',
    title: '3. Go Live with Vercel!',
    Icon: Rocket,
    instructions: [
      <>Awesome! Your code is now safely on <strong className="text-primary">GitHub</strong>. Let's get your app live on the internet using <strong className="text-primary">Vercel</strong>.</>,
      <>Go to <strong className="text-primary">Vercel</strong>. If you sign up using your <strong className="text-primary">GitHub</strong> account, it makes things super smooth.</>,
      <>On your <strong className="text-primary">Vercel</strong> dashboard, look for a button like '<strong className="text-primary">Add New...</strong>' then choose '<strong className="text-primary">Project</strong>'.</>,
      <><strong className="text-primary">Vercel</strong> will ask to connect to your <strong className="text-primary">GitHub</strong>. Allow it, then find and import the repository you just pushed your code to.</>,
      <><strong className="text-primary">Vercel</strong> is smart and usually figures out all the settings for your app automatically. The default settings are often all you need.</>,
      <>Click '<strong className="text-primary">Deploy</strong>'.</>,
    ],
    alerts: [
      {
        type: 'info',
        Icon: Info,
        title: 'How Vercel and Firebase Work Together',
        message: "Vercel will host the 'front-end' of your app (what users see and interact with). Your Firebase 'back-end' (database, user authentication, etc.) still lives in Firebase and is managed through the Firebase console. Your app hosted on Vercel will talk to your Firebase services. Sometimes, you might need to tell Vercel about your Firebase project by adding details (like API keys) as 'Environment Variables' in your Vercel project settings. This helps Vercel connect to your Firebase services securely."
      },
      {
        type: 'note',
        Icon: Lightbulb,
        title: 'Your App is Live!',
        message: "Vercel will show you its progress. After a few minutes, it will give you a website address (URL). That's it – your app is live for the world to see!"
      }
    ],
  },
];

export function WalkthroughGuide() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [animationClass, setAnimationClass] = useState('animate-slide-in-from-right');

  const totalSteps = initialSteps.length;

  const handleToggleComplete = (id: string, completed: boolean) => {
    setCompletedSteps(prev => ({ ...prev, [id]: completed }));
  };

  const goToNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setAnimationClass('animate-slide-out-to-left');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
        setAnimationClass('animate-slide-in-from-right');
      }, 300); 
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setAnimationClass('animate-slide-out-to-right');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev - 1);
        setAnimationClass('animate-slide-in-from-left');
      }, 300); 
    }
  };
  
  const currentStepData = initialSteps[currentStepIndex];

  return (
    <div className="w-full relative">
      <div className="w-full max-w-5xl mx-auto min-h-[600px] md:min-h-[700px] flex items-center justify-center relative overflow-hidden mb-8">
        <div key={currentStepIndex} className={`w-full max-w-4xl mx-auto h-full flex items-center justify-center ${animationClass}`}>
          <WalkthroughStep
            step={currentStepData}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            isCompleted={!!completedSteps[currentStepData.id]}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      {currentStepIndex > 0 && (
        <Button
          onClick={goToPrevStep}
          variant="outline"
          size="lg"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3"
          aria-label="Previous Step"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      )}
      {currentStepIndex < totalSteps - 1 && (
        <Button
          onClick={goToNextStep}
          variant="default"
          size="lg"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3"
          aria-label="Next Step"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
