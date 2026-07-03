import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import contentData from '../data/contentData.json';

export default function PolicyPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const { policies } = contentData;

  return (
    <div className="bg-warm-ivory text-deep-brown min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif mb-16 text-center">Chính sách của NOMA</h1>
        
        <div className="space-y-16">
          {policies.map((policy) => (
            <div key={policy.id} id={policy.id} className="scroll-mt-32">
              <h2 className="text-2xl font-serif mb-6">{policy.title}</h2>
              <div className="text-base leading-relaxed text-deep-brown/80 space-y-4">
                {policy.content.split('. ').map((sentence, idx) => (
                  <p key={idx}>{sentence}{sentence.endsWith('.') ? '' : '.'}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}