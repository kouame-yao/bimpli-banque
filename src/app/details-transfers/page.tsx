"use client"

import { ArrowLeftRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Loading from "../../../components/animations/loading/loading"
import ButtusBack from "../../../components/buttonsBack/ButtusBack"
import { useIdTransfers } from "../../../components/Hooks/CustoomHook"
import { useDeletedTransfers, useGetTransfers } from "../../../services/lib/Requtes"

type beneficiary = {
  Iban: string
  Code_bic: string
  Banque: string
  Intitule: string
  date?:  string
}

type posts = {
  id: string
  amount: number | string
  oldBalance: number | string
  newBalance: number | string
  MotifP: string
  MotifC: string
  idTitulaire: string
  date: string
  titulaire: beneficiary
}



export default function TransferClient() {
  const { dataTransfers, loadinTrans} = useGetTransfers() as { dataTransfers: posts[]; loadinTrans: boolean }
  const { DeletedTrans, loading } = useDeletedTransfers()

  const router = useRouter()

  const { id } = useIdTransfers()

  const data = dataTransfers?.find((items) => items.id === id)


  const deleted = async () => {
    if (id) {
      await DeletedTrans(id)
      router.back()
    }
  }


if (loadinTrans) {
  return <Loading title="Chargement en cours..." />
}
  return (
    <div>
      <main className="m-6 grid gap-6">
        <div>
          <ButtusBack click={() => router.back()} />
        </div>

        <section className="flex items-center">
          <div className="grid">
            <span>- {data?.amount}€</span>
            <span>A {data?.titulaire?.Intitule}</span>
            <span>
              Votre transfert à {data?.titulaire?.Intitule.toUpperCase()} a été effectué
            </span>
          </div>
          <div>
            <span className="w-15 h-15 rounded-full grid justify-center items-center border-3 border-gray-600 bg-violet-800 text-white">
              <ArrowLeftRight size={40} />
            </span>
          </div>
        </section>

        <section className="p-3 bg-gray-300 rounded-md border-1 border-gray-600">
          <div className="flex justify-between items-center">
            <span>Date et Heure</span>
            <span>{data?.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Statut</span>
            <div className="flex gap-2 items-center justify-center">
              <span>En attente</span>
              <div className="h-4 w-4 mt-1 border-2 border-gray-300 border-b-transparent border-dashed rounded-full animate-spin"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Montant</span>
            <span>{data?.amount} €</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Nouveau solde</span>
            <span>{data?.newBalance} €</span>
          </div>
        </section>

        <section className="p-3 bg-gray-300 rounded-md border-1 border-gray-600 grid">
          <span>Référence</span>
          <span>{data?.id}</span>
        </section>

        <section className="p-3 bg-gray-300 rounded-md border-1 border-gray-600">
          <div className="flex justify-between items-center">
            <span>Motif principal</span>
            <span>{data?.MotifP}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Motif complémentaire</span>
            {data?.MotifC ? <span>{data?.MotifC}</span> : "Aucun"}
          </div>
        </section>

        <section>
          <button
            onClick={deleted}
            disabled={loading}
            className="bg-red-500 px-3 rounded-md p-1 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Supprimer la transaction
          </button>
        </section>
      </main>

      {loading && <Loading title="Suppression en cours..." />}
    </div>
  )
}
