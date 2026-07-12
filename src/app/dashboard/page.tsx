"use client";
import { ArrowRightLeft, Captions, CreditCard, Power } from "lucide-react";

import { useRouter } from "next/navigation";
import Card from "../../../components/Cards/Card";
import { color } from "../../../components/color/ColorBtn";
import Wrapper from "../../../components/layouts/Wrapper";
import { disabled, UserInfo } from "../../../components/userInfo/UserInfo";
import { useGetAccounts, useGetTransfers } from "../../../services/lib/Requtes";
import Loading from "../loading";

export default function Page() {
  const router = useRouter();
  const { dataTransfers, loadinTrans } = useGetTransfers();
  const { dataAccount, loadingAccount } = useGetAccounts();
  const solde = dataAccount.find((row)=> row.nom.toLocaleLowerCase() === "Compte courant".toLocaleLowerCase())
  if (loadingAccount && loadinTrans) return <Loading />;

  const elementDiv = [
    { name: "Partager mon RIB", icon: <CreditCard />, click: "/view-rib" },
    { name: "Gérer mes cartes", icon: <Captions />, click: "/cartes" },
  ];
  return (
    <Wrapper>
      <main className=" my-6 flex flex-col gap-4  ">
        <section className="flex justify-between items-center mb-6">
          <span className="font-bold text-lg">Bonjour {UserInfo.Nom}</span>
          <span onClick={() => router.push("/")}>
            <Power />
          </span>
        </section>
        <section className={`${color.divcard} rounded-md`}>
          <div className="border-b p-3 border-gray-300">
            <div className="flex justify-between items-center ">
              <span className="font-semibold">{solde?.nom ?? "Compte courant"}</span>
              <span
                className={`${disabled ? "text-red-500" : "text-green-500"} font-semibold`}
              >
                {solde?.amount ?? "0"} €
              </span>
            </div>
            <span className="text-sm text-gray-400">{UserInfo.Numero}</span>
          </div>
          <div className="p-3 mt-3 grid gap-2">
            {dataTransfers?.length !== 0 ? (
              dataTransfers.slice(0, 3).map((items, i) => {
                return (
                  <div key={i} className="flex items-center justify-between">
                    <span
                      className={`${color.icon} rounded-full w-6 h-6 items-center justify-center grid `}
                    >
                      <ArrowRightLeft size={15} />
                    </span>
                    <span className="truncate w-50 text-center">
                      {items.titulaire.Intitule.toUpperCase()}
                    </span>
                    <span className="font-semibold">- {items.amount} €</span>
                  </div>
                );
              })
            ) : (
              <>
                <span className="items-center flex justify-center">
                  AUCUN VIREMENT POUR CE MOIS
                </span>
              </>
            )}
          </div>
        </section>
        <section className="mb-18 grid gap-3">
          <div>MES RACCOURCIS</div>
          <div className="flex w-full gap-3">
            {elementDiv.map((items, i) => {
              return (
                <div className="w-full" key={i}>
                  <Card
                    icon={items.icon}
                    title={items.name}
                    onclick={() => router.push(items.click)}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </Wrapper>
  );
}
