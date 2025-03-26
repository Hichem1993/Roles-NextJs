"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Inscrit() {
  return (
    <form className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="nom">Nom</Label>
      <Input id="nom" name="nom" required />
    </div>

    <div className="space-y-2">
      <Label htmlFor="prenom">Prénom</Label>
      <Input id="prenom" name="prenom" required />
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" name="email" type="email" required />
    </div>

    <div className="space-y-2">
      <Label htmlFor="phone">Téléphone</Label>
      <Input id="phone" name="phone" type="tel" required />
    </div>

    <Button type="submit" className="w-full">
        Inscription
    </Button>
  </form>
  );
}
