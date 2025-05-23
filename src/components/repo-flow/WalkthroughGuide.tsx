
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TerminalSquareIcon, Github, Rocket, AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { WalkthroughStep, type StepContent } from './WalkthroughStep';
import { cn } from '@/lib/utils';

interface LanguageSpecificContent {
  title: string;
  instructions: React.ReactNode[];
  alerts?: Array<{
    type: 'warning' | 'info' | 'note';
    Icon?: typeof AlertTriangle | typeof Info | typeof Lightbulb; // Use component types
    title?: { en: string; es: string };
    message: { en: React.ReactNode; es: React.ReactNode };
  }>;
}

export interface ExtendedStepContent extends Omit<StepContent, 'title' | 'instructions' | 'alerts'> {
  id: string; // Ensure id is still here
  Icon?: typeof TerminalSquareIcon | typeof Github | typeof Rocket; // Use component types
  content: {
    en: LanguageSpecificContent;
    es: LanguageSpecificContent;
  };
  commands?: string[]; // Commands are not translated
}


const initialSteps: ExtendedStepContent[] = [
  {
    id: 'prepare-code',
    Icon: TerminalSquareIcon,
    content: {
      en: {
        title: "1. Get Your Code Ready & Tools Open",
        instructions: [
          <React.Fragment key="instr1-en-1">First up! If you were using a visual tool, make sure you've switched to '<strong className="text-primary">Code View</strong>' (look for an icon, often in the top-right!). This guide is for when you can see all your project's files.</React.Fragment>,
          <React.Fragment key="instr1-en-2">In your code editor (like the one in Firebase's <strong className="text-primary">Code View</strong>), open the <strong className="text-primary">Terminal</strong> (Command Line) and have your <strong className="text-primary">Project's File Directory</strong> visible. You'll often find the Terminal at the bottom of the code editor screen.</React.Fragment>,
          <React.Fragment key="instr1-en-3">Time to save your app's current version. In your <strong className="text-primary">Terminal</strong>, type these commands one by one, pressing Enter after each:</React.Fragment>,
        ],
        alerts: [
          {
            type: 'info',
            Icon: Info,
            title: { en: "What these commands do:", es: "Qué hacen estos comandos:" },
            message: {
              en: <React.Fragment>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git init</code>: Sets up Git for your project (you only do this once per project).<br/>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git add .</code>: Gets all your current project files ready to be saved.<br/>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git commit -m "..."</code>: Saves a snapshot (a version) of your files with a short note about what you did.
                  </React.Fragment>,
              es: <React.Fragment>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git init</code>: Configura Git para tu proyecto (solo lo haces una vez por proyecto).<br/>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git add .</code>: Prepara todos los archivos actuales de tu proyecto para ser guardados.<br/>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git commit -m "..."</code>: Guarda una instantánea (una versión) de tus archivos con una nota breve sobre lo que hiciste.
                  </React.Fragment>
            }
          },
          {
            type: 'note',
            Icon: Lightbulb,
            title: { en: "Pro Tip:", es: "Consejo Pro:" },
            message: {
              en: <React.Fragment>Keep your Firebase visual prototyper open in one browser tab and your code editor (like the one in Firebase's <strong className="text-primary">Code View</strong>) in another. This makes it easier to see your visual design and apply changes to the code. If you have questions about the code, remember you can often chat with AI assistants (like Gemini) directly within your code editor!</React.Fragment>,
              es: <React.Fragment>Mantén tu prototipador visual de Firebase abierto en una pestaña del navegador y tu editor de código (como el de la <strong className="text-primary">Vista de Código</strong> de Firebase) en otra. Esto facilita ver tu diseño visual y aplicar cambios al código. Si tienes preguntas sobre el código, ¡recuerda que a menudo puedes chatear con asistentes de IA (como Gemini) directamente en tu editor de código!</React.Fragment>
            }
          }
        ]
      },
      es: {
        title: "1. Prepara Tu Código y Abre Herramientas",
        instructions: [
          <React.Fragment key="instr1-es-1">¡Primero lo primero! Si estabas usando una herramienta visual, asegúrate de haber cambiado a la '<strong className="text-primary">Vista de Código</strong>' (¡busca un ícono, usualmente arriba a la derecha!). Esta guía es para cuando ya puedes ver todos los archivos de tu proyecto.</React.Fragment>,
          <React.Fragment key="instr1-es-2">En tu editor de código (como el de la <strong className="text-primary">Vista de Código</strong> de Firebase), abre la <strong className="text-primary">Terminal</strong> (Línea de Comandos) y ten visible el <strong className="text-primary">Directorio de Archivos de tu Proyecto</strong>. A menudo encontrarás la Terminal en la parte inferior de la pantalla del editor de código.</React.Fragment>,
          <React.Fragment key="instr1-es-3">Es hora de guardar la versión actual de tu app. En tu <strong className="text-primary">Terminal</strong>, escribe estos comandos uno por uno, presionando Enter después de cada uno:</React.Fragment>,
        ],
         alerts: [ // Spanish alerts copied from English, then translated
          {
            type: 'info',
            Icon: Info,
            title: { en: "What these commands do:", es: "Qué hacen estos comandos:" },
            message: {
                en: <React.Fragment>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git init</code>: Sets up Git for your project (you only do this once per project).<br/>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git add .</code>: Gets all your current project files ready to be saved.<br/>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git commit -m "..."</code>: Saves a snapshot (a version) of your files with a short note about what you did.
                  </React.Fragment>,
              es: <React.Fragment>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git init</code>: Configura Git para tu proyecto (solo lo haces una vez por proyecto).<br/>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git add .</code>: Prepara todos los archivos actuales de tu proyecto para ser guardados.<br/>
                    <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-accent shadow-sm border border-border/70">git commit -m "..."</code>: Guarda una instantánea (una versión) de tus archivos con una nota breve sobre lo que hiciste.
                  </React.Fragment>
            }
          },
          {
            type: 'note',
            Icon: Lightbulb,
            title: { en: "Pro Tip:", es: "Consejo Pro:" },
            message: {
              en: <React.Fragment>Keep your Firebase visual prototyper open in one browser tab and your code editor (like the one in Firebase's <strong className="text-primary">Code View</strong>) in another. This makes it easier to see your visual design and apply changes to the code. If you have questions about the code, remember you can often chat with AI assistants (like Gemini) directly within your code editor!</React.Fragment>,
              es: <React.Fragment>Mantén tu prototipador visual de Firebase abierto en una pestaña del navegador y tu editor de código (como el de la <strong className="text-primary">Vista de Código</strong> de Firebase) en otra. Esto facilita ver tu diseño visual y aplicar cambios al código. Si tienes preguntas sobre el código, ¡recuerda que a menudo puedes chatear con asistentes de IA (como Gemini) directamente en tu editor de código!</React.Fragment>
            }
          }
        ]
      }
    },
    commands: [
      'git init',
      'git add .',
      'git commit -m "Initial version of my app"'
    ],
  },
  {
    id: 'connect-github',
    Icon: Github,
    content: {
      en: {
        title: '2. Link Your Code to GitHub',
        instructions: [
          <React.Fragment key="instr2-en-1">Next, let&apos;s get your code onto <strong className="text-primary">GitHub</strong>.</React.Fragment>,
          <React.Fragment key="instr2-en-2">If you don&apos;t have a GitHub account, create one. Then, on <strong className="text-primary">GitHub</strong>, click <strong className="text-primary">New repository</strong>.</React.Fragment>,
          <React.Fragment key="instr2-en-3">Give your repository a name (like <code>my-cool-app</code>). You can choose if it&apos;s <strong className="text-primary">public</strong> (anyone can see) or <strong className="text-primary">private</strong> (only you and people you invite). A description is optional.</React.Fragment>,
          <React.Fragment key="instr2-en-4">After creating the repository, GitHub will show you some instructions. Look for the section that says '<strong className="text-primary">…or push an existing repository from the command line</strong>'.</React.Fragment>,
          <React.Fragment key="instr2-en-5">
            GitHub will give you a few commands. They&apos;ll look something like this (make sure to use{' '}
            <strong className="text-primary">YOUR actual GitHub username and repository name</strong> from the page!).
            Carefully copy these commands. You&apos;ll then switch back to the{' '}
            <strong className="text-primary">Terminal</strong> you opened earlier (inside your code editor or Firebase Code View) and paste these commands there, one at a time, pressing Enter after each one.
          </React.Fragment>
        ],
        alerts: [
          {
            type: 'info',
            Icon: Info,
            title: { en: "Logging into GitHub", es: "Iniciar Sesión en GitHub" },
            message: {
              en: <React.Fragment>
                When you run the <code>git push ...</code> command (the last one from GitHub), your{' '}
                <strong className="text-primary">Terminal</strong> will try to connect to your GitHub account.
                If it&apos;s your first time, GitHub needs to confirm it&apos;s you!
                <ul className="list-disc space-y-1 mt-2 ml-4">
                  <li>It might open a browser window for you to log in and authorize.</li>
                  <li>
                    Sometimes, especially if you&apos;re using a code editor like the one in Firebase, look out for a pop-up! This pop-up (often appearing in the <strong className="text-primary">bottom-right corner of your code viewport</strong>) might show you a short code (like{' '}
                    <code>XXXX-XXXX</code>). It will also tell you to open a specific GitHub webpage (like{' '}
                    <code>github.com/login/device</code>) in your browser and enter that code there. Your <strong className="text-primary">Terminal</strong> might also display similar instructions or the code.
                  </li>
                  <li>Or, it might ask for your GitHub username and a Personal Access Token (PAT) directly in the <strong className="text-primary">Terminal</strong>.</li>
                </ul>
                <br />
                Follow the prompts. This is a standard security step!
              </React.Fragment>,
              es: <React.Fragment>
                Cuando ejecutes el comando <code>git push ...</code> (el último de GitHub), tu{' '}
                <strong className="text-primary">Terminal</strong> intentará conectarse a tu cuenta de GitHub.
                ¡Si es tu primera vez, GitHub necesita confirmar que eres tú!
                <ul className="list-disc space-y-1 mt-2 ml-4">
                  <li>Podría abrirse una ventana del navegador para que inicies sesión y autorices.</li>
                  <li>
                    A veces, especialmente si usas un editor de código como el de Firebase, ¡busca un pop-up! Este pop-up (a menudo en la <strong className="text-primary">esquina inferior derecha de tu vista de código</strong>) podría mostrarte un código corto (como{' '}
                    <code>XXXX-XXXX</code>). También te dirá que abras una página web específica de GitHub (como{' '}
                    <code>github.com/login/device</code>) en tu navegador e ingreses ese código allí. Tu <strong className="text-primary">Terminal</strong> también podría mostrar instrucciones similares o el código.
                  </li>
                  <li>O podría pedirte tu nombre de usuario de GitHub y un Token de Acceso Personal (PAT) directamente en la <strong className="text-primary">Terminal</strong>.</li>
                </ul>
                <br />
                Sigue las instrucciones. ¡Es un paso de seguridad estándar!
              </React.Fragment>
            }
          },
          {
            type: 'warning',
            Icon: AlertTriangle,
            title: { en: 'CRITICAL: DO NOT SHARE YOUR API KEYS OR SECRETS!', es: 'CRÍTICO: ¡NO COMPARTAS TUS CLAVES API O SECRETOS!' },
            message: {
              en: "Before you push your code, double-check your project files. Make absolutely sure you are NOT uploading any API keys, passwords, or other sensitive information. Check your `.gitignore` file (it's in your project's main folder) to ensure files or folders containing secrets are listed there. If they aren't, add them! This is very important to keep your app and accounts secure.",
              es: "Antes de subir tu código, revisa bien los archivos de tu proyecto. Asegúrate ABSOLUTAMENTE de NO estar subiendo claves API, contraseñas u otra información sensible. Revisa tu archivo `.gitignore` (está en la carpeta principal de tu proyecto) para asegurar que los archivos o carpetas con secretos estén listados allí. ¡Si no lo están, agrégalos! Esto es muy importante para mantener tu app y tus cuentas seguras."
            }
          },
          {
            type: 'warning',
            Icon: AlertTriangle,
            title: { en: 'IMPORTANT: Keep Your Repo Empty on GitHub!', es: 'IMPORTANTE: ¡Mantén Tu Repositorio Vacío en GitHub!' },
            message: {
              en: "When creating the new repository on GitHub, do NOT check any boxes to add a README, .gitignore, or license. Your project already has these files. You need an empty canvas on GitHub for this step.",
              es: "Al crear el nuevo repositorio en GitHub, NO marques ninguna casilla para añadir un README, .gitignore o licencia. Tu proyecto ya tiene estos archivos. Necesitas un lienzo vacío en GitHub para este paso."
            }
          }
        ]
      },
      es: {
        title: '2. Conecta Tu Código a GitHub',
        instructions: [
          <React.Fragment key="instr2-es-1">A continuación, vamos a poner tu código en <strong className="text-primary">GitHub</strong>.</React.Fragment>,
          <React.Fragment key="instr2-es-2">Si no tienes una cuenta de GitHub, crea una. Luego, en <strong className="text-primary">GitHub</strong>, haz clic en <strong className="text-primary">New repository</strong> (Nuevo repositorio).</React.Fragment>,
          <React.Fragment key="instr2-es-3">Dale un nombre a tu repositorio (como <code>mi-app-genial</code>). Puedes elegir si es <strong className="text-primary">public</strong> (cualquiera puede verlo) o <strong className="text-primary">private</strong> (solo tú y las personas que invites). Una descripción es opcional.</React.Fragment>,
          <React.Fragment key="instr2-es-4">Después de crear el repositorio, GitHub te mostrará algunas instrucciones. Busca la sección que dice '<strong className="text-primary">…or push an existing repository from the command line</strong>' (…o sube un repositorio existente desde la línea de comandos).</React.Fragment>,
          <React.Fragment key="instr2-es-5">
            GitHub te dará algunos comandos. Se verán algo así (¡asegúrate de usar{' '}
            <strong className="text-primary">TU nombre de usuario y nombre de repositorio REALES</strong> de la página!).
            Copia cuidadosamente estos comandos. Luego volverás a la{' '}
            <strong className="text-primary">Terminal</strong> que abriste antes (dentro de tu editor de código o Vista de Código de Firebase) y pegarás estos comandos allí, uno por uno, presionando Enter después de cada uno.
          </React.Fragment>
        ],
        alerts: [ // Spanish alerts copied from English, then translated
          {
            type: 'info',
            Icon: Info,
            title: { en: "Logging into GitHub", es: "Iniciar Sesión en GitHub" },
            message: {
              en: <React.Fragment>
                When you run the <code>git push ...</code> command (the last one from GitHub), your{' '}
                <strong className="text-primary">Terminal</strong> will try to connect to your GitHub account.
                If it&apos;s your first time, GitHub needs to confirm it&apos;s you!
                <ul className="list-disc space-y-1 mt-2 ml-4">
                  <li>It might open a browser window for you to log in and authorize.</li>
                  <li>
                    Sometimes, especially if you&apos;re using a code editor like the one in Firebase, look out for a pop-up! This pop-up (often appearing in the <strong className="text-primary">bottom-right corner of your code viewport</strong>) might show you a short code (like{' '}
                    <code>XXXX-XXXX</code>). It will also tell you to open a specific GitHub webpage (like{' '}
                    <code>github.com/login/device</code>) in your browser and enter that code there. Your <strong className="text-primary">Terminal</strong> might also display similar instructions or the code.
                  </li>
                  <li>Or, it might ask for your GitHub username and a Personal Access Token (PAT) directly in the <strong className="text-primary">Terminal</strong>.</li>
                </ul>
                <br />
                Follow the prompts. This is a standard security step!
              </React.Fragment>,
              es: <React.Fragment>
                Cuando ejecutes el comando <code>git push ...</code> (el último de GitHub), tu{' '}
                <strong className="text-primary">Terminal</strong> intentará conectarse a tu cuenta de GitHub.
                ¡Si es tu primera vez, GitHub necesita confirmar que eres tú!
                <ul className="list-disc space-y-1 mt-2 ml-4">
                  <li>Podría abrirse una ventana del navegador para que inicies sesión y autorices.</li>
                  <li>
                    A veces, especialmente si usas un editor de código como el de Firebase, ¡busca un pop-up! Este pop-up (a menudo en la <strong className="text-primary">esquina inferior derecha de tu vista de código</strong>) podría mostrarte un código corto (como{' '}
                    <code>XXXX-XXXX</code>). También te dirá que abras una página web específica de GitHub (como{' '}
                    <code>github.com/login/device</code>) en tu navegador e ingreses ese código allí. Tu <strong className="text-primary">Terminal</strong> también podría mostrar instrucciones similares o el código.
                  </li>
                  <li>O podría pedirte tu nombre de usuario de GitHub y un Token de Acceso Personal (PAT) directamente en la <strong className="text-primary">Terminal</strong>.</li>
                </ul>
                <br />
                Sigue las instrucciones. ¡Es un paso de seguridad estándar!
              </React.Fragment>
            }
          },
          {
            type: 'warning',
            Icon: AlertTriangle,
            title: { en: 'CRITICAL: DO NOT SHARE YOUR API KEYS OR SECRETS!', es: 'CRÍTICO: ¡NO COMPARTAS TUS CLAVES API O SECRETOS!' },
            message: {
              en: "Before you push your code, double-check your project files. Make absolutely sure you are NOT uploading any API keys, passwords, or other sensitive information. Check your `.gitignore` file (it's in your project's main folder) to ensure files or folders containing secrets are listed there. If they aren't, add them! This is very important to keep your app and accounts secure.",
              es: "Antes de subir tu código, revisa bien los archivos de tu proyecto. Asegúrate ABSOLUTAMENTE de NO estar subiendo claves API, contraseñas u otra información sensible. Revisa tu archivo `.gitignore` (está en la carpeta principal de tu proyecto) para asegurar que los archivos o carpetas con secretos estén listados allí. ¡Si no lo están, agrégalos! Esto es muy importante para mantener tu app y tus cuentas seguras."
            }
          },
          {
            type: 'warning',
            Icon: AlertTriangle,
            title: { en: 'IMPORTANT: Keep Your Repo Empty on GitHub!', es: 'IMPORTANTE: ¡Mantén Tu Repositorio Vacío en GitHub!' },
            message: {
              en: "When creating the new repository on GitHub, do NOT check any boxes to add a README, .gitignore, or license. Your project already has these files. You need an empty canvas on GitHub for this step.",
              es: "Al crear el nuevo repositorio en GitHub, NO marques ninguna casilla para añadir un README, .gitignore o licencia. Tu proyecto ya tiene estos archivos. Necesitas un lienzo vacío en GitHub para este paso."
            }
          }
        ]
      }
    },
    commands: [
      'git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git',
      'git branch -M main',
      'git push -u origin main'
    ],
  },
  {
    id: 'deploy-vercel',
    Icon: Rocket,
    content: {
      en: {
        title: '3. Go Live with Vercel!',
        instructions: [
          <React.Fragment key="instr3-en-1">Awesome! Your code is now safely on <strong className="text-primary">GitHub</strong>. Let&apos;s get your app live on the internet using <strong className="text-primary">Vercel</strong>.</React.Fragment>,
          <React.Fragment key="instr3-en-2">Go to <strong className="text-primary">Vercel</strong>. If you sign up using your <strong className="text-primary">GitHub</strong> account, it makes things super smooth.</React.Fragment>,
          <React.Fragment key="instr3-en-3">On your <strong className="text-primary">Vercel</strong> dashboard, look for a button like '<strong className="text-primary">Add New...</strong>' then choose '<strong className="text-primary">Project</strong>'.</React.Fragment>,
          <React.Fragment key="instr3-en-4">Vercel will ask to connect to your <strong className="text-primary">GitHub</strong>. Allow it, then find and import the repository you just pushed your code to.</React.Fragment>,
          <React.Fragment key="instr3-en-5">Vercel is smart and usually figures out all the settings for your app automatically. The default settings are often all you need.</React.Fragment>,
          <React.Fragment key="instr3-en-6">Click '<strong className="text-primary">Deploy</strong>'.</React.Fragment>,
        ],
        alerts: [
          {
            type: 'info',
            Icon: Info,
            title: { en: 'How Vercel and Firebase Work Together', es: 'Cómo Vercel y Firebase Trabajan Juntos' },
            message: {
              en: "Vercel will host the 'front-end' of your app (what users see and interact with). Your Firebase 'back-end' (database, user authentication, etc.) still lives in Firebase and is managed through the Firebase console. Your app hosted on Vercel will talk to your Firebase services. Sometimes, you might need to tell Vercel about your Firebase project by adding details (like API keys) as 'Environment Variables' in your Vercel project settings. This helps Vercel connect to your Firebase services securely.",
              es: "Vercel alojará el 'front-end' de tu app (lo que los usuarios ven e interactúan). Tu 'back-end' de Firebase (base de datos, autenticación de usuarios, etc.) sigue viviendo en Firebase y se gestiona a través de la consola de Firebase. Tu app alojada en Vercel se comunicará con tus servicios de Firebase. A veces, puede que necesites informar a Vercel sobre tu proyecto de Firebase añadiendo detalles (como claves API) como 'Variables de Entorno' en la configuración de tu proyecto de Vercel. Esto ayuda a Vercel a conectarse de forma segura a tus servicios de Firebase."
            }
          },
          {
            type: 'note',
            Icon: Lightbulb,
            title: { en: 'Your App is Live!', es: '¡Tu App Está en Línea!' },
            message: {
              en: "Vercel will show you its progress. After a few minutes, it will give you a website address (URL). That's it – your app is live for the world to see!",
              es: "Vercel te mostrará su progreso. Después de unos minutos, te dará una dirección de sitio web (URL). ¡Eso es todo – tu app está en línea para que el mundo la vea!"
            }
          }
        ]
      },
      es: {
        title: '3. ¡Publica con Vercel!',
        instructions: [
          <React.Fragment key="instr3-es-1">¡Genial! Tu código ya está seguro en <strong className="text-primary">GitHub</strong>. Vamos a poner tu app en línea usando <strong className="text-primary">Vercel</strong>.</React.Fragment>,
          <React.Fragment key="instr3-es-2">Ve a <strong className="text-primary">Vercel</strong>. Si te registras usando tu cuenta de <strong className="text-primary">GitHub</strong>, todo es súper fácil.</React.Fragment>,
          <React.Fragment key="instr3-es-3">En tu panel de <strong className="text-primary">Vercel</strong>, busca un botón como '<strong className="text-primary">Add New...</strong>' (Añadir Nuevo...) y luego elige '<strong className="text-primary">Project</strong>' (Proyecto).</React.Fragment>,
          <React.Fragment key="instr3-es-4">Vercel te pedirá conectarse a tu <strong className="text-primary">GitHub</strong>. Permítelo, luego busca e importa el repositorio al que acabas de subir tu código.</React.Fragment>,
          <React.Fragment key="instr3-es-5">Vercel es inteligente y usualmente detecta todas las configuraciones para tu app automáticamente. Las configuraciones por defecto suelen ser todo lo que necesitas.</React.Fragment>,
          <React.Fragment key="instr3-es-6">Haz clic en '<strong className="text-primary">Deploy</strong>' (Desplegar).</React.Fragment>,
        ],
        alerts: [ // Spanish alerts copied from English, then translated
           {
            type: 'info',
            Icon: Info,
            title: { en: 'How Vercel and Firebase Work Together', es: 'Cómo Vercel y Firebase Trabajan Juntos' },
            message: {
              en: "Vercel will host the 'front-end' of your app (what users see and interact with). Your Firebase 'back-end' (database, user authentication, etc.) still lives in Firebase and is managed through the Firebase console. Your app hosted on Vercel will talk to your Firebase services. Sometimes, you might need to tell Vercel about your Firebase project by adding details (like API keys) as 'Environment Variables' in your Vercel project settings. This helps Vercel connect to your Firebase services securely.",
              es: "Vercel alojará el 'front-end' de tu app (lo que los usuarios ven e interactúan). Tu 'back-end' de Firebase (base de datos, autenticación de usuarios, etc.) sigue viviendo en Firebase y se gestiona a través de la consola de Firebase. Tu app alojada en Vercel se comunicará con tus servicios de Firebase. A veces, puede que necesites informar a Vercel sobre tu proyecto de Firebase añadiendo detalles (como claves API) como 'Variables de Entorno' en la configuración de tu proyecto de Vercel. Esto ayuda a Vercel a conectarse de forma segura a tus servicios de Firebase."
            }
          },
          {
            type: 'note',
            Icon: Lightbulb,
            title: { en: 'Your App is Live!', es: '¡Tu App Está en Línea!' },
            message: {
              en: "Vercel will show you its progress. After a few minutes, it will give you a website address (URL). That's it – your app is live for the world to see!",
              es: "Vercel te mostrará su progreso. Después de unos minutos, te dará una dirección de sitio web (URL). ¡Eso es todo – tu app está en línea para que el mundo la vea!"
            }
          }
        ]
      }
    },
  },
];

interface WalkthroughGuideProps {
  currentLanguage: 'en' | 'es';
}

export function WalkthroughGuide({ currentLanguage }: WalkthroughGuideProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [animationClass, setAnimationClass] = useState('animate-slide-in-from-right');


  const handleNext = () => {
    if (currentStepIndex < initialSteps.length - 1) {
      setAnimationClass('animate-slide-out-to-left');
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
        setAnimationClass('animate-slide-in-from-right');
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setAnimationClass('animate-slide-out-to-right');
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex - 1);
        setAnimationClass('animate-slide-in-from-left');
      }, 300);
    }
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    setCompletedSteps(prev => ({ ...prev, [id]: completed }));
  };

  const currentStepData = initialSteps[currentStepIndex];
  const stepContentForLanguage = currentStepData.content[currentLanguage];

  // Prepare the StepContent prop for WalkthroughStep
  const stepForWalkthroughStep: StepContent = {
    id: currentStepData.id,
    title: stepContentForLanguage.title,
    instructions: stepContentForLanguage.instructions,
    Icon: currentStepData.Icon,
    commands: currentStepData.commands,
    alerts: stepContentForLanguage.alerts?.map(alert => ({
        ...alert,
        title: alert.title?.[currentLanguage], // Select language for alert title
        message: alert.message[currentLanguage] // Select language for alert message
    }))
  };


  return (
    <div className="w-full">
      <div
        className={cn(
          'w-full max-w-5xl mx-auto h-[600px] md:h-[700px] flex items-center justify-center relative overflow-hidden',
        )}
      >
        {/* Animated container for the step itself */}
        <div 
            key={currentStepIndex} // Key for re-triggering animation
            className={cn("w-full max-w-4xl mx-auto h-full", animationClass)}
        >
            <WalkthroughStep
                step={stepForWalkthroughStep}
                currentLanguage={currentLanguage}
                stepNumber={currentStepIndex + 1}
                totalSteps={initialSteps.length}
                isCompleted={!!completedSteps[currentStepData.id]}
                onToggleComplete={handleToggleComplete}
            />
        </div>
        

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 disabled:opacity-30 p-2 rounded-full focus:ring-2 focus:ring-primary z-10 bg-background/30 hover:bg-background/70"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={currentStepIndex === initialSteps.length - 1}
          className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 disabled:opacity-30 p-2 rounded-full focus:ring-2 focus:ring-primary z-10 bg-background/30 hover:bg-background/70"
          aria-label="Next step"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
