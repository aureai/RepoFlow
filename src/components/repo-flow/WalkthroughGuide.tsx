
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Github, Cloud, Rocket, TerminalSquareIcon, GitCommit } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { WalkthroughStep, type StepContent } from './WalkthroughStep';
import { Button } from '@/components/ui/button';

const initialSteps: StepContent[] = [
  {
    id: 'prepare-code',
    title: "1. Get Your Code Ready & Tools Open",
    Icon: TerminalSquareIcon,
    instructions: [
      "Switch to 'Code View' in your Firebase tool. Ensure you can see your project's files.",
      "In your code editor:",
      <ul key="tools-list-step1" className="list-disc list-inside pl-4 my-2 space-y-1">
        <li>Open your <strong className="text-primary">Project's File Directory</strong>.</li>
        <li>Open the <strong className="text-primary">Terminal (Command Line)</strong>.</li>
      </ul>,
      "Save your current app version. In the Terminal, type these commands:",
    ],
    commands: [
      'git init',
      'git add .',
      'git commit -m "Initial version of my app"'
    ],
    alerts: [
      {
        type: 'info',
        title: "Command Explanations:",
        message: <><code>git init</code>: Initializes Git for this project. (Run once per project).<br/><code>git add .</code>: Stages all current project files for saving.<br/><code>git commit -m "..."</code>: Saves a snapshot of your files with a descriptive message.</>
      }
    ]
  },
  {
    id: 'connect-github',
    title: '2. Link Your Code to GitHub',
    Icon: Github,
    instructions: [
      "Connect your local code to a GitHub repository.",
      "Create a GitHub account if you don't have one. Then, create a 'New repository'.",
      "Name your repository (e.g., `my-firebase-app`). Choose public or private. A description is optional.",
      "After creating the repository, GitHub will show instructions. Find the section '…or push an existing repository from the command line'.",
      "GitHub will provide commands similar to these (use <strong class='text-primary'>YOUR actual GitHub username and repository name</strong>):",
    ],
    commands: [
      'git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git',
      'git branch -M main',
      'git push -u origin main'
    ],
    alerts: [
       {
        type: 'warning',
        title: 'Important: Empty GitHub Repo',
        message: "Do NOT initialize the new GitHub repository with a README, .gitignore, or license. Your project already has these. An empty repository is needed."
      },
      {
        type: 'note',
        title: 'Copy & Paste Commands',
        message: "Copy all commands GitHub provides under '…or push an existing repository...'. Paste them into your Terminal and press Enter. This links your local project and uploads your code to GitHub."
      }
    ],
  },
  {
    id: 'deploy-vercel',
    title: '3. Go Live with Vercel!',
    Icon: Rocket,
    instructions: [
      "Deploy your app using Vercel. Your code is now on GitHub.",
      "Go to Vercel. Sign up with your GitHub account for easy integration.",
      "On your Vercel dashboard, click 'Add New...' then 'Project'.",
      "Connect Vercel to your GitHub account. Import the repository you just created.",
      "Vercel usually auto-detects settings. Default settings are typically sufficient.",
      "Click 'Deploy'.",
    ],
    alerts: [
      {
        type: 'info',
        title: 'Vercel and Firebase',
        message: "Vercel hosts your app's frontend. Your Firebase backend (database, auth, etc.) remains in Firebase, managed via the Firebase console. Your Vercel-hosted app connects to Firebase services. You may need to add Firebase project details (API keys) as 'Environment Variables' in Vercel project settings for proper connection."
      },
      {
        type: 'note',
        title: 'App Live!',
        message: "Vercel shows build and deployment progress. Once done (a few minutes), Vercel provides a URL. Your app is now live."
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
      <div className="w-full max-w-4xl mx-auto min-h-[600px] md:min-h-[700px] flex items-center justify-center relative overflow-hidden mb-8">
        <div key={currentStepIndex} className={`w-full h-full flex items-center justify-center ${animationClass}`}>
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
