import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Copy, Check, Upload, CheckCircle2 } from 'lucide-react';

export default function DetailPesananView({ booking, onBack, onGoHome, onUpdateBookingProof }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [proofImage, setProofImage] = useState(booking?.paymentProof || null);
  const [isPaid, setIsPaid] = useState(booking?.paymentStatus === 'verified' || booking?.paymentStatus === 'uploaded');
  const [toastMsg, setToastMsg] = useState('');

  const fileInputRef = useRef(null);

  // Timer Countdown state (1 hour payment limit max)
  const getInitialTime = () => {
    const h = booking?.hoursLeft ?? 1;
    if (h >= 1) {
      return { hours: 1, minutes: 0, seconds: 0 };
    }
    return {
      hours: 0,
      minutes: booking?.minutesLeft ?? 59,
      seconds: booking?.secondsLeft ?? 59
    };
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime);

  useEffect(() => {
    setTimeLeft(getInitialTime());
  }, [booking]);

  useEffect(() => {
    if (isPaid) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaid]);

  const handleCopyCode = () => {
    if (!booking?.bookingCode) return;
    navigator.clipboard?.writeText(booking.bookingCode);
    setCopiedCode(true);
    showToast('Kode pesanan berhasil disalin!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyBank = () => {
    const accNum = booking?.bankInfo?.accountNumber || '5771717340';
    navigator.clipboard?.writeText(accNum);
    setCopiedBank(true);
    showToast('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setProofImage(base64);
      setUploading(false);
      if (onUpdateBookingProof) {
        onUpdateBookingProof(booking.bookingCode, base64);
      }
      showToast('Bukti pembayaran berhasil diunggah!');
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmPayment = () => {
    if (!proofImage) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      return;
    }
    setIsPaid(true);
    if (onUpdateBookingProof) {
      onUpdateBookingProof(booking.bookingCode, proofImage, 'uploaded');
    }
    showToast('Pembayaran berhasil dikonfirmasi!');
  };

  const bank = booking?.bankInfo || {
    bankName: 'BCA',
    accountNumber: '5771717340',
    accountName: 'FRENGKI PANJAITAN'
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 relative pb-28">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg transition animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* Header - Seamless Full Width Header */}
      <header className="w-full bg-white px-4 py-3.5 sticky top-0 z-30 flex items-center gap-3 border-b border-slate-100 shadow-2xs">
        {onBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition active:scale-95 -ml-1"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="font-bold text-slate-900 text-base">Detail Pesanan</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-3.5">
        {/* CARD 1: Status Banner - Soft Gradient */}
        <div
          className={`rounded-3xl p-5 text-center flex flex-col items-center justify-center transition shadow-xs ${
            isPaid
              ? 'bg-gradient-to-b from-emerald-50 to-emerald-50/40 border border-emerald-100/60'
              : 'bg-gradient-to-b from-amber-50 to-amber-50/40 border border-amber-100/60'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center mb-2.5 ${
              isPaid
                ? 'bg-emerald-100/80 text-emerald-600'
                : 'bg-amber-100/80 text-amber-600'
            }`}
          >
            {isPaid ? (
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
            ) : (
              <Clock className="w-5 h-5 stroke-[2.2]" />
            )}
          </div>

          <h2
            className={`font-bold text-base mb-1 ${
              isPaid ? 'text-emerald-800' : 'text-amber-800'
            }`}
          >
            {isPaid ? 'Pembayaran Berhasil / Verifikasi' : 'Menunggu Pembayaran'}
          </h2>

          <p className="text-xs text-slate-500 max-w-[270px] leading-relaxed mb-4">
            {isPaid
              ? 'Bukti pembayaran telah diterima. Pesanan kamu sedang diproses oleh admin.'
              : 'Selesaikan pembayaran sebelum waktu habis agar unit tidak terlepas.'}
          </p>

          {!isPaid && (
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="bg-white shadow-xs rounded-2xl px-3.5 py-1.5 font-bold text-lg text-amber-700 font-mono min-w-[50px]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-[9px] font-bold text-amber-600/70 mt-1 uppercase tracking-wider">
                  JAM
                </span>
              </div>
              <span className="font-bold text-amber-600 text-base -mt-3">:</span>
              <div className="flex flex-col items-center">
                <div className="bg-white shadow-xs rounded-2xl px-3.5 py-1.5 font-bold text-lg text-amber-700 font-mono min-w-[50px]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-[9px] font-bold text-amber-600/70 mt-1 uppercase tracking-wider">
                  MENIT
                </span>
              </div>
              <span className="font-bold text-amber-600 text-base -mt-3">:</span>
              <div className="flex flex-col items-center">
                <div className="bg-white shadow-xs rounded-2xl px-3.5 py-1.5 font-bold text-lg text-amber-700 font-mono min-w-[50px]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-[9px] font-bold text-amber-600/70 mt-1 uppercase tracking-wider">
                  DETIK
                </span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 2: Kode Pesanan - Clean borderless card */}
        <div className="bg-white rounded-3xl p-4 shadow-xs flex justify-between items-center border border-slate-100/60">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
              Kode Pesanan
            </span>
            <span className="font-bold text-slate-900 text-lg tracking-wider font-mono">
              {booking?.bookingCode || 'WBP-HNTB-NS4X'}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="w-10 h-10 rounded-2xl bg-slate-100/80 hover:bg-slate-200/80 flex items-center justify-center text-slate-600 transition active:scale-95"
            title="Salin Kode Pesanan"
          >
            {copiedCode ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* CARD 3: Rincian Pesanan - Clean typography hierarchy */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100/60 space-y-3.5">
          <h2 className="font-bold text-slate-900 text-xs tracking-wide">
            Rincian Pesanan
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Tipe Unit</span>
              <span className="font-bold text-slate-800">
                {booking?.unitType || 'Studio'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Properti</span>
              <span className="font-bold text-slate-800">
                {booking?.propertyName || 'Grand Kamala Lagoon'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Check-in</span>
              <span className="font-bold text-slate-800">
                {booking?.checkInFormatted || 'Kam, 6 Agu 2026, 21.30'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Check-out</span>
              <span className="font-bold text-slate-800">
                {booking?.checkOutFormatted || 'Jum, 7 Agu 2026, 21.30'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Tamu</span>
              <span className="font-bold text-slate-800">
                {booking?.guestName || 'a'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-900 text-sm">Total</span>
            <span className="font-bold text-blue-600 text-base">
              {booking?.totalPriceFormatted || 'Rp 350.000'}
            </span>
          </div>
        </div>

        {/* CARD 4: Transfer ke rekening */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100/60 space-y-3">
          <div>
            <h2 className="font-bold text-slate-900 text-xs tracking-wide">
              Transfer ke rekening
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Pilih rekening tujuan, lalu transfer sesuai total pesanan.
            </p>
          </div>

          <div className="rounded-2xl p-3.5 flex justify-between items-center bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100/80 flex items-center justify-center font-bold text-blue-700 text-xs tracking-wider shrink-0">
                {bank.bankName}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm font-mono tracking-wide">
                  {bank.accountNumber}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  a.n. {bank.accountName}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyBank}
              className="w-9 h-9 rounded-2xl bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition active:scale-95 shadow-xs"
              title="Salin Nomor Rekening"
            >
              {copiedBank ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* CARD 5: Unggah bukti pembayaran */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100/60 space-y-4">
          <h2 className="font-bold text-slate-900 text-xs tracking-wide">
            Unggah bukti pembayaran
          </h2>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {proofImage ? (
            <div className="relative border-2 border-dashed border-emerald-300/80 bg-emerald-50/30 rounded-3xl p-4 flex flex-col items-center justify-center text-center">
              <img
                src={proofImage}
                alt="Bukti Transfer"
                className="max-h-40 max-w-full rounded-2xl object-cover shadow-xs mb-3"
              />
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bukti Bayar Terunggah</span>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-bold text-blue-600 underline hover:text-blue-700 mt-1"
              >
                Ganti Bukti Bayar
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-200/80 bg-blue-50/20 hover:bg-blue-50/50 rounded-3xl p-5 flex flex-col items-center justify-center cursor-pointer transition text-center min-h-[130px]"
            >
              <div className="w-11 h-11 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center mb-2 shadow-xs">
                <Upload className="w-5 h-5 stroke-[2.2]" />
              </div>
              <p className="font-bold text-slate-700 text-xs">
                {uploading ? 'Mengunggah...' : 'Ketuk untuk unggah bukti bayar'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                JPG atau PNG, maks. 5MB
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleConfirmPayment}
            className={`w-full font-bold text-sm py-3.5 rounded-2xl shadow-md transition text-center active:scale-98 ${
              isPaid
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
            }`}
          >
            {isPaid ? 'Pembayaran Berhasil' : 'Saya Sudah Bayar'}
          </button>
        </div>

        {/* CARD 6: Kembali ke Beranda - Soft borderless button */}
        <button
          type="button"
          onClick={onGoHome}
          className="w-full bg-slate-100 hover:bg-slate-200/80 active:scale-98 text-slate-700 font-bold text-sm py-3.5 rounded-2xl transition text-center shadow-none mt-1"
        >
          Kembali ke Beranda
        </button>
      </main>
    </div>
  );
}
