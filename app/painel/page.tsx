'use client';

import { useState, ChangeEvent } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CardItem {
  id: string;
  name: string;
  quantity: number;
  previewUrl: string;
  filePath: string;
}

export default function PainelCliente() {
  const [items, setItems] = useState<CardItem[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const files = Array.from(e.target.files);
    const newItems: CardItem[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const randomStr = Math.random().toString(36).substring(2);
      const fileName = `${Date.now()}_${randomStr}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const localPreviewUrl = URL.createObjectURL(file);

      const { error } = await supabase.storage
        .from('card-uploads')
        .upload(filePath, file);

      if (error) {
        alert(`Erro ao enviar ${file.name}: ${error.message}`);
        continue;
      }

      newItems.push({
        id: fileName,
        name: file.name,
        quantity: 1,
        previewUrl: localPreviewUrl,
        filePath: filePath,
      });
    }

    setItems((prev) => [...prev, ...newItems]);
    setUploading(false);
    e.target.value = '';
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCards = items.reduce((acc, item) => acc + item.quantity, 0);
  const printCost = totalCards * 0.60;
  const shippingCost = totalCards > 0 ? 13.50 : 0.00;
  const finalValue = printCost + shippingCost;

  return (
    <div className="min-h-screen bg-[#331c14] text-[#FDF8F5] p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between bg-[#4B2E2A] p-4 rounded-xl border border-[#FF6A2A]/30 mb-8">
          <h1 className="text-xl font-bold text-[#FFD0A3]">DUNGEONIST | PAINEL</h1>
          <a href="/" className="text-sm text-[#FFD0A3] hover:underline">Voltar ao Início</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Seção de Upload e Lista */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#4B2E2A] p-6 rounded-2xl border border-[#FF6A2A]/30">
              <h2 className="text-lg font-semibold text-[#FFD0A3] mb-4">Seus Arquivos de Cartas</h2>
              <div className="text-xs text-[#FF6A2A] mb-2">Padrão: 63.5 x 88.9 mm</div>
              
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#FF6A2A]/50 rounded-xl p-8 cursor-pointer hover:border-[#FFD0A3] transition bg-[#3D231E]">
                <input 
                  type="file" 
                  multiple 
                  accept="image/png, image/jpeg, application/pdf" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
                <p className="text-sm text-[#FFD0A3] font-medium text-center">
                  {uploading ? 'Enviando arquivos para o Supabase...' : 'Clique para selecionar ou solte seus arquivos aqui'}
                </p>
                <span className="text-xs text-[#F6F1EA]/60 mt-1">Suporta PNG, JPG ou PDF</span>
              </label>

              {/* Lista de Itens */}
              <div className="space-y-3 pt-6">
                {items.map((item) => (
                  <div key={item.id} className="bg-[#4B2E2A] p-4 rounded-xl border border-[#FF6A2A]/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 relative rounded bg-slate-900 overflow-hidden shrink-0 border border-[#FF6A2A]/30 flex items-center justify-center">
                        {item.name.endsWith('.pdf') ? (
                          <span className="text-xs font-bold text-[#FF6A2A]">PDF</span>
                        ) : (
                          <img src={item.previewUrl} alt={item.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#F6F1EA] truncate max-w-[200px]">{item.name}</h4>
                        <span className="text-xs text-[#FFD0A3]">Unidade: R$ 0,60</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-[#3D231E] rounded-lg border border-[#FF6A2A]/30 overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-[#FF6A2A]/20 text-[#FFD0A3]">-</button>
                        <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-[#FF6A2A]/20 text-[#FFD0A3]">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:underline">Remover</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-[#4B2E2A] p-6 rounded-2xl border border-[#FF6A2A]/30 h-fit space-y-4">
            <h2 className="text-lg font-semibold text-[#FFD0A3] border-b border-[#FF6A2A]/20 pb-3">Resumo do Pedido</h2>
            
            <div className="flex justify-between text-sm">
              <span className="text-[#F6F1EA]/80">Total de Cartas:</span>
              <span className="font-bold">{totalCards} un</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-[#F6F1EA]/80">Custo de Impressão:</span>
              <span>R$ {printCost.toFixed(2).replace('.', ',')}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-[#F6F1EA]/80">Frete (Impresso Módico):</span>
              <span>R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="border-t border-[#FF6A2A]/20 pt-3 flex justify-between items-center text-lg font-bold">
              <span>Valor Final:</span>
              <span className="text-[#FFD0A3]">R$ {finalValue.toFixed(2).replace('.', ',')}</span>
            </div>

            <button 
              disabled={items.length === 0}
              className="w-full bg-[#FF6A2A] hover:bg-[#FF6A2A]/80 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition mt-4"
            >
              Prosseguir para Pagamento (PagBank)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}