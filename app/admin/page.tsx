"use client"

import type React from "react"

import { useState } from "react"
import { addCar } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"


const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

// Récupérer les données du user connecté
const { data: users }  = await supabase.from("users").select("*").single();

if (users?.roles !== "Admin") {
  redirect("/accueil");
}

export default async function AddCarPage() {
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    marque: "",
    modele: "",
    kilometrage: "",
    annee: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await addCar({
        marque: formData.marque,
        modele: formData.modele,
        kilometrage: Number.parseInt(formData.kilometrage),
        annee: `${formData.annee}-01-01`, // Transformer en format YYYY-MM-DD
      })

      if (result.error) throw new Error(result.error)

      Alert({
        title: "Voiture ajoutée avec succès",
      })

      // Réinitialiser le formulaire
      setFormData({
        marque: "",
        modele: "",
        kilometrage: "",
        annee: "",
      })
    } catch (error: any) {
      console.error("Erreur lors de l'ajout:", error)
      Alert({
        title: "Erreur",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Ajouter une voiture</CardTitle>
            <CardDescription>Entrez les détails de la voiture à ajouter dans la base de données</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="marque">Marque</Label>
                <Input id="marque" name="marque" value={formData.marque} onChange={handleChange} required placeholder="Mercedes" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modele">Modèle</Label>
                <Input id="modele" name="modele" value={formData.modele} onChange={handleChange} required placeholder="Classe E Berline" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kilometrage">Kilométrage</Label>
                <Input
                  id="kilometrage"
                  name="kilometrage"
                  type="number"
                  value={formData.kilometrage}
                  onChange={handleChange}
                  required
                  placeholder="100 000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annee">Année</Label>
                <Input id="annee" name="annee" type="number" min="1900" max="2100" value={formData.annee} onChange={handleChange} required placeholder="2015" />
              </div>
            </CardContent>
            <CardFooter className="mt-6">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ajout en cours..." : "Ajouter la voiture"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  )
}

