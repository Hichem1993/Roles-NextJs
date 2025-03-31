"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

type Car = {
  marque: string
  modele: string
  kilometrage: number
  annee: number
}

export async function addCar(car: Car) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from("car").insert(car).select();
  
      if (error) {
        return { error: error.message };
      }
  
      // Redirection après insertion
      redirect("/accueil");
    } catch (error: any) {
      console.error("Erreur serveur:", error);
      return { error: error.message || "Une erreur s'est produite" };
    }
}
  