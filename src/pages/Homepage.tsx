import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contentData from '../data/contentData.json';

gsap.registerPlugin(ScrollTrigger);

export default function Homepage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        '.hero-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', stagger: 0.2 }
      );
      
      // Scroll animations for sections
      gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { homepage, brand, products } = contentData;

  return (
    <div ref={containerRef} className="bg-warm-ivory text-deep-brown pb-24">
      {/* Hero & Brand Intro Section */}
      <section className="flex flex-col lg:flex-row min-h-[80vh] border-b border-deep-brown/5">
        {/* Hero Image Content */}
        <div className="w-full lg:w-3/5 relative overflow-hidden group min-h-[50vh] lg:min-h-0">
          <img 
            src={homepage.hero.image} 
            alt="NOMA Hero" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 right-8 lg:right-auto glass p-6 max-w-sm hero-content">
            <p className="text-[10px] uppercase tracking-widest opacity-70 mb-2">The First Collection</p>
            <h2 className="text-3xl font-serif italic mb-2">{homepage.hero.primaryTitle}</h2>
            <p className="text-sm leading-relaxed font-light italic opacity-80 mb-6">
              {homepage.hero.secondaryTitle}
            </p>
            <Link 
              to="/collection" 
              className="inline-block bg-deep-brown text-warm-ivory px-6 py-3 uppercase tracking-widest text-[10px] hover:bg-black transition-colors"
            >
              {homepage.hero.cta}
            </Link>
          </div>
        </div>

        {/* Brand Intro */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 bg-white/30 fade-in-section">
          <div className="mb-8">
            <img src={brand.logos.monogram} className="w-8 h-8 opacity-40 mb-6" alt="Noma Monogram" />
            <h1 className="font-serif text-4xl lg:text-5xl leading-[1.1] mb-6">
              Vietnamese memories,<br />
              <span className="italic">written through scent.</span>
            </h1>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs mb-8">
              {homepage.brandIntro.body}
            </p>
            <Link 
              to="/about" 
              className="inline-block border border-deep-brown px-10 py-4 text-[10px] uppercase tracking-widest hover:bg-deep-brown hover:text-warm-ivory transition-colors"
            >
              {homepage.brandIntro.cta}
            </Link>
          </div>
          
          <div className="mt-8 lg:mt-auto lg:pb-12">
            <div className="flex flex-wrap gap-4 items-center">
              {brand.spirit.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-[10px] opacity-40 italic">{word}</span>
                  {idx < brand.spirit.length - 1 && <span className="text-[10px] opacity-40">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Shop (Featured Products) */}
      <section className="fade-in-section border-t border-deep-brown/5 bg-white/20">
        <div className="flex flex-col md:flex-row h-auto md:h-[280px]">
          {products.slice(0, 5).map((product, idx) => (
            <Link 
              key={product.id} 
              to={`/products/${product.slug}`} 
              className={`flex-1 p-6 flex flex-col items-center justify-center relative group ${
                idx !== products.slice(0, 5).length - 1 ? 'border-b md:border-b-0 md:border-r border-deep-brown/5' : ''
              }`}
            >
              <img 
                src={product.images.hero} 
                className="h-32 mb-4 object-contain transition-transform duration-700 group-hover:scale-105" 
                alt={product.name} 
              />
              <div className="text-center relative z-10">
                <h3 className="font-serif text-sm italic mb-1">{product.name}</h3>
                <p className="text-[9px] uppercase tracking-widest opacity-50 mb-2">{product.scentMood}</p>
                <p className="text-[11px]">{product.formattedPrice}</p>
              </div>
              <div className="absolute inset-0 glass flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                 <span className="bg-deep-brown text-warm-ivory text-[9px] uppercase tracking-widest px-6 py-3">Xem chi tiết</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Services */}
      <section className="fade-in-section max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-serif mb-4">{homepage.trustServices.primaryTitle}</h2>
        <h3 className="text-sm uppercase tracking-widest text-subtle-gold mb-8">{homepage.trustServices.secondaryTitle}</h3>
        <p className="text-base leading-relaxed text-deep-brown/80 mb-12 max-w-2xl mx-auto">
          {homepage.trustServices.body}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {homepage.trustServices.items.map((item, index) => (
            <div key={index} className="border border-warm-sand p-8 flex items-center justify-center text-center">
              <p className="text-sm uppercase tracking-widest leading-relaxed">{item.title}</p>
            </div>
          ))}
        </div>
        
        <Link 
          to="/policies" 
          className="inline-block border-b border-deep-brown pb-1 uppercase tracking-widest text-sm hover:text-subtle-gold hover:border-subtle-gold transition-colors duration-300"
        >
          {homepage.trustServices.cta}
        </Link>
      </section>
    </div>
  );
}
