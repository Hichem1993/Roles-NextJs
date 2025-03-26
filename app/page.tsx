import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-6 text-center">
      <h1 className="text-4xl font-bold">Bienvenue</h1>
      <div className="flex gap-4">
        <Button variant="outline" asChild size="lg">
          <Link href="/login">Connexion</Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/inscription">Inscription</Link>
        </Button>
      </div>
    </div>
    </>
  );
}