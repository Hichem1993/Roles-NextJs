"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { registerUser, type UserData } from "@/app/inscription/actions"
import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

export function Formulaire() {
    
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<UserData>({
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: UserData) => {
    setStatus({ type: null, message: "" })

    // Appel l'action
    const result = await registerUser(data)

    if (result.success) {
      reset()
      setStatus({
        type: "success",
        message: result.message,
      })
    } else {
      setStatus({
        type: "error",
        message: result.message,
      })
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Inscription</CardTitle>
        <CardDescription>Veuillez remplir le formulaire pour vous inscrire</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {status.message && (
            <div
              className={`p-3 rounded-md flex items-center gap-2 ${
                status.type === "success"
                  ? "bg-green-50 text-green-700"
                  : status.type === "error"
                    ? "bg-red-50 text-red-700"
                    : ""
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle className="h-5 w-5" />
              ) : status.type === "error" ? (
                <AlertCircle className="h-5 w-5" />
              ) : null}
              <p>{status.message}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              {...register("nom", {
                required: "Le nom est requis",
                minLength: { value: 2, message: "Le nom doit contenir au moins 2 caractères" },
              })}
            />
            {errors.nom && <p className="text-sm text-red-500 mt-1">{errors.nom.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom</Label>
            <Input
              id="prenom"
              {...register("prenom", {
                required: "Le prénom est requis",
                minLength: { value: 2, message: "Le prénom doit contenir au moins 2 caractères" },
              })}
            />
            {errors.prenom && <p className="text-sm text-red-500 mt-1">{errors.prenom.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Adresse email invalide",
                },
              })}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Le mot de passe est requis",
                minLength: { value: 6, message: "Le mot de passe doit contenir au moins 6 caractères" },
              })}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

