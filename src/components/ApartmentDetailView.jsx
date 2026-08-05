import React from 'react';
import { ArrowLeft, MapPin, ChevronRight, Users } from 'lucide-react';

export default function ApartmentDetailView({ apartment, onBack, onSelectUnit }) {
  if (!apartment) return null;

  return (
    <div className="flex-1 bg-brand-bg min-h-screen pb-24 flex flex-col relative">
      {/* --- HERO IMAGE HEADER --- */}
      <div className="relative h-64 w-full bg-gray-200">
        <img
          src={apartment.image}
          alt={apartment.name}
          className="w-full h-full object-cover"
        />
        {/* Floating Circular Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 bg-white/95 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md hover:bg-white transition text-gray-800"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* --- FLOATING TITLE CARD --- */}
      <div className="-mt-10 mx-4 bg-white rounded-3xl p-5 shadow-sm border border-gray-100/80 z-10">
        <h1 className="font-bold text-gray-900 text-xl tracking-tight leading-snug">
          {apartment.name}
        </h1>

        <div className="flex items-center text-gray-500 text-xs mt-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 mr-1 text-blue-500 shrink-0" />
          <span>{apartment.location}</span>
        </div>

        {apartment.address && (
          <p className="text-gray-400 text-xs mt-2.5 leading-relaxed">
            {apartment.address}
          </p>
        )}
      </div>

      {/* --- MAIN CONTENT BODY --- */}
      <div className="p-4 space-y-6 flex-1">
        {/* Tentang Section */}
        <div className="space-y-1.5">
          <h2 className="font-bold text-gray-900 text-base">Tentang</h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            {apartment.about || 'Luxurious stay with lagoon views. Modern apartments with swimming pool access and 24-hour security.'}
          </p>
        </div>

        {/* Pilih Unit Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-900 text-base">Pilih Unit</h2>
            <span className="text-xs text-gray-400 font-medium">
              {apartment.unitsList ? `${apartment.unitsList.length} tipe` : '0 tipe'}
            </span>
          </div>

          {/* Unit Options List */}
          <div className="space-y-3">
            {apartment.unitsList && apartment.unitsList.length > 0 ? (
              apartment.unitsList.map((unit) => (
                <div
                  key={unit.id}
                  onClick={() => onSelectUnit(unit)}
                  className="bg-white p-3 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3.5 cursor-pointer hover:shadow-md transition group"
                >
                  {/* Unit Image */}
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />

                  {/* Unit Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                      {unit.name}
                    </h3>

                    <div className="flex items-center text-gray-400 text-xs mt-1 font-medium gap-1">
                      <Users className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                      <span>{unit.capacity}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                      <span>{unit.available} kamar tersedia</span>
                    </div>

                    <div className="text-sm font-bold text-blue-600 mt-1.5">
                      {unit.price}
                      <span className="text-xs font-normal text-gray-400">/malam</span>
                    </div>
                  </div>

                  {/* Right Chevron Arrow */}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0 mr-1" />
                </div>
              ))
            ) : (
              <div className="bg-white p-4 rounded-xl text-center text-xs text-gray-500">
                Belum ada unit tersedia untuk apartemen ini.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
