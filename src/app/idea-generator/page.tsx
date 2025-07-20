import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { IdeaGenerator } from "@/components/idea-generator";

export default function IdeaGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">MVP Idea Generator</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Stuck for an idea? Enter a topic and let our AI spark your creativity!
          </p>
        </div>
        <IdeaGenerator />
      </main>
      <Footer />
    </div>
  );
}
