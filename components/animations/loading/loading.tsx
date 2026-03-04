"use client"
type Props = {
  title:string
}
export default function Loading({title}:Props) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="text-white text-lg font-semibold grid text-center items-center place-items-center">
                  <span>{title}</span>
                  <div className="w-8 h-8 rounded-full border-4 border-b-transparent border-dashed animate-spin"></div>
          </div>
        </div>
    </div>
  )
}
