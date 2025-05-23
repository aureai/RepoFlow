
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Github, ArrowUpCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    id: "what-is-github",
    question: "What is GitHub?",
    Icon: Github,
    answer: [
      "Think of <strong>GitHub</strong> as a super-powered online backup and collaboration hub for your app's code. It's like a special kind of cloud storage designed specifically for software projects.",
      "It uses a system called 'Git' to keep track of every change you make, creating a history of versions. This means you can always go back to an older version if something goes wrong.",
      "You can share your code with others, work on projects together, and see who changed what and when. It's like 'Google Docs' for code, but much more powerful for developers.",
      "In this guide, we use <strong>GitHub</strong> to store your app's code so that <strong>Vercel</strong> (our deployment platform) can access it and put your website online."
    ],
  },
  {
    id: "what-is-vercel",
    question: "What is Vercel?",
    Icon: ArrowUpCircle,
    answer: [
      "<strong>Vercel</strong> is a platform that makes your website (often built with modern web technologies) live on the internet incredibly easily. It's especially good for web apps because <strong>Vercel</strong> is made by the creators of some of those tools.",
      "It takes your app's code (from your <strong>GitHub</strong> repository, in our case) and 'builds' it into a working website that anyone can visit using a web address (URL).",
      "<strong>Vercel</strong> handles all the complicated server stuff, deployment processes, and scaling, so you don't have to worry about managing infrastructure. It makes your website run fast and efficiently.",
      "A key feature is that <strong>Vercel</strong> can automatically update your live website whenever you update your code on <strong>GitHub</strong>, which is super handy!"
    ],
  },
  {
    id: "how-to-update-vercel",
    question: "How do I update my code on Vercel?",
    Icon: RefreshCw,
    answer: [
      "Updating your app is simpler than you might think, especially with this setup!",
      "1. First, make your code changes right in your <strong>Firebase code viewer</strong> or your usual code editor.",
      "2. When your changes are ready, head to the <strong>Source Control</strong> panel. In Firebase's code view, this is usually on the left side bar.",
      "3. Look for an option like '<strong>Sync Changes</strong>', 'Commit and Push', or a button that does something similar (it might have an up arrow icon). You'll often be asked to type a short message describing your update (like 'Updated homepage text'). Click that button!",
      "4. This action sends your updates to <strong>GitHub</strong>.",
      "5. <strong>Vercel then automatically sees</strong> these new changes on GitHub. It will rebuild and redeploy your app. Your live website will show the updates in just a few minutes.",
      "And that's pretty much it! You don't usually need to go to the Vercel website for simple updates. Just keep your code synced from Firebase to GitHub, and Vercel takes care of the rest."
    ],
  },
];

export function FAQ() {
  return (
    <Card className="shadow-xl mt-12">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <HelpCircle className="h-7 w-7 text-primary" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqData.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b-0">
               <Card className="bg-card hover:bg-muted/30 transition-colors duration-200">
                <AccordionTrigger className={cn(
                  "p-4 text-left hover:no-underline text-lg w-full",
                  "data-[state=open]:bg-primary/10 data-[state=open]:shadow-inner rounded-md" 
                )}>
                  <div className="flex items-center gap-3">
                    <item.Icon className="h-6 w-6 text-primary flex-shrink-0" />
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3 text-foreground/80 pl-9">
                    {item.answer.map((paragraph, index) => (
                      <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/<strong>(.*?)<\/strong>/g, '<strong class="text-foreground/90">$1</strong>').replace(/<code>(.*?)<\/code>/g, '<code class="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">$1</code>') }} />
                    ))}
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
