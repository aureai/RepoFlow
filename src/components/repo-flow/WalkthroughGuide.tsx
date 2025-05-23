
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TerminalSquareIcon, Github, Rocket, AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { WalkthroughStep, type StepContent } from './WalkthroughStep'; 
import { cn } from '@/lib/utils';

const initialSteps: StepContent[] = [
  {
    id: 'prepare-code',
    title: "1. Get Your Code Ready & Tools Open",
    Icon: TerminalSquareIcon,
    instructions: [
      <>First up! If you were using a visual tool, make sure you've switched to '<strong key="code-view-step1" className="text-primary">Code View</strong>' (look for an icon, often in the top-right!). This guide is for when you can see all your project's files.</>,
      <>In your code editor, open the <strong className="text-primary">Terminal (Command Line)</strong> and have your <strong className="text-primary">Project's File Directory</strong> visible.</>,
      <>Time to save your app's current version. In your <strong className="text-primary">Terminal</strong>, type these commands one by one, pressing Enter after each:</>,
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
      },
      {
        type: 'note',
        Icon: Lightbulb,
        title: "Pro Tip:",
        message: <>
          Keep your Firebase visual prototyper open in one browser tab and your code editor (like the one in Firebase Studio&apos;s <strong className="text-primary">Code View</strong>) in another. This makes it easier to see your visual design and apply changes to the code. If you have questions about the code, remember you can often chat with AI assistants (like Gemini) directly within your code editor!
        </>
      }
    ]
  },
  {
    id: 'connect-github',
    title: '2. Link Your Code to GitHub',
    Icon: Github,
    instructions: [
      <>Next, let&apos;s get your code onto <strong key="github-step2" className="text-primary">GitHub</strong>.</>,
      <>If you don&apos;t have a GitHub account, create one. Then, on <strong key="github-page-step2" className="text-primary">GitHub</strong>, click <strong key="new-repo-step2" className="text-primary">New repository</strong>.</>,
      <>Give your repository a name (like <code>my-cool-app</code>). You can choose if it&apos;s <strong key="public-step2" className="text-primary">public</strong> (anyone can see) or <strong key="private-step2" className="text-primary">private</strong> (only you and people you invite). A description is optional.</>,
      <>After creating the repository, GitHub will show you some instructions. Look for the section that says '<strong className="text-primary">…or push an existing repository from the command line</strong>'.</>,
      <React.Fragment key="github-commands-intro">
        GitHub will give you a few commands. They&apos;ll look something like this (make sure to use{' '}
        <strong className="text-primary">YOUR actual GitHub username and repository name</strong> from the page!).
        Carefully copy these commands. You&apos;ll then switch back to the{' '}
        <strong className="text-primary">Terminal</strong> you opened earlier (inside your code editor or Firebase Code View) and paste these commands there, one at a time, pressing Enter after each one.
      </React.Fragment>
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
        title: 'CRITICAL: DO NOT SHARE YOUR API KEYS OR SECRETS!',
        message: "Before you push your code, double-check your project files. Make absolutely sure you are NOT uploading any API keys, passwords, or other sensitive information. Check your `.gitignore` file (it's in your project's main folder) to ensure files or folders containing secrets are listed there. If they aren't, add them! This is very important to keep your app and accounts secure."
      },
      {
        type: 'warning',
        Icon: AlertTriangle,
        title: 'IMPORTANT: Keep Your Repo Empty on GitHub!',
        message: "When creating the new repository on GitHub, do NOT check any boxes to add a README, .gitignore, or license. Your project already has these files. You need an empty canvas on GitHub for this step."
      },
      {
        type: 'info',
        Icon: Info,
        title: "Logging into GitHub",
        message: <>
          When you run the <code>git push ...</code> command (the last one from GitHub), your{' '}
          <strong className="text-primary">Terminal</strong> will try to connect to your GitHub account.
          If it&apos;s your first time doing this, GitHub will need to confirm it&apos;s you!
          <ul className="list-disc space-y-1 mt-2 ml-4">
            <li>
              It might open a browser window for you to log in and authorize.
            </li>
            <li>
              Sometimes, your <strong className="text-primary">Terminal</strong> might show you a short code (like{' '}
              <code>XXXX-XXXX</code>) and ask you to open a specific GitHub webpage (like{' '}
              <code>github.com/login/device</code>) and enter that code there.
            </li>
            <li>
              Or, it might ask for your GitHub username and a Personal Access Token (PAT) directly in the{' '}
              <strong className="text-primary">Terminal</strong>.
            </li>
          </ul>
          <br />
          Don&apos;t worry, just follow the prompts that appear in your{' '}
          <strong className="text-primary">Terminal</strong> or browser. This is a standard security step to make
          sure your code is uploaded safely!
        </>
      }
    ],
  },
  {
    id: 'deploy-vercel',
    title: '3. Go Live with Vercel!',
    Icon: Rocket,
    instructions: [
      <>Awesome! Your code is now safely on <strong className="text-primary">GitHub</strong>. Let&apos;s get your app live on the internet using <strong className="text-primary">Vercel</strong>.</>,
      <>Go to <strong className="text-primary">Vercel</strong>. If you sign up using your <strong className="text-primary">GitHub</strong> account, it makes things super smooth.</>,
      <>On your <strong className="text-primary">Vercel</strong> dashboard, look for a button like '<strong className="text-primary">Add New...</strong>' then choose '<strong className="text-primary">Project</strong>'.</>,
      <>Vercel will ask to connect to your <strong className="text-primary">GitHub</strong>. Allow it, then find and import the repository you just pushed your code to.</>,
      <>Vercel is smart and usually figures out all the settings for your app automatically. The default settings are often all you need.</>,
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

  const numCompleted = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = initialSteps.length;

  const handleNext = () => {
    if (currentStepIndex < initialSteps.length - 1) {
      setAnimationClass('animate-slide-out-to-left');
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
        setAnimationClass('animate-slide-in-from-right');
      }, 300); 
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setAnimationClass('animate-slide-out-to-right');
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex - 1);
        setAnimationClass('animate-slide-in-from-left');
      }, 300); 
    }
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    setCompletedSteps(prev => ({ ...prev, [id]: completed }));
  };

  const currentStepData = initialSteps[currentStepIndex];

  return (
    <div className="w-full relative">
      <div className={cn("w-full max-w-5xl mx-auto min-h-[600px] md:min-h-[700px] flex items-center justify-center relative overflow-hidden", animationClass)} key={currentStepIndex}>
        <div className="w-full max-w-4xl mx-auto">
          <WalkthroughStep
            step={currentStepData}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            isCompleted={!!completedSteps[currentStepData.id]}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevious}
        disabled={currentStepIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 disabled:opacity-30 p-2 rounded-full focus:ring-2 focus:ring-primary"
        aria-label="Previous step"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        disabled={currentStepIndex === initialSteps.length - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 disabled:opacity-30 p-2 rounded-full focus:ring-2 focus:ring-primary"
        aria-label="Next step"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
}
