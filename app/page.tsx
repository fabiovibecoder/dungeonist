'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [deckSize, setDeckSize] = useState<number>(54);

  const printCost = deckSize * 0.60;
  const shippingCost = deckSize > 0 ? 13.50 : 0.00;
  const finalValue = printCost + shippingCost;

  return (
    <div className="min-h-screen bg-[#331c14] text-[#FDF8F5] font-sans">
      
      {/* Navbar / Cabeçalho */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[#FF6A2A]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6A2A] rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
            D
          </div>
          <span className="text-xl font-black tracking-wider text-[#FFD0A3]">DUNGEONIST</span>
        </div>
        
        <Link 
          href="/painel" 
          className="bg-[#FF6A2A] hover:bg-[#FF6A2A]/85 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-lg text-sm"
        >
          Acessar Painel / Upload
        </Link>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <span className="inline-block bg-[#4B2E2A] text-[#FFD0A3] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#FF6A2A]/30">
            Impressão Profissional de TCG • 63.5 x 88.9 mm
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F6F1EA] leading-tight">
            Transforme suas artes em cartas reais de alta qualidade.
          </h1>
          <p className="text-[#F6F1EA]/80 text-base leading-relaxed">
            Plataforma dedicada para criadores de jogos de cartas, Board Games e TCGs independentes. Faça upload dos seus arquivos e receba suas cartas impressas com acabamento profissional na sua casa.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <Link 
              href="/painel" 
              className="bg-[#FF6A2A] hover:bg-[#FF6A2A]/85 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg inline-block text-center"
            >
              Começar a Enviar Cartas
            </Link>
          </div>
        </div>

        {/* Simulador Interativo na Home */}
        <div className="bg-[#4B2E2A] p-8 rounded-2xl border border-[#FF6A2A]/30 shadow-2xl space-y-6">
          <h3 className="text-lg font-bold text-[#FFD0A3] border-b border-[#FF6A2A]/20 pb-3">
            Simulador Rápido de Orçamento
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F6F1EA]">
              Quantidade de Cartas no Baralho: <span className="text-[#FFD0A3] font-bold">{deckSize} un</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="200" 
              value={deckSize} 
              onChange={(e) => setDeckSize(Number(e.target.value))}
              className="w-full accent-[#FF6A2A] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[#F6F1EA]/50">
              <span>1 carta</span>
              <span>100 cartas</span>
              <span>200 cartas</span>
            </div>
          </div>

          <div className="space-y-3 bg-[#3D231E] p-4 rounded-xl border border-[#FF6A2A]/20">
            <div className="flex justify-between text-sm">
              <span className="text-[#F6F1EA]/80">Custo de Impressão (R$ 0,60/un):</span>
              <span className="font-semibold">R$ {printCost.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#F6F1EA]/80">Frete (Impresso Módico):</span>
              <span className="font-semibold">R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="border-t border-[#FF6A2A]/20 pt-3 flex justify-between items-center text-base font-bold">
              <span className="text-[#FFD0A3]">Valor Estimado:</span>
              <span className="text-lg text-[#FFD0A3]">R$ {finalValue.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <Link 
            href="/painel" 
            className="w-full block text-center bg-[#331c14] hover:bg-[#25130e] text-[#FFD0A3] border border-[#FF6A2A]/40 font-bold py-3 rounded-xl transition text-sm"
          >
            Fazer Upload dos Arquivos Reais
          </Link>
        </div>

      </main>
    </div>
  );
}