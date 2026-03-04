
import { Database, Home } from 'lucide-react'
import { color } from '../color/ColorBtn'

export default function Credit() {
  const UserCredit = [{
    title: 'Prêt habitat',
    serial:'N 45365 233',
    icon: <Home />,
    emprunt: "200 000,00",
    reste: '50 200,00',
width:"w-25"
  },{
    title: 'Prêt personnel auto',
    serial:'N 78334 903',
    icon: <Database />,
    emprunt: "0",
    reste:'00 , 00 ',
    width:"w-full"
  }]
  return (
    <main>
      <section className="flex flex-col gap-4">
        {UserCredit.map((items, i) => {
          return (
          <div key={i} className={`${color.divcard} rounded-md p-2 py-4 flex flex-col gap-1`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold">
             {items.title}
            </span>
            <span>
             {items.icon}
            </span>
          </div>
          <span>
            {items.serial}
          </span>
          <span>Montant emprunté {items.emprunt}€</span>
          <div className="h-1 w-full bg-gray-500">
            <div className={`h-1 ${items.width} bg-green-500`}></div>
          </div>
          <div className="grid text-right">
            <span>Restant dû</span>
            <span className="font-semibold">{items.reste}</span>
          </div>
        </div>
       )})}

      </section>
    </main>
  )
}
