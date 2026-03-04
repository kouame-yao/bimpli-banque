"use client"

import { motion } from "framer-motion"
import { CreditCard, Lock, Shield, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function BankingLoader() {
  const [progress, setProgress] = useState(0)
  const [loadingStep, setLoadingStep] = useState(0)

  const steps = [
    { icon: Shield, text: "Vérification de la sécurité" },
    { icon: Lock, text: "Chiffrement des données" },
    { icon: CreditCard, text: "Connexion au serveur bancaire" },
    { icon: TrendingUp, text: "Préparation de votre espace" }
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % steps.length)
    }, 1500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [])

  if (progress === 100) return null

  const CurrentIcon = steps[loadingStep].icon

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 z-50 flex flex-col items-center justify-center p-6">
      {/* Logo et titre principal */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center mb-12"
      >
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 shadow-2xl">
              <CreditCard className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white mb-3"
        >
          Bienvenue
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-200 text-lg"
        >
          Votre banque en ligne sécurisée
        </motion.p>
      </motion.div>

      {/* Étape de chargement actuelle */}
      <motion.div
        key={loadingStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex items-center gap-3 mb-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
      >
        <CurrentIcon className="w-5 h-5 text-blue-400 animate-pulse" />
        <span className="text-white text-sm font-medium">
          {steps[loadingStep].text}
        </span>
      </motion.div>

      {/* Barre de progression */}
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 rounded-full shadow-lg relative"
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </motion.div>
        </div>

        <div className="flex justify-between mt-3 text-blue-300 text-sm font-medium">
          <span>Chargement...</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Badges de sécurité */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-6 mt-12"
      >
        <div className="flex items-center gap-2 text-blue-300 text-xs">
          <Shield className="w-4 h-4" />
          <span>Cryptage SSL 256-bit</span>
        </div>
        <div className="flex items-center gap-2 text-blue-300 text-xs">
          <Lock className="w-4 h-4" />
          <span>Connexion sécurisée</span>
        </div>
      </motion.div>

      {/* Message de confiance */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-slate-400 text-xs mt-6 text-center max-w-sm"
      >
        Vos données sont protégées et chiffrées selon les normes bancaires internationales
      </motion.p>
    </div>
  )
}
