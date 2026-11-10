'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  // Exemplo de dados da meta atual de cartas encomendadas na plataforma
  const [totalEncomendadas] = useState<number>(840);
  const metaTotal = 1500; // Meta mínima para fechar o lote de impressão
  const progressoPercentual = Math.min(100, Math.round((totalEncomendadas / metaTotal) * 100));

  return (
    <div className="min-h-screen bg-[#331c14] text-[#FDF8F5] font-sans">
      
      {/* Navbar / Cabeçalho com Logotipo Correto */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[#FF6A2A]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6A2A] rounded-xl flex items-center justify-center font-bold text-white shadow-lg overflow-hidden border border-[#FFD0A3]/30">
            <img src="/images/logo.png" alt="Dungeonist" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            <span className="absolute text-sm font-black text-white">D</span>
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
            Impressão Profissional de TCG • Padrão 63.5 x 88.9 mm
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F6F1EA] leading-tight">
            A plataforma de impressão on-demand para seus jogos de cartas.
          </h1>
          <p className="text-[#F6F1EA]/80 text-base leading-relaxed">
            Reúna seus arquivos de TCG e board games. Com impressão de alta qualidade por R$ 0,60 por carta e envio otimizado, transformamos seus projetos em componentes reais.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <Link 
              href="/painel" 
              className="bg-[#FF6A2A] hover:bg-[#FF6A2A]/85 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg inline-block text-center"
            >
              Fazer Upload e Encomendar
            </Link>
          </div>
        </div>

        {/* Barra de Progresso Real da Meta de Cartas */}
        <div className="bg-[#4B2E2A] p-8 rounded-2xl border border-[#FF6A2A]/30 shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#FF6A2A]/20 pb-3">
            <h3 className="text-lg font-bold text-[#FFD0A3]">
              Meta do Lote Atual
            </h3>
            <span className="text-xs bg-[#331c14] text-[#FFD0A3] px-3 py-1 rounded-full border border-[#FF6A2A]/30 font-semibold">
              Ativo
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#F6F1EA]/80 font-medium">Cartas Encomendadas:</span>
              <span className="text-[#FFD0A3] font-bold">{totalEncomendadas} / {metaTotal} un</span>
            </div>

            {/* Barra de Progresso Visual (Sem Slider Interativo) */}
            <div className="w-full bg-[#331c14] h-4 rounded-full overflow-hidden p-0.5 border border-[#FF6A2A]/30">
              <div 
                className="bg-gradient-to-r from-[#FF6A2A] to-[#FFD0A3] h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressoPercentual}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-[#F6F1EA]/60 pt-1">
              <span>{progressoPercentual}% da meta atingida</span>
              <span>Faltam {metaTotal - totalEncomendadas} un</span>
            </div>
          </div>

          <div className="bg-[#3D231E] p-4 rounded-xl border border-[#FF6A2A]/20 space-y-2 text-sm text-[#F6F1EA]/90">
            <p>✔ Custo por carta: <strong className="text-[#FFD0A3]">R$ 0,60</strong></p>
            <p>✔ Envio seguro via impresso módico</p>
          </div>

          <Link 
            href="/painel" 
            className="w-full block text-center bg-[#FF6A2A] hover:bg-[#FF6A2A]/85 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-md"
          >
            Participar do Lote / Enviar Cartas
          </Link>
        </div>

      </main>
    </div>
  );
}