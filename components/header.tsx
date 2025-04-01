
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/login/actions";

export default async function HeaderPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Récupérer les données du user connecté
  const { data: users }  = await supabase.from("users").select("*").single();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {users?.roles === "Admin" ? (
            <>
              <Link href="/accueil">Accueil</Link>
              <Link href="/admin">Admin</Link>
            </>
          ) : (
              <Link href="/accueil">Accueil</Link>
          ) }

          {user !== null ? (
              <form action={signOut} className="flex items-center gap-2">
                <p>{user.email}</p>
                <Button>Sign Out</Button>
              </form>
            ) : (
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}  

  
      </div>
    </header>
  )
}