"use server"

import { createClient } from "@/utils/supabase/server"

export type UserData = {
    nom: string
    prenom: string
    email: string
    password: string
  }
  
  export async function registerUser(data: UserData) {
    const supabase = await createClient();
    try {
      const { error } = await supabase.from("users").insert([
        {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          password: data.password,
        },
      ])
  
      if (error) {
        return { success: false, message: error.message }
      }
  
      return { success: true, message: "Inscription réussie !" }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Une erreur s'est produite lors de l'inscription.",
      }
    }
  }