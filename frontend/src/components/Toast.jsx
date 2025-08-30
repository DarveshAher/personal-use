
import React, { useEffect, useState } from 'react';

let counter = 0;

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function onToast(e) {
      const { message, type = 'info', duration = 3000 } = e.detail || {};
      const id = ++counter;
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
    }
    window.addEventListener('toast', onToast);
    return () => window.removeEventListener('toast', onToast);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[1000] space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            'rounded-2xl shadow-lg px-4 py-3 text-sm text-white ' +
            (t.type === 'success' ? 'bg-green-600' :
             t.type === 'error'   ? 'bg-red-600'   :
             t.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600')
          }
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

// Helper to trigger a toast from anywhere
export function showToast(message, type = 'info', duration = 3000) {
  const evt = new CustomEvent('toast', { detail: { message, type, duration } });
  window.dispatchEvent(evt);
}

// expose globally for quick use
if (typeof window !== 'undefined') {
  window.toast = showToast;
}
