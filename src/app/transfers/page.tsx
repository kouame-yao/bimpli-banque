"use client"

import { ArrowLeftRight, Calendar, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Btn from "../../../components/buttons/Btn";
import Card from "../../../components/Cards/Card";
import Wrapper from "../../../components/layouts/Wrapper";

export default function Page() {
  const router = useRouter()
   const elementDiv = [
    { name: 'Mes virements', icon: <Calendar />, click :'/my-transfers' },
    { name: 'Mes bénéficiaires' , icon: <User2 />,click :'/my-beneficiary'}
  ]
  return (
    <Wrapper>
      <main className="my-6 flex flex-col gap-10">
        <section className="flex flex-col gap-4">
           <div className="w-50" >
          <Btn icon={<ArrowLeftRight />} titre="Faire un virement" click={()=> router.push('/validate-a-transfer')}/>
        </div>
        <div className="flex gap-3">

          {elementDiv.map((items, i) => {
            return (
              <div className="w-full" key={i}>
                <Card icon={items.icon} title={items.name } onclick={()=>router.push(items.click)} />
              </div>
          )})}
        </div>
        </section>
        <section className="whitespace-pre-wrap text-center ">
          Bientôt de nouvelles fonctionnalités sur la gestions de vos virements
         </section>
   </main>
    </Wrapper>
  )
}
