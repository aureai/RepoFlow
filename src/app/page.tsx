
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WalkthroughGuide } from '@/components/repo-flow/WalkthroughGuide';
import { EmbeddedTerminal } from '@/components/repo-flow/EmbeddedTerminal';
import { MouseGlowEffect } from '@/components/mouse-glow-effect';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <MouseGlowEffect className="rounded-lg">
          <section className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Take Your Firebase Next.js Frontend Code Live!
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              RepoFlow helps you when you've moved from a Firebase prototyping tool (or manual setup) 
              to the <strong className="text-primary">code version</strong> of your Next.js frontend. We'll guide you 
              through using GitHub for version control and Vercel for a professional live deployment.
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
        </MouseGlowEffect>
      </main>
      <Footer />
    </div>
  );
}
