
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Github, ArrowUpCircle, RefreshCw } from "lucide-react";

const faqData = [
  {
    id: "what-is-github",
    question: "What is GitHub?",
    Icon: Github,
    answer: [
      "Think of GitHub as a super-powered online backup and collaboration hub for your code. It's like a special kind of cloud storage designed specifically for software projects.",
      "It uses a system called 'Git' to keep track of every change you make to your project, creating a history of versions. This means you can always go back to an older version if something goes wrong.",
      "You can share your code with others, work on projects together, and see who changed what and when. It's like 'Google Docs' for code, but much more powerful for developers.",
      "In this guide, we use GitHub to store your app's code so that Vercel (our deployment platform) can access it and put your website online."
    ],
  },
  {
    id: "what-is-vercel",
    question: "What is Vercel?",
    Icon: ArrowUpCircle,
    answer: [
      "Vercel is a platform that makes your website (often a Next.js application, which is a popular way to build the 'frontend' or visual part of your app) live on the internet incredibly easily. For Next.js apps, it's especially powerful because Vercel is made by the same creators.",
      "It takes your code (from your GitHub repository, in our case) and 'builds' it into a working website that anyone can visit using a web address (URL).",
      "Vercel handles all the complicated server stuff, deployment processes, and scaling, so you don't have to worry about managing infrastructure. It makes your website run fast and efficiently.",
      "A key feature is that Vercel can automatically update your live website whenever you update your code on GitHub, which is super handy!"
    ],
  },
  {
    id: "how-to-update-vercel",
    question: "How do I update my code on Vercel?",
    Icon: RefreshCw,
    answer: [
      "This is one of the best parts about using GitHub and Vercel together! Once you've set up your project and deployed it for the first time, updating it is very straightforward:",
      "1. **Make changes to your code:** Edit your project files in Firebase Studio (in Code View) or your preferred code editor.",
      "2. **Save your changes with Git (locally):** Just like you did during the initial setup, you need to tell Git about your new changes. Open your Terminal and type these commands:",
      "<ul class='list-disc list-inside pl-4 my-2 space-y-1'><li><code>git add .</code> (This gets all changed files ready to be saved. You can also do <code>git add &lt;specific_file_name&gt;</code> if you only want to save certain files.)</li><li><code>git commit -m \"Your clear message about what you updated\"</code> (This saves a snapshot of your changes with a descriptive message. For example, <code>git commit -m \"Updated the homepage text\"</code>)</li></ul>",
      "3. **Send your changes to GitHub:** Type this command in your Terminal: <code>git push origin main</code> (If your main branch has a different name, like <code>master</code>, use that instead of <code>main</code>).",
      "4. **Vercel takes over!** Vercel automatically watches your GitHub repository. When it sees your new 'push', it will start a new build and deployment process. Within a few minutes, your live website will be updated with your changes.",
      "You typically don't need to do anything directly on the Vercel website for updates after the initial setup. Just keep your GitHub repository updated, and Vercel handles the rest!"
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
               <Card className="bg-card hover:bg-muted/30 transition-colors">
                <AccordionTrigger className="p-4 text-left hover:no-underline text-lg">
                  <div className="flex items-center gap-3">
                    <item.Icon className="h-6 w-6 text-primary flex-shrink-0" />
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3 text-muted-foreground pl-9">
                    {item.answer.map((paragraph, index) => (
                      <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/<code>(.*?)<\/code>/g, '<code class="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">$1</code>') }} />
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
