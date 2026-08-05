import React from 'react';
import { ArrowLeft, Heart, Users, Compass, Trash2 } from 'lucide-react';

export default function SimpanView({
  savedUnits,
  onBack,
  onRemoveSavedUnit,
  onClearAllSaved,
  onSelectSavedUnit,
  onGoToJelajah
}) {
  return (
    <div className="flex-1 bg-brand-bg min-h-screen pb-24 flex flex-col relative">
      {/* --- TOP HEADER BAR --- */}
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg">Tersimpan</h1>
        </div>

        {/* Action Hapus Semua */}
        {savedUnits && savedUnits.length > 0 && (
          <button
            onClick={onClearAllSaved}
            className="text-xs font-medium text-gray-500 hover:text-rose-600 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50"
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-rose-500" />
            <span>Hapus semua</span>
          </button>
        )}
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="p-4 space-y-3 flex-1 max-w-md mx-auto w-full">
        {/* Saved Count */}
        {savedUnits && savedUnits.length > 0 ? (
          <>
            <div className="text-xs text-gray-400 font-medium px-0.5 mb-1">
              {savedUnits.length} unit tersimpan
            </div>

            {/* Saved List Cards */}
            <div className="space-y-3">
              {savedUnits.map(({ apartment, unit }) => (
                <div
                  key={`${apartment.id}-${unit.id}`}
                  className="bg-white p-3.5 rounded-3xl border border-gray-100 shadow-2xs hover:shadow-xs transition flex items-center justify-between gap-3 cursor-pointer group"
                  onClick={() => onSelectSavedUnit(apartment, unit)}
                >
                  {/* Left Side: Image & Info */}
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <img
                      src={unit.image}
                      alt={unit.name}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-blue-600 mb-0.5 truncate">
                        {unit.name}
                      </div>
                      <h2 className="font-bold text-gray-900 text-sm leading-tight truncate">
                        {apartment.name}
                      </h2>
                      <div className="flex items-center text-gray-400 text-xs mt-1 font-medium gap-1">
                        <Users className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                        <span>{unit.capacity}</span>
                      </div>
                      <div className="text-sm font-bold text-blue-600 mt-1">
                        {unit.price}
                        <span className="text-xs font-normal text-gray-400">/malam</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Heart Button to remove */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSavedUnit(apartment, unit);
                    }}
                    className="w-10 h-10 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 transition active:scale-95 shadow-2xs"
                    title="Hapus dari tersimpan"
                  >
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl p-8 text-center text-gray-400 space-y-3 border border-gray-100 my-8 shadow-2xs">
            <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-400">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="font-bold text-gray-800 text-base">Belum Ada Unit Tersimpan</h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
              Simpan unit apartemen favoritmu dengan menekan ikon hati di halaman detail unit!
            </p>
            <button
              onClick={onGoToJelajah}
              className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-md transition active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Jelajah Apartemen</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
