import React from 'react';
import { Link } from 'react-router-dom';
import contentData from '../data/contentData.json';

export default function Footer() {
  return (
    <footer className="bg-deep-brown text-warm-ivory/50 mt-24">
      {/* Expanded footer for larger screens, simplified for mobile */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-warm-ivory/10">
        <div>
          <h2 className="font-serif text-2xl text-warm-ivory mb-4 normal-case tracking-normal">NOMA Fragrance</h2>
          <p className="text-[12px] leading-relaxed text-warm-ivory/70 max-w-xs normal-case">{contentData.brand.tagline}</p>
        </div>
        
        <div>
          <h3 className="text-[10px] uppercase tracking-widest mb-6 font-medium text-warm-ivory/80">Khám phá</h3>
          <ul className="space-y-4 text-[11px] text-warm-ivory/60">
            <li><Link to="/about" className="hover:text-warm-ivory transition-colors">Về NOMA</Link></li>
            <li><Link to="/collection" className="hover:text-warm-ivory transition-colors">Bộ sưu tập Whispers of Home</Link></li>
            <li><Link to="/advisory" className="hover:text-warm-ivory transition-colors">Tư vấn mùi hương</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-widest mb-6 font-medium text-warm-ivory/80">Hỗ trợ & Chính sách</h3>
          <ul className="space-y-4 text-[11px] text-warm-ivory/60">
            {contentData.policies.map(policy => (
              <li key={policy.id}>
                <Link to={`/policies#${policy.id}`} className="hover:text-warm-ivory transition-colors">{policy.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-widest mb-6 font-medium text-warm-ivory/80">Liên hệ</h3>
          <ul className="space-y-4 text-[11px] text-warm-ivory/60 uppercase">
            <li><a href="#" className="hover:text-warm-ivory transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-warm-ivory transition-colors">Instagram</a></li>
            <li><a href={`mailto:${contentData.footer.social.email}`} className="hover:text-warm-ivory transition-colors">Email</a></li>
          </ul>
        </div>
      </div>
      
      <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest uppercase">
        <span>© 2026 NOMA FRAGRANCE. ALL RIGHTS RESERVED.</span>
        <div className="hidden md:flex gap-6 uppercase mt-4 md:mt-0">
          <a href="#" className="hover:text-warm-ivory transition-colors">Facebook</a>
          <a href="#" className="hover:text-warm-ivory transition-colors">Instagram</a>
          <Link to="/contact" className="hover:text-warm-ivory transition-colors">Liên hệ</Link>
        </div>
      </div>
    </footer>
  );
}
