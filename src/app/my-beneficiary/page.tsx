"use client"
import { Play, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import ButtusBack from "../../../components/buttonsBack/ButtusBack"
import { color } from "../../../components/color/ColorBtn"

import { useIdBeneficiary } from "../../../components/Hooks/CustoomHook"
import { useGetBeneficiary } from "../../../services/lib/Requtes"
import Loading from "../loading"

// Supprimez "export" - cette variable n'est pas utilisée

export default function Page() {
  const { databenef,loadingBenef } = useGetBeneficiary()
  const {handleId}= useIdBeneficiary()
  const router = useRouter()
  const page = (id:string) => {
    handleId(id)
    router.push("/details-beneficiary")
  }
  if(loadingBenef) return <Loading/>
  return (
    <div className="m-6">
      <div className="mb-20">
        <ButtusBack click={() => router.back()} />
      </div>
      <section className="flex flex-col gap-4">
        <div className="grid justify-center">
          MES BENEFICIAIRES
        </div>
        <div className="h-0.5 bg-gray-800 w-full"></div>
        <div className="flex flex-col gap-4">
          {databenef?.map((items, i) => {
            return (
              <div
                onClick={() => page(items.id)}
                className={`${color.divcard} p-3 rounded-md flex justify-between items-center active:scale-90`}
                key={i}
              >
                <span>
                  {items?.Intitule?.toUpperCase()}
                </span>
                <div className="flex items-center gap-2">
                  <Play size={12} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <section className="fixed bottom-10 left-0 w-full justify-center grid">
        <button
          onClick={() => router.push("/add-beneficiary")}
          className={`${color.btn} px-3 py-3 rounded-md flex gap-2 items-center text-white active:scale-90`}
        >
          <UserPlus /> Ajouter un bénéficiaire
        </button>
      </section>
    </div>
  )
}
