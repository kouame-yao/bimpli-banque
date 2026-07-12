"use client";
import { AlertTriangle, Eye } from "lucide-react";
import { EventHandler, SubmitEventHandler, useEffect, useState } from "react";
import { Identifiant, secret } from "../userInfo/UserInfo";
import { useRouter } from "next/navigation";

export default function Bimpl() {
  const [value, setValue] = useState({
    identifiant: "",
    password: "",
  });
  const [Erreur, setErreur] = useState({
    identifiant: false,
    password: false,
  });
  const router = useRouter();

  const [loadingb, setloadingb] = useState(false);
  const [Erreub, setErreub] = useState(false);

  const handlsubmit = (e: any) => {
    const { name, value } = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };
  const verifie = () => {
    if (value.identifiant === "") {
      setErreur({ ...Erreur, identifiant: true });
      return false;
    } else if (value.password === "") {
      setErreur({ ...Erreur, password: true });
      return false;
    } else {
      setErreur({ identifiant: false, password: false });
      return true;
    }
  };
  const onSubmit = () => {
    if (!verifie()) {
      return;
    }

    if (
      parseInt(value.password) === 123 &&
      value.identifiant.toString() === "123"
    ) {
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

  return (
    <>
      <div className="bg-[url('/bimpl.png')] bg-center bg-cover bg-no-repeat h-screen">
        {Erreub && <Alerte setErreub={setErreub} />}
        <main className="grid justify-center items-center h-screen ">
          <div className=" max-w-md w-lg p-4 rounded-md mt-30">
            <div className="bg-sky-500 text-center text-white mx-auto w-30 rounded-md p-1 mb-5">
              ENTREPRISE
            </div>
            <section className="bg-white p-4 rounded-md ">
              <h1 className="text-3xl font-bold mb-4">Bonjour !</h1>

              <section className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-4 ">
                    <span>Indentifiant</span>
                    <span className="text-lg text-blue-500 font-semibold">
                      Indentifiant oublié ?
                    </span>
                  </div>
                  <div className="border  border-gray-500 w-full rounded-md p-2 mb-2">
                    <input
                      value={value.identifiant}
                      onChange={handlsubmit}
                      className=" outline-none w-full placeholder:text-sm "
                      type="text"
                      placeholder="Saisissez votre identifiant"
                      name="identifiant"
                      id="identifiant"
                    />
                  </div>

                  {Erreur.identifiant && (
                    <span className="text-red-500 font-bold text-xs">
                      Champ requis
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span>Mot de passe</span>
                    <span className="text-lg text-blue-500 font-semibold">
                      Mot de passe oublié ?
                    </span>
                  </div>
                  <div className="border  border-gray-500 w-full rounded-md flex items-center p-2 mb-2">
                    <input
                      value={value.password}
                      onChange={handlsubmit}
                      className=" outline-none w-full"
                      type="text"
                      placeholder="Saisissez votre identifiant"
                      name="password"
                      id="password"
                    />
                    <Eye />
                  </div>
                  {Erreur.password && (
                    <span className="text-red-500 font-bold text-xs">
                      Champ requis
                    </span>
                  )}
                </div>
              </section>

              <div className="flex items-center gap-4 mb-4 mt-4">
                <input type="checkbox" className="size-4 " />
                <span className="text-sm font-semibold">
                  Se souvenir de moi
                </span>
              </div>

              <button
                disabled={value.identifiant === "" || value.password === ""}
                onClick={onSubmit}
                className="text-white font-bold disabled:bg-blue-300 bg-blue-500 mx-auto justify-center items-center grid w-full p-2 rounded-md"
              >
                <div className="flex items-center gap-3">
                  {loadingb && (
                    <span className="size-5 border-4 border-white  border-t-transparent animate-spin rounded-full"></span>
                  )}
                  <span>Je me connecte</span>
                </div>
              </button>

              <hr className="mt-4" />

              <div className="bg-blue-100 px-2 py-4 rounded-md mt-4">
                <span className="text-xs font-bold">Créer un compte</span>
                <div className="flex items-center gap-6">
                  <span>Première connexion ?</span>
                  <span className="font-semibold text-blue-500">
                    Créer un compte
                  </span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

const Alerte = ({ setErreub }: { setErreub: (value: boolean) => void }) => {
  return (
    <section className="bg-black/40 h-screen fixed w-full mx-auto ">
      <div className="flex justify-center items-center mx-auto h-screen">
        <div className="bg-white rounded-md text-wrap mx-auto w-md text-center items-center place-items-center p-4  ">
          <AlertTriangle color="red" size={50} />
          <div className="grid mt-4">
            <p>
              {" "}
              L'identifiant et/ou le mot de passe saisis sont incorrects.
              Veuillez vérifier et réessayer.
            </p>
            <button
              onClick={() => setErreub(false)}
              className="text-white mt-4 mx-auto bg-blue-500 w-full p-2 rounded-md font-bold "
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
