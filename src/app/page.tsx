
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WalkthroughGuide } from '@/components/repo-flow/WalkthroughGuide';
import { EmbeddedTerminal } from '@/components/repo-flow/EmbeddedTerminal';
import { MouseGlowEffect } from '@/components/mouse-glow-effect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <MouseGlowEffect className="rounded-lg">
          <section className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Master Your Deployment Workflow
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              RepoFlow provides a step-by-step guide to link your local app to GitHub and deploy with Vercel,
              complete with an AI assistant to help you troubleshoot any issues along the way.
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

          {/* Removed "Why RepoFlow?" section and its Separator */}
          {/* <Separator className="my-12 md:my-16" />

          <section className="mb-12 md:mb-16">
             <h3 className="text-3xl font-bold text-center text-foreground mb-8">Why RepoFlow?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Guided Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Clear, concise instructions for each stage of the Git & Vercel process.</CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Interactive Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Simulated terminal and visual aids to enhance understanding.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </section> */}
        </MouseGlowEffect>
      </main>
      <Footer />
    </div>
  );
}
