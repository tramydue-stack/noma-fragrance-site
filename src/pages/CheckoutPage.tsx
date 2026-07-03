import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { formatVND } from '../utils/format';
import contentData from '../data/contentData.json';

export default function CheckoutPage() {
  const { items, subtotal, addGiftBox, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
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
  }, [isSuccess]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  const giftBoxPrice = 39000;
  const finalSubtotal = subtotal + (addGiftBox ? giftBoxPrice : 0);
  const { checkout } = contentData;

  if (isSuccess) {
    return (
      <div ref={containerRef} className="bg-warm-ivory text-deep-brown min-h-[70vh] flex items-center justify-center text-center px-6 py-24">
        <div className="max-w-2xl fade-in-up">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 border border-subtle-gold rounded-full flex items-center justify-center text-subtle-gold">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-serif mb-6">{checkout.thankYou.title}</h1>
          <p className="mb-6 text-deep-brown/80 leading-relaxed">
            {checkout.thankYou.body}
          </p>
          <div className="bg-cream-white p-6 border border-warm-sand mb-10 text-sm text-deep-brown/80 text-left">
            <p className="italic">{checkout.thankYou.bankNote}</p>
          </div>
          <Link to="/" className="inline-block border border-deep-brown px-8 py-4 uppercase tracking-widest text-sm hover:bg-deep-brown hover:text-warm-ivory transition-colors">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-warm-ivory text-deep-brown min-h-[60vh] flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl font-serif mb-6">Giỏ hàng trống</h1>
          <Link to="/products" className="inline-block border border-deep-brown px-8 py-4 uppercase tracking-widest text-sm hover:bg-deep-brown hover:text-warm-ivory transition-colors">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-warm-ivory text-deep-brown min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif mb-12 text-center fade-in-up">{checkout.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 fade-in-up">
          {/* Form */}
          <div>
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
              <div>
                <h2 className="text-xl font-serif mb-6">Thông tin giao hàng</h2>
                <div className="space-y-4">
                  <input required type="text" placeholder="Họ và tên" className="w-full bg-transparent border border-deep-brown/30 px-4 py-3 focus:outline-none focus:border-deep-brown transition-colors" />
                  <input required type="tel" placeholder="Số điện thoại" className="w-full bg-transparent border border-deep-brown/30 px-4 py-3 focus:outline-none focus:border-deep-brown transition-colors" />
                  <input required type="email" placeholder="Email" className="w-full bg-transparent border border-deep-brown/30 px-4 py-3 focus:outline-none focus:border-deep-brown transition-colors" />
                  <input required type="text" placeholder="Địa chỉ chi tiết (Số nhà, đường...)" className="w-full bg-transparent border border-deep-brown/30 px-4 py-3 focus:outline-none focus:border-deep-brown transition-colors" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <select required className="w-full bg-transparent border border-deep-brown/30 px-4 py-3 focus:outline-none focus:border-deep-brown transition-colors text-deep-brown/80">
                      <option value="">Tỉnh / Thành phố</option>
                      <option value="HN">Hà Nội</option>
                      <option value="HCM">TP. Hồ Chí Minh</option>
                      <option value="OTHER">Khác</option>
                    </select>
                    <select required className="w-full bg-transparent border border-deep-brown/30 px-4 py-3 focus:outline-none focus:border-deep-brown transition-colors text-deep-brown/80">
                      <option value="">Quận / Huyện</option>
                      <option value="1">Quận 1</option>
                      <option value="2">Quận 3</option>
                      <option value="OTHER">Khác</option>
                    </select>
                  </div>
                  
                  <textarea placeholder="Ghi chú đơn hàng (Không bắt buộc)" rows={3} className="w-full bg-transparent border border-deep-brown/30 px-4 py-3 focus:outline-none focus:border-deep-brown transition-colors resize-none"></textarea>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-serif mb-6">Phương thức thanh toán</h2>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 border border-deep-brown/30 p-4 cursor-pointer hover:bg-warm-sand/20 transition-colors">
                    <input type="radio" name="payment" value="cod" required className="w-4 h-4 accent-deep-brown" />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </label>
                  <label className="flex items-center space-x-3 border border-deep-brown/30 p-4 cursor-pointer hover:bg-warm-sand/20 transition-colors">
                    <input type="radio" name="payment" value="bank" required className="w-4 h-4 accent-deep-brown" />
                    <span>Chuyển khoản qua ngân hàng</span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-cream-white p-8 border border-warm-sand sticky top-32">
              <h2 className="text-xl font-serif mb-6">Đơn hàng của bạn</h2>
              
              <div className="space-y-6 mb-8 border-b border-warm-sand pb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex gap-4">
                      <div className="w-16 h-20 bg-warm-sand/20 shrink-0 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 bg-deep-brown text-warm-ivory text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <p className="font-serif">{item.name}</p>
                        <p className="text-xs text-deep-brown/60 uppercase tracking-widest mt-1">{item.size}</p>
                      </div>
                    </div>
                    <p>{formatVND(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 mb-8 text-sm border-b border-warm-sand pb-6">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatVND(subtotal)}</span>
                </div>
                {addGiftBox && (
                  <div className="flex justify-between">
                    <span>Hộp quà trang nhã</span>
                    <span>{formatVND(giftBoxPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between text-deep-brown/60 italic">
                  <span>Phí vận chuyển</span>
                  <span>Tính khi xác nhận</span>
                </div>
              </div>
              
              <div className="flex justify-between font-serif text-xl mb-8">
                <span>Tổng cộng</span>
                <span>{formatVND(finalSubtotal)}</span>
              </div>
              
              <p className="text-xs text-deep-brown/60 italic mb-8">
                Bằng việc hoàn tất đặt hàng, bạn đồng ý với các <Link to="/policies" className="underline hover:text-subtle-gold">chính sách mua hàng</Link> của NOMA.
              </p>

              <button 
                type="submit"
                form="checkout-form"
                className="w-full bg-deep-brown text-warm-ivory py-4 text-center uppercase tracking-widest text-sm hover:bg-subtle-gold transition-colors"
              >
                Xác nhận đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}