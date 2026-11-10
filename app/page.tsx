'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [cardQuantity, setCardQuantity] = useState<number>(50);

  // Cálculo do valor das cartas (R$ 0,60 por carta)
  const printCost = cardQuantity * 0.60;

  // Cálculo estimado do frete (Impresso Módico por faixa de peso)
  const approxWeightGrams = cardQuantity * 2.5;
  
  let shippingCost = 13.50; // Até 200g
  if (approxWeightGrams > 200 && approxWeightGrams <= 500) {
    shippingCost = 18.00;
  } else if (approxWeightGrams > 500 && approxWeightGrams <= 1000) {
    shippingCost = 24.50;
  } else if (approxWeightGrams > 1000) {
    shippingCost = 32.00;
  }

  const grandTotal = printCost + shippingCost;

  return (
    <div style={{ backgroundColor: '#4B2E2A', color: '#F6F1EA' }} className="min-h-screen font-sans">
      {/* Header com Logotipo */}
      <header className="border-b border-[#FF6A2A]/20 bg-[#4B2E2A]/90 sticky top-0 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full overflow-hidden border border-[#FF6A2A]">
              <Image 
                src="/logo.png" 
                alt="Dungeonist Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-[#FF6A2A]">DUNGEONIST</span>
              <span className="text-[10px] bg-[#FF6A2A]/10 text-[#FFD0A3] px-2 py-0.5 rounded block border border-[#FF6A2A]/20">
                63.5 x 88.9 mm
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="text-sm text-[#FFD0A3] hover:text-white transition">Entrar</button>
            <button className="text-sm bg-[#FF6A2A] text-[#4B2E2A] font-bold px-4 py-2 rounded hover:bg-[#FF9A4D] transition shadow-lg">
              Criar Conta
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Meta do Mês */}
        <section className="bg-[#38211E] rounded-2xl p-6 md:p-8 border border-[#FF6A2A]/30 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#F6F1EA]">Meta de Impressão Coletiva</h1>
              <p className="text-[#FFD0A3] text-sm mt-1">
                Produção garantida assim que atingirmos 1.000 cartas no lote mensal.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#FFD0A3] uppercase tracking-wider block">Preço por carta</span>
              <span className="text-3xl font-extrabold text-[#FF6A2A]">R$ 0,60</span>
            </div>
          </div>

          {/* Componente do Termômetro */}
          <div className="space-y-3 bg-[#4B2E2A] p-5 rounded-xl border border-[#FF6A2A]/20">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-[#F6F1EA]">Progresso Atual</span>
              <span className="text-[#FF6A2A]">720 / 1.000 cartas (72%)</span>
            </div>
            
            {/* Barra de Progresso */}
            <div className="w-full bg-[#38211E] h-6 rounded-full overflow-hidden flex p-1 gap-1 border border-[#FF6A2A]/20">
              <div 
                className="bg-[#FF9A4D] h-full rounded-l-full transition-all duration-500" 
                style={{ width: '20%' }} 
                title="200 cartas acumuladas do mês anterior"
              />
              <div 
                className="bg-[#FF6A2A] h-full rounded-r-full transition-all duration-500" 
                style={{ width: '52%' }} 
                title="520 cartas submetidas este mês"
              />
            </div>

            <div className="flex flex-wrap justify-between text-xs text-[#FFD0A3] pt-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#FF9A4D] rounded-full" /> Acumulado mês anterior: <strong>200</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#FF6A2A] rounded-full" /> Submetido este mês: <strong>520</strong>
                </span>
              </div>
              <span>Faltam <strong>280 cartas</strong> para atingir a meta!</span>
            </div>
          </div>
        </section>

        {/* Como Funciona & Calculadora */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#F6F1EA]">Como Funciona?</h2>
            <ul className="space-y-4 text-sm text-[#F6F1EA]">
              <li className="flex gap-3 items-start">
                <span className="bg-[#38211E] text-[#FF6A2A] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border border-[#FF6A2A]/30">1</span>
                <span><strong>Envie suas Artes:</strong> Faça o upload das cartas (63,5 x 88,9 mm). O nosso admin revisa as sangrias e gabaritos.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-[#38211E] text-[#FF6A2A] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border border-[#FF6A2A]/30">2</span>
                <span><strong>Acompanhe a Meta:</strong> Ao atingir 1.000 cartas, o lote é enviado para a gráfica ao final do mês.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-[#38211E] text-[#FF6A2A] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border border-[#FF6A2A]/30">3</span>
                <span><strong>Reembolso ou Migração:</strong> Se a meta não for atingida, escolha entre estorno total (PagBank) ou migrar para o mês seguinte.</span>
              </li>
            </ul>
          </div>

          {/* Simulador */}
          <div className="bg-[#38211E] p-6 rounded-2xl border border-[#FF6A2A]/30 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#F6F1EA]">Simulador de Pedido</h3>
            <div>
              <label className="text-xs text-[#FFD0A3] block mb-1">Quantidade de Cartas</label>
              <input 
                type="number" 
                value={cardQuantity}
                min={1}
                onChange={(e) => setCardQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-[#4B2E2A] border border-[#FF6A2A]/40 rounded-lg px-4 py-2 text-[#F6F1EA] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            <div className="space-y-2 text-sm border-t border-[#FF6A2A]/20 pt-4">
              <div className="flex justify-between text-[#FFD0A3]">
                <span>Impressão (R$ 0,60/un):</span>
                <span className="text-[#F6F1EA] font-medium">R$ {printCost.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-[#FFD0A3]">
                <span>Frete (Impresso Módico):</span>
                <span className="text-[#F6F1EA] font-medium">R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#F6F1EA] pt-2 border-t border-[#FF6A2A]/20">
                <span>Total Estimado:</span>
                <span className="text-[#FF6A2A]">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button className="w-full bg-[#FF6A2A] hover:bg-[#FF9A4D] text-[#4B2E2A] font-bold py-3 rounded-xl transition shadow-lg">
              Criar Pedido
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}