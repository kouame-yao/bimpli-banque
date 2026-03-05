"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../../../components/animations/loading/loading";
import ErreurMessage from "../../../components/animations/MessageErreur/ErreurMessage";
import { SuccesTransfers } from "../../../components/animations/succesTransfers/SuccesTransfers";
import ButtusBack from "../../../components/buttonsBack/ButtusBack";
import { color } from "../../../components/color/ColorBtn";
import { disabled } from "../../../components/userInfo/UserInfo";
import {
  useGetAccounts,
  useGetBeneficiary,
  usePostransactions,
} from "../../../services/lib/Requtes";

type posts = {
  id: string;
  oldBalance: number | string;
  newBalance: number | string;
  amount: number | string;
  MotifP: string;
  MotifC: string;
  idTitulaire: string;
  date: string;
};
export default function Page() {
  const { PostTransfers, loading } = usePostransactions();
  const [animation, setAnimation] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageSolde, setMessageSolde] = useState(false);
  const [messageMontant, setMessageMontant] = useState(false);

  const { dataAccount } = useGetAccounts();
  const { databenef } = useGetBeneficiary();

  const [input, setInput] = useState<posts>({
    id: "",
    oldBalance: "",
    newBalance: "",
    amount: "",
    MotifP: "",
    MotifC: "",
    idTitulaire: "",
    date: "",
  });
  const handchange = (name: keyof posts, value: string | number | object) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();
  const odldbalance = dataAccount.find((items) => items.id === input.id);
  const titulaire = databenef.find((items) => items.id === input.idTitulaire);

  const AddTrans = async () => {
    const now = new Date();
    const formattedDate = now.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    type beneficiary = {
      Iban: string;
      Code_bic: string;
      Banque: string;
      Intitule: string;
      date?: string;
    };

    const data = {
      idsolde: input.id,
      oldBalance: Number(odldbalance?.amount),
      newBalance: Number(odldbalance?.amount) - Number(input.amount),
      amount: Number(input.amount),
      MotifP: input.MotifP,
      MotifC: input.MotifC,
      date: formattedDate,
      titulaire: titulaire as beneficiary,
    };
    try {
      function validateInput() {
        const amount = Number(input.amount);
        const balance = Number(odldbalance?.amount);

        const validations = [
          {
            condition: amount > balance || balance === 0,
            action: (v: boolean) => setMessageSolde(v),
          },
          {
            condition: amount <= 0,
            action: (v: boolean) => setMessageMontant(v),
          },
          {
            condition:
              !input.id ||
              !balance ||
              !amount ||
              !input.MotifP ||
              !formattedDate ||
              !titulaire,
            action: (v: boolean) => setMessage(v),
          },
        ];

        for (const { condition, action } of validations) {
          if (condition) {
            action(true);
            setTimeout(() => action(false), 3000);
            return false;
          }
        }

        return true;
      }

      if (!validateInput()) return;

      await PostTransfers(data);

      setInput({
        id: "",
        oldBalance: "",
        newBalance: "",
        amount: "",
        MotifP: "",
        MotifC: "",
        idTitulaire: "",
        date: "",
      });
      setAnimation(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {message && <ErreurMessage message="Veillez remplir tout les champs" />}
      {messageSolde && (
        <ErreurMessage message="Solde insuffisant pour traité cette operation" />
      )}
      {messageMontant && (
        <ErreurMessage message="Le montant dois pas être inferieur ou egal a '0' " />
      )}
      <main className="m-6 grid gap-4 pb-14">
        <ButtusBack click={() => router.back()} />

        <section>
          <div className="mb-4">
            <h1 className="font-bold text-2xl text-center">
              Effectuer un virement
            </h1>
          </div>

          <div className="flex flex-col justify-between items-center gap-2 mt-6 mb-4">
            <select
              value={input.id}
              onChange={(e) => handchange("id", e.target.value)}
              className="p-2 bg-white w-full rounded-md border border-gray-500 outline-none appearance-none"
              name=""
              id=""
            >
              <option value="">Selec... Solde</option>
              {dataAccount?.map((items, i) => {
                return (
                  <option key={i} value={items?.id}>
                    {items.nom} : {items?.amount} €{" "}
                  </option>
                );
              })}
            </select>

            <select
              value={input.idTitulaire}
              onChange={(e) => handchange("idTitulaire", e.target.value)}
              className="p-2 bg-white w-full rounded-md border border-gray-500 outline-none appearance-none"
              name=""
              id=""
            >
              <option value="">Selec... Bénéficiaire</option>
              {databenef.map((items, i) => {
                return (
                  <option key={i} value={items.id}>
                    {items.Intitule}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-3">
              <span className="grid place-items-center"> Montant(€)</span>
              <input
                value={input.amount}
                onChange={(e) => handchange("amount", e.target.value)}
                type="number"
                className="p-2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-md outline-none"
              />
            </div>
            <div className="grid gap-3">
              <span className="grid place-items-center"> Motif principal </span>
              <input
                value={input.MotifP}
                onChange={(e) => handchange("MotifP", e.target.value)}
                type="text"
                className="p-2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-md outline-none"
              />
            </div>
            <div className="grid gap-3">
              <span className="grid place-items-center">
                {" "}
                Motif complementaire (facultatif)
              </span>
              <input
                value={input.MotifC}
                onChange={(e) => handchange("MotifC", e.target.value)}
                type="text"
                className="p-2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-md outline-none"
              />
            </div>
          </div>
        </section>
      </main>
      <div className="fixed bottom-0 left-0 w-full">
        <button
          disabled={disabled}
          onClick={() => AddTrans()}
          className={`${color.btn} w-full p-2 text-white text-md disabled:bg-gray-200 active:scale-90`}
        >
          Valider
        </button>
      </div>
      {loading && <Loading title="chargement..." />}
      {animation && (
        <SuccesTransfers show onClose={() => setAnimation(false)} />
      )}
    </div>
  );
}
