import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { formatVND } from '../utils/format';
import contentData from '../data/contentData.json';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, addGiftBox, setAddGiftBox } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { cart } = contentData;

  if (items.length === 0) {
    return (
      <div className="bg-warm-ivory text-deep-brown min-h-[60vh] flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl font-serif mb-6">{cart.title}</h1>
          <p className="mb-8 text-deep-brown/70">{cart.emptyMessage}</p>
          <Link to="/products" className="inline-block border border-deep-brown px-8 py-4 uppercase tracking-widest text-sm hover:bg-deep-brown hover:text-warm-ivory transition-colors">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  const giftBoxPrice = 39000;
  const finalSubtotal = subtotal + (addGiftBox ? giftBoxPrice : 0);

  return (
    <div ref={containerRef} className="bg-warm-ivory text-deep-brown min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif mb-12 text-center fade-in-up">{cart.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 fade-in-up">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 border-b border-warm-sand pb-8">
                <Link to={`/products/${item.id}`} className="w-24 md:w-32 aspect-[3/4] bg-warm-sand/20 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/products/${item.id}`} className="text-lg font-serif hover:text-subtle-gold transition-colors">{item.name}</Link>
                      <p className="text-xs uppercase tracking-widest text-deep-brown/60 mt-1">{item.size}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-deep-brown/50 hover:text-deep-brown">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-deep-brown/30">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-warm-sand/30">-</button>
                      <span className="px-3 py-1 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-warm-sand/30">+</button>
                    </div>
                    <p className="font-medium">{formatVND(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Gift Box Option */}
            <div className="flex items-center space-x-3 pt-4">
              <input 
                type="checkbox" 
                id="giftbox" 
                checked={addGiftBox}
                onChange={(e) => setAddGiftBox(e.target.checked)}
                className="w-4 h-4 accent-deep-brown"
              />
              <label htmlFor="giftbox" className="text-sm cursor-pointer select-none">
                Thêm hộp quà tặng trang nhã (+{formatVND(giftBoxPrice)})
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream-white p-8 border border-warm-sand sticky top-32">
              <h2 className="text-xl font-serif mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-8 text-sm border-b border-warm-sand pb-6">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatVND(subtotal)}</span>
                </div>
                {addGiftBox && (
                  <div className="flex justify-between">
                    <span>Hộp quà</span>
                    <span>{formatVND(giftBoxPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between text-deep-brown/60 italic">
                  <span>Phí vận chuyển</span>
                  <span>Chưa tính</span>
                </div>
              </div>
              
              <div className="flex justify-between font-serif text-xl mb-8">
                <span>Tổng (Tạm tính)</span>
                <span>{formatVND(finalSubtotal)}</span>
              </div>
              
              <p className="text-xs text-deep-brown/60 italic mb-8">
                {cart.shippingNote}
              </p>

              <Link 
                to="/checkout" 
                className="block w-full bg-deep-brown text-warm-ivory py-4 text-center uppercase tracking-widest text-sm hover:bg-subtle-gold transition-colors"
              >
                Tiến hành đặt hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}