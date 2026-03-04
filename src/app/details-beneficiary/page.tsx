"use client"

import { useRouter } from "next/navigation"
import Loading from "../../../components/animations/loading/loading"
import ButtusBack from "../../../components/buttonsBack/ButtusBack"
import { color } from "../../../components/color/ColorBtn"

import { useIdBeneficiary } from "../../../components/Hooks/CustoomHook"
import { useDeletedBeneficiaire, useGetBeneficiary } from "../../../services/lib/Requtes"


export default function BeneficiaryClient() {
  const { databenef } = useGetBeneficiary()
  const { DeletedBenf, loading } = useDeletedBeneficiaire()
  const router = useRouter()

  const { id } = useIdBeneficiary()

  const data = databenef?.find(items => items.id === id)
  const deleted = async () => {
    if (id) {
      await DeletedBenf(id)
      router.back()
    }
  }



  return (
    <div>
      <main className="m-6 grid gap-4">
        <div>
          <ButtusBack click={() => router.back()} />
        </div>

        <section className={`p-2 ${color.divcard} rounded-md grid gap-3 mt-40`}>
          <div className="flex justify-between items-center">
            <span>NOM & PRENOM:</span>
            <span>{data?.Intitule.toUpperCase()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>IBAN:</span>
            <span>{data?.Iban}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>BIC:</span>
            <span>{data?.Code_bic}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>BANQUE:</span>
            <span>{data?.Banque}</span>
          </div>
        </section>

        <section>
          <button
            onClick={deleted}
            disabled={loading}
            className="bg-red-500 px-3 rounded-md p-1 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Supprimer bénéficiaire
          </button>
        </section>
      </main>

      {loading && (
        <Loading title="Suppression en cours..." />
      )}
    </div>
  )
}
