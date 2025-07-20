import { Chatbot } from "@/components/chatbot";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">AI Chatbot</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Ask me anything about web development, Project Forge, or your MVP ideas!
          </p>
        </div>
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
}
