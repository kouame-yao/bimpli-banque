"use client"

import { FileDown, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ButtusBack from "../../../components/buttonsBack/ButtusBack"
import { UserInfo } from "../../../components/userInfo/UserInfo"

type RibInfo = {
  titulaire: string
  iban: string
  bic: string
  banque: string
}

export default function Page() {
  const router = useRouter()
  const [rib, setRib] = useState<RibInfo>({
    titulaire: UserInfo.Nom,
    iban: UserInfo.Rib,
    bic: UserInfo.Bic,
    banque: UserInfo.Banque,
  })

  const handleChange = (key: keyof RibInfo, value: string) => {
    setRib({ ...rib, [key]: value })
  }

  const handleExportPDF = () => {
    alert("🚀 Ici tu pourrais générer un PDF du RIB")
  }

  const handleShare = () => {
    alert("📤 Ici tu pourrais partager ton RIB")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  p-6">
      <div>
        <ButtusBack click={()=>router.back()} />
      </div>
      <div className="w-full max-w-lg  p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          📄 Mon RIB
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Titulaire</label>
            <input
              value={rib.titulaire}
              onChange={(e) => handleChange("titulaire", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">IBAN</label>
            <input
              value={rib.iban}
              onChange={(e) => handleChange("iban", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">BIC</label>
            <input
              value={rib.bic}
              onChange={(e) => handleChange("bic", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Banque</label>
            <input
              value={rib.banque}
              onChange={(e) => handleChange("banque", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
          >
            <FileDown size={18} /> PDF
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            <Share2 size={18} /> Partager
          </button>
        </div>
      </div>
    </div>
  )
}
