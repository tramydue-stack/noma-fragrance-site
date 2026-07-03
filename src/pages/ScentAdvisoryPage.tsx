import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import contentData from '../data/contentData.json';

export default function ScentAdvisoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { scentAdvisory, footer } = contentData;

  return (
    <div ref={containerRef} className="bg-warm-ivory text-deep-brown min-h-[70vh] flex items-center justify-center pt-12 pb-24 px-6 text-center">
      <div className="max-w-2xl mx-auto fade-in-up">
        <h1 className="text-4xl font-serif mb-6">{scentAdvisory.primaryTitle}</h1>
        <p className="text-sm uppercase tracking-widest text-subtle-gold mb-8">{scentAdvisory.secondaryTitle}</p>
        <p className="text-lg leading-relaxed text-deep-brown/80 mb-12">
          {scentAdvisory.body}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a 
            href={`https://m.me/${footer.social.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-deep-brown px-8 py-4 uppercase tracking-widest text-sm hover:bg-deep-brown hover:text-warm-ivory transition-colors"
          >
            Nhắn tin Facebook
          </a>
          <a 
            href={`mailto:${footer.social.email}`}
            className="w-full sm:w-auto border border-deep-brown px-8 py-4 uppercase tracking-widest text-sm hover:bg-deep-brown hover:text-warm-ivory transition-colors"
          >
            Gửi Email tư vấn
          </a>
        </div>
      </div>
    </div>
  );
}