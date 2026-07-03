import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import contentData from '../data/contentData.json';

export default function ProductListingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { products } = contentData;

  return (
    <div ref={containerRef} className="bg-warm-ivory text-deep-brown min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif mb-16 text-center">Tất cả sản phẩm</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.slug}`} className="product-item group block">
              <div className="aspect-[3/4] overflow-hidden mb-6 bg-warm-sand/20 relative">
                <img 
                  src={product.images.hero} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-deep-brown/0 group-hover:bg-deep-brown/5 transition-colors duration-500" />
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-serif mb-2">{product.name}</h4>
                <p className="text-xs uppercase tracking-widest text-deep-brown/60 mb-3">{product.scentMood}</p>
                <p className="text-sm font-medium">{product.formattedPrice}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}