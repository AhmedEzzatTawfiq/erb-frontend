
'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f8fafc',
          color: '#0f172a',
        }}
      >
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '460px', width: '100%' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 24px',
                borderRadius: '16px',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={32} />
            </div>

            <p
              style={{
                color: '#dc2626',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '2px',
              }}
            >
              CRITICAL ERROR
            </p>

            <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>
              Something went wrong
            </h1>

            <p
              style={{
                color: '#64748b',
                fontSize: '15px',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}
            >
              The application encountered an unexpected error.
              Please try again.
            </p>

            <button
              type="button"
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: 0,
                borderRadius: '10px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={17} />
              Try Again
            </button>

            {error.digest && (
              <p
                style={{
                  marginTop: '24px',
                  fontSize: '12px',
                  color: '#94a3b8',
                }}
              >
                Reference ID: {error.digest}
              </p>
            )}

            <p
              style={{
                marginTop: '32px',
                fontSize: '12px',
                color: '#94a3b8',
              }}
            >
              ERP Core · Enterprise Management System
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
