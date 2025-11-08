import React, { useState } from 'react';
import {  BookOpen  } from 'lucide-react';

interface PalestraFormData {
  nome: string;
  data: string;
  categoria: string;
  descricao: string;
  adicionarFavoritos: boolean;
}

export default function CriarPalestra() {
  const [formData, setFormData] = useState<PalestraFormData>({
    nome: '',
    data: '',
    categoria: '',
    descricao: '',
    adicionarFavoritos: false,
  });

  const categorias = [
    'Tecnologia',
    'Negócios',
    'Educação',
    'Saúde',
    'Cultura',
    'Outro'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      data: '',
      categoria: '',
      descricao: '',
      adicionarFavoritos: false,
    });
  };

  const handleCreate = () => {
    if (formData.nome && formData.data && formData.categoria) {
      console.log('Palestra criada:', formData);
      alert('Palestra criada com sucesso!');
      handleCancel();
    } else {
      alert('Por favor, preencha os campos obrigatórios');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Card Modal */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-gray-700" />
            <h1 className="text-2xl font-semibold text-gray-800">Criar Palestra</h1>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Nome da Palestra */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da palestra
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o nome da palestra"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Data */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Digite a descrição da palestra"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Checkbox Favoritos */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="favoritos"
                name="adicionarFavoritos"
                checked={formData.adicionarFavoritos}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="favoritos" className="text-sm text-gray-600 cursor-pointer">
                Add to favorites
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
