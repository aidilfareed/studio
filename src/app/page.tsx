import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CheckCircle, Code, Database, Palette, Zap } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { SubmissionCounter } from "@/components/submission-counter";
import { InterestForm } from "@/components/interest-form";

const features = [
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Modern Full-Stack",
    description: "Master Next.js 14, React Server Components, and the latest in web development for building high-performance applications."
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Rapid UI Development",
    description: "Leverage TailwindCSS and ShadCN UI to create beautiful, responsive, and consistent user interfaces with maximum efficiency."
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Serverless-First",
    description: "Build on a robust, scalable backend with Supabase for your database, authentication, and storage needs, all out-of-the-box."
  },
    {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "AI-Powered Features",
    description: "Integrate generative AI capabilities using Genkit to build intelligent, next-generation features that set your product apart."
  }
];

const whatYoullBuildFeatures = [
    { text: "A complete, production-ready web application from scratch." },
    { text: "Scalable backend architecture using serverless technologies." },
    { text: "AI-powered features that provide real user value." },
    { text: "A deployment pipeline for continuous integration and delivery." },
]

const deploymentFeatures = [
    { text: "Fine-tuned Next.js configuration for optimal performance and SEO.", boldText: "Optimized Build:" },
    { text: "Simplified environment setup for a smooth CI/CD pipeline.", boldText: "Environment Ready:" },
    { text: "A modern, serverless foundation that scales with your project's needs.", boldText: "Scalable Architecture:" },
]

const faqItems = [
  {
    question: "Is this course for beginners or experienced developers?",
    answer: "Project Forge is designed for developers with some foundational knowledge of HTML, CSS, and JavaScript. While we cover advanced topics, the project-based approach makes it accessible for those looking to level up from beginner tutorials to real-world application development."
  },
  {
    question: "What if I get stuck?",
    answer: "You'll have access to a dedicated community forum and instructor support to help you with any challenges you encounter. We're committed to helping you succeed and complete the project."
  },
  {
    question: "Do I need to pay for any of the tools or services used?",
    answer: "All the core technologies used in the course, including Next.js, Supabase, and Genkit, have generous free tiers that are more than sufficient for building and deploying your project. We'll guide you on how to stay within these free limits."
  },
  {
    question: "How long will I have access to the course materials?",
    answer: "You will have lifetime access to all course materials, including video lessons, source code, and community forums. You can learn at your own pace and revisit the content whenever you like."
  }
];

const FeatureCard = ({ icon, title, description }: { icon: ReactNode, title: string, description: string }) => (
  <Card className="text-center hover:shadow-lg transition-shadow duration-300 flex flex-col bg-card/50 backdrop-blur-sm">
    <CardHeader className="items-center">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground">{description}</p>
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
        <section id="hero" className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-5 lg:gap-12 items-center">
            <div className="lg:col-span-3 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight mb-4">
                Project Forge
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-foreground">
                Build & Ship Your MVP in 30 Days
              </p>
              <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-foreground/80">
                Join a guided, project-based course to build a production-ready application from scratch. Master the modern stack and launch your idea.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                 <SubmissionCounter />
              </div>
            </div>
            <div id="waitlist-form" className="lg:col-span-2 mt-12 lg:mt-0">
               <Card className="shadow-2xl bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Join the Course Waitlist</CardTitle>
                  <CardDescription>
                    Be the first to know when we launch. We'll send you an email when we're ready.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InterestForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">A Better Way to Learn Full-Stack Development</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Stop watching endless tutorials. Project Forge is a hands-on course that guides you through building a real-world application, giving you the skills and confidence to launch your own projects.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>
        
        <section id="what-youll-build" className="bg-secondary/50">
          <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
             <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What You'll Build</h2>
              <p className="text-lg text-foreground/80 mb-8">
                This isn't a toy project. You'll build a feature-complete application that you can deploy and add to your portfolio.
              </p>
              <ul className="space-y-4">
                {whatYoullBuildFeatures.map((feature, index) => (
                  <ListItem key={index}>
                    {feature.text}
                  </ListItem>
                ))}
              </ul>
            </div>
            <div>
              <Image 
                src="https://www.lifewire.com/thmb/m3LAzZuZc-jg8ozDvdOr7RLG1js=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/online-business-540487840-577047f23df78cb62c867e24.jpg"
                alt="A code editor showing React code"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="code editor"
              />
            </div>
          </div>
        </section>

        <section id="deployment" className="container mx-auto">
          <div className="px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-last md:order-first">
               <Image 
                src="https://www.orange-business.com/sites/default/files/illustration-obs---conseil-%26-transformation---integration-%26-deploiement.png"
                alt="Cloud deployment dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="dashboard webapp"
              />
            </div>
            <div>
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
          </div>
        </section>
        
        <section id="faq" className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
             <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common questions about the course, prerequisites, and what you'll learn.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
