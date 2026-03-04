import { Car, Home } from "lucide-react"
import { color } from "../color/ColorBtn"

export default function Assurance() {

const UserAssurance = [{
    title: 'Assurance auto',
    contrat: "N: 53323-AUTO",
    assure:'25 000 €',
    mensualité:"28,00 €",
    dataSouscription: "12/03/22",
    statut: "Actif",
    echeance: "12/05/2025",
    bg: 'bg-red-500',
    icon:<Car/>
  },
  {
    title: 'Assurance habitation',
    contrat: "N: 72840-HAB",
    assure:'150 000 €',
    mensualité:"38,50 €",
    dataSouscription: "15/01/21",
    statut: "Actif",
    echeance: "15/05/2025",
    bg: 'bg-blue-500',
    icon:<Home/>
  }]
  return (
    <div className="flex flex-col gap-4">
      {UserAssurance.map((items, i) => {
        return (
          <div className={`px-3 py-4 ${color.divcard} rounded-md`} key={i}>
            <div className="flex justify-between items-center">
              <span>
                {items.title}
              </span>
              <span>
                {items.icon}
              </span>
            </div>
            <div className="font-semibold">
               <span>
              Contrat {items.contrat}
            </span>
            <span>
              Montant assuré : {items.assure}
            </span>
            <span>
              Mensuealité : {items.mensualité}
            </span>
            <span>
              Souscrit le : {items.dataSouscription}
            </span>
            <span>
              Statut : {items.statut}
            </span>
            </div>
            <div className={`${items.bg} rounded-full h-1`}></div>
            <div className="flex justify-between">
              <span>
                Prochaine écheance
              </span>
              <span>
                {items.echeance}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )

}
