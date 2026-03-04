"use client";
import { Calendar, MessageSquare, Pen, Phone } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import Btn from "../../../components/buttons/Btn";
import Card from "../../../components/Cards/Card";
import Wrapper from "../../../components/layouts/Wrapper";
import { UserInfo } from "../../../components/userInfo/UserInfo";

export default function Page() {
  const router = useRouter();
  const User: { name: string; icon: JSX.Element; sos: string } = {
    name: UserInfo.Nom,
    icon: <Phone />,
    sos: "sos",
  };
  const btnValue = [
    { name: "Prendre RDV", icon: <Calendar />, href: "/meet" },
    { name: "Ecrire", icon: <Pen />, href: "/meet" },
  ];

  const CardUser = [
    {
      name: "Mes rendez-vous",
      icon: <Phone />,
      href: "/meet",
    },
    {
      name: "Mes rendez-vous",
      icon: <MessageSquare />,
      href: "/meet",
    },
  ];
  const UserAgence = {
    image: "/bureau.jpg",
    local: `${UserInfo.ville} Préfecture`,
    Horaire: "17 H 30",
  };
  return (
    <Wrapper>
      <main className="my-6 flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold whitespace-nowrap w-2 ">
              {" "}
              {User.name}{" "}
            </span>
            <div className="flex justify-between items-center gap-4">
              <span className="w-8 h-8 grid justify-center items-center bg-gray-500 rounded-full">
                {User.icon}{" "}
              </span>
              <span className="w-8 h-8 grid justify-center items-center bg-gray-500 rounded-full">
                {User.sos}{" "}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            {btnValue.map((item, i) => {
              return (
                <div className="w-full" key={i}>
                  <Btn
                    click={() => router.push(item.href)}
                    titre={item.name}
                    icon={item.icon}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between gap-3">
            {CardUser.map((items, i) => {
              return (
                <div className="w-full" key={i}>
                  <Card
                    title={items.name}
                    icon={items.icon}
                    onclick={() => router.push(items.href)}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div>MON ANGENE {UserInfo.Banque}</div>
          <div className="flex items-center gap-3 p-4 bg-gray-400 rounded-md ">
            <Image
              className="w-40 h-40 rounded-md"
              src={UserAgence.image}
              width={200}
              height={300}
              alt="bureau"
              priority
            />
            <div className="flex flex-col gap-3 w-full">
              <span className="font-semibold">{UserAgence.local}</span>
              <span className="font-semibold">Ouvert</span>
              <span>Ferme à {UserAgence.Horaire}</span>
            </div>
          </div>
        </section>
      </main>
    </Wrapper>
  );
}
