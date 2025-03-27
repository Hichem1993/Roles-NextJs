"use server";

import { SingupForm } from "@/components/form";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: SingupForm) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        firstName: formData.prenom,
        lastName: formData.nom,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    return {
      code: error.code,
      message: error.message,
    };
  }

  return null;
}




