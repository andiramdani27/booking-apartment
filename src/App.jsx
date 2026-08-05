import React, { useState } from 'react';
import {
  Bell,
  Search,
  MapPin,
  Home,
  Compass,
  Heart,
  Calendar,
  Building2
} from 'lucide-react';
import JelajahView from './components/JelajahView';
import ApartmentDetailView from './components/ApartmentDetailView';
import UnitTypeDetailView from './components/UnitTypeDetailView';
import PemesananView from './components/PemesananView';
import SimpanView from './components/SimpanView';
import CekPesananView from './components/CekPesananView';
import DetailPesananView from './components/DetailPesananView';
import { apartmentsData } from './data/apartmentsData';

// Default initial cached booking matching user reference image
const initialSampleBooking = {
  id: 1,
  bookingCode: 'WBP-HNTB-NS4X',
  whatsappNumber: '081234567890',
  guestName: 'a',
  unitType: 'Studio',
  propertyName: 'Grand Kamala Lagoon',
  checkInFormatted: 'Kam, 6 Agu 2026, 21.30',
  checkOutFormatted: 'Jum, 7 Agu 2026, 21.30',
  totalPrice: 350000,
  totalPriceFormatted: 'Rp 350.000',
  bankInfo: {
    bankName: 'BCA',
    accountNumber: '5771717340',
    accountName: 'FRENGKI PANJAITAN'
  },
  status: 'Menunggu Pembayaran',
  paymentProof: null,
  paymentStatus: 'pending',
  hoursLeft: 1,
  minutesLeft: 0,
  secondsLeft: 0
};

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isBookingPage, setIsBookingPage] = useState(false);
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState('');

  // Bookings state cache
  const [myBookings, setMyBookings] = useState([initialSampleBooking]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Wishlist / Saved Units state pre-populated with Grand Kamala Lagoon Studio matching design image
  const [savedUnits, setSavedUnits] = useState([
    {
      apartment: apartmentsData[0],
      unit: apartmentsData[0].unitsList[0]
    }
  ]);

  const isUnitSaved = (aptId, unitId) => {
    return savedUnits.some(
      (item) => item.apartment.id === aptId && item.unit.id === unitId
    );
  };

  const handleToggleSave = (apartment, unit) => {
    if (isUnitSaved(apartment.id, unit.id)) {
      setSavedUnits(
        savedUnits.filter(
          (item) => !(item.apartment.id === apartment.id && item.unit.id === unit.id)
        )
      );
    } else {
      setSavedUnits([...savedUnits, { apartment, unit }]);
    }
  };

  const handleRemoveSavedUnit = (apartment, unit) => {
    setSavedUnits(
      savedUnits.filter(
        (item) => !(item.apartment.id === apartment.id && item.unit.id === unit.id)
      )
    );
  };

  const handleClearAllSaved = () => {
    setSavedUnits([]);
  };

  const handleSelectSavedUnit = (apartment, unit) => {
    setSelectedApartment(apartment);
    setSelectedUnit(unit);
    setIsBookingPage(false);
    setSelectedBooking(null);
  };

  const handleSelectApartment = (apartment) => {
    setSelectedApartment(apartment);
    setSelectedUnit(null);
    setIsBookingPage(false);
    setSelectedBooking(null);
  };

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setIsBookingPage(false);
    setSelectedBooking(null);
  };

  const handleGoToBooking = () => {
    setIsBookingPage(true);
  };

  const handleBackFromBooking = () => {
    setIsBookingPage(false);
  };

  const handleBackFromUnit = () => {
    setSelectedUnit(null);
    setIsBookingPage(false);
  };

  const handleBackFromApartment = () => {
    setSelectedApartment(null);
    setSelectedUnit(null);
    setIsBookingPage(false);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedApartment(null);
    setSelectedUnit(null);
    setIsBookingPage(false);
    if (tabName !== 'pesanan') {
      setSelectedBooking(null);
    }
  };

  // Search booking by code & whatsapp
  const handleSearchBooking = (kode, wa) => {
    const searchCode = kode.trim().toUpperCase();
    const searchWa = wa.trim();

    const found = myBookings.find((b) => {
      const codeMatch = b.bookingCode.toUpperCase() === searchCode;
      if (!searchWa) return codeMatch;
      return codeMatch && (b.whatsappNumber === searchWa || b.whatsappNumber.includes(searchWa));
    });

    if (found) {
      setSelectedBooking({
        ...found,
        hoursLeft: 1,
        minutesLeft: 0,
        secondsLeft: 0
      });
      return true;
    }
    return false;
  };

  // Helper to generate unique booking code like WBP-HNTB-NS4X
  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let p1 = '', p2 = '';
    for (let i = 0; i < 4; i++) {
      p1 += chars.charAt(Math.floor(Math.random() * chars.length));
      p2 += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `WBP-${p1}-${p2}`;
  };

  // Format Date for Rincian Pesanan display
  const formatBookingDate = (dateObj) => {
    if (!dateObj) return '';
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dayName = days[dateObj.getDay()];
    const dayNum = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const mins = String(dateObj.getMinutes()).padStart(2, '0');
    return `${dayName}, ${dayNum} ${monthName} ${year}, ${hours}.${mins}`;
  };

  const handleSubmitBooking = (bookingData) => {
    const code = generateBookingCode();
    const newBooking = {
      id: Date.now(),
      bookingCode: code,
      whatsappNumber: bookingData.whatsappNumber,
      guestName: bookingData.guestName,
      unitType: bookingData.unit.name,
      propertyName: bookingData.apartment.name,
      checkInFormatted: formatBookingDate(bookingData.checkinDateTime),
      checkOutFormatted: formatBookingDate(bookingData.checkoutDateTime),
      totalPrice: bookingData.totalPrice,
      totalPriceFormatted: `Rp ${bookingData.totalPrice.toLocaleString('id-ID')}`,
      bankInfo: {
        bankName: 'BCA',
        accountNumber: '5771717340',
        accountName: 'FRENGKI PANJAITAN'
      },
      status: 'Menunggu Pembayaran',
      paymentProof: null,
      paymentStatus: 'pending',
      hoursLeft: 1,
      minutesLeft: 0,
      secondsLeft: 0
    };

    setMyBookings((prev) => [newBooking, ...prev]);
    setSelectedBooking(newBooking);
    setIsBookingPage(false);
    setSelectedUnit(null);
    setSelectedApartment(null);
    setActiveTab('pesanan');
  };

  const handleUpdateBookingProof = (bookingCode, proofBase64, status = 'uploaded') => {
    setMyBookings((prev) =>
      prev.map((b) => {
        if (b.bookingCode === bookingCode) {
          return {
            ...b,
            paymentProof: proofBase64,
            paymentStatus: status,
            status: status === 'uploaded' ? 'Sudah Dibayar' : b.status
          };
        }
        return b;
      })
    );

    if (selectedBooking && selectedBooking.bookingCode === bookingCode) {
      setSelectedBooking((prev) => ({
        ...prev,
        paymentProof: proofBase64,
        paymentStatus: status,
        status: status === 'uploaded' ? 'Sudah Dibayar' : prev.status
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-brand-bg min-h-screen shadow-lg flex flex-col relative">
      {/* Toast Notification */}
      {bookingSuccessMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl z-50 animate-bounce flex items-center gap-2">
          <span>🎉</span>
          <span>{bookingSuccessMessage}</span>
        </div>
      )}

      {/* VIEW CONDITIONAL RENDERING */}
      {isBookingPage && selectedApartment && selectedUnit ? (
        <PemesananView
          apartment={selectedApartment}
          unit={selectedUnit}
          onBack={handleBackFromBooking}
          onSubmitBooking={handleSubmitBooking}
        />
      ) : selectedUnit ? (
        <UnitTypeDetailView
          apartment={selectedApartment}
          unit={selectedUnit}
          onBack={handleBackFromUnit}
          onBookNow={handleGoToBooking}
          isSaved={isUnitSaved(selectedApartment.id, selectedUnit.id)}
          onToggleSave={handleToggleSave}
        />
      ) : selectedApartment ? (
        <ApartmentDetailView
          apartment={selectedApartment}
          onBack={handleBackFromApartment}
          onSelectUnit={handleSelectUnit}
        />
      ) : activeTab === 'jelajah' ? (
        <JelajahView
          apartments={apartmentsData}
          onBack={() => handleTabChange('beranda')}
          onSelectApartment={handleSelectApartment}
        />
      ) : activeTab === 'simpan' ? (
        /* --- SIMPAN / WISHLIST PAGE --- */
        <SimpanView
          savedUnits={savedUnits}
          onBack={() => handleTabChange('beranda')}
          onRemoveSavedUnit={handleRemoveSavedUnit}
          onClearAllSaved={handleClearAllSaved}
          onSelectSavedUnit={handleSelectSavedUnit}
          onGoToJelajah={() => handleTabChange('jelajah')}
        />
      ) : activeTab === 'pesanan' ? (
        /* --- PESANAN / ORDER SEARCH OR DETAIL PAGE --- */
        selectedBooking ? (
          <DetailPesananView
            booking={selectedBooking}
            onBack={() => setSelectedBooking(null)}
            onGoHome={() => handleTabChange('beranda')}
            onUpdateBookingProof={handleUpdateBookingProof}
          />
        ) : (
          <CekPesananView
            onSearchBooking={handleSearchBooking}
            onBack={() => handleTabChange('beranda')}
          />
        )
      ) : (
        /* --- BERANDA HOME VIEW --- */
        <div className="flex-1 pb-24 flex flex-col">
          {/* --- HEADER SECTION --- */}
          <header className="bg-brand-blue text-white rounded-b-3xl p-5 pb-6 shadow-md">
            {/* Top Bar Logo & Notif */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-white" />
                <span className="font-bold text-lg tracking-wider">WHITE BOX</span>
              </div>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                <Bell className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Greeting */}
            <div className="mb-4">
              <p className="text-white/80 text-xs font-medium flex items-center gap-1">
                Selamat malam <span className="inline-block animate-bounce">👋</span>
              </p>
              <h1 className="text-lg font-semibold tracking-tight mt-0.5">
                Mau menginap di mana?
              </h1>
            </div>

            {/* Search Input */}
            <div className="relative cursor-pointer" onClick={() => handleTabChange('jelajah')}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                readOnly
                placeholder="Cari apartemen, unit, atau lokasi..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-gray-800 text-xs sm:text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white placeholder:text-gray-400 transition cursor-pointer"
              />
            </div>
          </header>

          {/* --- CONTENT SECTION --- */}
          <main className="p-5 flex-1">
            {/* Section Title */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800 text-base">Pilih Apartemen</h2>
              <button
                onClick={() => handleTabChange('jelajah')}
                className="text-brand-blue text-xs font-semibold flex items-center gap-0.5 hover:opacity-80 transition"
              >
                Lihat semua &gt;
              </button>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-2 gap-4">
              {apartmentsData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectApartment(item)}
                  className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col justify-between cursor-pointer"
                >
                  {/* Badge Icon */}
                  <div className="w-14 h-14 bg-linear-to-tr from-blue-600 to-sky-400 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3 shadow-sm">
                    {item.code}
                  </div>

                  {/* Apartment Detail */}
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex items-center text-gray-400 text-xs mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1 shrink-0 text-gray-400" />
                      <span>{item.location}</span>
                      {item.unitsList && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="text-blue-600">{item.unitsList.length} tipe</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-6 py-2.5 flex justify-between items-center z-50">
        <button
          onClick={() => handleTabChange('beranda')}
          className={`flex flex-col items-center gap-1 text-xs font-semibold transition ${
            activeTab === 'beranda' && !selectedApartment && !selectedUnit && !isBookingPage
              ? 'text-brand-blue'
              : 'text-gray-400 hover:text-gray-600 font-medium'
          }`}
        >
          <div
            className={`p-1.5 rounded-full ${
              activeTab === 'beranda' && !selectedApartment && !selectedUnit && !isBookingPage
                ? 'bg-blue-50'
                : ''
            }`}
          >
            <Home
              className={`w-5 h-5 ${
                activeTab === 'beranda' && !selectedApartment && !selectedUnit && !isBookingPage
                  ? 'text-brand-blue'
                  : 'text-gray-400'
              }`}
            />
          </div>
          <span>Beranda</span>
        </button>

        <button
          onClick={() => handleTabChange('jelajah')}
          className={`flex flex-col items-center gap-1 text-xs font-semibold transition ${
            (activeTab === 'jelajah' || selectedApartment || selectedUnit || isBookingPage) &&
            activeTab !== 'simpan' &&
            activeTab !== 'pesanan'
              ? 'text-brand-blue'
              : 'text-gray-400 hover:text-gray-600 font-medium'
          }`}
        >
          <div
            className={`p-1.5 rounded-full ${
              (activeTab === 'jelajah' || selectedApartment || selectedUnit || isBookingPage) &&
              activeTab !== 'simpan' &&
              activeTab !== 'pesanan'
                ? 'bg-blue-50'
                : ''
            }`}
          >
            <Compass
              className={`w-5 h-5 ${
                (activeTab === 'jelajah' || selectedApartment || selectedUnit || isBookingPage) &&
                activeTab !== 'simpan' &&
                activeTab !== 'pesanan'
                  ? 'text-brand-blue'
                  : 'text-gray-400'
              }`}
            />
          </div>
          <span>Jelajah</span>
        </button>

        <button
          onClick={() => handleTabChange('simpan')}
          className={`flex flex-col items-center gap-1 text-xs font-semibold transition relative ${
            activeTab === 'simpan' ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600 font-medium'
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeTab === 'simpan' ? 'bg-blue-50' : ''}`}>
            <Heart className={`w-5 h-5 ${activeTab === 'simpan' ? 'text-brand-blue' : 'text-gray-400'}`} />
          </div>
          {savedUnits.length > 0 && (
            <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          )}
          <span>Simpan</span>
        </button>

        <button
          onClick={() => handleTabChange('pesanan')}
          className={`flex flex-col items-center gap-1 text-xs font-semibold transition ${
            activeTab === 'pesanan' ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600 font-medium'
          }`}
        >
          <div className={`p-1.5 rounded-full ${activeTab === 'pesanan' ? 'bg-blue-50' : ''}`}>
            <Calendar className={`w-5 h-5 ${activeTab === 'pesanan' ? 'text-brand-blue' : 'text-gray-400'}`} />
          </div>
          <span>Pesanan</span>
        </button>
      </nav>
    </div>
  );
}