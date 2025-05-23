
"use client";
import type { ReactElement } from 'react';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WalkthroughGuide } from '@/components/repo-flow/WalkthroughGuide';
import { MouseGlowEffect } from '@/components/mouse-glow-effect';
import { FAQ } from '@/components/repo-flow/FAQ';
import { Button } from '@/components/ui/button'; // Added for language toggle
import { Globe } from 'lucide-react'; // Added for language toggle icon

interface PageText {
  title: string;
  description: ReactElement;
  languageButton: string;
}

const pageTextContent: Record<'en' | 'es', PageText> = {
  en: {
    title: "RepoFlow: Your Guide to Publishing Your Firebase App",
    description: (
      <>
        Ready to share your app with the world? If you built it with a visual tool, the first step is to switch to <strong className="text-primary">'Code View'</strong> (look for an icon, often in the top-right!). RepoFlow then walks you through getting your app&apos;s code onto <strong>GitHub</strong> and live with <strong>Vercel</strong>.
      </>
    ),
    languageButton: "Español",
  },
  es: {
    title: "RepoFlow: Tu Guía para Publicar Tu App de Firebase",
    description: (
      <>
        ¿Listo para compartir tu app con el mundo? Si la creaste con una herramienta visual, el primer paso es cambiar a la <strong className="text-primary">'Vista de Código'</strong> (¡busca un ícono, usualmente arriba a la derecha!). RepoFlow te guiará para poner el código de tu app en <strong>GitHub</strong> y publicarla con <strong>Vercel</strong>.
      </>
    ),
    languageButton: "English",
  }
};

export default function HomePage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'es' : 'en'));
  };

  const currentText = pageTextContent[language];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="w-full max-w-5xl mb-4 flex justify-end">
          <Button onClick={toggleLanguage} variant="outline" size="sm">
            <Globe className="mr-2 h-4 w-4" />
            {currentText.languageButton}
          </Button>
        </div>
        <MouseGlowEffect className="rounded-lg w-full max-w-5xl">
          <section className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              {currentText.title}
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              {currentText.description}
            </p>
          </section>

          <div className="w-full mb-12">
            <WalkthroughGuide currentLanguage={language} />
          </div>
          
          <div className="w-full max-w-4xl mx-auto">
            <FAQ currentLanguage={language} />
          </div>
        </MouseGlowEffect>
      </main>
      <Footer />
    </div>
  );
}
