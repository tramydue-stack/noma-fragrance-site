import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contentData from '../data/contentData.json';

gsap.registerPlugin(ScrollTrigger);

export default function CollectionPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in-up',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', stagger: 0.2 }
      );
      
      gsap.utils.toArray('.product-card').forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: i % 2 === 0 ? 0 : 0.2
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { collection, products } = contentData;

  return (
    <div ref={containerRef} className="bg-warm-ivory text-deep-brown min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">{collection.primaryTitle}</h1>
          <p className="text-sm uppercase tracking-widest text-subtle-gold mb-10">{collection.secondaryTitle}</p>
          <div className="w-full max-w-3xl mx-auto aspect-video mb-12 overflow-hidden bg-warm-sand/30">
            <img 
              src={collection.image} 
              alt="Whispers of Home Collection" 
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
            />
          </div>
          <p className="text-lg leading-relaxed text-deep-brown/80 max-w-3xl mx-auto mb-12">
            {collection.body}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-deep-brown/70 max-w-2xl mx-auto text-left border-y border-warm-sand py-8">
            {collection.details.map((detail, idx) => (
              <p key={idx} className="flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-subtle-gold before:rounded-full before:mr-3">
                {detail}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mt-32">
          {products.map((product) => (
            <div key={product.id} className="product-card group">
              <Link to={`/products/${product.slug}`} className="block overflow-hidden bg-warm-sand/20 aspect-[3/4] mb-8 relative">
                <img 
                  src={product.images.hero} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-deep-brown/0 group-hover:bg-deep-brown/5 transition-colors duration-500" />
              </Link>
              <div className="text-center">
                <h3 className="text-3xl font-serif mb-2">
                  <Link to={`/products/${product.slug}`} className="hover:text-subtle-gold transition-colors">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm uppercase tracking-widest text-deep-brown/60 mb-6">{product.scentMood}</p>
                <p className="text-sm leading-relaxed text-deep-brown/80 max-w-md mx-auto mb-6">
                  {product.shortDescription}
                </p>
                <Link 
                  to={`/products/${product.slug}`} 
                  className="inline-block border-b border-deep-brown pb-1 uppercase tracking-widest text-xs hover:text-subtle-gold hover:border-subtle-gold transition-colors"
                >
                  Khám phá mùi hương
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}