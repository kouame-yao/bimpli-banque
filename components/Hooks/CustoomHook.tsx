'use client'

import { useState } from "react"

// Custom Hook to manage a global ID state
let globalBeneficiaryId:string
export function useIdBeneficiary() {

  const [id, setId] = useState<string>(globalBeneficiaryId || "")
  const handleId = (id: string) => {
    globalBeneficiaryId = id
    setId(id)
  }
  return {id, handleId}
}
// Custom Hook to manage a global ID state
let globalTransfers:string
export  function useIdTransfers() {

  const [id, setId] = useState<string>(globalTransfers || "")
  const handleId = (id: string) => {
    globalTransfers = id
    setId(id)
  }
  return {id, handleId}
}

