import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import contentData from '../data/contentData.json';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const product = contentData.products.find(p => p.slug === slug);
  const [activeImage, setActiveImage] = useState<string>(product?.images.hero || '');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images.hero);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-serif mb-4">Sản phẩm không tồn tại</h2>
          <Link to="/products" className="border-b border-deep-brown pb-1 hover:text-subtle-gold transition-colors">Quay lại danh mục</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      size: product.size,
      type: 'Nước hoa cá nhân',
      price: product.price,
      quantity,
      image: product.images.hero
    });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const imagesList = Object.values(product.images);

  return (
    <div ref={containerRef} className="bg-warm-ivory text-deep-brown min-h-screen pt-8 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-widest text-deep-brown/50 mb-12 fade-in">
          <Link to="/" className="hover:text-deep-brown">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-deep-brown">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-deep-brown">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="fade-in space-y-4">
            <div className="aspect-[3/4] bg-warm-sand/20 overflow-hidden w-full">
              <img 
                src={activeImage || undefined} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {imagesList.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square overflow-hidden bg-warm-sand/20 border transition-all ${activeImage === img ? 'border-deep-brown opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-serif mb-2">{product.name}</h1>
            <p className="text-sm uppercase tracking-widest text-subtle-gold mb-6">{product.scentMood}</p>
            <p className="text-2xl font-medium mb-10">{product.formattedPrice}</p>
            
            <p className="text-base leading-relaxed text-deep-brown/80 mb-10">
              {product.scentStory}
            </p>

            <div className="mb-10 space-y-4 border-t border-b border-warm-sand py-6">
              <div className="flex justify-between items-center">
                <span className="text-sm uppercase tracking-widest">Dung tích</span>
                <span className="text-sm">{product.size}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm uppercase tracking-widest">Loại</span>
                <span className="text-sm text-right max-w-[200px]">{product.productType}</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-16">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-deep-brown">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-warm-sand/30">-</button>
                  <span className="px-4 py-3 min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-warm-sand/30">+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow bg-deep-brown text-warm-ivory py-4 px-8 uppercase tracking-widest text-sm hover:bg-subtle-gold transition-colors duration-300 relative overflow-hidden"
                >
                  {addedMessage ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}
                </button>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm uppercase tracking-widest font-medium mb-3">Thành phần hương (Notes)</h3>
                <ul className="text-sm leading-relaxed text-deep-brown/80 space-y-2 list-disc list-inside">
                  <li><span className="font-medium text-deep-brown">Hương đầu:</span> {product.productInfo.topNotes}</li>
                  <li><span className="font-medium text-deep-brown">Hương giữa:</span> {product.productInfo.heartNotes}</li>
                  <li><span className="font-medium text-deep-brown">Hương cuối:</span> {product.productInfo.baseNotes}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-widest font-medium mb-3">Cảm nhận (Feel)</h3>
                <p className="text-sm leading-relaxed text-deep-brown/80">{product.productInfo.feel}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-medium mb-3">Lưu hương</h3>
                  <p className="text-sm leading-relaxed text-deep-brown/80">{product.productInfo.longevity}</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-medium mb-3">Tỏa hương</h3>
                  <p className="text-sm leading-relaxed text-deep-brown/80">{product.productInfo.sillage}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-widest font-medium mb-3">Phù hợp với</h3>
                <p className="text-sm leading-relaxed text-deep-brown/80">{product.suitableFor}</p>
                <p className="text-sm leading-relaxed text-deep-brown/80 mt-2">{product.usageOccasion}</p>
              </div>
              
              <p className="text-xs text-deep-brown/50 italic mt-8">{product.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}