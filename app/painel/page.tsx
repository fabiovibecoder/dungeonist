'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  previewUrl: string;
}

export default function PainelCliente() {
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', name: 'Carta_Guerreiro_Fogo.png', quantity: 4, previewUrl: 'https://placehold.co/300x420/FF6A2A/4B2E2A?text=Guerreiro' },
    { id: '2', name: 'Carta_Magia_Cura.png', quantity: 2, previewUrl: 'https://placehold.co/300x420/FF9A4D/4B2E2A?text=Magia' }
  ]);

  const totalCards = items.reduce((acc, item) => acc + item.quantity, 0);
  const printCost = totalCards * 0.60;
  
  // Cálculo de frete Impresso Módico simulado
  let shippingCost = 13.50;
  const weightGrams = totalCards * 2.5;
  if (weightGrams > 200 && weightGrams <= 500) shippingCost = 18.00;
  else if (weightGrams > 500 && weightGrams <= 1000) shippingCost = 24.50;
  else if (weightGrams > 1000) shippingCost = 32.00;

  const grandTotal = printCost + shippingCost;

  const handleQuantityChange = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ backgroundColor: '#4B2E2A', color: '#F6F1EA' }} className="min-h-screen font-sans">
      {/* Header */}
      <header className="border-b border-[#FF6A2A]/20 bg-[#4B2E2A]/90 sticky top-0 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full overflow-hidden border border-[#FF6A2A]">
              <Image src="/logo.png" alt="Dungeonist Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-black tracking-wider text-[#FF6A2A]">DUNGEONIST | PAINEL</span>
          </div>
          <a href="/" className="text-sm text-[#FFD0A3] hover:text-white transition">Voltar ao Início</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        {/* Lista de Arquivos Enviados */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#38211E] p-6 rounded-2xl border border-[#FF6A2A]/30 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#F6F1EA]">Seus Arquivos de Cartas</h2>
              <span className="text-xs bg-[#FF6A2A]/10 text-[#FFD0A3] px-3 py-1 rounded-full border border-[#FF6A2A]/20">
                Padrão: 63.5 x 88.9 mm
              </span>
            </div>

            {/* Botão de Upload Fictício */}
            <div className="border-2 border-dashed border-[#FF6A2A]/40 rounded-xl p-8 text-center bg-[#4B2E2A]/50 hover:bg-[#4B2E2A] transition cursor-pointer">
              <p className="text-sm text-[#FFD0A3] font-medium">Arraste seus arquivos aqui ou clique para enviar</p>
              <span className="text-xs text-[#F6F1EA]/60 mt-1 block">Suporta PNG, JPG ou PDF (com sangria recomendada)</span>
            </div>

            {/* Grid de Itens */}
            <div className="space-y-3 pt-2">
              {items.map((item) => (
                <div key={item.id} className="bg-[#4B2E2A] p-4 rounded-xl border border-[#FF6A2A]/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 relative rounded bg-slate-900 overflow-hidden shrink-0 border border-[#FF6A2A]/30">
                      <Image src={item.previewUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#F6F1EA]">{item.name}</h4>
                      <span className="text-xs text-[#FFD0A3]">Unidade: R$ 0,60</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#38211E] rounded-lg border border-[#FF6A2A]/30">
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="px-3 py-1 text-[#FFD0A3] hover:text-white">-</button>
                      <span className="px-2 text-sm font-bold text-[#F6F1EA]">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="px-3 py-1 text-[#FFD0A3] hover:text-white">+</button>
                    </div>
                    <button onClick={() => handleRemove(item.id)} className="text-xs text-red-400 hover:text-red-300 px-2 py-1">Remover</button>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-center text-sm text-[#FFD0A3] py-8">Nenhuma carta adicionada ao pedido ainda.</p>
              )}
            </div>
          </div>
        </div>

        {/* Resumo do Pedido & Checkout */}
        <div className="space-y-6">
          <div className="bg-[#38211E] p-6 rounded-2xl border border-[#FF6A2A]/30 shadow-xl space-y-4 sticky top-24">
            <h3 className="text-lg font-bold text-[#F6F1EA]">Resumo do Pedido</h3>
            
            <div className="space-y-2 text-sm border-t border-[#FF6A2A]/20 pt-4 text-[#FFD0A3]">
              <div className="flex justify-between">
                <span>Total de Cartas:</span>
                <span className="text-[#F6F1EA] font-bold">{totalCards} un</span>
              </div>
              <div className="flex justify-between">
                <span>Custo de Impressão:</span>
                <span className="text-[#F6F1EA]">R$ {printCost.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete (Impresso Módico):</span>
                <span className="text-[#F6F1EA]">R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#F6F1EA] pt-3 border-t border-[#FF6A2A]/20">
                <span>Valor Final:</span>
                <span className="text-[#FF6A2A]">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button className="w-full bg-[#FF6A2A] hover:bg-[#FF9A4D] text-[#4B2E2A] font-bold py-3 rounded-xl transition shadow-lg">
              Prosseguir para Pagamento (PagBank)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}