
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
              Welcome to RepoFlow! So, you've been using a Firebase visual tool (like Prototyper) to build your app? Awesome! The very first thing to do is hop over to <strong className="text-primary">'Code View'</strong> in that tool. You'll usually find an icon for this, often in the top-right corner. This guide is your next step, kicking in once you can see all your project's files and folders. We'll smoothly guide you through getting your web app (it's probably a Next.js one!) onto GitHub and then live on the internet with Vercel.
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
