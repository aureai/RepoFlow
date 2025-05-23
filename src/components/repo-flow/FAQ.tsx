
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Github, ArrowUpCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemData {
  id: string;
  question: { en: string; es: string };
  Icon: typeof HelpCircle; // Or a more specific LucideIcon type
  answer: { en: string[]; es: string[] };
}

const faqData: FAQItemData[] = [
  {
    id: "what-is-github",
    question: {
      en: "What is GitHub?",
      es: "¿Qué es GitHub?"
    },
    Icon: Github,
    answer: {
      en: [
        "Think of <strong>GitHub</strong> as a super-powered online backup and collaboration hub for your app's code. It's like a special kind of cloud storage designed specifically for software projects.",
        "It uses a system called 'Git' to keep track of every change you make, creating a history of versions. This means you can always go back to an older version if something goes wrong.",
        "You can share your code with others, work on projects together, and see who changed what and when. It's like 'Google Docs' for code, but much more powerful for developers.",
        "In this guide, we use <strong>GitHub</strong> to store your app's code so that <strong>Vercel</strong> (our deployment platform) can access it and put your website online."
      ],
      es: [
        "Piensa en <strong>GitHub</strong> como un centro de respaldo en línea y colaboración superpoderoso para el código de tu app. Es como un tipo especial de almacenamiento en la nube diseñado específicamente para proyectos de software.",
        "Usa un sistema llamado 'Git' para rastrear cada cambio que haces, creando un historial de versiones. Esto significa que siempre puedes volver a una versión anterior si algo sale mal.",
        "Puedes compartir tu código con otros, trabajar en proyectos juntos y ver quién cambió qué y cuándo. Es como 'Google Docs' para código, pero mucho más potente para desarrolladores.",
        "En esta guía, usamos <strong>GitHub</strong> para almacenar el código de tu app para que <strong>Vercel</strong> (nuestra plataforma de despliegue) pueda acceder a él y poner tu sitio web en línea."
      ]
    },
  },
  {
    id: "what-is-vercel",
    question: {
      en: "What is Vercel?",
      es: "¿Qué es Vercel?"
    },
    Icon: ArrowUpCircle,
    answer: {
      en: [
        "<strong>Vercel</strong> is a platform that makes your website (often built with modern web technologies) live on the internet incredibly easily. It's especially good for web apps because <strong>Vercel</strong> is made by the creators of some of those tools.",
        "It takes your app's code (from your <strong>GitHub</strong> repository, in our case) and 'builds' it into a working website that anyone can visit using a web address (URL).",
        "<strong>Vercel</strong> handles all the complicated server stuff, deployment processes, and scaling, so you don't have to worry about managing infrastructure. It makes your website run fast and efficiently.",
        "A key feature is that <strong>Vercel</strong> can automatically update your live website whenever you update your code on <strong>GitHub</strong>, which is super handy!"
      ],
      es: [
        "<strong>Vercel</strong> es una plataforma que hace que tu sitio web (a menudo construido con tecnologías web modernas) esté en vivo en internet de manera increíblemente fácil. Es especialmente bueno para aplicaciones web porque <strong>Vercel</strong> está hecho por los creadores de algunas de esas herramientas.",
        "Toma el código de tu app (de tu repositorio de <strong>GitHub</strong>, en nuestro caso) y lo 'construye' en un sitio web funcional que cualquiera puede visitar usando una dirección web (URL).",
        "<strong>Vercel</strong> maneja todas las cosas complicadas del servidor, los procesos de despliegue y el escalado, para que no tengas que preocuparte por gestionar la infraestructura. Hace que tu sitio web funcione rápido y eficientemente.",
        "Una característica clave es que <strong>Vercel</strong> puede actualizar automáticamente tu sitio web en vivo cada vez que actualizas tu código en <strong>GitHub</strong>, ¡lo cual es súper útil!"
      ]
    },
  },
  {
    id: "how-to-update-vercel",
    question: {
      en: "How do I update my code on Vercel?",
      es: "¿Cómo actualizo mi código en Vercel?"
    },
    Icon: RefreshCw,
    answer: {
      en: [
        "It's simple! Once your app is connected:",
        "1. Make code changes in your Firebase code viewer.",
        "2. Go to the <strong>Source Control</strong> panel (usually on the left sidebar).",
        "3. Click '<strong>Sync Changes</strong>' (or similar button). This sends your updates to <strong>GitHub</strong>.",
        "4. <strong>Vercel automatically sees</strong> these GitHub changes and updates your live site. Wait a few moments, and it's done!"
      ],
      es: [
        "¡Es sencillo! Una vez que tu app está conectada:",
        "1. Haz cambios en el código en tu visor de código de Firebase.",
        "2. Ve al panel de <strong>Source Control</strong> (Control de Fuentes, usualmente en la barra lateral izquierda).",
        "3. Haz clic en '<strong>Sync Changes</strong>' (Sincronizar Cambios) (o un botón similar). Esto envía tus actualizaciones a <strong>GitHub</strong>.",
        "4. <strong>Vercel automáticamente ve</strong> estos cambios de GitHub y actualiza tu sitio en vivo. Espera unos momentos, ¡y listo!"
      ]
    },
  },
];

interface FAQProps {
  currentLanguage: 'en' | 'es';
}

export function FAQ({ currentLanguage }: FAQProps) {
  const faqTitle = currentLanguage === 'en' ? "Frequently Asked Questions" : "Preguntas Frecuentes";
  return (
    <Card className="shadow-xl mt-12">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <HelpCircle className="h-7 w-7 text-primary" />
          {faqTitle}
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
                    {item.question[currentLanguage]}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3 text-foreground/80 pl-9">
                    {item.answer[currentLanguage].map((paragraph, index) => (
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
