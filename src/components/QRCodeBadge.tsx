import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeBadgeProps {
  value?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  showClickHint?: boolean;
}

/** Renders a standards-compliant QR code. The encoded value is the member UUID;
 * it is an identifier only, never an authentication token or proof of approval.
 */
export const QRCodeBadge: React.FC<QRCodeBadgeProps> = ({
  value = '',
  size = 110,
  className = '',
  onClick,
  showClickHint = false,
}) => {
  const cleanValue = value.trim();

  return (
    <div
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={onClick ? 'اضغط لفتح صفحة التحقق' : 'رمز QR لمعرّف العضوية'}
      className={`relative inline-flex flex-col items-center justify-center bg-white p-2 rounded-xl shadow-md border border-cyan-400/40 select-none ${
        onClick ? 'cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {cleanValue ? (
        <QRCodeSVG value={cleanValue} size={size - 16} level="M" marginSize={1} />
      ) : (
        <span className="text-center text-[10px] leading-4 text-slate-700">لا يتوفر معرّف العضوية</span>
      )}
      {showClickHint && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-black text-amber-300 whitespace-nowrap bg-black/80 px-2 py-0.5 rounded-full border border-amber-500/30">
          امسح الرمز لقراءة المعرّف
        </span>
      )}
    </div>
  );
};
