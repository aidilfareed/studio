import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RoadmapGenerator } from "@/components/roadmap-generator";

export default function RoadmapGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">MVP Roadmap Generator</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Turn your idea into an actionable plan. Let AI outline your first steps.
          </p>
        </div>
        <RoadmapGenerator />
      </main>
      <Footer />
    </div>
  );
}
