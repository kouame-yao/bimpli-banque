"use client"
import { HandCoins } from "lucide-react";
import { useState } from "react";
import useCalcul from "../../../components/calculs/Calcul";
import { color } from "../../../components/color/ColorBtn";
import Wrapper from "../../../components/layouts/Wrapper";
import Assurance from "../../../components/MenuAccount/Assurance";
import Compte from "../../../components/MenuAccount/Compte";
import Credit from "../../../components/MenuAccount/Credit";
import Epargne from "../../../components/MenuAccount/Epargne";
import { UserInfo } from "../../../components/userInfo/UserInfo";


export default function Page() {
  const {resultCompte, resultCredits, resultEpargne } = useCalcul()
  const [active, setActive] = useState("Compte")

  const MenuAccount = [{
    name:'Compte',
  },{
    name:'Epargne',
  },{
    name:'Crédits',
  },{
    name:'Assurance',
    }]

  return (
    <Wrapper>
      <main className="my-6 flex flex-col gap-4 ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-bold">
              {active === 'Compte' && (
                `${resultCompte } €`
              )}
               {active === 'Epargne' && (
                `${resultEpargne } €`
              )}
               {active === 'Crédits' && (
                `${resultCredits } €`
              )}
            </span>
            <span>
              {active === 'Compte' && (
                `Total compte`
              )}
               {active === 'Epargne' && (
                `Total épargne`
              )}
               {active === 'Crédits' && (
                `Total restant dû`
              )}
            </span>
          </div>
          <HandCoins/>
        </div>
        <div className="flex items-center  justify-between gap-1 ">
          {MenuAccount.map((items, i) => {
          const isActive = items.name === active
          return (
            <div onClick={()=>setActive(items.name)} className={` px-3 py-2 rounded-full ${isActive ? `active:scale-90 ${color.btn} `:'bg-gray-400'}`} key={i}>
              {items.name}
          </div>
        )})}
        </div>

        <div className="flex flex-col gap-4">
          <span>{UserInfo.Nom} </span>
          {active === "Compte" && (
            <Compte/>
          )}
          {active === "Epargne" && (
            <Epargne/>
          )}
          {active === "Crédits" && (
            <Credit/>
          )}
          {active === "Assurance" && (
            <Assurance/>
          )}
        </div>
      </main>
    </Wrapper>
  )
}
