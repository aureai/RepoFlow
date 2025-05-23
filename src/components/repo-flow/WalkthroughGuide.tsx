
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
      "First things first! If you were just using a Firebase visual prototyper, make sure you've clicked on the 'Switch to Code' option (you might see an icon for this, maybe in the top right corner of your tool). This guide is for when you can see all your project's files and folders (the code!).",
      "Now, you'll need a couple of handy tools open in your code editor (like the one in Firebase Code View, or your own favorite editor like VS Code):",
      <ul key="tools-list-step1" className="list-disc list-inside pl-4 my-2 space-y-1">
        <li><strong className="text-primary">Your Project's File Directory:</strong> Make sure you can see all the files and folders that make up your app.</li>
        <li><strong className="text-primary">Terminal (or Command Line):</strong> This is like a chat window where you'll type special instructions to your computer. You can usually open one from the 'View' or 'Terminal' menu in your code editor.</li>
        <li><strong className="text-primary">Source Control (or Git Panel):</strong> This helps you keep track of changes to your code. It's often a tab or icon that looks like branching lines.</li>
      </ul>,
      "Great! Before we connect to GitHub, let's save your current app as a starting point. In the Terminal, type these commands one by one, pressing 'Enter' after each:",
    ],
    commands: [
      'git init',
      'git add .',
      'git commit -m "Initial version of my app"'
    ],
    alerts: [
      {
        type: 'info',
        title: "What do these commands mean?",
        message: <><code>git init</code> tells your computer, "Hey, start keeping track of changes in this project!" (You usually only do this once at the very beginning).<br/><code>git add .</code> means, "Get ALL my current project files ready to be saved."<br/><code>git commit -m "..."</code> actually saves this 'snapshot' of your files. The message in quotes is your note about what this save point is – you can change it!</>
      }
    ]
  },
  {
    id: 'connect-github',
    title: '2. Link Your Code to GitHub',
    Icon: Github,
    instructions: [
      "Awesome! Now, let's get your code onto GitHub. Think of GitHub as a super-safe online home for your code, where you can store it and even work with others.",
      "If you don't have a GitHub account, it's free and quick to create one. Once you're signed in, look for a `+` icon (usually in the top right corner) and click 'New repository'.",
      "A 'repository' (or 'repo' for short) is just what GitHub calls a project's online space. Give your repository a name – something clear like `my-firebase-app` is perfect. You can add a short description if you like, and decide if it's public (anyone can see it) or private (only you and people you choose). Private is fine to start!",
      "After you click 'Create repository', GitHub will show you a page with some instructions. Since your code is already on your computer, we're interested in the part that says something like '…or push an existing repository from the command line'.",
      "You'll see a few lines of code there, looking something like this (but with YOUR GitHub username and YOUR repository name already filled in!):",
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
        message: "This is the magic part! Carefully copy ALL those lines GitHub shows you (usually there's a handy copy button right next to them). Then, go back to the Terminal in your code editor and paste them in. Press Enter. This tells your computer where your GitHub repo is and sends your code up to it!"
      }
    ],
  },
  {
    id: 'deploy-vercel',
    title: '3. Go Live with Vercel!',
    Icon: Rocket,
    instructions: [
      "You're doing great! Your code is now safely on GitHub. The final big step is to get your app live on the internet using Vercel.",
      "Vercel is a service that takes your code and makes it a real, working website that anyone can visit. Head over to Vercel. If you're new, signing up with your GitHub account makes things super easy!",
      "Once you're on your Vercel dashboard (it's like your control panel), look for a button like 'Add New...' or 'Import Project' and then choose 'Project'.",
      "Vercel will ask to connect to your GitHub account (if it's not already). Go ahead and allow it. Then, you'll be able to 'Import' or select the GitHub repository you just created (the one with your app's code).",
      "Vercel is pretty smart and usually figures out the settings for your app. The defaults are almost always perfect to get started. You usually don't need to change anything here.",
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
  const [animationClass, setAnimationClass] = useState('animate-slide-in-from-right'); // Initial animation

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
      }, 300); // Match exit animation duration
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setAnimationClass('animate-slide-out-to-right');
      setTimeout(() => {
        setCurrentStepIndex(prev => prev - 1);
        setAnimationClass('animate-slide-in-from-left');
      }, 300); // Match exit animation duration
    }
  };
  
  const currentStepData = initialSteps[currentStepIndex];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-4xl relative"> {/* Parent for step and absolute buttons */}
        <div className="w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center relative overflow-hidden mb-8">
          {/* Step Content - key change triggers animation */}
          <div key={currentStepIndex} className={`w-full max-w-3xl ${animationClass}`}>
            <WalkthroughStep
              step={currentStepData}
              stepNumber={currentStepIndex + 1}
              totalSteps={totalSteps}
              isCompleted={!!completedSteps[currentStepData.id]}
              onToggleComplete={handleToggleComplete}
              // Pass currentStepIndex and totalSteps if WalkthroughStep needs them for its own logic,
              // or if it's used to determine if it's the active step (though animationClass handles visual)
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentStepIndex > 0 && (
          <Button
            onClick={goToPrevStep}
            variant="outline"
            size="lg"
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-3"
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
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-3"
            aria-label="Next Step"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
