'use client';

import { useState } from 'react';

export default function Home() {
  const [cardQuantity, setCardQuantity] = useState<number>(50);

  // Cálculo do valor das cartas (R$ 0,60 por carta)
  const printCost = cardQuantity * 0.60;

  // Cálculo estimado do frete (Impresso Módico por faixa de peso)
  // ~2.5g por carta em papel cartão 300g
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
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-wider text-amber-500">DUNGEONIST</span>
            <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
              63.5 x 88.9 mm
            </span>
          </div>
          <div className="flex gap-4">
            <button className="text-sm text-slate-300 hover:text-white transition">Entrar</button>
            <button className="text-sm bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded hover:bg-amber-400 transition">
              Criar Conta
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Meta do Mês */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Meta de Impressão Coletiva</h1>
              <p className="text-slate-400 text-sm mt-1">
                Produção garantida assim que atingirmos 1.000 cartas no lote mensal.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Preço por carta</span>
              <span className="text-3xl font-extrabold text-amber-400">R$ 0,60</span>
            </div>
          </div>

          {/* Componente do Termómetro */}
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-slate-300">Progresso Atual</span>
              <span className="text-amber-400">720 / 1.000 cartas (72%)</span>
            </div>
            
            {/* Barra de Progresso */}
            <div className="w-full bg-slate-800 h-6 rounded-full overflow-hidden flex p-1 gap-1">
              <div 
                className="bg-indigo-600 h-full rounded-l-full transition-all duration-500" 
                style={{ width: '20%' }} 
                title="200 cartas acumuladas do mês anterior"
              />
              <div 
                className="bg-amber-500 h-full rounded-r-full transition-all duration-500" 
                style={{ width: '52%' }} 
                title="520 cartas submetidas este mês"
              />
            </div>

            <div className="flex flex-wrap justify-between text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" /> Acumulado mês anterior: <strong>200</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Submetido este mês: <strong>520</strong>
                </span>
              </div>
              <span>Faltam <strong>280 cartas</strong> para atingir a meta!</span>
            </div>
          </div>
        </section>

        {/* Como Funciona & Calculadora */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Como Funciona?</h2>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3 items-start">
                <span className="bg-slate-800 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span><strong>Envie suas Artes:</strong> Faça o upload das cartas (63,5 x 88,9 mm). O nosso admin revisa as sangrias e gabaritos.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-slate-800 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span><strong>Acompanhe a Meta:</strong> Ao atingir 1.000 cartas, o lote é enviado para a gráfica ao final do mês.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-slate-800 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span><strong>Reembolso ou Migração:</strong> Se a meta não for atingida, escolha entre estorno total (PagBank) ou migrar para o mês seguinte.</span>
              </li>
            </ul>
          </div>

          {/* Simulador */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Simulador de Pedido</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Quantidade de Cartas</label>
              <input 
                type="number" 
                value={cardQuantity}
                min={1}
                onChange={(e) => setCardQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-2 text-sm border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Impressão (R$ 0,60/un):</span>
                <span className="text-white font-medium">R$ {printCost.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Frete (Impresso Módico):</span>
                <span className="text-white font-medium">R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Estimado:</span>
                <span className="text-amber-400">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition">
              Criar Pedido
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}