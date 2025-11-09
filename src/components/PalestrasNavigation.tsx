import { useEffect, useState } from "react"
import { api } from "../api/api";


interface Palestras {
    nome: string,
    id: string,
    desc: string
}

const PalestraCard: React.FC<{ palestra: Palestras; isSelected: boolean; onClick: () => void }> = ({ 
  palestra, 
  isSelected, 
  onClick 
}) => (
  <div 
    className={`p-4 cursor-pointer border-l-4 transition-colors ${
      isSelected ? 'bg-red-600 text-white border-red-800' : 'bg-gray-200 text-gray-800 border-gray-300'
    }`}
    onClick={onClick}
  >
    {palestra.nome}
  </div>
);

export function PalestrasNavigation(){
    const [palestras, setPalestras] = useState<Palestras[]>([])
    const [isPending, setIsPending] = useState(true)
    const [selectedPalestra, setSelectedPalestra] = useState(palestras.length > 0 ? palestras[0].id : "")


    useEffect(() => {
        try {
            setIsPending(true)
            api.get("/palestras").then(response => setPalestras(response.data))
        } catch (error) {
            console.log(error)            
        }finally{
            setIsPending(false)
        }
    }, [])

    if(isPending){
        return <h1>Is loading</h1>
    }

    return(
        <div className="p-4">
            <h3 className="text-center font-bold text-gray-700 mb-3">Palestras</h3>
            <div className="space-y-2">
              {palestras.map(palestra => (
                <PalestraCard
                  key={palestra.id}
                  palestra={palestra}
                  isSelected={selectedPalestra === palestra.id}
                  onClick={() => setSelectedPalestra(palestra.id)}
                />
              ))}
              {isPending && <div className="bg-gray-300 p-4 rounded"></div>}
            </div>
        </div>
    )
}