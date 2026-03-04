"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firestore";
// recuperation des beneficiaires
export function useGetBeneficiary() {
  type Beneficiary = {
    id: string;
    Intitule: string;
    Iban: string;
    Code_bic: string;
    Banque: string;
    date?: Date | string;
  };

  const [databenef, setdata] = useState<Beneficiary[]>([]);
  const [loadingBenef, setloading] = useState<boolean>(false);
  useEffect(() => {
    setloading(true);
    const q = query(collection(db, "beneficiary"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const table: Beneficiary[] = [];
      querySnapshot.forEach((doc) => {
        table.push({ id: doc.id, ...(doc.data() as Omit<Beneficiary, "id">) });
        setdata(table);
      });
      setloading(false);
      return () => unsubscribe();
    });
  }, []);
  return { databenef, loadingBenef };
}
// recuperations des soldes
export function useGetAccounts() {
  type accounts = {
    id: string;
    amount: number;
    nom: string;
  };

  const [dataAccount, setdata] = useState<accounts[]>([]);
  const [loadingAccount, setloadingb] = useState<boolean>(false);
  useEffect(() => {
    setloadingb(true);
    const q = query(collection(db, "accounts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const table: accounts[] = [];
      querySnapshot.forEach((doc) => {
        table.push({ id: doc.id, ...(doc.data() as Omit<accounts, "id">) });
        setdata(table);
      });
      setloadingb(false);
      return () => unsubscribe();
    });
  }, []);
  return { dataAccount, loadingAccount };
}
// recuperations des historiques de transaction
export function useGetTransfers() {
  type beneficiary = {
    Iban: string;
    Code_bic: string;
    Banque: string;
    Intitule: string;
    date?: Date | string;
  };
  type post = {
    id: string;
    oldBalance: number | string;
    newBalance: number | string;
    amount: number | string;
    MotifP: string;
    MotifC: string;
    idTitulaire: string;
    titulaire: beneficiary;
  };

  const [dataTransfers, setdata] = useState<post[]>([]);
  const [loadinTrans, setloading] = useState<boolean>(false);
  useEffect(() => {
    setloading(true);
    const q = query(collection(db, "transfers"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const table: post[] = [];
      querySnapshot.forEach((doc) => {
        table.push({ id: doc.id, ...(doc.data() as Omit<post, "id">) });
        setdata(table);
      });
      setloading(false);
      return () => unsubscribe();
    });
  }, []);
  return { dataTransfers, loadinTrans };
}

// Ajout des données du beneficiaire

//typage utiliser dans ajout de beneficiaire et ajout des virements
type beneficiary = {
  Iban: string;
  Code_bic: string;
  Banque: string;
  Intitule: string;
  date?: Date | string;
};
export default function usePostBeneficiaire() {
  const [loading, setloaging] = useState<boolean>(false);
  async function PostBeneficiary(data: beneficiary) {
    setloaging(true);
    try {
      const docRef = await addDoc(collection(db, "beneficiary"), data);
      console.log("Document written with ID: ", docRef.id);
      setloaging(false);
    } catch (error) {
      console.log(error);
    } finally {
      setloaging(false);
    }
  }
  return { PostBeneficiary, loading };
}

// Ajout des virements
export function usePostransactions() {
  const [loading, setloaging] = useState(false);
  type Transfers = {
    idsolde: string;
    oldBalance: number;
    newBalance: number;
    amount: number;
    MotifP: string;
    MotifC: string;
    titulaire: beneficiary;
  };

  async function PostTransfers(data: Transfers) {
    setloaging(true);
    try {
      const docRef = doc(db, "accounts", data.idsolde);
      const docSnap = await getDoc(docRef);
      const oldBalance = docSnap.data()?.amount;
      if (oldBalance > 0) {
        const newBalance = oldBalance - data.amount;
        await updateDoc(docRef, {
          amount: newBalance,
        });
        const docTrans = await addDoc(collection(db, "transfers"), data);
        console.log("Document written with ID: ", docTrans.id);
      } else {
        setloaging(false);
        throw new Error("Solde insufisant");
      }
      setloaging(false);
    } catch (error) {
      return error;
    } finally {
      setloaging(false);
    }
  }
  return { PostTransfers, loading };
}

// Supprimer les beneficiaires

export function useDeletedBeneficiaire() {
  const [loading, setloaging] = useState(false);
  async function DeletedBenf(id: string) {
    try {
      setloaging(true);
      await deleteDoc(doc(db, "beneficiary", id));
    } catch (error) {
      return error;
    } finally {
      setloaging(false);
    }
  }
  return { DeletedBenf, loading };
}

export function useDeletedTransfers() {
  const [loading, setloaging] = useState(false);
  async function DeletedTrans(id: string) {
    try {
      setloaging(true);
      await deleteDoc(doc(db, "transfers", id));
    } catch (error) {
      return error;
    } finally {
      setloaging(false);
    }
  }
  return { DeletedTrans, loading };
}
