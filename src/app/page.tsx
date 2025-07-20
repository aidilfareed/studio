import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CheckCircle, Code, Database, FolderGit, Palette } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { SubmissionCounter } from "@/components/submission-counter";
import { InterestForm } from "@/components/interest-form";

const features = [
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Next.js 14+ Foundation",
    description: "Start with the latest Next.js features, including the App Router and TypeScript support, for a high-performance, scalable web application."
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "TailwindCSS Styled",
    description: "Comes with TailwindCSS pre-configured. A utility-first CSS framework for rapid UI development and beautiful, consistent designs."
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Supabase Ready",
    description: "Integrated Supabase client library. Easily connect to your Supabase backend for database, authentication, and storage."
  },
  {
    icon: <FolderGit className="h-10 w-10 text-primary" />,
    title: "Modern Structure",
    description: "A well-organized project structure that promotes code reusability, maintainability, and follows community best practices."
  }
];

const deploymentFeatures = [
    { text: "Next.js configuration is fine-tuned for performance.", boldText: "Optimized Build:" },
    { text: "Simple environment variable setup for a smooth CI/CD pipeline.", boldText: "Environment Ready:" },
    { text: "Built on a foundation that grows with your project's needs.", boldText: "Scalable Architecture:" },
]

const FeatureCard = ({ icon, title, description }: { icon: ReactNode, title: string, description: string }) => (
  <Card className="text-center hover:shadow-lg transition-shadow duration-300 flex flex-col bg-card">
    <CardHeader className="items-center">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const ListItem = ({ children }: { children: ReactNode }) => (
  <li className="flex items-start">
    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
    <span className="text-foreground/80">{children}</span>
  </li>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-black text-primary tracking-tight">
            Welcome to Project Forge
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
            Effortlessly scaffold modern, production-ready Next.js applications with best practices built-in.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">Join the Waitlist</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Join the Project Forge Waitlist</DialogTitle>
                  <DialogDescription>
                    Be the first to know when we launch. We'll send you an email when we're ready.
                  </DialogDescription>
                </DialogHeader>
                <InterestForm />
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-8">
            <SubmissionCounter />
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 md:pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>
        
        <section className="bg-secondary/50">
          <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Optimized for Deployment</h2>
              <p className="text-lg text-foreground/80 mb-8">
                Project Forge is configured for seamless deployment on modern platforms. Get your project from development to production faster than ever.
              </p>
              <ul className="space-y-4">
                {deploymentFeatures.map((feature, index) => (
                  <ListItem key={index}>
                    <strong>{feature.boldText}</strong> {feature.text}
                  </ListItem>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <Image 
                src="https://placehold.co/600x400.png"
                alt="Project Forge Interface"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="dashboard webapp"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
