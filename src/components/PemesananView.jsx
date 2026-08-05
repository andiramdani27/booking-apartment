import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Moon,
  Clock,
  Sun,
  Calendar,
  CheckCircle2,
  User,
  Phone,
  MessageSquare,
  Tag,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// ─── helpers ────────────────────────────────────────────────────────────────

const DAY_NAMES   = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
const MONTH_NAMES = ['Januari','Februari','Maret','April','Mei','Juni',
                     'Juli','Agustus','September','Oktober','November','Desember'];
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','Mei','Jun',
                     'Jul','Agu','Sep','Okt','Nov','Des'];

function formatDate(date) {
  if (!date) return '—';
  return `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${MONTH_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTime(h, m) {
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

// Add hours/minutes to a Date
function addMinutes(date, mins) {
  return new Date(date.getTime() + mins * 60000);
}

const DURATION_MINUTES = {
  per_malam:   12 * 60,   // 12-hour slot (check-in 14:00 → check-out 12:00 next day)
  paket_3_jam:  3 * 60,
  paket_6_jam:  6 * 60,
  paket_12_jam: 12 * 60,
  paket_24_jam: 24 * 60,
};

// ─── Mini Calendar ──────────────────────────────────────────────────────────

function MiniCalendar({ selectedDate, minDate, onSelect }) {
  const today = minDate || new Date();
  const [viewYear,  setViewYear]  = useState(selectedDate ? selectedDate.getFullYear()  : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate ? selectedDate.getMonth()     : today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="select-none">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-600">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-gray-800 text-sm">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-600">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const thisDate  = new Date(viewYear, viewMonth, day);
          const isPast    = minDate && thisDate < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
          const isToday   = thisDate.toDateString() === new Date().toDateString();
          const isSel     = selectedDate && thisDate.toDateString() === selectedDate.toDateString();
          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
              className={`h-8 w-full rounded-xl text-xs font-semibold transition
                ${isSel  ? 'bg-blue-600 text-white shadow-sm' :
                  isToday ? 'bg-blue-50 text-blue-600' :
                  isPast  ? 'text-gray-300 cursor-not-allowed' :
                            'text-gray-700 hover:bg-gray-100'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Time Wheel ─────────────────────────────────────────────────────────────

function TimeWheel({ hour, minute, onChange }) {
  const hours   = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 0,5,10,...55

  return (
    <div className="flex items-center gap-2 justify-center">
      {/* Hour column */}
      <div className="flex flex-col items-center">
        <button onClick={() => onChange((hour + 1) % 24, minute)}
          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500">
          <ChevronLeft className="w-4 h-4 rotate-90" />
        </button>
        <div className="text-2xl font-bold text-gray-900 w-12 text-center leading-none">
          {String(hour).padStart(2,'0')}
        </div>
        <button onClick={() => onChange((hour - 1 + 24) % 24, minute)}
          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500">
          <ChevronRight className="w-4 h-4 rotate-90" />
        </button>
      </div>

      <span className="text-2xl font-bold text-gray-400 -mt-1">:</span>

      {/* Minute column */}
      <div className="flex flex-col items-center">
        <button onClick={() => onChange(hour, minutes[(minutes.indexOf(minute) + 1) % minutes.length])}
          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500">
          <ChevronLeft className="w-4 h-4 rotate-90" />
        </button>
        <div className="text-2xl font-bold text-gray-900 w-12 text-center leading-none">
          {String(minute).padStart(2,'0')}
        </div>
        <button onClick={() => onChange(hour, minutes[(minutes.indexOf(minute) - 1 + minutes.length) % minutes.length])}
          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500">
          <ChevronRight className="w-4 h-4 rotate-90" />
        </button>
      </div>
    </div>
  );
}

// ─── Bottom Sheet Modal ─────────────────────────────────────────────────────

function BottomSheet({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center"
         onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Panel */}
      <div
        className="relative w-full max-w-md bg-white rounded-t-3xl px-5 pt-4 pb-8 shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
          <button onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function PemesananView({ apartment, unit, onBack, onSubmitBooking }) {
  const [selectedDuration, setSelectedDuration] = useState('per_malam');
  const [guestName,        setGuestName]        = useState('');
  const [whatsappNumber,   setWhatsappNumber]   = useState('');
  const [notes,            setNotes]            = useState('');
  const [promoCode,        setPromoCode]        = useState('');
  const [promoApplied,     setPromoApplied]     = useState(false);
  const [discountAmount,   setDiscountAmount]   = useState(0);

  // Check-in state
  const now = new Date();
  const [checkinDate,    setCheckinDate]    = useState(now);
  const [checkinHour,    setCheckinHour]    = useState(14);
  const [checkinMinute,  setCheckinMinute]  = useState(0);

  // Check-out manual state (only used when per_malam)
  const defaultCheckout = addMinutes(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0),
    DURATION_MINUTES['per_malam'] ?? 720
  );
  const [checkoutDate,   setCheckoutDate]   = useState(defaultCheckout);
  const [checkoutHour,   setCheckoutHour]   = useState(defaultCheckout.getHours());
  const [checkoutMinute, setCheckoutMinute] = useState(defaultCheckout.getMinutes());

  // Sheet open state
  const [openSheet, setOpenSheet] = useState(null);
  // Error shown inside checkout-time sheet when time is invalid
  const [checkoutTimeError, setCheckoutTimeError] = useState('');

  // ── Duration logic ───────────────────────────────────────────────────────
  // Per malam = manual checkout; all paket jam = auto-calculated, read-only
  const isAutoCheckout = selectedDuration !== 'per_malam';

  const checkinDateTime = new Date(
    checkinDate.getFullYear(), checkinDate.getMonth(), checkinDate.getDate(),
    checkinHour, checkinMinute
  );

  // Auto checkout = checkin + duration minutes
  const autoCheckoutDT  = addMinutes(checkinDateTime, DURATION_MINUTES[selectedDuration] ?? 720);

  // Manual checkout (per_malam) — clamp so it can't be before checkin
  const manualCheckoutDT = new Date(
    checkoutDate.getFullYear(), checkoutDate.getMonth(), checkoutDate.getDate(),
    checkoutHour, checkoutMinute
  );
  const checkoutDateTime = isAutoCheckout ? autoCheckoutDT : manualCheckoutDT;

  // When duration changes, sync auto-checkout display values into manual state
  // so if user switches back to per_malam the default is sensible
  const handleDurationChange = (id) => {
    setSelectedDuration(id);
    if (id !== 'per_malam') {
      // pre-fill manual state with the auto result so it's ready if user switches back
      const next = addMinutes(checkinDateTime, DURATION_MINUTES[id] ?? 180);
      setCheckoutDate(new Date(next.getFullYear(), next.getMonth(), next.getDate()));
      setCheckoutHour(next.getHours());
      setCheckoutMinute(next.getMinutes());
    }
  };

  // When check-in date changes (per_malam): push checkout forward if invalid
  const handleCheckinDateSelect = (d) => {
    setCheckinDate(d);
    if (isAutoCheckout) return;
    const newCheckin = new Date(d.getFullYear(), d.getMonth(), d.getDate(), checkinHour, checkinMinute);
    if (manualCheckoutDT <= newCheckin) {
      const next = addMinutes(newCheckin, 720);
      setCheckoutDate(new Date(next.getFullYear(), next.getMonth(), next.getDate()));
      setCheckoutHour(next.getHours());
      setCheckoutMinute(next.getMinutes());
    }
  };

  // When check-in TIME is confirmed (per_malam): if same day as checkout, ensure checkout > checkin
  const handleCheckinTimeConfirm = () => {
    if (!isAutoCheckout) {
      const isSameDay = checkoutDate.toDateString() === checkinDate.toDateString();
      if (isSameDay) {
        // checkout time in minutes from midnight
        const coMins = checkoutHour * 60 + checkoutMinute;
        const ciMins = checkinHour * 60 + checkinMinute;
        if (coMins <= ciMins) {
          // push checkout 1 hour ahead of new checkin time
          const next = addMinutes(
            new Date(checkinDate.getFullYear(), checkinDate.getMonth(), checkinDate.getDate(), checkinHour, checkinMinute),
            60
          );
          setCheckoutDate(new Date(next.getFullYear(), next.getMonth(), next.getDate()));
          setCheckoutHour(next.getHours());
          setCheckoutMinute(next.getMinutes());
        }
      }
    }
    setOpenSheet(null);
  };

  // When checkout TIME is confirmed (per_malam): block if same day and time ≤ checkin time
  const handleCheckoutTimeConfirm = () => {
    if (!isAutoCheckout) {
      const isSameDay = checkoutDate.toDateString() === checkinDate.toDateString();
      if (isSameDay) {
        const coMins = checkoutHour * 60 + checkoutMinute;
        const ciMins = checkinHour * 60 + checkinMinute;
        if (coMins <= ciMins) {
          setCheckoutTimeError(`Jam check-out harus setelah ${formatTime(checkinHour, checkinMinute)}`);
          return; // don't close
        }
      }
    }
    setCheckoutTimeError('');
    setOpenSheet(null);
  };

  if (!unit || !apartment) return null;

  const durationOptions = [
    { id: 'per_malam',    title: 'Per Malam',    subtitle: 'Menginap semalam • check-in 14:00, check-out 12:00', price: unit.price || 'Rp 350.000', priceValue: 350000, iconType: 'moon' },
    { id: 'paket_3_jam',  title: 'Paket 3 Jam',  subtitle: 'Transit singkat untuk istirahat sejenak',           price: 'Rp 150.000', priceValue: 150000, iconType: 'clock' },
    { id: 'paket_6_jam',  title: 'Paket 6 Jam',  subtitle: 'Setengah hari, ideal untuk kerja atau santai',     price: 'Rp 200.000', priceValue: 200000, iconType: 'sun' },
    { id: 'paket_12_jam', title: 'Paket 12 Jam', subtitle: 'Seharian penuh untuk produktivitas',               price: 'Rp 300.000', priceValue: 300000, iconType: 'clock' },
    { id: 'paket_24_jam', title: 'Paket 24 Jam', subtitle: 'Fleksibel, check-in kapan saja',                   price: 'Rp 400.000', priceValue: 400000, iconType: 'calendar' },
  ];

  const currentOption = durationOptions.find(o => o.id === selectedDuration) || durationOptions[0];
  const totalPrice    = Math.max(0, currentOption.priceValue - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'WHITEBOX50') {
      setDiscountAmount(50000); setPromoApplied(true);
    } else if (promoCode.trim()) {
      setDiscountAmount(25000); setPromoApplied(true);
    }
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!guestName || !whatsappNumber) {
      alert('Silakan isi Nama dan Nomor WhatsApp terlebih dahulu.');
      return;
    }
    onSubmitBooking({
      apartment, unit,
      duration: currentOption,
      checkinDateTime, checkoutDateTime,
      guestName, whatsappNumber, notes, totalPrice
    });
  };

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="flex-1 bg-brand-bg min-h-screen pb-28 flex flex-col relative">
        {/* HEADER */}
        <header className="bg-white px-4 py-4 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-40 shadow-2xs">
          <button onClick={onBack}
            className="p-1.5 -ml-1 text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="Kembali">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg">Pemesanan</h1>
        </header>

        {/* MAIN */}
        <main className="p-4 sm:p-5 space-y-5 flex-1 max-w-md mx-auto w-full">

          {/* Unit summary card */}
          <div className="bg-white p-3.5 rounded-3xl border border-gray-100 shadow-2xs flex items-center gap-3.5">
            <img src={unit.image} alt={unit.name}
              className="w-16 h-16 rounded-2xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-900 text-sm truncate">{unit.name}</h2>
              <p className="text-gray-500 text-xs font-medium truncate mt-0.5">{apartment.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">{unit.capacity}</p>
            </div>
          </div>

          {/* SECTION 1: Durasi */}
          <div className="space-y-2.5">
            <h2 className="font-bold text-gray-900 text-xs tracking-wide">Pilih Durasi Menginap</h2>
            <div className="space-y-2.5">
              {durationOptions.map((option) => {
                const isSelected = selectedDuration === option.id;
                return (
                  <div key={option.id} onClick={() => handleDurationChange(option.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50/60 border-2 border-blue-600 shadow-xs'
                        : 'bg-white border border-gray-100 hover:bg-gray-50/80 shadow-2xs'
                    }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-500'}`}>
                        {option.iconType === 'moon'     && <Moon     className="w-4 h-4" />}
                        {option.iconType === 'clock'    && <Clock    className="w-4 h-4" />}
                        {option.iconType === 'sun'      && <Sun      className="w-4 h-4" />}
                        {option.iconType === 'calendar' && <Calendar className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 text-sm leading-snug truncate">{option.title}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5 leading-tight truncate">{option.subtitle}</div>
                      </div>
                    </div>
                    <div className={`font-bold text-sm shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
                      {option.price}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Waktu Menginap */}
          <div className="space-y-2.5">
            <h2 className="font-bold text-gray-900 text-xs tracking-wide">Waktu Menginap</h2>

            <div className="space-y-2.5">
              {/* Check-in card — tappable */}
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Waktu Check-in</div>
                    <button
                      onClick={() => setOpenSheet('checkin-date')}
                      className="font-bold text-gray-800 text-xs mt-0.5 hover:text-blue-600 transition underline-offset-2 hover:underline"
                    >
                      {formatDate(checkinDate)}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setOpenSheet('checkin-time')}
                  className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-xl border border-blue-100 flex items-center gap-1.5 hover:bg-blue-100 active:scale-95 transition"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(checkinHour, checkinMinute)}</span>
                </button>
              </div>

              {/* Check-out card — interactive for per_malam, read-only for paket jam */}
              <div className={`p-3.5 rounded-2xl border shadow-2xs flex items-center justify-between transition ${
                isAutoCheckout
                  ? 'bg-gray-50 border-gray-100 opacity-80'
                  : 'bg-white border-gray-100'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isAutoCheckout ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-500'
                  }`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      Waktu Check-out
                      {isAutoCheckout && (
                        <span className="bg-blue-100 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">Otomatis</span>
                      )}
                    </div>
                    {isAutoCheckout ? (
                      <div className="font-bold text-gray-500 text-xs mt-0.5">
                        {formatDate(autoCheckoutDT)}
                      </div>
                    ) : (
                      <button
                        onClick={() => setOpenSheet('checkout-date')}
                        className="font-bold text-gray-800 text-xs mt-0.5 hover:text-blue-600 transition underline-offset-2 hover:underline"
                      >
                        {formatDate(checkoutDate)}
                      </button>
                    )}
                  </div>
                </div>

                {isAutoCheckout ? (
                  <div className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200/50 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTime(autoCheckoutDT.getHours(), autoCheckoutDT.getMinutes())}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setOpenSheet('checkout-time')}
                    className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-xl border border-blue-100 flex items-center gap-1.5 hover:bg-blue-100 active:scale-95 transition"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTime(checkoutHour, checkoutMinute)}</span>
                  </button>
                )}
              </div>

              {/* Availability bar */}
              <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-2xl p-3 text-xs font-semibold text-emerald-700 flex items-center gap-2 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{unit.available || 5} dari 5 kamar tersedia</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: Data Tamu */}
          <div className="space-y-3">
            <h2 className="font-bold text-gray-900 text-xs tracking-wide">Data Tamu</h2>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" /><span>Nama Anda</span>
                </label>
                <input type="text" placeholder="Masukkan nama lengkap" value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /><span>Nomor WhatsApp</span>
                </label>
                <input type="tel" placeholder="081234567890" value={whatsappNumber}
                  onChange={e => setWhatsappNumber(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" /><span>Catatan (Opsional)</span>
                </label>
                <textarea placeholder="Permintaan khusus atau catatan..." value={notes}
                  onChange={e => setNotes(e.target.value)} rows={3}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs resize-none" />
              </div>
            </div>
          </div>

          {/* SECTION 4: Kode Promo */}
          <div className="space-y-2.5">
            <h2 className="font-bold text-gray-900 text-xs tracking-wide">Kode Promo</h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Punya kode promo?" value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-3 py-3 text-xs text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs" />
              </div>
              <button type="button" onClick={handleApplyPromo}
                className="bg-blue-50 text-blue-600 font-bold text-xs px-5 py-3 rounded-2xl border border-blue-100 hover:bg-blue-100 active:scale-95 transition shrink-0">
                Terapkan
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span>🎉</span> Promo berhasil diterapkan! Diskon Rp {discountAmount.toLocaleString('id-ID')}
              </p>
            )}
          </div>

          {/* SECTION 5: Rincian Harga */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 space-y-2.5 shadow-2xs">
            <h2 className="font-bold text-gray-900 text-xs mb-2">Rincian Harga</h2>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Harga Kamar - {currentOption.title}</span>
              <span className="font-bold text-gray-800">{currentOption.price}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between items-center text-xs text-emerald-600 font-medium">
                <span>Diskon Promo</span>
                <span>-Rp {discountAmount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-900 text-sm">Total</span>
              <span className="font-bold text-blue-600 text-base">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* SUBMIT */}
          <button type="button" onClick={handleProceedToPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm py-3.5 rounded-2xl shadow-md transition text-center mt-2">
            Lanjut ke Pembayaran
          </button>
        </main>
      </div>

      {/* ── BOTTOM SHEET: Check-in Date ─────────────────────────── */}
      <BottomSheet
        open={openSheet === 'checkin-date'}
        onClose={() => setOpenSheet(null)}
        title="Pilih Tanggal Check-in"
      >
        <MiniCalendar
          selectedDate={checkinDate}
          minDate={new Date()}
          onSelect={d => { handleCheckinDateSelect(d); setOpenSheet(null); }}
        />
      </BottomSheet>

      {/* ── BOTTOM SHEET: Check-in Time ─────────────────────────── */}
      <BottomSheet
        open={openSheet === 'checkin-time'}
        onClose={() => setOpenSheet(null)}
        title="Pilih Jam Check-in"
      >
        <TimeWheel
          hour={checkinHour}
          minute={checkinMinute}
          onChange={(h, m) => { setCheckinHour(h); setCheckinMinute(m); }}
        />
        <button
          onClick={handleCheckinTimeConfirm}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-2xl transition active:scale-95"
        >
          Konfirmasi
        </button>
      </BottomSheet>

      {/* ── BOTTOM SHEET: Check-out Date ─────────────────────────── */}
      <BottomSheet
        open={openSheet === 'checkout-date'}
        onClose={() => setOpenSheet(null)}
        title="Pilih Tanggal Check-out"
      >
        <MiniCalendar
          selectedDate={checkoutDate}
          minDate={checkinDate}
          onSelect={d => { setCheckoutDate(d); setOpenSheet(null); }}
        />
      </BottomSheet>

      {/* ── BOTTOM SHEET: Check-out Time ─────────────────────────── */}
      <BottomSheet
        open={openSheet === 'checkout-time'}
        onClose={() => { setCheckoutTimeError(''); setOpenSheet(null); }}
        title="Pilih Jam Check-out"
      >
        <TimeWheel
          hour={checkoutHour}
          minute={checkoutMinute}
          onChange={(h, m) => { setCheckoutHour(h); setCheckoutMinute(m); setCheckoutTimeError(''); }}
        />
        {/* Inline error when same-day and time is invalid */}
        {checkoutTimeError ? (
          <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-red-600">
            <span>⚠️</span>
            <span>{checkoutTimeError}</span>
          </div>
        ) : (
          checkoutDate.toDateString() === checkinDate.toDateString() && (
            <p className="mt-3 text-center text-[11px] text-gray-400">
              Check-in pada <span className="font-bold text-gray-600">{formatTime(checkinHour, checkinMinute)}</span> — pilih jam setelahnya
            </p>
          )
        )}
        <button
          onClick={handleCheckoutTimeConfirm}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-2xl transition active:scale-95"
        >
          Konfirmasi
        </button>
      </BottomSheet>
    </>
  );
}
