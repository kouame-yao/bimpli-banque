import { useGetAccounts } from "../../services/lib/Requtes";

export default function useCalcul() {
  const { dataAccount } = useGetAccounts();
  function Calcule(data: { amount: number }[]) {
    return data.reduce((acc, current) => acc + Number(current.amount), 0);
  }

  const resultCompte = Calcule(dataAccount);
  const resultEpargne = Calcule(dataAccount.slice(1));
  const resultCredits = "50 200,00";
  return { resultCompte, resultEpargne, resultCredits };
}
