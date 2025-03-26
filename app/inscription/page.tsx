import { Formulaire } from "@/components/form";
import Header from "@/components/header";

export default function Inscription() {
  return (
    <>
        <Header />
      <div className="max-w-md mx-auto" id="registration-form">
          <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
          <Formulaire />
      </div>

    </>
  );
}