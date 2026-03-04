import { JSX } from "react"
import { color } from "../color/ColorBtn"
type elementCard = {
  icon: JSX.Element,
  title: string,
  onclick: ()=> void
}
function Card({ icon, title, onclick}:elementCard) {
  return (
    <div onClick={onclick} className={`${color.divcard} py-8 px-3 flex flex-col gap-3 rounded-2xl  w-full active:scale-90`}>
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  )
}

export default Card
