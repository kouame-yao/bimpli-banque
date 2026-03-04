"use client"
import { ArrowLeftRight, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtusBack from "../../../components/buttonsBack/ButtusBack";
import { color } from "../../../components/color/ColorBtn";
import { useIdTransfers } from "../../../components/Hooks/CustoomHook";
import { useGetTransfers } from "../../../services/lib/Requtes";
import Loading from "../loading";


export default function Page() {

  const { dataTransfers , loadinTrans} = useGetTransfers()
  const {handleId} = useIdTransfers()
  const router = useRouter()

  const Page = (id:string) => {
    handleId(id)
    router.push(`/details-transfers`)
  }
if(loadinTrans) return <Loading/>
  return (
    <div className="m-6">

      <div className="mb-20">
        <ButtusBack click={()=> router.back()}/>
     </div>

      <section className="flex flex-col gap-4">
        <div className="grid justify-center">
          HISTORIQUE DES OPERATIONS

        </div>
        <div className="h-0.5 bg-gray-800 w-full"></div>
        <div className="flex flex-col gap-4">
          {dataTransfers.map((items, i) => {
            return (
              <div onClick={()=>Page(items.id)} className={` p-3 rounded-md flex justify-between items-center active:scale-90 ${color.divcard}`} key={i}>
                <span>
                  <ArrowLeftRight/>
                </span>
                <span>
                  {items.titulaire.Intitule.toUpperCase()}
                </span>
                <div className="flex items-center gap-2">
                  <span>
                    -{items.amount} €
                  </span>
                  <Play size={12 }/>
                </div>

            </div>
          )})}
        </div>
      </section>
    </div>
  )
}
