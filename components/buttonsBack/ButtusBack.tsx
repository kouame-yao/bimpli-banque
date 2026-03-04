import { MoveLeft } from "lucide-react";

type onClick = {
  click: ()=> void
}
function ButtusBack({click}:onClick) {

  return (
    <div className="w-30">
      <div onClick={click} className="flex items-center gap-4">
        <MoveLeft />
        <span> RETOUR</span>
      </div>
    </div>
  )
}

export default ButtusBack
