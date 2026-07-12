import { useGetAccounts } from "../../services/lib/Requtes";
import { color } from "../color/ColorBtn";

const SoldeAccount: { name: string; solde: number }[] = [
  { name: "Compte Courant", solde: 3000 },
  { name: "Assurance-vie", solde: 14000 },
  { name: "Compte-épargne", solde: 8000 },
  { name: "Livret A + LDDS", solde: 5000 },
  { name: "PEA", solde: 4000 },
  { name: "PEA", solde: 4000 },
];
function Calcule(data: { solde: number }[]): number {
  return data.reduce((acc, current) => acc + current.solde, 0);
}

export const resultCompte = Calcule(SoldeAccount);
export const resultEpargne = Calcule(SoldeAccount.slice(2, 5));
export const resultCredits = "50 200,00";

export default function Compte() {
  const { dataAccount } = useGetAccounts();
  return (
    <div className="flex flex-col gap-4 pb-24">
      {dataAccount?.map((items, i) => {
        return (
          <div className={`${color.divcard} p-3 rounded-2xl`} key={i}>
            <div className="flex justify-between items-center">
              <span>{items.nom} </span>
              <span>{items.amount.toLocaleString()} € </span>
            </div>
            <span>N: ****</span>
          </div>
        );
      })}
    </div>
  );
}
