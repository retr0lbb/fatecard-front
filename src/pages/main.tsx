import React, { useState } from 'react';
import { Play, Square } from 'lucide-react';
import { LectureDetail } from '../components/LectureDetail';

interface Palestra {
  id: string;
  nome: string;
  data: string;
  descricao: string;
}

interface Participante {
  id: string;
  nome: string;
  entrada: string;
  saida: string;
}

const PalestraCard: React.FC<{ palestra: Palestra; isSelected: boolean; onClick: () => void }> = ({ 
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


const AttendanceControl: React.FC<{ presentes: Participante[]; ausentes: Participante[] }> = ({ 
  presentes, 
  ausentes 
}) => (
  <div className="bg-white border-4 border-red-600 rounded-lg overflow-hidden">
    <div className="bg-red-600 text-white px-4 py-2">
      <h2 className="text-xl font-bold">Controle de presença</h2>
    </div>
    
    <div className="grid grid-cols-2 gap-4 p-6">
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <div className="bg-black text-white text-center py-3 font-bold">
          Ausentes
        </div>
        <div className="p-4 space-y-2">
          {ausentes.map(p => (
            <div key={p.id} className="bg-gray-300 p-3 rounded">
              {p.nome}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <div className="bg-black text-white py-3 px-4 font-bold flex justify-between">
          <span>Presentes</span>
          <div className="flex gap-4 text-sm">
            <span>entrada</span>
            <span>saída</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {presentes.map(p => (
            <div key={p.id} className="bg-white rounded flex items-center">
              <div className="flex-1 p-3">{p.nome}</div>
              <div className="flex gap-2 pr-3">
                <div className="bg-gray-300 px-3 py-1 rounded text-sm">{p.entrada}</div>
                <div className="bg-gray-300 px-3 py-1 rounded text-sm">{p.saida}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [selectedPalestra, setSelectedPalestra] = useState<string>('1');
  const [tempo, setTempo] = useState('00:00');
  const [isRunning, setIsRunning] = useState(false);

  const palestras: Palestra[] = [
    {
      id: '1',
      nome: 'Uso de affordances do ux/ui',
      data: '25/12 - 15:00 - 16:00',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nulla libero, pellentesque aliquet fringendum et, vulputate blandit libero. Cras vulputate cursus arcu. In efficitur augue aliquet efficitur. Ut porttitor posuere velit, non iaculis neque accumsan quis. Nulla mauris massa, lobortis in, rhoncus quis, sacem ac, egestas iaculis urna. Suspendisse augue enim, placerat id tincidunt a, placerat iaculis est. Aenean rhoncus mauris, parietur ac neque massa, quis.'
    }
  ];

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

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const selectedPalestraData = palestras.find(p => p.id === selectedPalestra) || palestras[0];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-300 p-4 flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-400 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-400 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-400 rounded w-1/2"></div>
                </div>
              </div>
              
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
                  <div className="bg-gray-300 p-4 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-3 space-y-6">
            <LectureDetail
              date={new Date()}
              desc='Palestra sobre o controle emocional de chimpanzes sul africanos enquanto jogam clash royale Palestra sobre o controle emocional de chimpanzes sul africanos enquanto jogam clash royalePalestra sobre o controle emocional de chimpanzes sul africanos enquanto jogam clash royalePalestra sobre o controle emocional de chimpanzes sul africanos enquanto jogam clash royalePalestra sobre o controle emocional de chimpanzes sul africanos enquanto jogam clash royale'
              name='Controle Emocional: nao joga mago na Pekka' 
            />
            
            <AttendanceControl
              presentes={presentes}
              ausentes={ausentes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;