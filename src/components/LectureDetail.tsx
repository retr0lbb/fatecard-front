import { useEffect, useRef, useState } from "react";
import type { Palestras } from "./PalestrasNavigation";
import { Calendar, Pause, Play, Square } from "lucide-react";

interface TimerState {
  palestraId: string;
  tempoBase: number; // Tempo acumulado quando pausou
  isRunning: boolean;
  isConcluida: boolean;
  timestampInicio: number | null; // Quando começou a rodar pela última vez
}

export const LectureDetail: React.FC<{ palestra: Palestras | null }> = ({ palestra }) => {
  const [tempo, setTempo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isConcluida, setIsConcluida] = useState(false);
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [timestampInicio, setTimestampInicio] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Carregar estado salvo quando a palestra mudar
  useEffect(() => {
    if (!palestra) return;

    const storageKey = `palestra_timer_${palestra.id}`;
    const savedState = localStorage.getItem(storageKey);

    if (savedState) {
      const state: TimerState = JSON.parse(savedState);
      
      // Se estava rodando quando a página foi fechada, calcular tempo decorrido
      if (state.isRunning && state.timestampInicio) {
        const tempoDecorrido = Math.floor((Date.now() - state.timestampInicio) / 1000);
        const tempoTotal = state.tempoBase + tempoDecorrido;
        setTempo(tempoTotal);
        setIsRunning(true);
        setTimestampInicio(state.timestampInicio); // Manter o timestamp original
      } else {
        setTempo(state.tempoBase);
        setIsRunning(false);
        setTimestampInicio(null);
      }
      
      setIsConcluida(state.isConcluida);
    } else {
      // Reset para nova palestra sem estado salvo
      setTempo(0);
      setIsRunning(false);
      setIsConcluida(false);
      setTimestampInicio(null);
    }
    
    setShowConfirmacao(false);
  }, [palestra?.id]);

  // Salvar estado no localStorage quando pausar ou estado mudar
  useEffect(() => {
    if (!palestra) return;

    const storageKey = `palestra_timer_${palestra.id}`;
    
    // Calcular tempo base (tempo acumulado até agora)
    let tempoBase = tempo;
    if (isRunning && timestampInicio) {
      // Se está rodando, tempo base é o tempo atual menos o que já passou nesta sessão
      const tempoNestaSessao = Math.floor((Date.now() - timestampInicio) / 1000);
      tempoBase = tempo - tempoNestaSessao;
    }
    
    const state: TimerState = {
      palestraId: palestra.id,
      tempoBase,
      isRunning,
      isConcluida,
      timestampInicio: isRunning ? timestampInicio : null
    };

    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [palestra?.id, tempo, isRunning, isConcluida, timestampInicio]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTempo(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTempo = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => {
    if (!isRunning) {
      // Ao iniciar, salvar o timestamp atual
      setTimestampInicio(Date.now());
    } else {
      // Ao pausar, limpar o timestamp
      setTimestampInicio(null);
    }
    setIsRunning(prev => !prev);
  };

  const handleEncerrarClick = () => {
    setShowConfirmacao(true);
  };

  const handleConfirmarEncerramento = () => {
    setIsRunning(false);
    setTempo(0);
    setIsConcluida(true);
    setShowConfirmacao(false);
    setTimestampInicio(null);
    
    // Limpar estado salvo
    if (palestra) {
      const storageKey = `palestra_timer_${palestra.id}`;
      localStorage.removeItem(storageKey);
    }
  };

  const handleCancelarEncerramento = () => {
    setShowConfirmacao(false);
  };

  const formatDate = (dateStr: string): string => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month} - ${dateStr}`;
  };

  if (!palestra) {
    return (
      <div className="bg-white border-4 border-red-600 rounded-lg p-6 text-center text-gray-500">
        Selecione uma palestra para ver os detalhes
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-red-600 rounded-lg overflow-hidden">
      <div className="bg-red-600 text-white px-6 py-4">
        <h2 className="text-xl font-bold mb-2">Gerenciamento de Palestra</h2>
        <div className="flex items-center gap-2 text-red-100">
          <Calendar size={16} />
          <span className="text-sm">{formatDate(palestra.horario_inicio)}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Nome: {palestra.titulo}</h3>
            <p className="text-sm mb-2">
              <span className="font-semibold">Descrição:</span> {palestra.descricao}
            </p>
          </div>
          
          <div className="text-right ml-4">
            {isConcluida ? (
              <div className="mb-2">
                <p className="text-2xl font-bold text-green-600 mb-1">✓ Concluída</p>
                <p className="text-sm text-gray-600">Palestra finalizada com sucesso</p>
              </div>
            ) : (
              <p className="text-4xl font-bold mb-2 font-mono">{formatTempo(tempo)}</p>
            )}
            
            {showConfirmacao ? (
              <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold mb-3 text-gray-800">Você quer encerrar?</p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleCancelarEncerramento}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Não
                  </button>
                  <button
                    onClick={handleConfirmarEncerramento}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Sim
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 justify-end">
                {!isConcluida && (
                  <>
                    <button 
                      onClick={handleToggle}
                      className={`flex items-center gap-2 border-2 px-4 py-2 rounded transition-colors ${
                        isRunning 
                          ? 'bg-yellow-500 border-yellow-600 hover:bg-yellow-600 text-white' 
                          : 'bg-white border-gray-800 hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      {isRunning ? <Pause size={20} /> : <Play size={20} />}
                      {isRunning ? 'Pausar' : 'Começar'}
                    </button>
                    <button 
                      onClick={handleEncerrarClick}
                      className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      <Square size={20} />
                      Encerrar
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};