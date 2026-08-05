import React from 'react';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Users,
  Building2,
  Wifi,
  Wind,
  Tv,
  Box,
  Flame,
  Utensils,
  Sun,
  Waves,
  Dumbbell,
  Car
} from 'lucide-react';

export default function UnitTypeDetailView({
  apartment,
  unit,
  onBack,
  onBookNow,
  isSaved,
  onToggleSave
}) {
  if (!unit || !apartment) return null;

  // Icon mapping for facilities
  const getFacilityIcon = (type) => {
    switch (type) {
      case 'wifi':
        return <Wifi className="w-4 h-4 text-blue-500" />;
      case 'ac':
        return <Wind className="w-4 h-4 text-blue-500" />;
      case 'tv':
        return <Tv className="w-4 h-4 text-blue-500" />;
      case 'fridge':
        return <Box className="w-4 h-4 text-blue-500" />;
      case 'heater':
        return <Flame className="w-4 h-4 text-blue-500" />;
      case 'kitchen':
        return <Utensils className="w-4 h-4 text-blue-500" />;
      case 'balcony':
        return <Sun className="w-4 h-4 text-blue-500" />;
      case 'pool':
        return <Waves className="w-4 h-4 text-blue-500" />;
      case 'gym':
        return <Dumbbell className="w-4 h-4 text-blue-500" />;
      case 'parking':
        return <Car className="w-4 h-4 text-blue-500" />;
      default:
        return <Wifi className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex-1 bg-brand-bg min-h-screen pb-48 flex flex-col relative">
      {/* --- HERO IMAGE HEADER --- */}
      <div className="relative h-64 w-full bg-gray-200">
        <img
          src={unit.image}
          alt={unit.name}
          className="w-full h-full object-cover"
        />

        {/* Floating Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 bg-white/95 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md hover:bg-white transition text-gray-800"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Floating Heart Favorite Button */}
        <button
          onClick={() => onToggleSave && onToggleSave(apartment, unit)}
          className="absolute top-4 right-4 w-9 h-9 bg-white/95 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md hover:bg-white transition active:scale-90"
          aria-label="Simpan"
        >
          <Heart className={`w-5 h-5 transition ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-rose-500'}`} />
        </button>
      </div>

      {/* --- FLOATING TITLE CARD --- */}
      <div className="-mt-10 mx-4 bg-white rounded-3xl p-5 shadow-sm border border-gray-100/80 z-10">
        <h1 className="font-bold text-gray-900 text-xl tracking-tight leading-snug">
          {unit.name}
        </h1>

        <div className="flex items-center text-gray-500 text-xs mt-1 font-medium">
          <MapPin className="w-3.5 h-3.5 mr-1 text-blue-500 shrink-0" />
          <span>{apartment.name}</span>
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <div className="bg-gray-100/80 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gray-500" />
            <span>{unit.capacity}</span>
          </div>

          <div className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-500" />
            <span>{unit.available} unit tersedia</span>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT BODY --- */}
      <div className="p-4 space-y-6 flex-1">
        {/* Fasilitas Section */}
        <div>
          <h2 className="font-bold text-gray-900 text-base mb-3">Fasilitas</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {unit.facilities && unit.facilities.map((fac, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-2xs"
              >
                <div className="p-2 bg-blue-50/80 rounded-xl shrink-0">
                  {getFacilityIcon(fac.type)}
                </div>
                <span className="text-xs font-semibold text-gray-700 truncate">{fac.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tentang Unit Ini Section */}
        <div className="space-y-1.5">
          <h2 className="font-bold text-gray-900 text-base">Tentang unit ini</h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            {unit.about || 'Compact studio apartment perfect for solo travelers or couples.'}
          </p>
        </div>

        {/* Harga Section */}
        <div>
          <h2 className="font-bold text-gray-900 text-base mb-3">Harga</h2>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-2.5 shadow-2xs">
            {unit.pricingBreakdown && unit.pricingBreakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">{item.label}</span>
                <span className="font-bold text-gray-800">{item.price}</span>
              </div>
            ))}

            {unit.weekendExtra && (
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Biaya tambahan akhir pekan</span>
                <span className="font-bold text-amber-500">{unit.weekendExtra}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- FIXED BOTTOM BOOKING BAR --- */}
      <div className="fixed bottom-[72px] left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-5 py-3 flex justify-between items-center z-40 shadow-lg">
        <div>
          <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Mulai Dari</div>
          <div className="text-base font-bold text-gray-900">
            {unit.price}
            <span className="text-xs font-normal text-gray-400">/malam</span>
          </div>
        </div>

        <button
          onClick={onBookNow}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition"
        >
          Pesan sekarang
        </button>
      </div>
    </div>
  );
}
