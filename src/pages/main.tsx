import React, { useEffect, useState } from 'react';
import { LectureDetail } from '../components/LectureDetail';
import { PalestrasNavigation, type Palestras } from '../components/PalestrasNavigation';
import { api } from '../api/api';
import { Calendar } from 'lucide-react';
import { AttendanceControl } from '../components/attendance-controll';

interface Participante {
  id: string;
  nome: string;
  entrada: string;
  saida: string;
}



const App: React.FC = () => {
  const [palestras, setPalestras] = useState<Palestras[]>([]);
  const [selectedPalestraId, setSelectedPalestraId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock de participantes - você pode buscar do backend baseado na palestra selecionada
  const ausentes: Participante[] = [
    { id: '1', nome: 'João Silva', entrada: '', saida: '' },
    { id: '2', nome: 'Maria Santos', entrada: '', saida: '' },
    { id: '3', nome: 'Pedro Oliveira', entrada: '', saida: '' },
    { id: '4', nome: 'Ana Costa', entrada: '', saida: '' },
    { id: '5', nome: 'Carlos Souza', entrada: '', saida: '' },
  ];

  const presentes: Participante[] = [
    { id: '6', nome: 'Lucas Mendes', entrada: '15:00', saida: '16:00' },
    { id: '7', nome: 'Julia Ferreira', entrada: '15:05', saida: '16:00' },
    { id: '8', nome: 'Roberto Lima', entrada: '15:02', saida: '15:58' },
    { id: '9', nome: 'Patricia Rocha', entrada: '15:00', saida: '16:00' },
    { id: '10', nome: 'Fernando Alves', entrada: '15:10', saida: '16:00' },
  ];

  // Buscar palestras do backend
  useEffect(() => {
    const fetchPalestras = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/palestras');
        setPalestras(response.data);
        
        // Selecionar automaticamente a primeira palestra
        if (response.data && response.data.length > 0) {
          setSelectedPalestraId(response.data[0].id);
        }
      } catch (error) {
        console.error('Erro ao buscar palestras:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPalestras();
  }, []);

  // Encontrar a palestra selecionada
  const selectedPalestra = palestras.find(p => p.id === selectedPalestraId) || null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-8">
              <div className="bg-gray-300 p-4 flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-400 rounded flex items-center justify-center">
                  <Calendar size={32} className="text-gray-600" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-400 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-400 rounded w-1/2"></div>
                </div>
              </div>
              
              <PalestrasNavigation
                palestras={palestras}
                selectedPalestraId={selectedPalestraId}
                onSelectPalestra={setSelectedPalestraId}
                isLoading={isLoading}
              />
            </div>
          </div>
          
          <div className="col-span-3 space-y-6">
            <LectureDetail palestra={selectedPalestra} />
            
            <AttendanceControl palestra_id={selectedPalestra?.id ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;