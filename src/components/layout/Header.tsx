
import { Github, Layers, Moon, Sun } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-border/60">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-primary"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M12 3V1" />
            <path d="M5 5l-1.41-1.41" />
            <path d="M19 5l1.41-1.41" />
            <path d="M12 21v2" />
             <path d="m18 13.8-.09.09a2.5 2.5 0 0 1-3.32 0A2.5 2.5 0 0 1 14.5 12a2.5 2.5 0 0 1 0-3.32 2.5 2.5 0 0 1 3.32 0l.09.09" />
            <path d="m6 13.8.09.09a2.5 2.5 0 0 0 3.32 0A2.5 2.5 0 0 0 9.5 12a2.5 2.5 0 0 0 0-3.32 2.5 2.5 0 0 0-3.32 0L6 6.2" />
             <line x1="9.5" x2="14.5" y1="12" y2="12" />
          </svg>
          <h1 className="text-3xl font-bold text-foreground">
            Repo<span className="text-primary">Flow</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-200">
            <Github className="h-6 w-6" />
          </a>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" aria-label="Vercel" className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-200">
            <Layers className="h-6 w-6" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
