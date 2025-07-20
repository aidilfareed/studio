import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/types/database";
import { Check, X, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Submission = Database['public']['Tables']['interest_submissions']['Row'];

async function getSubmissions(): Promise<Submission[]> {
  const { data, error } = await supabase
    .from('interest_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }

  return data;
}

export default async function AdminPage() {
  const submissions = await getSubmissions();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">View waitlist submissions.</p>
          </div>
          <Link href="/admin/broadcast">
            <Button>
              <Send className="mr-2" />
              Send Broadcast
            </Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Interest Submissions</CardTitle>
            <CardDescription>
              A total of {submissions.length} users have joined the waitlist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead className="text-center">Subscribed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={submission.subscribed_to_updates ? "default" : "secondary"}>
                        {submission.subscribed_to_updates ? 
                          <Check className="h-4 w-4 mr-1" /> : 
                          <X className="h-4 w-4 mr-1" />
                        }
                        {submission.subscribed_to_updates ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
