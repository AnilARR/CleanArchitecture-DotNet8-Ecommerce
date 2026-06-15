import React, { useState } from 'react';
import { 
  Users, ShoppingCart, DollarSign, Package, AlertTriangle, TrendingUp, 
  Edit, Trash2, Plus, X, Check, ArrowUpRight, BarChart4, FolderEdit, ClipboardCheck, Sparkles, Send
} from 'lucide-react';
import { Product, Category, Brand, Order, OrderStatus } from '../types';

interface AdminDashboardViewProps {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onTriggerNotification: (title: string, message: string, type: 'email' | 'sms', recipient: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  products,
  categories,
  brands,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCategory,
  onDeleteCategory,
  onUpdateOrderStatus,
  onTriggerNotification
}) => {
  // Tab control states: 'dashboard' | 'products' | 'categories' | 'orders'
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'categories' | 'orders'>('dashboard');

  // Product CRUD inputs
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form fields
  const [pName, setPName] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pStock, setPStock] = useState('');
  const [pCategory, setPCategory] = useState(categories[0]?.name || '');
  const [pBrand, setPBrand] = useState(brands[0]?.name || '');
  const [pDesc, setPDesc] = useState('');
  const [pImageUrl, setPImageUrl] = useState('');

  // Category CRUD inputs
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Calculated KPIs
  const totalCustomers = 42; // static seeded representation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => o.status !== OrderStatus.Cancelled ? sum + o.totalAmount : sum, 0);
  const lowStockCount = products.filter(p => p.stock <= 10).length;

  // Active status changes
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    onUpdateOrderStatus(orderId, newStatus);
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    // Trigger Notifications accordingly
    if (newStatus === OrderStatus.Shipped) {
      onTriggerNotification(
        "Shipping Update: OUT FOR DELIVERY! 🚚",
        `Order ${targetOrder.orderNumber} is now handled by shipping agent. Delivery anticipated inside 24-48 business hours. Track with token ${targetOrder.paymentId}.`,
        'email',
        'anilrathod.AR716@gmail.com'
      );
      onTriggerNotification(
        "Courier Dispatched! 📱",
        `Tracking code activated for Order ${targetOrder.orderNumber}. Out for route dispatch. Courier agent: Professional Express.`,
        'sms',
        targetOrder.shippingAddress.phone
      );
    } else if (newStatus === OrderStatus.Delivered) {
      onTriggerNotification(
        "Order Delivered Successfully! ✅",
        `Our courier agent confirms consignment delivery of Order ${targetOrder.orderNumber} at your registered address. Thank you for shopping!`,
        'email',
        'anilrathod.AR716@gmail.com'
      );
    } else if (newStatus === OrderStatus.Cancelled) {
      onTriggerNotification(
        "Order Cancellation Alert 🔴",
        `Merchant processed cancellation on Order ${targetOrder.orderNumber}. Reversal refund of $${targetOrder.totalAmount.toFixed(2)} credited back to gateway.`,
        'email',
        'anilrathod.AR716@gmail.com'
      );
    }
  };

  // Product submission
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pPrice || !pStock || !pDesc) return;

    const priceNum = parseFloat(pPrice);
    const stockNum = parseInt(pStock);

    if (editingProduct) {
      // Update
      const updated: Product = {
        ...editingProduct,
        name: pName,
        price: priceNum,
        stock: stockNum,
        category: pCategory,
        brand: pBrand,
        description: pDesc,
        imageUrl: pImageUrl || 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=500&q=80'
      };
      onUpdateProduct(updated);
    } else {
      // Create new
      const created: Product = {
        id: `p-${Date.now()}`,
        name: pName,
        slug: pName.toLowerCase().replace(/ /g, '-'),
        price: priceNum,
        stock: stockNum,
        category: pCategory,
        brand: pBrand,
        description: pDesc,
        imageUrl: pImageUrl || 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=500&q=80',
        images: [],
        rating: 5.0,
        reviewsCount: 0
      };
      onAddProduct(created);
    }

    // Reset fields
    setShowProductModal(false);
    setEditingProduct(null);
    setPName('');
    setPPrice('');
    setPStock('');
    setPDesc('');
    setPImageUrl('');
  };

  // Open modal for editing
  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setPName(prod.name);
    setPPrice(prod.price.toString());
    setPStock(prod.stock.toString());
    setPCategory(prod.category);
    setPBrand(prod.brand);
    setPDesc(prod.description);
    setPImageUrl(prod.imageUrl);
    setShowProductModal(true);
  };

  // Open modal for creating new
  const openCreateProduct = () => {
    setEditingProduct(null);
    setPName('');
    setPPrice('');
    setPStock('');
    setPCategory(categories[0]?.name || 'Electronics');
    setPBrand(brands[0]?.name || 'ZenithTech');
    setPDesc('');
    setPImageUrl('');
    setShowProductModal(true);
  };

  // Category addition
  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatDesc) return;

    const created: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/ /g, '-'),
      description: newCatDesc
    };

    onAddCategory(created);
    setNewCatName('');
    setNewCatDesc('');
  };

  return (
    <div className="w-full bg-zinc-50 min-h-screen text-zinc-900 font-sans flex flex-col">
      
      {/* Top Admin Controls Bar */}
      <div className="bg-zinc-950 text-white flex justify-between items-center px-6 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 text-amber-400 rounded-lg">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold tracking-tight font-mono">ADMIN CONTROL CENTER</h2>
            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mt-0.5">Role Authorization: Admin Portal</p>
          </div>
        </div>

        {/* Tab Controls for Admin panel */}
        <div className="flex bg-zinc-900 border border-zinc-850 border-zinc-805 rounded-xl border-zinc-800 p-1 gap-1">
          <button 
            onClick={() => setAdminTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${adminTab === 'dashboard' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Metrics
          </button>
          <button 
            onClick={() => setAdminTab('products')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${adminTab === 'products' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Catalog
          </button>
          <button 
            onClick={() => setAdminTab('categories')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${adminTab === 'categories' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Categories
          </button>
          <button 
            onClick={() => setAdminTab('orders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${adminTab === 'orders' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
            id="admin-orders-tab"
          >
            Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* Main Admin Contents */}
      <div className="flex-1 p-6">
        
        {/* VIEW 1: ADMIN METRICS DASHBOARD */}
        {adminTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* KPI count Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="bg-white border rounded-xl p-4 shadow-sm relative overflow-hidden">
                <div className="text-zinc-400 p-1.5 bg-zinc-50 rounded-lg absolute top-4 right-4">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Total Customers</span>
                <p className="text-xl font-bold font-mono text-zinc-900 mt-1">{totalCustomers}</p>
                <span className="text-[9px] text-zinc-400 font-mono mt-1 block">✔ Standard Consumers</span>
              </div>

              <div className="bg-white border rounded-xl p-4 shadow-sm relative overflow-hidden">
                <div className="text-zinc-400 p-1.5 bg-zinc-50 rounded-lg absolute top-4 right-4">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Total Orders</span>
                <p className="text-xl font-bold font-mono text-zinc-900 mt-1">{totalOrders}</p>
                <span className="text-[9px] text-emerald-600 font-mono mt-1 block font-bold">▲ +12% this week</span>
              </div>

              <div className="bg-white border rounded-xl p-4 shadow-sm relative overflow-hidden">
                <div className="text-zinc-400 p-1.5 bg-zinc-50 rounded-lg absolute top-4 right-4">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Total Revenue</span>
                <p className="text-xl font-bold font-mono text-indigo-750 text-indigo-700 mt-1">${totalRevenue.toFixed(2)}</p>
                <span className="text-[9px] text-zinc-400 font-mono mt-1 block">Live Settlement Accounts</span>
              </div>

              <div className="bg-white border rounded-xl p-4 shadow-sm relative overflow-hidden">
                <div className="text-zinc-400 p-1.5 bg-zinc-50 rounded-lg absolute top-4 right-4">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Products SKU</span>
                <p className="text-xl font-bold font-mono text-zinc-900 mt-1">{totalProducts}</p>
                <span className="text-[9px] text-zinc-400 font-mono mt-1 block">Active across 4 clusters</span>
              </div>

              <div className="bg-white border border-rose-100 rounded-xl p-4 shadow-sm relative overflow-hidden col-span-2 lg:col-span-1">
                <div className="text-rose-500 p-1.5 bg-rose-50 rounded-lg absolute top-4 right-4">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase text-rose-600 font-bold">Low Inventories</span>
                <p className="text-xl font-bold font-mono text-rose-600 mt-1">{lowStockCount}</p>
                <span className="text-[9px] text-rose-505 text-rose-500 font-mono mt-1 block font-bold">⚠️ Action required</span>
              </div>

            </div>

            {/* Visual Reports Section (SVG custom charting for performance) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sales Revenue report */}
              <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-zinc-800" />
                    <h3 className="text-xs font-extrabold text-zinc-900 font-mono uppercase">Sales Revenue Tracking</h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Quarterly Breakdown</span>
                </div>

                {/* SVG plot */}
                <div className="h-44 flex items-end gap-6 pt-6 font-mono text-xs w-full max-w-sm mx-auto">
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-zinc-200 hover:bg-zinc-900 rounded-t h-28 relative group transition-colors">
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 font-bold">$12,040</div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500">March</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-zinc-250 bg-zinc-200 hover:bg-zinc-900 rounded-t h-32 relative group transition-colors">
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 font-bold">$15,920</div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500">April</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-zinc-200 hover:bg-zinc-900 rounded-t h-20 relative group transition-colors">
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 font-bold">$9,160</div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500">May</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-zinc-950 rounded-t h-36 relative group">
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[9px] px-1.5 py-0.5 rounded font-bold shadow-md">$21,800</div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-950 font-extrabold">June (Live)</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 text-[10px] text-zinc-400 font-mono flex items-center justify-between">
                  <span>Aggregated SQL query speed: 2ms</span>
                  <span>Currency: USD</span>
                </div>
              </div>

              {/* Categorization allocation report */}
              <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart4 className="w-4 h-4 text-zinc-800" />
                    <h3 className="text-xs font-extrabold text-zinc-900 font-mono uppercase">Category Volume Share</h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Total Items in Catalog</span>
                </div>

                {/* Listing of categories with percentages bars */}
                <div className="space-y-3.5 pt-2">
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-zinc-800">
                      <span>Audio Engineering Devices</span>
                      <span className="font-mono">45%</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded mt-1 overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-zinc-800">
                      <span>Wearables & Wrist Sensors</span>
                      <span className="font-mono">25%</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded mt-1 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded" style={{ width: '25%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-zinc-800">
                      <span>Keyboards & Tech Desks</span>
                      <span className="font-mono">18%</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded mt-1 overflow-hidden">
                      <div className="bg-zinc-855 bg-zinc-800 h-full rounded" style={{ width: '18%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-zinc-800">
                      <span>Other Accessories</span>
                      <span className="font-mono">12%</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-2 rounded mt-1 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Low inventory alert listing */}
            <div className="bg-white border rounded-xl p-5">
              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">Warehouse Stock Replenishment Prompts</h3>
              <div className="flex flex-col gap-2">
                {products.filter(p => p.stock <= 10).map((p) => (
                  <div key={p.id} className="flex justify-between items-center bg-rose-50 border border-rose-100 p-3 rounded-lg text-xs hover:bg-rose-100/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      <span className="font-semibold text-zinc-900">{p.name}</span>
                      <span className="bg-rose-100 text-rose-800 text-[10px] px-1.5 py-0.5 rounded font-bold">{p.brand}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-rose-700 font-bold">Only {p.stock} counts currently remaining</span>
                      <button 
                        onClick={() => openEditProduct(p)}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] px-2.5 py-1 rounded font-bold"
                      >
                        Replenish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: PRODUCT CRUD CATALOG LIST */}
        {adminTab === 'products' && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-xs font-extrabold text-zinc-900 font-mono uppercase">Full SKU Products Database</h3>
              <button 
                onClick={openCreateProduct}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse font-sans">
                <thead className="bg-zinc-50 border-b border-zinc-150 border-zinc-200 text-[10px] uppercase font-mono font-bold text-zinc-500">
                  <tr>
                    <th scope="col" className="p-3.5">Product Name</th>
                    <th scope="col" className="p-3.5">Category</th>
                    <th scope="col" className="p-3.5">Brand</th>
                    <th scope="col" className="p-3.5">Price</th>
                    <th scope="col" className="p-3.5">Warehouse Stock</th>
                    <th scope="col" className="p-3.5 text-right pr-6">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-xs">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <img src={p.imageUrl} alt={p.name} className="w-8 h-8 rounded border object-cover" />
                          <span className="font-semibold text-zinc-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-zinc-650 text-zinc-600 font-semibold">{p.category}</td>
                      <td className="p-3 text-zinc-400 font-mono uppercase font-bold">{p.brand}</td>
                      <td className="p-3 font-semibold font-mono text-zinc-900">${p.price.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`font-mono px-2 py-0.5 rounded font-bold ${p.stock <= 10 ? 'bg-rose-50 text-rose-700' : 'bg-zinc-100 text-zinc-700'}`}>
                          {p.stock} count
                        </span>
                      </td>
                      <td className="p-3 text-right pr-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => openEditProduct(p)}
                            className="p-1 text-indigo-650 hover:bg-indigo-50 rounded"
                            title="Edit details"
                          >
                            <Edit className="w-3.5 h-3.5 text-indigo-600" />
                          </button>
                          <button 
                            onClick={() => {
                              onDeleteProduct(p.id);
                              onTriggerNotification(
                                "Purged Item!",
                                `Purged "${p.name}" from backend repository listings.`,
                                'sms',
                                'Anil Rathod'
                              );
                            }}
                            className="p-1 text-rose-550 hover:bg-rose-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* VIEW 3: CATEGORIES CRUD MANAGEMENT */}
        {adminTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Category creation form */}
            <div className="md:col-span-4 bg-white border rounded-xl p-5 max-h-fit space-y-4">
              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider pb-1.5 border-b">Create New Category</h3>
              
              <form onSubmit={handleAddCategorySubmit} className="space-y-3 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-zinc-500">Category Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="E.g. Gaming Gear"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-zinc-500">Full Description</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Provide details on target markets and associated item clusters..."
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none placeholder-zinc-400 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-2 bg-zinc-950 text-white font-semibold rounded text-xs"
                >
                  Create Category Listing
                </button>
              </form>
            </div>

            {/* Right Category List database */}
            <div className="md:col-span-8 space-y-3">
              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider pb-1.5 border-b">Active categories database</h3>
              
              <div className="grid grid-cols-1 gap-3">
                {categories.map((c) => (
                  <div key={c.id} className="bg-white border rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">{c.name}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{c.description}</p>
                      <span className="font-mono text-[9px] text-zinc-400 bg-zinc-50 py-0.5 px-2.5 rounded border border-zinc-150 inline-block mt-2 font-bold uppercase">{c.slug}</span>
                    </div>

                    <button 
                      onClick={() => onDeleteCategory(c.id)}
                      disabled={categories.length <= 1}
                      className="p-1.5 text-rose-500 hover:text-rose-700 bg-rose-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 4: ACTIVE ORDERS CHANGE STATUS QUEUE */}
        {adminTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider border-b pb-2">Active customer orders queue</h3>
            
            {orders.length === 0 ? (
              <div className="bg-white border p-12 text-center rounded-xl space-y-2">
                <Users className="w-12 h-12 text-zinc-300 mx-auto" />
                <h4 className="text-xs font-bold text-zinc-800">No active customer orders currently live</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">Place sample orders using the Customer Storefront to track them in this dashboard.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Items summaries */}
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono font-bold text-zinc-900">{o.orderNumber}</span>
                        <span className="text-zinc-400 font-mono">/</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold bg-zinc-50 rounded px-1.5 py-0.5">{o.createdAt}</span>
                      </div>
                      
                      <div className="text-zinc-650 flex flex-wrap gap-1 leading-relaxed">
                        {o.items.map((i, idx) => (
                          <span key={idx} className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap">
                            {i.productName} (x{i.quantity})
                          </span>
                        ))}
                      </div>

                      <div className="text-[10px] text-zinc-500">
                        📍 Ship address: <b>{o.shippingAddress.fullName}</b>, {o.shippingAddress.city}, {o.shippingAddress.state}, {o.shippingAddress.zipCode}
                      </div>
                    </div>

                    {/* Order cost & controls */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 md:gap-1.5 pt-2 md:pt-0 border-t border-dashed md:border-0">
                      
                      <div className="text-left md:text-right">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase font-bold">Total Settled</span>
                        <span className="font-mono font-bold text-sm text-indigo-755 text-indigo-700">${o.totalAmount.toFixed(2)}</span>
                      </div>

                      {/* Dropdown status selector */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">Status:</span>
                        <select 
                          value={o.status} 
                          onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                          className="bg-zinc-50 border text-xs py-1 px-2.5 rounded font-bold font-mono focus:outline-none focus:ring-1 focus:ring-zinc-950"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* CREATE & EDIT PRODUCTS CRUD DIALOG */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <form 
            onSubmit={handleProductSubmit} 
            className="bg-white border text-zinc-900 border-zinc-200 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col"
          >
            
            <div className="bg-zinc-50 p-4 border-b flex justify-between items-center bg-zinc-950 text-white rounded-t-2xl">
              <h3 className="font-bold text-xs uppercase tracking-wider font-mono">
                {editingProduct ? 'Update SKU product details' : 'Configure New Catalog item'}
              </h3>
              <button 
                type="button" 
                onClick={() => setShowProductModal(false)}
                className="bg-zinc-800 p-1.5 rounded-full hover:bg-zinc-700"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-4 space-y-3.5 text-xs">
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Product Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Zenith Pro smart clock..."
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-35 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Category Selection</label>
                  <select 
                    value={pCategory} 
                    onChange={(e) => setPCategory(e.target.value)}
                    className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Brand Designation</label>
                  <select 
                    value={pBrand} 
                    onChange={(e) => setPBrand(e.target.value)}
                    className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 col-span-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Standard Price ($)</label>
                  <input 
                    type="number" 
                    required
                    step="0.01"
                    placeholder="120.00"
                    value={pPrice}
                    onChange={(e) => setPPrice(e.target.value)}
                    className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Stock Count</label>
                  <input 
                    type="number" 
                    required
                    placeholder="45"
                    value={pStock}
                    onChange={(e) => setPStock(e.target.value)}
                    className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-mono font-bold text-zinc-500 font-mono">Illustrative Image URL (Unsplash)</label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/photo-..."
                  value={pImageUrl}
                  onChange={(e) => setPImageUrl(e.target.value)}
                  className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none text-zinc-650"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-mono font-bold text-zinc-500 col-span-2">Full Description</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Detail product acoustics, technical materials, warranty setups..."
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  className="bg-zinc-50 border text-xs px-3 py-2 rounded focus:outline-none placeholder-zinc-400 resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-zinc-950 text-white font-semibold py-2.5 rounded-lg text-xs hover:bg-zinc-850 mt-1"
              >
                {editingProduct ? 'Save Updated Product' : 'Create System SKU Card'}
              </button>

            </div>

          </form>
        </div>
      )}

    </div>
  );
};
