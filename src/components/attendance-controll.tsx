import { useEffect, useState } from "react";
import { api } from "../api/api";


interface Alunos {
    ra: string,
    Nome: string,
    Curso: string
}
export function AttendanceControl({palestra_id}: {palestra_id: string}){

    const [alunos, setAlunos] = useState<Alunos[]>([])
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        try {
            setIsPending(true)
            api.get(`/palestras/${palestra_id}/presentes`).then(data => setAlunos(data.data))

        } catch (error) {
            console.log(error)
        }finally{
            setIsPending(false)
        }
    }, [palestra_id])

    if(isPending){
        return "Is loading"
    }


    return(
        <div className="bg-white border-4 border-red-600 rounded-lg overflow-hidden">
    <div className="bg-red-600 text-white px-4 py-2">
      <h2 className="text-xl font-bold">Controle de presença</h2>
    </div>
    
    <div className="grid grid-cols-2 gap-4 p-6">
      
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <div className="bg-black text-white py-3 px-4 font-bold flex justify-between">
          <span>Presentes</span>
          <div className="flex gap-4 text-sm">
            <span>entrada</span>
            <span>saída</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {alunos.map(p => (
            <div key={p.ra} className="bg-white rounded flex items-center">
              <div className="flex-1 p-3">{p.Nome}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
    )
};