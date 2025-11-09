import { useEffect, useState } from "react"
import { api } from "../api/api";
import { Clock } from "lucide-react";


export interface Palestras {
    titulo: string,
    id: string,
    descricao: string,
    horario_fim: string,
    horario_inicio: string,
    status: string
}

const PalestraCard: React.FC<{ 
  palestra: Palestras; 
  isSelected: boolean; 
  onClick: () => void 
}> = ({ palestra, isSelected, onClick }) => (
  <div 
    className={`p-4 cursor-pointer border-l-4 transition-all duration-200 hover:shadow-md ${
      isSelected 
        ? 'bg-red-600 text-white border-red-800' 
        : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'
    }`}
    onClick={onClick}
  >
    <div className="font-semibold">{palestra.titulo}</div>
    <div className={`text-sm mt-1 flex items-center gap-1 ${isSelected ? 'text-red-100' : 'text-gray-600'}`}>
      <Clock size={14} />
      {palestra.horario_inicio} - {palestra.horario_fim}
    </div>
  </div>
);

export const PalestrasNavigation: React.FC<{
  palestras: Palestras[];
  selectedPalestraId: string;
  onSelectPalestra: (id: string) => void;
  isLoading: boolean;
}> = ({ palestras, selectedPalestraId, onSelectPalestra, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <h3 className="text-center font-bold text-gray-700 mb-3">Palestras</h3>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-300 p-4 rounded animate-pulse h-20"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-center font-bold text-gray-700 mb-3">Palestras</h3>
      <div className="space-y-2">
        {palestras.map(palestra => (
          <PalestraCard
            key={palestra.id}
            palestra={palestra}
            isSelected={selectedPalestraId === palestra.id}
            onClick={() => onSelectPalestra(palestra.id)}
          />
        ))}
      </div>
    </div>
  );
};