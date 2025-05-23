
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WalkthroughGuide } from '@/components/repo-flow/WalkthroughGuide';
import { MouseGlowEffect } from '@/components/mouse-glow-effect';
import { FAQ } from '@/components/repo-flow/FAQ';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <MouseGlowEffect className="rounded-lg w-full max-w-5xl">
          <section className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              RepoFlow: Your Guide to Publishing Your Firebase App
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Ready to share your Firebase app with the world? If you built it with a visual tool, the first step is to switch to <strong className="text-primary">'Code View'</strong> (look for an icon, often in the top-right!). RepoFlow then walks you through getting your app&apos;s code onto GitHub and live with Vercel.
            </p>
          </section>

          <div className="w-full mb-12">
            <WalkthroughGuide />
          </div>
          
          <div className="w-full max-w-4xl">
            <FAQ />
          </div>
        </MouseGlowEffect>
      </main>
      <Footer />
    </div>
  );
}
