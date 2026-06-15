import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, Star, Search, Plus, Minus, Trash2, ChevronRight, 
  MapPin, CheckCircle, AlertTriangle, ArrowRight, Eye, ShieldCheck, 
  Send, RefreshCcw, Landmark, CreditCard, Sparkles, User, Package, Clock, Phone
} from 'lucide-react';
import { 
  Product, Category, Brand, CartItem, WishlistItem, Address, Order, OrderStatus 
} from '../types';

interface StorefrontViewProps {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  addresses: Address[];
  orders: Order[];
  onAddToCart: (product: Product) => void;
  onUpdateCartQty: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onAddToWishlist: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onMoveWishlistToCart: (product: Product) => void;
  onAddAddress: (address: Address) => void;
  onPlaceOrder: (order: Order) => void;
  onTriggerNotification: (title: string, message: string, type: 'email' | 'sms', recipient: string) => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  products,
  categories,
  brands,
  cart,
  wishlist,
  addresses,
  orders,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onMoveWishlistToCart,
  onAddAddress,
  onPlaceOrder,
  onTriggerNotification,
}) => {
  // Store state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Tab states for details modal
  const [detailsTab, setDetailsTab] = useState<'info' | 'reviews'>('info');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [productReviews, setProductReviews] = useState<Record<string, Array<{id: string, author: string, rating: number, comment: string, date: string}>>>({
    'p-1': [
      { id: '1', author: 'John Doe', rating: 5, comment: 'Exceptional build quality and highly accurate step counter. AMOLED screen is gorgeous even in direct Indian sunlight!', date: '2026-05-10' },
      { id: '2', author: 'Nancy Sharma', rating: 4, comment: 'Very elegant, premium feeling on the wrist. Wish battery lasted slightly longer but charging is extremely quick.', date: '2026-05-18' }
    ],
    'p-2': [
      { id: '3', author: 'Arjun Verma', rating: 5, comment: 'Sound quality punches far above its price range. The bass response is tight and ANC blocks heavy traffic perfectly.', date: '2026-06-02' }
    ]
  });

  // Flow control states
  const [checkoutStep, setCheckoutStep] = useState<'shop' | 'cart' | 'wishlist' | 'checkout' | 'payment' | 'placed_success' | 'placed_failure'>('shop');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || '');
  const [paymentGateway, setPaymentGateway] = useState<'Stripe' | 'Razorpay'>('Stripe');
  const [recentPlacedOrder, setRecentPlacedOrder] = useState<Order | null>(null);

  // Address inputs
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newCardFullName, setNewCardFullName] = useState('');
  const [newCardCity, setNewCardCity] = useState('');
  const [newCardState, setNewCardState] = useState('');
  const [newCardPhone, setNewCardPhone] = useState('');
  const [newCardZipCode, setNewCardZipCode] = useState('');

  // Payment mock form inputs
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Filters calculation
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
    return matchesSearch && matchesCat && matchesBrand;
  });

  // Pricing calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartTax = cartSubtotal * 0.18; // 18% GST standard Representation
  const shippingFee = cartSubtotal > 150 ? 0 : 15.00;
  const cartTotal = cartSubtotal + cartTax + shippingFee;

  // Add review handler
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !newReviewAuthor || !newReviewComment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0]
    };

    const currentRevs = productReviews[selectedProduct.id] || [];
    const updatedRevs = [newRev, ...currentRevs];
    setProductReviews({
      ...productReviews,
      [selectedProduct.id]: updatedRevs
    });

    // Reset Review fields
    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setDetailsTab('reviews');
  };

  // Address submittal
  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardFullName || !newCardCity || !newCardState || !newCardZipCode || !newCardPhone) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: newCardFullName,
      city: newCardCity,
      state: newCardState,
      zipCode: newCardZipCode,
      country: 'India',
      phone: newCardPhone,
      isDefault: addresses.length === 0
    };

    onAddAddress(newAddr);
    setSelectedAddressId(newAddr.id);
    setShowNewAddressForm(false);
    
    // Clear fields
    setNewCardFullName('');
    setNewCardCity('');
    setNewCardState('');
    setNewCardZipCode('');
    setNewCardPhone('');
  };

  // Payment process simulation handles successes/failures
  const handleAuthorizePayment = (status: 'success' | 'fail') => {
    if (cart.length === 0) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      if (status === 'fail') {
        setCheckoutStep('placed_failure');
        onTriggerNotification(
          "Payment Authorization Alert 🔴",
          `Payment of $${cartTotal.toFixed(2)} via ${paymentGateway} on your credit card was rejected by the gateway. Re-verify merchant configs.`,
          'sms',
          'Anil Rathod (+91-98765-43210)'
        );
        return;
      }

      // Successful order creation
      const matchingAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
      const itemsSnapshot = cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      }));

      const transactionId = `${paymentGateway.toUpperCase()}_TXN_${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: itemsSnapshot,
        totalAmount: cartTotal,
        shippingAddress: matchingAddress,
        paymentMethod: paymentGateway,
        paymentId: transactionId,
        status: OrderStatus.Confirmed,
        createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        isCancelled: false
      };

      setRecentPlacedOrder(newOrder);
      onPlaceOrder(newOrder);
      setCheckoutStep('placed_success');

      // Trigger high fidelity notification simulation
      onTriggerNotification(
        "Order Confirmed! 📦",
        `Order code ${newOrder.orderNumber} ($${newOrder.totalAmount.toFixed(2)}) has been successfully compiled and stored. Shipping details dispatched to ${matchingAddress.city}.`,
        'email',
        'anilrathod.AR716@gmail.com'
      );

      onTriggerNotification(
        "Payment Processed! 💳",
        `Secured processing via ${paymentGateway} successful. Transaction Reference: ${newOrder.paymentId}. Account debited: $${newOrder.totalAmount.toFixed(2)}.`,
        'sms',
        matchingAddress.phone
      );

    }, 1500); // Simulate processing delay
  };

  return (
    <div className="w-full relative min-h-screen bg-zinc-50 flex flex-col font-sans">
      
      {/* Mini Top Banner - Real-Time State Indicator */}
      <div className="bg-zinc-900 text-zinc-400 py-1.5 px-6 flex justify-between items-center text-xs font-mono border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Secured Sandbox Router: OK</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Stripe Gateway: <span className="text-emerald-400 font-bold">ACTIVE</span></span>
          <span className="hidden sm:inline">Razorpay API: <span className="text-emerald-400 font-bold">READY</span></span>
          <span>Role: <span className="text-amber-400 font-bold uppercase">Customer Panel</span></span>
        </div>
      </div>

      {/* Cart & Wishlist Controls bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200 shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-950 text-white rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-900 tracking-tight">E-Commerce Storefront</h1>
            <p className="text-xs text-zinc-500">Fast visual prototype connected to a mock client-side database</p>
          </div>
        </div>

        {/* Dynamic Buttons */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setCheckoutStep('shop')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${checkoutStep === 'shop' ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
          >
            All Products
          </button>
          
          <button 
            onClick={() => setCheckoutStep('cart')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 relative ${checkoutStep === 'cart' ? 'bg-zinc-950 text-white' : 'bg-zinc-150 text-zinc-700 bg-zinc-100 hover:bg-zinc-200'}`}
          >
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold animate-bounce">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          <button 
            onClick={() => setCheckoutStep('wishlist')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${checkoutStep === 'wishlist' ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Wishlist</span>
            {wishlist.length > 0 && (
              <span className="font-mono text-xs text-zinc-500 font-bold">({wishlist.length})</span>
            )}
          </button>
        </div>
      </header>

      {/* Primary Section */}
      <div className="flex-1 p-6">
        
        {/* VIEW 1: PRODUCTS SHOPPING LISTING */}
        {checkoutStep === 'shop' && (
          <div className="space-y-6">
            
            {/* Search and Filters panel */}
            <div className="bg-white border border-zinc-200 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search input */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
                <input 
                  type="text" 
                  placeholder="Query product names, description tags, brand marks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 mr-1.5 uppercase font-bold">Category:</span>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-zinc-50 border border-zinc-200 text-xs py-1.5 px-2.5 rounded-lg focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-zinc-400 mr-1.5 uppercase font-bold">Brand:</span>
                  <select 
                    value={selectedBrand} 
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="bg-zinc-50 border border-zinc-200 text-xs py-1.5 px-2.5 rounded-lg focus:outline-none"
                  >
                    <option value="all">All Brands</option>
                    {brands.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-sm font-semibold text-zinc-900">No Matching Inventory</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">We couldn't locate products fitting your queries in stock right now.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedBrand('all'); }} 
                  className="mt-4 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((p) => {
                  const hasWish = wishlist.some(w => w.product.id === p.id);
                  return (
                    <div 
                      key={p.id} 
                      className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow relative"
                    >
                      {/* Popular Tag */}
                      {p.isPopular && (
                        <div className="absolute top-3 left-3 bg-zinc-900 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full z-10 flex items-center gap-1 shadow">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                          <span>POPULAR</span>
                        </div>
                      )}

                      {/* Photo Section */}
                      <div className="h-48 bg-zinc-100 overflow-hidden relative">
                        <img 
                          src={p.imageUrl} 
                          alt={p.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          onClick={() => hasWish ? onRemoveFromWishlist(p.id) : onAddToWishlist(p)}
                          className="absolute top-3 right-3 p-2 bg-white hover:bg-zinc-50 rounded-full shadow border border-zinc-100 text-zinc-500 transition-colors z-10"
                        >
                          <Heart className={`w-4 h-4 ${hasWish ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Text details */}
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">{p.brand}</span>
                          <span className="text-[10px] font-mono bg-zinc-100 text-zinc-650 text-zinc-600 font-bold px-2 py-0.5 rounded-md">{p.category}</span>
                        </div>
                        <h3 className="text-zinc-900 text-xs font-semibold mt-1.5 line-clamp-1 group-hover:text-indigo-650 transition-colors">{p.name}</h3>
                        <p className="text-zinc-500 text-[11px] leading-relaxed mt-1 line-clamp-2 h-8">{p.description}</p>
                        
                        {/* Rating block */}
                        <div className="flex items-center gap-1 text-amber-500 mt-2">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span className="text-xs font-bold text-zinc-800">{p.rating}</span>
                          <span className="text-zinc-400 text-[10px]">({p.reviewsCount} reviews)</span>
                        </div>

                        {/* Stock status indicator */}
                        <div className="mt-3.5 pb-2">
                          {p.stock > 10 ? (
                            <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">In Stock: {p.stock} units</span>
                          ) : p.stock > 0 ? (
                            <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Low Stock: Only {p.stock} left!</span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Out of Stock</span>
                          )}
                        </div>

                        {/* Price & Action button */}
                        <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between">
                          <span className="text-sm font-bold text-zinc-900 font-mono">${p.price.toFixed(2)}</span>
                          <div className="flex items-center gap-1.5">
                            <button 
                              onClick={() => { setSelectedProduct(p); setDetailsTab('info'); }}
                              className="p-1.5 border border-zinc-200 text-zinc-600 hover:text-zinc-950 rounded bg-white"
                              title="Quick View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => {
                                if (p.stock > 0) {
                                  onAddToCart(p);
                                  onTriggerNotification(
                                    "Added to Basket!",
                                    `Item "${p.name}" has been placed in your active shopping cart.`,
                                    'sms',
                                    'Anil Rathod'
                                  );
                                }
                              }}
                              disabled={p.stock <= 0}
                              className={`text-[11px] font-semibold px-2.5 py-1.5 rounded flex items-center gap-1.5 transition-all ${p.stock > 0 ? 'bg-zinc-950 text-white hover:bg-zinc-850' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: ACTIVE BASKET (SHOPPING CART) */}
        {checkoutStep === 'cart' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-base font-bold text-zinc-900 tracking-tight pb-2 border-b border-zinc-200">Your E-Commerce Basket</h2>
            
            {cart.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto" />
                <h3 className="text-sm font-semibold text-zinc-850">Your cart is currently empty</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">Items added to your bag will be processed securely using server configurations.</p>
                <button 
                  onClick={() => setCheckoutStep('shop')}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold mt-2"
                >
                  Return to shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Cart items list */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white border border-zinc-200 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded border" />
                        <div>
                          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">{item.product.brand}</span>
                          <h4 className="text-xs font-semibold text-zinc-900 mt-0.5">{item.product.name}</h4>
                          <span className="text-xs font-mono text-zinc-600">${item.product.price.toFixed(2)} each</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Quantity management */}
                        <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                          <button 
                            onClick={() => onUpdateCartQty(item.product.id, -1)}
                            className="p-1.5 hover:bg-zinc-155 text-zinc-650 hover:bg-zinc-100 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 font-mono text-xs font-bold text-zinc-850 bg-white border-x border-zinc-200">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateCartQty(item.product.id, 1)}
                            className="p-1.5 hover:bg-zinc-155 text-zinc-650 hover:bg-zinc-100 transition-colors"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Trash */}
                        <button 
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="p-2 text-rose-500 hover:text-rose-700 bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation checkout card */}
                <div className="lg:col-span-4 bg-white border border-zinc-200 p-5 rounded-xl shadow-sm space-y-4 max-h-fit">
                  <h3 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider">Order Ledger Summary</h3>
                  
                  <div className="space-y-2 border-b border-zinc-100 pb-3 text-xs">
                    <div className="flex justify-between text-zinc-600">
                      <span>Basket Subtotal</span>
                      <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>GST standard tax (18%)</span>
                      <span className="font-mono">${cartTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Shipping Fee</span>
                      <span className="font-mono">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-zinc-900 font-bold text-xs">Total Amount</span>
                    <span className="font-mono font-bold text-base text-indigo-700">${cartTotal.toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => {
                      setCheckoutStep('checkout');
                    }}
                    className="w-full bg-zinc-950 hover:bg-zinc-85 font-semibold py-2.5 rounded-lg text-white text-xs flex items-center justify-center gap-2 group transition-all"
                  >
                    <span>Proceed To Shipping</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-150 border-zinc-100 text-[10px] text-zinc-500 leading-relaxed font-mono">
                    💡 Orders above $150 qualify for <b>FREE Standard Shipping</b> globally.
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* VIEW 3: WISHLIST FOR SAVING ITEMS */}
        {checkoutStep === 'wishlist' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-base font-bold text-zinc-900 tracking-tight pb-2 border-b border-zinc-200">Your wishlist</h2>
            
            {wishlist.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-2">
                <Heart className="w-12 h-12 text-zinc-300 mx-auto" />
                <h3 className="text-sm font-semibold text-zinc-800">Your wishlist is bare</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">Items added to your wishlist can be toggled straight to active shopping carts instantly.</p>
                <button 
                  onClick={() => setCheckoutStep('shop')}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold mt-2"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white border border-zinc-200 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-14 h-14 object-cover rounded border" />
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">{item.product.brand}</span>
                        <h4 className="text-xs font-semibold text-zinc-900 mt-0.5">{item.product.name}</h4>
                        <span className="text-xs font-mono text-zinc-650 text-indigo-700 font-semibold">${item.product.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => onRemoveFromWishlist(item.product.id)}
                        className="p-1.5 text-zinc-420 hover:text-zinc-600 bg-zinc-50 rounded"
                        title="Delete from Wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-550 text-rose-550" />
                      </button>
                      <button 
                        onClick={() => {
                          onMoveWishlistToCart(item.product);
                          onTriggerNotification(
                            "Moved to Cart!",
                            `Moved "${item.product.name}" from Wishlist into active Checkout Cart.`,
                            'email',
                            'anilrathod.AR716@gmail.com'
                          );
                        }}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded flex items-center gap-1"
                      >
                        <span>Move to cart</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: SECURED SHIPPING SELECTION */}
        {checkoutStep === 'checkout' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-base font-bold text-zinc-900 tracking-tight pb-2 border-b border-zinc-200">Select Ship Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              <div className="md:col-span-8 space-y-4">
                
                {/* Radio selectors for address */}
                <div className="flex flex-col gap-3">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id} 
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all flex items-start gap-3 bg-white ${selectedAddressId === addr.id ? 'border-zinc-900 ring-1 ring-zinc-900 bg-zinc-50' : 'border-zinc-200'}`}
                    >
                      <input 
                        type="radio" 
                        name="address_select" 
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-zinc-900">{addr.fullName}</h4>
                          {addr.isDefault && <span className="bg-zinc-100 text-zinc-600 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold">Standard Delivery Default</span>}
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">{addr.city}, {addr.state}, {addr.zipCode}</p>
                        <p className="text-xs text-zinc-400 font-mono mt-0.5">{addr.country} / {addr.phone}</p>
                      </div>
                      <MapPin className="w-4 h-4 text-zinc-400 mt-0.5" />
                    </div>
                  ))}
                </div>

                {/* Add new address button */}
                {!showNewAddressForm ? (
                  <button 
                    onClick={() => setShowNewAddressForm(true)}
                    className="border border-dashed border-zinc-300 w-full hover:border-zinc-450 hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 font-semibold py-3 rounded-lg text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Configure New Address</span>
                  </button>
                ) : (
                  <form onSubmit={handleAddNewAddress} className="bg-white border border-zinc-200 p-4 rounded-xl space-y-3 shadow-inner">
                    <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Configure New Shipping Destination</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-[10px] uppercase font-mono font-bold text-zinc-405 text-zinc-550 text-zinc-500">Receipt Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="E.g. Anil Rathod"
                          value={newCardFullName}
                          onChange={(e) => setNewCardFullName(e.target.value)}
                          className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">City</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Pune"
                          value={newCardCity}
                          onChange={(e) => setNewCardCity(e.target.value)}
                          className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">State / Region</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Maharashtra"
                          value={newCardState}
                          onChange={(e) => setNewCardState(e.target.value)}
                          className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Zip / PIN Code</label>
                        <input 
                          type="text" 
                          required
                          placeholder="411001"
                          value={newCardZipCode}
                          onChange={(e) => setNewCardZipCode(e.target.value)}
                          className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Phone</label>
                        <input 
                          type="text" 
                          required
                          placeholder="+91 98765 43210"
                          value={newCardPhone}
                          onChange={(e) => setNewCardPhone(e.target.value)}
                          className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button 
                        type="button" 
                        onClick={() => setShowNewAddressForm(false)}
                        className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs rounded font-semibold"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs rounded font-semibold"
                      >
                        Create Address
                      </button>
                    </div>
                  </form>
                )}

              </div>

              {/* Order total confirmation */}
              <div className="md:col-span-4 bg-white border border-zinc-200 p-5 rounded-xl shadow-sm space-y-4 max-h-fit">
                <h3 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider">Gateway Pre-auth</h3>
                <div className="flex justify-between items-center py-1">
                  <span className="text-zinc-600 text-xs">Total Amount due:</span>
                  <span className="font-mono font-bold text-sm text-zinc-900">${cartTotal.toFixed(2)}</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-400 block">Choose Payment Gateway</label>
                  
                  {/* Stripes selector */}
                  <div 
                    onClick={() => setPaymentGateway('Stripe')}
                    className={`p-3 border rounded-lg cursor-pointer flex items-center justify-between bg-zinc-50 ${paymentGateway === 'Stripe' ? 'border-zinc-900 ring-1 ring-zinc-900 bg-indigo-50' : 'border-zinc-200'}`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-semibold text-zinc-900">Stripe Integration</span>
                    </div>
                    {paymentGateway === 'Stripe' && <CheckCircle className="w-4 h-4 text-indigo-600 fill-indigo-150" />}
                  </div>

                  {/* Razorpay Selector */}
                  <div 
                    onClick={() => setPaymentGateway('Razorpay')}
                    className={`p-3 border rounded-lg cursor-pointer flex items-center justify-between bg-zinc-50 ${paymentGateway === 'Razorpay' ? 'border-zinc-900 ring-1 ring-zinc-900 bg-rose-50' : 'border-zinc-200'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-semibold text-zinc-900">Razorpay API Route</span>
                    </div>
                    {paymentGateway === 'Razorpay' && <CheckCircle className="w-4 h-4 text-rose-600 fill-rose-150" />}
                  </div>

                </div>

                <button 
                  onClick={() => {
                    setCheckoutStep('payment');
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg text-xs mt-2 flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Pay Securely</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 5: SECURITY CHECKOUT GATEWAY INTERFACES */}
        {checkoutStep === 'payment' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className={`p-5 rounded-2xl border bg-white ${paymentGateway === 'Stripe' ? 'border-indigo-250 shadow-indigo-50' : 'border-rose-250'}`}>
              
              {/* Header logo */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  {paymentGateway === 'Stripe' ? (
                    <div className="px-2.5 py-1 bg-indigo-600 rounded text-white font-serif font-bold text-xs">stripe</div>
                  ) : (
                    <div className="px-2.5 py-1 bg-rose-600 rounded text-white font-mono font-bold text-xs text-xs">razorpay</div>
                  )}
                  <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-wide">Secured TLS 1.3 Endpoints</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 text-[10px] block">Sum Payable</span>
                  <span className="font-mono font-bold text-xs text-zinc-900">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Form simulated payment */}
              <form onSubmit={(e) => { e.preventDefault(); handleAuthorizePayment('success'); }} className="space-y-4">
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Name on Card</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g. Anil Rathod"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Secure Account Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="4242 •••• •••• 4242"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Expiration Date</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="MM / YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">CVV / Security Code</label>
                    <input 
                      type="password" 
                      required 
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {isProcessingPayment ? (
                  <button 
                    disabled 
                    className="w-full bg-zinc-900 text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing credit card...</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button 
                      type="submit" 
                      className="w-full bg-zinc-950 hover:bg-zinc-850 text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Authorize Payment - Demo Success</span>
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => handleAuthorizePayment('fail')}
                      className="w-full border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Decline Card - Demo Failure</span>
                    </button>
                  </div>
                )}

              </form>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[9px] text-zinc-400 uppercase font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Encrypted 256-bit AES connection</span>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 6: PAYMENT SUCCESSFUL TRANSITION PAGE */}
        {checkoutStep === 'placed_success' && recentPlacedOrder && (
          <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-3xl p-6 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-base font-bold text-zinc-900 tracking-tight">Order Placed Successfully!</h2>
              <p className="text-xs text-zinc-500 mt-1">Transaction confirmed. Standard confirmation notifications have been triggered.</p>
            </div>

            <div className="bg-zinc-50 border p-4 rounded-xl text-left space-y-2 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-zinc-500">Receipt Code:</span>
                <span className="font-bold text-zinc-850">{recentPlacedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-zinc-500">Transaction ID:</span>
                <span className="font-bold text-zinc-850">{recentPlacedOrder.paymentId}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-zinc-500">Payment Gateway:</span>
                <span className="font-bold text-zinc-850">{recentPlacedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between font-mono border-t border-zinc-250 border-zinc-200 pt-2">
                <span className="text-zinc-900 font-bold">Total Settled:</span>
                <span className="font-bold text-indigo-700">${recentPlacedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-xs text-zinc-400 font-mono text-left bg-zinc-950 text-emerald-400 p-3 rounded-lg flex items-start gap-1">
              <span>🚀 Trace Status in Database: Active (Pending Confirmation dispatch). Order routing is fully simulated.</span>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setCheckoutStep('shop')}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-2.5 rounded-lg text-xs"
              >
                Return to Product Index
              </button>
            </div>
          </div>
        )}

        {/* VIEW 7: PAYMENT FAILURE TRANSITION PAGE */}
        {checkoutStep === 'placed_failure' && (
          <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-3xl p-6 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-base font-bold text-zinc-900 tracking-tight">Payment Authorization Error!</h2>
              <p className="text-xs text-zinc-500 mt-1">Stripe / Razorpay API returned status [DECLINED_INSUFFICIENT_FUNDS_OR_MISMATCH].</p>
            </div>

            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-left text-xs text-rose-800 space-y-1.5 leading-relaxed">
              <p className="font-semibold">Possible Root Causes:</p>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>CVV security credentials mismatch inside simulated database mapping</li>
                <li>Credit limit surpassed on testing account</li>
                <li>Sandbox environment configuration variable expired</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setCheckoutStep('checkout')}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 py-2.5 rounded-lg text-xs font-semibold"
              >
                Adjust Address/Gateway
              </button>
              <button 
                onClick={() => setCheckoutStep('payment')}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
              >
                Re-submit Gateway Authorized Card
              </button>
            </div>
          </div>
        )}

      </div>

      {/* QUICK VIEW DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border text-zinc-900 border-zinc-200 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
            
            {/* Modal photo */}
            <div className="h-56 bg-zinc-50 relative flex-shrink-0">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-3 right-3 bg-white/80 hover:bg-white text-zinc-800 p-1.5 rounded-full z-10"
                id="close-product-modal"
              >
                <b>X</b>
              </button>
              <div className="absolute bottom-3 left-3 bg-zinc-950/85 text-white py-1 px-2 text-[10px] font-mono rounded">
                {selectedProduct.brand} / {selectedProduct.category}
              </div>
            </div>

            {/* Content Tabs headers */}
            <div className="flex border-b border-zinc-100 text-xs text-zinc-700 font-semibold flex-shrink-0 bg-zinc-50">
              <button 
                onClick={() => setDetailsTab('info')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${detailsTab === 'info' ? 'border-zinc-950 text-zinc-950 bg-white font-bold' : 'border-transparent hover:text-zinc-950'}`}
              >
                Stock & Details
              </button>
              <button 
                onClick={() => setDetailsTab('reviews')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${detailsTab === 'reviews' ? 'border-zinc-950 text-zinc-950 bg-white font-bold' : 'border-transparent hover:text-zinc-950'}`}
              >
                <span>User Reviews</span>
                <span className="font-mono bg-zinc-200 px-1.5 rounded-full text-[10px]">
                  {(productReviews[selectedProduct.id] || []).length}
                </span>
              </button>
            </div>

            {/* Tab contents */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {detailsTab === 'info' ? (
                <div className="space-y-3 text-xs leading-relaxed">
                  <h3 className="text-zinc-900 font-bold font-sans text-sm">{selectedProduct.name}</h3>
                  <p className="text-zinc-650 text-zinc-605">{selectedProduct.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 bg-zinc-100 p-3 rounded-lg font-mono">
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase block font-bold">Standard Price</span>
                      <span className="text-zinc-900 font-bold font-mono">${selectedProduct.price.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase block font-bold">Warehouse Stock</span>
                      <span className="text-zinc-900 font-bold font-mono">{selectedProduct.stock} units available</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (selectedProduct.stock > 0) {
                        onAddToCart(selectedProduct);
                        onTriggerNotification(
                          "Added to Basket!",
                          `Item "${selectedProduct.name}" has been placed in your active shopping cart.`,
                          'sms',
                          'Anil Rathod'
                        );
                        setSelectedProduct(null);
                      }
                    }}
                    disabled={selectedProduct.stock <= 0}
                    className="w-full bg-zinc-955 bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
                  >
                    Add to Shop Basket
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  
                  {/* Reviews lists */}
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {(productReviews[selectedProduct.id] || []).map((r) => (
                      <div key={r.id} className="p-2.5 bg-zinc-50 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-zinc-900 font-sans">{r.author}</span>
                          <span className="text-zinc-400 font-mono text-[9px]">{r.date}</span>
                        </div>
                        <div className="flex items-center text-amber-500 my-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-amber-500 text-amber-500' : 'text-zinc-200'}`} />
                          ))}
                        </div>
                        <p className="text-zinc-650 text-zinc-600 mt-1 leading-relaxed">{r.comment}</p>
                      </div>
                    ))}
                    {(productReviews[selectedProduct.id] || []).length === 0 && (
                      <p className="text-center text-zinc-400 py-6">Be the first to review this product!</p>
                    )}
                  </div>

                  {/* Add review form */}
                  <form onSubmit={handleAddReview} className="border-t border-zinc-150 border-zinc-100 pt-3 flex flex-col gap-2.5">
                    <h4 className="text-[10px] font-mono uppercase font-bold text-zinc-400">Add Product Review</h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        required 
                        placeholder="Your full name"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="bg-zinc-50 border text-xs px-2.5 py-1.5 rounded focus:outline-none placeholder-zinc-400"
                      />
                      
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-zinc-400 font-mono">Rating:</span>
                        <select 
                          value={newReviewRating} 
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="bg-zinc-50 border text-xs px-1.5 py-1 rounded"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                    </div>

                    <textarea 
                      required 
                      rows={2}
                      placeholder="Comment on product acoustics, weight, battery durability..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="bg-zinc-50 border text-xs px-2.5 py-1.5 rounded focus:outline-none placeholder-zinc-400 resize-none"
                    />

                    <button 
                      type="submit" 
                      className="bg-zinc-950 hover:bg-zinc-850 text-white text-[10px] font-mono uppercase font-bold py-1.5 rounded"
                    >
                      Post Review
                    </button>
                  </form>

                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
