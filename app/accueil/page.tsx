import HeaderPage from "@/components/header";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";


type Car = {
  id: number
  marque: string
  modele: string
  kilometrage: number
  annee: number
  image_url?: string
}


async function getCars() {

  const supabase = await createClient();
  const { data, error } = await supabase.from("car").select("*")

  if (error) {
    console.error("Erreur lors de la récupération des voitures:", error)
    return []
  }

  return data as Car[]
}

export default async function Accueil() {

  const cars = await getCars()

  return (
    <>
    <HeaderPage />
    <h1 className="text-4xl text-center p-5">Accueil</h1>

    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Notre catalogue de voitures</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={car.image_url || "https://placehold.co/600x400"}
                alt={`${car.marque} ${car.modele}`}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>
                {car.marque} {car.modele}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">
                  <span className="font-medium">Année:</span>
                  <p>{car.annee}</p>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Kilométrage:</span>
                  <p>{car.kilometrage.toLocaleString()} km</p>
                </div>
              </div>
            </CardContent>

          </Card>
        ))}
      </div>

      {cars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Aucune voiture trouvée</p>
        </div>
      )}
    </div>
    </>
  )
}
