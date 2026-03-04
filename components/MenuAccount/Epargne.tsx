import { useGetAccounts } from "../../services/lib/Requtes"
import { color } from "../color/ColorBtn"

export default function Epargne() {
  const {dataAccount} =useGetAccounts()
  return (
      <main className="flex flex-col gap-4">
        <div className={ `${color.divcard} rounded-md p-2 py-4 grid gap-2`}>
        <div className="flex justify-between">
          <span>
            Plan Epargne Logement (PEL)
          </span>
          <span className="text-green-500">
            {dataAccount[1]?.amount} €
          </span>
        </div>
        <div className="h-1 bg-green-800"></div>
        <span className="grid text-right">
          Plafond 1 200 000.00 €
        </span>
        </div>

        <div className="flex flex-col gap-2">
        {
          dataAccount?.slice(2,5).map((items, i) => {
            return (
              <div className={`${color.divcard} p-3 rounded-2xl`} key={i}>
                <div className="flex justify-between items-center" >
                  <span>{items.nom} </span>
                  <span>{items.amount} € </span>
                </div>
                <span>
                  N: ****
                </span>
            </div>
          )})
        }
      </div>
      </main>
    )
}
