import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';

export default function CekPesananView({ onSearchBooking, onBack }) {
  const [kodePesanan, setKodePesanan] = useState('');
  const [noWhatsapp, setNoWhatsapp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kodePesanan.trim()) {
      setErrorMsg('Masukkan kode pesanan anda.');
      return;
    }
    setErrorMsg('');
    const success = onSearchBooking(kodePesanan.trim(), noWhatsapp.trim());
    if (!success) {
      setErrorMsg('Pesanan tidak ditemukan. Silakan periksa kembali Kode Pesanan dan Nomor WhatsApp.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col relative pb-28">
      {/* Seamless Full-Width Header */}
      <header className="w-full bg-white px-5 py-4 sticky top-0 z-30 flex items-center gap-3 border-b border-slate-100 shadow-2xs">
        {onBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition active:scale-95 -ml-1"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="font-bold text-slate-900 text-base tracking-tight">Cek Pesanan</h1>
      </header>

      {/* Main Full-Width Content */}
      <main className="w-full flex-1 px-5 pt-8 pb-6 flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Top Illustration Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-blue-50/90 flex items-center justify-center mb-5 border border-blue-100/60 shadow-xs">
              <Search className="w-9 h-9 text-blue-600 stroke-[2.2]" />
            </div>
            <h2 className="font-bold text-slate-900 text-lg tracking-tight mb-1.5">
              Lacak Pesananmu
            </h2>
            <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed">
              Masukkan kode pesanan dan nomor WhatsApp untuk melihat status terbaru.
            </p>
          </div>

          {/* Form Fields */}
          <div className="w-full space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kode Pesanan
              </label>
              <input
                type="text"
                placeholder="WBP-XXXX-XXXX"
                value={kodePesanan}
                onChange={(e) => {
                  setKodePesanan(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-800 placeholder-slate-300 tracking-wider outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                placeholder="081234567890"
                value={noWhatsapp}
                onChange={(e) => {
                  setNoWhatsapp(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs"
              />
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-medium text-rose-600 flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm py-3.5 rounded-2xl shadow-md shadow-blue-600/20 transition text-center mt-2"
            >
              Cek Pesanan
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="text-center pt-8 pb-2">
          <p className="text-[11px] font-medium text-slate-400">
            Lupa kode pesanan?
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Cek pesan WhatsApp yang kami kirimkan saat pemesanan.
          </p>
        </div>
      </main>
    </div>
  );
}
