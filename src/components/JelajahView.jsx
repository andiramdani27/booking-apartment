import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, ChevronRight } from 'lucide-react';

export default function JelajahView({ apartments, onBack, onSelectApartment }) {
  const [selectedLocation, setSelectedLocation] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const locations = ['Semua', 'Bekasi', 'Cikarang', 'Bogor', 'Jakarta'];

  // Filter apartment logic
  const filteredApartments = apartments.filter((item) => {
    const matchesLocation =
      selectedLocation === 'Semua' || item.location.toLowerCase() === selectedLocation.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  return (
    <div className="flex-1 bg-brand-bg min-h-screen pb-20 flex flex-col">
      {/* --- TOP HEADER BAR --- */}
      <header className="bg-white px-4 py-4 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-40 shadow-2xs">
        <button
          onClick={onBack}
          className="p-1.5 -ml-1 text-gray-700 hover:bg-gray-100 rounded-full transition"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-gray-900 text-lg">Jelajah Apartemen</h1>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="p-4 space-y-4 flex-1">
        {/* Search Input Box */}
        <div className="relative bg-white rounded-2xl shadow-xs border border-gray-100 flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-blue-500 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Cari apartemen atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
          />
        </div>

        {/* Location Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5">
          {locations.map((loc) => {
            const isActive = selectedLocation === loc;
            return (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {loc !== 'Semua' && (
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                )}
                {loc}
              </button>
            );
          })}
        </div>

        {/* Apartments Count */}
        <div className="text-xs text-gray-500 font-medium px-0.5">
          <span className="font-bold text-gray-800">{filteredApartments.length}</span> apartemen
        </div>

        {/* Apartments List (Vertical Cards) */}
        <div className="space-y-4">
          {filteredApartments.length > 0 ? (
            filteredApartments.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectApartment(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-gray-100 hover:shadow-md transition cursor-pointer group flex flex-col"
              >
                {/* Apartment Image Container */}
                <div className="relative h-52 w-full bg-gray-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Location Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-gray-800 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Apartment Details Container */}
                <div className="p-4 flex justify-between items-center bg-white">
                  <div>
                    <h2 className="font-bold text-gray-900 text-base leading-snug">
                      {item.name}
                    </h2>
                    <div className="flex items-center text-gray-400 text-xs mt-1 font-medium gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.location}</span>
                      {item.units !== null && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-blue-600 font-semibold">
                            {item.unitsList ? `${item.unitsList.length} tipe unit` : `${item.units} unit`}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-gray-500 text-sm font-medium">Apartemen tidak ditemukan</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
