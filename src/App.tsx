import { useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANDS, INITIAL_REVIEWS, DEFAULT_ADDRESSES 
} from './data';
import { 
  Product, Category, Brand, CartItem, WishlistItem, Address, Order, OrderStatus, Notification 
} from './types';
import { StorefrontView } from './components/StorefrontView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { CodeBlueprintView } from './components/CodeBlueprintView';
import { NotificationToast } from './components/NotificationToast';
import { 
  Hammer, ShoppingBag, BarChart3, Binary, Mail, MessageSquare, AlertCircle, Sparkles, Server, FolderClosed
} from 'lucide-react';

export default function App() {
  // 1. Core State with LocalStorage syncing for durable progression
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ecom_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('ecom_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [brands] = useState<Brand[]>(INITIAL_BRANDS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ecom_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('ecom_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('ecom_addresses');
    return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ecom_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('ecom_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-welcome',
        title: 'Authentication Verification Dispatch',
        message: 'Email confirmation dispatch processed successfully for new Customer: anilrathod.AR716@gmail.com.',
        type: 'email',
        timestamp: '15:03:12',
        recipient: 'anilrathod.AR716@gmail.com'
      }
    ];
  });

  // Active Workspace: 'storefront' | 'admin' | 'blueprints'
  const [activeTab, setActiveTab] = useState<'storefront' | 'admin' | 'blueprints'>('storefront');

  // Trigger LocalStorage Syncs
  useEffect(() => {
    localStorage.setItem('ecom_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ecom_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('ecom_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ecom_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ecom_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('ecom_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ecom_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // 2. Action Logic Handler Definitions
  
  // Shopping cart managers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1
        };
        return updated;
      }
      return [...prev, { id: `cart-${Date.now()}`, product, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === productId);
      if (existingIdx === -1) return prev;

      const updated = [...prev];
      const newQty = updated[existingIdx].quantity + quantity;

      if (newQty <= 0) {
        updated.splice(existingIdx, 1);
      } else {
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty
        };
      }
      return updated;
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist managers
  const handleAddToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev;
      return [...prev, { id: `wish-${Date.now()}`, product }];
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleRemoveFromWishlist(product.id);
    handleAddToCart(product);
  };

  // Address listings managers
  const handleAddAddress = (address: Address) => {
    setAddresses((prev) => {
      if (address.isDefault) {
        // Set all others to false
        return prev.map((a) => ({ ...a, isDefault: false })).concat(address);
      }
      return [...prev, address];
    });
  };

  // Order queues managers
  const handlePlaceOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);

    // Adjust physical product stocks inside database
    setProducts((prevProds) => {
      return prevProds.map((p) => {
        const orderItem = order.items.find((item) => item.productId === p.id);
        if (orderItem) {
          return {
            ...p,
            stock: Math.max(0, p.stock - orderItem.quantity)
          };
        }
        return p;
      });
    });

    // Reset shopping cart
    setCart([]);
  };

  // Status updates (Admin capability)
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      return prev.map((o) => {
        if (o.id === orderId) {
          return { ...o, status };
        }
        return o;
      });
    });
  };

  // Product CRUD (Admin capability)
  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const handleUpdateProduct = (product: Product) => {
    setProducts((prev) => {
      return prev.map((p) => (p.id === product.id ? product : p));
    });
  };

  const onDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Category CRUD
  const handleAddCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  // Notifications server dispatcher
  const handleTriggerNotification = (
    title: string,
    message: string,
    type: 'email' | 'sms',
    recipient: string
  ) => {
    const norm: Notification = {
      id: `norm-${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      recipient
    };
    setNotifications((prev) => [norm, ...prev]);
  };

  const handleClearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((norm) => norm.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans select-none antialiased">
      
      {/* Dynamic Header Workspace Selectors */}
      <header className="bg-zinc-900 border-b border-zinc-805 border-zinc-800 text-white flex flex-col md:flex-row justify-between items-center px-6 py-4.5 gap-4 shadow-md flex-shrink-0">
        
        {/* Core Project Visual Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl text-white flex items-center justify-center shadow-lg shadow-indigo-650/40">
            <Hammer className="w-5 h-5" id="nav-brand-hammer" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-base font-sans">ASP.NET Core E-Commerce Workspace</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">v8.0 MVC + API</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">High fidelity dynamic simulation coupled with structured .NET code blueprint generators</p>
          </div>
        </div>

        {/* Global tab routing */}
        <div className="flex items-center bg-zinc-950 p-1 rounded-2xl border border-zinc-800 shadow-inner w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('storefront')}
            className={`flex-1 md:flex-none px-4.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === 'storefront' ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer view</span>
          </button>

          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex-1 md:flex-none px-4.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
            id="workspace-admin-tab"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Admin center</span>
          </button>

          <button 
            onClick={() => setActiveTab('blueprints')}
            className={`flex-1 md:flex-none px-4.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === 'blueprints' ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
            id="workspace-code-tab"
          >
            <Binary className="w-4 h-4" />
            <span>Code blueprint studio</span>
          </button>
        </div>

      </header>

      {/* Enterprise Architecture Status Sub-Header Bar */}
      <div className="bg-white border-b border-zinc-200 flex flex-col sm:flex-row items-center justify-between px-6 py-3.5 gap-3 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Clean Architecture / Repository / UnitOfWork</span>
          <span className="text-zinc-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-medium border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>SQL Server: Connected</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-[11px] font-medium border border-indigo-100">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            <span>Swagger REST Routing: Active</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative p-1 bg-zinc-50 rounded-lg border border-zinc-200">
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
            <span className="text-[11px] font-bold text-zinc-500 px-1">SYSTEM OK</span>
          </div>
          <div className="text-[10px] font-mono bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded font-bold text-zinc-650 tracking-tight">
            JWT_IDENTITY_KEY: ISSUED & VALID
          </div>
        </div>
      </div>

      {/* Primary Display Area */}
      <main className="flex-1 flex flex-col relative">
        
        {/* Workspace 1: Customer storefront */}
        {activeTab === 'storefront' && (
          <StorefrontView 
            products={products}
            categories={categories}
            brands={brands}
            cart={cart}
            wishlist={wishlist}
            addresses={addresses}
            orders={orders}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onAddToWishlist={handleAddToWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onMoveWishlistToCart={handleMoveWishlistToCart}
            onAddAddress={handleAddAddress}
            onPlaceOrder={handlePlaceOrder}
            onTriggerNotification={handleTriggerNotification}
          />
        )}

        {/* Workspace 2: Admin management center */}
        {activeTab === 'admin' && (
          <AdminDashboardView 
            products={products}
            categories={categories}
            brands={brands}
            orders={orders}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onTriggerNotification={handleTriggerNotification}
          />
        )}

        {/* Workspace 3: Clean Architecture .NET Code Studio */}
        {activeTab === 'blueprints' && (
          <CodeBlueprintView />
        )}

      </main>

      {/* LIVE TRANSACTIONS COMMUNICATION INBOX FEED PANEL (Fidelity feature) */}
      <footer className="bg-zinc-950 border-t border-zinc-850 border-zinc-800 text-zinc-400 px-6 py-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 flex-shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Virtual SMTP & SMS Routing Terminal</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
            Placing orders or modifying order status variables triggers notifications to simulated communication endpoints instantly.
          </p>
        </div>

        {/* Recent logs viewer */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto font-mono text-[10px]">
          <span className="text-[9px] uppercase font-bold text-zinc-650 text-indigo-400 font-bold tracking-widest block w-full lg:w-auto lg:mb-0">Mailroom Logs:</span>
          {notifications.slice(0, 2).map((norm) => (
            <div 
              key={norm.id} 
              className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 flex items-center gap-2 max-w-xs truncate"
              title={norm.message}
            >
              {norm.type === 'email' ? <Mail className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" /> : <MessageSquare className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
              <span className="font-bold text-zinc-300 truncate">{norm.title}</span>
              <span className="text-[9px] text-zinc-500 text-zinc-550 flex-shrink-0">{norm.timestamp}</span>
            </div>
          ))}
          {notifications.length === 0 && (
            <span className="text-zinc-600 font-sans text-xs">No active mail logs sent. Make a purchase to dispatch notification SMTP seeds!</span>
          )}
        </div>
      </footer>

      {/* Dynamic Popups Overlay container */}
      <NotificationToast 
        notifications={notifications}
        onClear={handleClearNotification}
        onClearAll={handleClearAllNotifications}
      />

    </div>
  );
}
