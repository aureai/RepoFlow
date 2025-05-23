"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CommandOutput {
  command: string;
  output: string;
  isError?: boolean;
}

export function EmbeddedTerminal() {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const mockResponses: Record<string, { output: string, isError?: boolean }> = {
    'git init': { output: 'Initialized empty Git repository in /path/to/your/project/.git/' },
    'git add .': { output: 'Files added to staging area.' },
    'git commit -m "Initial commit"': { output: '[main (root-commit) abc1234] Initial commit\n 2 files changed, 10 insertions(+)' },
    'git remote add origin <url>': { output: 'Remote origin added.' },
    'git push -u origin main': { output: 'Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (2/2), done.\nWriting objects: 100% (3/3), 280 bytes | 280.00 KiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0), pack-reused 0\nTo github.com:user/repo.git\n * [new branch]      main -> main\nBranch \'main\' set up to track remote branch \'main\' from \'origin\'.' },
    'help': { output: 'Available mock commands: git init, git add ., git commit -m "..." , git remote add origin <url>, git push -u origin main, clear. This is a simulated terminal.' },
    'clear': { output: ''},
    'default': { output: 'Command not recognized or not mocked in this simulation. Type "help" for mock commands.', isError: true }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (inputValue.trim().toLowerCase() === 'clear') {
        setHistory([]);
        setInputValue('');
        return;
    }

    const commandKey = Object.keys(mockResponses).find(key => inputValue.trim().startsWith(key.split(' ')[0])) || 'default';
    const response = mockResponses[commandKey];
    
    const newEntry: CommandOutput = {
      command: inputValue,
      output: response.output.replace('<url>', 'your-repo-url'), // Simple replacement for example
      isError: response.isError,
    };

    setHistory(prev => [...prev, newEntry]);
    setInputValue('');
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [history]);

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Terminal className="h-7 w-7 text-primary" />
          Simulated Terminal
        </CardTitle>
        <CardDescription>
          Practice Git commands here. This is a simulation for guidance.
          Type commands as shown in the walkthrough and press Enter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full rounded-md border bg-muted/30 p-4 mb-4" ref={scrollAreaRef}>
          {history.map((item, index) => (
            <div key={index} className="mb-2 font-mono text-sm">
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-primary mr-1 flex-shrink-0" />
                <span className="text-foreground">{item.command}</span>
              </div>
              <div className={`whitespace-pre-wrap pl-5 ${item.isError ? 'text-destructive' : 'text-muted-foreground'}`}>
                {item.output}
              </div>
            </div>
          ))}
           <div className="flex items-center font-mono text-sm">
              <ChevronRight className="h-4 w-4 text-primary mr-1 flex-shrink-0" />
              <span className="text-foreground">{inputValue}</span>
              <span className="animate-pulse">_</span>
            </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your command..."
            className="font-mono flex-grow"
            aria-label="Terminal input"
          />
          <Button type="submit" variant="default">
            Run
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
