import { ArrowRightLeft, Contact, Database, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, ReactNode } from "react";
import { color } from "../color/ColorBtn";
import { BlockedAccountAlert } from "../alerts/BlockedAccountAlert";
type enfantProps = {
  children: ReactNode;
};
function Wrapper({ children }: enfantProps) {
  const patham = usePathname();
  type menuItem = {
    name: string;
    icon: JSX.Element;
    href: string;
  };
  const Menu: menuItem[] = [
    { name: "Acceuil", icon: <Home />, href: "/dashboard" },
    { name: "Compte", icon: <Database />, href: "/accounts" },
    { name: "Contact", icon: <Contact />, href: "/contacts" },
    { name: "Virement", icon: <ArrowRightLeft />, href: "/transfers" },
  ];

  return (
    <div>
      <div className="mx-4 ">{children}</div>
      <div
        className={`fixed left-0  bottom-0 w-full shadow-2xl z-50 shadow-gray-500 ${color.themeNave} `}
      >
        <div className="flex justify-between mx-6 my-2 ">
          {Menu.map((items, i) => {
            const isactive = patham === items.href;

            return (
              <Link
                href={items.href}
                key={i}
                className={`flex-col items-center place-items-center font-semibold ${isactive ? `${color.nav}  active:scale-90 z-50 ` : ""} `}
              >
                {items.icon} {items.name}{" "}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
