"use client"
import { useRouter } from "next/navigation";
import ButtusBack from "../../../components/buttonsBack/ButtusBack";
import Wrapper from "../../../components/layouts/Wrapper";

export default function Meet() {
const router = useRouter()
  return (
    <Wrapper >
      <main className="m-6">
        < ButtusBack click={()=>router.back()}/>
      <div className="h-screen grid justify-center items-center">
<div>Aucune rendez-vous planifier</div>
    </div>
      </main>
    </Wrapper>
  )
}
