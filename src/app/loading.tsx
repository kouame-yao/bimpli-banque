"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { color } from "../../components/color/ColorBtn"
import { UserInfo } from "../../components/userInfo/UserInfo"

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simule un délai de chargement de 2 secondes
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 z-50">
      {/* Logo animée */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="flex items-center gap-3"
      >
        <div className={`${color.icon} rounded-full p-4 shadow-md`}>
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-gray-700"
        >
          {UserInfo.Banque}
        </motion.span>
      </motion.div>

      {/* Barre de chargement */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "180px" }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        className={`h-1 ${color.icon} rounded-full mt-8 overflow-hidden`}
      ></motion.div>

      {/* Texte sous la barre */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-sm text-gray-500 mt-4"
      >
        Chargement sécurisé de vos données bancaires...
      </motion.p>
    </div>
  )
}
