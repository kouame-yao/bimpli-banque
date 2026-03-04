"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cartes() {
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    setMessage("Veuillez Patientez...");
    const ms = setTimeout(() => {
      setMessage(
        "Un probleme est survenue lors des chargement de vos donnée veillez réessayez ultérieurement ",
      );
    }, 3000);

    return () => {
      clearTimeout(ms);
    };
  }, []);
  const route = useRouter();
  return (
    <div className="grid justify-center items-center text-center min-h-screen">
      <span>{message}</span>

      {message !== "Veuillez Patientez..." && (
        <button
          className="btn bg-teal-500 box-border "
          onClick={() => route.back()}
        >
          Retour
        </button>
      )}
    </div>
  );
}
