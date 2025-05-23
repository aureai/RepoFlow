
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WalkthroughGuide } from '@/components/repo-flow/WalkthroughGuide';
import { EmbeddedTerminal } from '@/components/repo-flow/EmbeddedTerminal';
import { MouseGlowEffect } from '@/components/mouse-glow-effect';
import { FAQ } from '@/components/repo-flow/FAQ';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <MouseGlowEffect className="rounded-lg">
          <section className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Firebase Code to Live App: The Simple Way!
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Welcome to RepoFlow! Using a Firebase visual tool (like Prototyper)? Great! The <strong className="text-primary">first step is to switch to 'Code View'</strong> in that tool (look for an icon, maybe top-right). This guide helps you <strong className="text-primary">right after that</strong> – once you see your project's files and folders. We'll walk you through getting your web app (likely Next.js) onto GitHub and live with Vercel.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <WalkthroughGuide />
            </div>

            <div className="space-y-8">
              <EmbeddedTerminal />
            </div>
          </div>
          <FAQ />
        </MouseGlowEffect>
      </main>
      <Footer />
    </div>
  );
}
