import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BroadcastForm } from "@/components/broadcast-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BroadcastPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="outline">
              <ArrowLeft className="mr-2" />
              Back to Admin
            </Button>
          </Link>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Send a Broadcast</CardTitle>
              <CardDescription>
                Compose a message to send to all subscribed users on the waitlist. This is a simulation and will log to the console.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BroadcastForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
