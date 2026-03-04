
import { JSX } from "react"
import { color } from "../color/ColorBtn"
 type menuBtnType = {
    titre: string,
   icon: JSX.Element
    click:()=> void
}

function Btn({icon, titre , click}:menuBtnType) {
  return (
    <div onClick={click} className={`flex gap-3 items-center ${color.btn} p-2 rounded-full justify-center active:scale-90 `}>
      <span> {icon} </span>
      <span> {titre} </span>
    </div>
  )
}

export default Btn
