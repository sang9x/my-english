'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/my-topics', label: 'Chủ đề của tôi' },
    { href: '/progress', label: '📊 Điểm số' },
  ];

  return (
    <nav className="nav">
      <div className="container-app">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem' }}>📖</span>
            <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              My<span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>English</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: pathname === link.href ? 'var(--brand-violet-light)' : 'var(--text-secondary)',
                  background: pathname === link.href ? 'rgba(139,92,246,0.1)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/my-topics/new" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
              + Tạo chủ đề
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{ display: 'none' }}
            id="hamburger-btn"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              padding: '12px 0 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  color: pathname === link.href ? 'var(--brand-violet-light)' : 'var(--text-secondary)',
                  background: pathname === link.href ? 'rgba(139,92,246,0.1)' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/my-topics/new"
              className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
              style={{ textDecoration: 'none', marginTop: '8px' }}
            >
              + Tạo chủ đề
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          #hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
