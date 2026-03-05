"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtusBack from "../../../components/buttonsBack/ButtusBack";
import { color } from "../../../components/color/ColorBtn";

import Loading from "../../../components/animations/loading/loading";
import ErreurMessage from "../../../components/animations/MessageErreur/ErreurMessage";
import { SuccessAnimation } from "../../../components/animations/succes/Succes";
import { disabled } from "../../../components/userInfo/UserInfo";
import usePostBeneficiaire from "../../../services/lib/Requtes";

export default function Page() {
  const { PostBeneficiary, loading } = usePostBeneficiaire();
  const [animation, setAnimation] = useState(false);
  const [message, setMessage] = useState(false);

  type beneficiary = {
    Iban: string;
    Code_bic: string;
    Banque: string;
    Intitule: string;
    date?: Date | string;
  };

  const [input, setInput] = useState<beneficiary>({
    Iban: "",
    Code_bic: "",
    Banque: "",
    Intitule: "",
    date: new Date(),
  });

  const router = useRouter();

  const handleSubmit = (key: keyof beneficiary, value: string) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };
  const add = async () => {
    if (!input.Iban || !input.Banque || !input.Code_bic || !input.Intitule) {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
      console.log("Tout les champs sont obligatoire !");
      return;
    }

    await PostBeneficiary(input);
    setInput({
      Iban: "",
      Code_bic: "",
      Banque: "",
      Intitule: "",
      date: new Date(),
    });

    setAnimation(true);

    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  };
  return (
    <div>
      {message && <ErreurMessage message="Veillez remplir tout les champs" />}
      <main className="m-6 grid gap-4">
        <div>
          <ButtusBack click={() => router.back()} />
        </div>
        <section>
          <div className="mb-4">
            <h1 className="font-bold text-2xl">
              Ajouter un <br /> bénéficiaire
            </h1>
          </div>

          <div className="grid gap-3">
            {(Object.keys(input) as (keyof beneficiary)[])
              .slice(0, 4)
              .map((key) => (
                <div className="grid gap-3" key={key}>
                  <span className="grid place-items-center">
                    {key.toUpperCase()}
                  </span>
                  <input
                    onChange={(e) => {
                      handleSubmit(key, e.target.value);
                    }}
                    value={
                      input[key] instanceof Date
                        ? input[key].toISOString().slice(0, 10)
                        : (input[key] ?? "")
                    }
                    type="text"
                    className="p-2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-md outline-none"
                  />
                </div>
              ))}
          </div>
        </section>
      </main>
      <div className="fixed bottom-0 left-0 w-full">
        <button
          disabled={disabled}
          onClick={() => add()}
          className={`${color.btn}  w-full p-2 text-white text-md disabled:bg-gray-200 active:scale-90`}
        >
          Ajouter
        </button>
      </div>
      {loading && <Loading title={"Chargement ..."} />}
      {animation && <SuccessAnimation show />}
    </div>
  );
}
