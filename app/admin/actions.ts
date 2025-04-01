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
    const supabase = await createClient();

    try {
      const { error } = await supabase.from("car").insert(car);
  
      if (error) {
        return { success: false, error: error.message };
      }
      
      
      return { success: true };
    } catch (error: any) {
      console.error("Erreur serveur:", error);
      return { success: false, error: error.message || "Une erreur s'est produite" };
    }
}


export async function redirectToAccueil() {
  redirect("/accueil");
}