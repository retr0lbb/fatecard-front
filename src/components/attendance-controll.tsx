import { useEffect, useState } from "react";
import { api } from "../api/api";


interface Alunos {
    ra: string,
    Nome: string,
    Curso: string,
    horario_checkin: string
}

function formatarDataParaHora(dateString: string) {
  const data = new Date(dateString);

  // Fuso horário de São Paulo, que corresponde ao GMT-3 e respeita
  // o horário de verão quando ele está em vigor (se aplicável ao momento)
  const fusoHorarioBrasil = 'America/Sao_Paulo'; 

  const opcoesDeHora = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    // Define o fuso horário para o Brasil
    timeZone: fusoHorarioBrasil 
  } as any;

  // Garante que o formato seja PT-BR e usa o fuso horário do Brasil
  const horaFormatada = data.toLocaleTimeString('pt-BR', opcoesDeHora);
  
  return horaFormatada;
}

export function AttendanceControl({palestra_id}: {palestra_id: string}){

    const [alunos, setAlunos] = useState<Alunos[]>([])
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                setIsPending(true)
                const data = await api.get(`/palestras/${palestra_id}/presentes`)
                setAlunos(data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsPending(false)
            }
        }

        // Busca imediatamente ao montar
        fetchAlunos()

        // Configura o intervalo para buscar a cada 10 segundos
        const intervalo = setInterval(() => {
            fetchAlunos()
        }, 10000) // 10000ms = 10 segundos

        // Cleanup: limpa o intervalo quando o componente desmontar
        return () => clearInterval(intervalo)
    }, [palestra_id])

    if(isPending){
        return <div>Carregando...</div>
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
                        </div>
                    </div>
                    <div className="p-4 space-y-2">
                        {alunos.map(p => (
                            <div key={p.ra} className="bg-white rounded flex items-center">
                                <div className="flex-1 p-3">{p.Nome}</div>
                                <div className="p-3">
                                    {formatarDataParaHora(p.horario_checkin)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}