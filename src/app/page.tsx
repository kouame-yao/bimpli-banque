"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Identifiant, secret } from "../../components/userInfo/UserInfo";

export default function Acceuil() {
  const [btnV, setbtnv] = useState<number[]>([]);
  const [Input, setInput] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [loadingb, setloadingb] = useState(false);
  const [erreur, setErreu] = useState(false);
  const [erreurb, setErreub] = useState(false);
  const [entrez, setentrez] = useState(false);
  const [rendu, setRendu] = useState(true);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // limite à 11 chiffres
    if (val.length <= 11 && /^\d*$/.test(val)) {
      setInput(val);
    }
  };
  const codePersonnel = (num: number) => {
    setbtnv((prev) => [...prev, num]);
  };

  const valide = () => {
    const code = btnV.join("");
    const num = Number(code);

    if (num === secret) {
      setloadingb(true);
      setTimeout(() => {
        setloadingb(false);
      }, 3000);
      router.push("/dashboard");
    } else {
      setloadingb(true);
      setTimeout(() => {
        setloadingb(false);
        setErreub(true);
      }, 3000);
    }
  };

  const identifiant = () => {
    if (Input.toString() === Identifiant) {
      setloading(true);
      setTimeout(() => {
        setloading(false);
        setentrez(true);
      }, 3000);
    } else {
      console.log("erreur");
      setErreu(true);
    }
  };

  const isMaxlength = Input.length === 11 && !loading;
  useEffect(() => {
    if (Input.length < 11) {
      setErreu(false);
    }
    if (btnV.length === 0) {
      setErreub(false);
    }
  }, [Input.length, btnV.length]);

  useEffect(() => {
    setTimeout(() => {
      setRendu(false);
    }, 2000);
  }, []);
  if (rendu) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Image
          src="/credit.jpg"
          alt="Crédit"
          width={100} // largeur définie
          height={100} // mettre 0 + style pour auto
          style={{ height: "auto" }} // maintient le ratio
          className="w-40"
          priority
        />
      </div>
    );
  }
  return (
    <div>
      <div className="grid justify-center text-center place-items-center shadow-xl">
        <Image
          src="/credit.jpg"
          alt="Crédit"
          width={100} // largeur définie
          height={100}
          className="w-44" // mettre 0 + style pour auto
          style={{ height: "auto" }} // maintient le ratio
          priority
        />
      </div>
      <main className="m-6 grid gap-4">
        <section className="grid gap-8">
          <h1 className="text-3xl font-bold ">
            Accéder à mes <br />
            comptes
          </h1>
          <div className="grid gap-4">
            <p>IDENTIFIANT</p>
            <span>Saisissez votre identifiant à 11 chiffres</span>
            {erreur && (
              <span className="text-red-500">Identifiant incorrect !</span>
            )}

            <div className="relative flex justify-center items-center">
              <input
                value={Input}
                onChange={handleChange}
                type="number"
                max={99999999999}
                placeholder="Exemple 2348567490 "
                className="border w-full p-3 rounded-xl border-gray-400 outline-none focus:border-green-500"
              />
              {Input.length !== 0 && (
                <div
                  onClick={() => setInput("")}
                  className="text-red-500 absolute text-right right-2"
                >
                  X
                </div>
              )}
            </div>
          </div>

          {!entrez && (
            <div>
              <button
                disabled={!isMaxlength}
                onClick={identifiant}
                className="rounded-full disabled:bg-gray-100 bg-green-700 text-gray-300 font-semibold text-sm p-3 text-center w-full active:scale-90"
              >
                {!loading ? (
                  <span>ENTRER MON CODE PERSONNEL</span>
                ) : (
                  <div className="flex items-center text-center place-items-center justify-center gap-2 ">
                    <div className="text-gray-800">Patientez... </div>
                    <div className="border-2 mt-1 border-b-transparent border-dashed border-gray-400 animate-spin rounded-full h-4 w-4"></div>
                  </div>
                )}
              </button>
            </div>
          )}
          {entrez && (
            <section className="grid gap-6 mb-8">
              <div className="grid gap-4">
                <span>CODE PERSONNEL</span>
                {erreurb && (
                  <span className="text-red-500">Code inccorect !</span>
                )}
                <div className="flex items-center relative">
                  <div className="border w-full h-12 rounded-xl border-gray-400 outline-none focus:border-green-500 text-center grid justify-center items-center  ">
                    {btnV.join("")}
                  </div>
                  {btnV.length !== 0 && (
                    <div
                      onClick={() => setbtnv([])}
                      className="text-red-500 absolute text-right right-3"
                    >
                      X
                    </div>
                  )}
                </div>
              </div>

              <div className=" grid grid-cols-5 gap-2 r">
                {[7, 3, 6, 5, 4, 9, 8, 1, 0, 2].map((items) => {
                  return (
                    <div
                      onClick={() => codePersonnel(items)}
                      className="bg-gray-300 p-4 text-center rounded-md active:scale-90 "
                      key={items}
                    >
                      {items}
                    </div>
                  );
                })}
              </div>

              <div>
                <button
                  disabled={btnV.length === 0 && !loadingb}
                  onClick={valide}
                  className="rounded-full disabled:bg-gray-300  disabled:text-gray-400 bg-green-700 text-gray-300 font-semibold text-sm p-3 text-center w-full active:scale-90"
                >
                  {!loadingb ? (
                    <span>Valide</span>
                  ) : (
                    <div className="flex items-center text-center place-items-center justify-center gap-2 ">
                      <div className="text-gray-800">Patientez... </div>
                      <div className="border-2 mt-1 border-b-transparent border-dashed border-gray-400 animate-spin rounded-full h-4 w-4"></div>
                    </div>
                  )}
                </button>
              </div>
            </section>
          )}
        </section>
        <section className="grid gap-8">
          <div className="text-xl font-semibold">
            {"Vous n'êtes pas encore client ?"}
          </div>
          <div>
            <button
              onClick={() =>
                router.push(
                  "https://www.credit-agricole.fr/ca-anjou-maine/particulier/ouvrir-un-compte/devenir-client.html",
                )
              }
              className="rounded-full bg-green-700 text-gray-300 font-bold text-md p-2 text-center w-full"
            >
              Devenir client
            </button>
          </div>

          <div className="grid gap-6">
            <span className="text-xl font-semibold">POUR VOUS CONNECTER</span>
            <span>
              Saisissez votre identifiant (numéro de compte ou numéro de contrat
              CAEL) et votre code personnel habituels.
            </span>
            <span className="text-center">Code perdu / oublié ?</span>
            <span className="text-xl font-semibold">SECURITE</span>
            <span>
              Restez vigilants et veillez à protéger vos données personnelles.
            </span>
            <span className="text-center">
              Consultez nos conseils de sécurité
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
