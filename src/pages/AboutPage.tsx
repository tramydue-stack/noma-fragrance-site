import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contentData from '../data/contentData.json';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in-up',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', stagger: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { about } = contentData;

  return (
    <div ref={containerRef} className="bg-warm-ivory text-deep-brown min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24 fade-in-up">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">{about.essence.primaryTitle}</h1>
          <p className="text-sm uppercase tracking-widest text-subtle-gold mb-8">{about.essence.secondaryTitle}</p>
          <p className="text-lg leading-relaxed text-deep-brown/80 max-w-2xl mx-auto">
            {about.essence.body}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center fade-in-up">
          <div className="aspect-[4/5] bg-warm-sand/30 overflow-hidden">
            {/* Using brand guidelines image as an abstract representation for About */}
            <img 
              src={contentData.brand.logos.guidelines} 
              alt="NOMA Brand Story" 
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-4">{about.story.primaryTitle}</h2>
            <h3 className="text-sm uppercase tracking-widest text-subtle-gold mb-8">{about.story.secondaryTitle}</h3>
            <p className="text-base leading-relaxed text-deep-brown/80">
              {about.story.body}
            </p>
          </div>
        </div>

        <div className="text-center fade-in-up">
          <h2 className="text-3xl font-serif mb-4">{about.coreValues.primaryTitle}</h2>
          <h3 className="text-sm uppercase tracking-widest text-subtle-gold mb-16">{about.coreValues.secondaryTitle}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {about.coreValues.values.map((value, idx) => (
              <div key={idx} className="border-t border-warm-sand pt-6">
                <h4 className="text-xl font-serif mb-4">{value.title}</h4>
                <p className="text-sm leading-relaxed text-deep-brown/80">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}