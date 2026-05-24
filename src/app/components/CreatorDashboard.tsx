import { Globe, Package, DollarSign, TrendingUp, Eye, Plus, Settings, LogOut, BarChart3, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, PageType } from '../types';

type CreatorDashboardProps = {
  user: User;
  onNavigate: (page: PageType) => void;
};

export function CreatorDashboard({ user, onNavigate }: CreatorDashboardProps) {
  const mockStats = {
    totalProducts: 24,
    totalSales: 156,
    revenue: 12450,
    views: 3420
  };

  const mockOrders = [
    { id: '1', product: 'Traditional Malawian Hat', customer: 'Sarah J.', amount: 45, status: 'In Production', date: '2 days ago' },
    { id: '2', product: 'Woven Scarf', customer: 'Michael C.', amount: 35, status: 'Shipped', date: '5 days ago' },
    { id: '3', product: 'Traditional Basket', customer: 'Emma W.', amount: 60, status: 'Delivered', date: '1 week ago' }
  ];

  const mockProducts = [
    { id: '1', name: 'Traditional Malawian Hat', price: 45, stock: 12, sales: 34, status: 'Active' },
    { id: '2', name: 'Woven Scarf', price: 35, stock: 8, sales: 28, status: 'Active' },
    { id: '3', name: 'Traditional Basket', price: 60, stock: 5, sales: 15, status: 'Active' },
    { id: '4', name: 'Handmade Jewelry', price: 25, stock: 0, sales: 42, status: 'Out of Stock' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <Globe className="w-8 h-8 text-purple-600" />
              <span className="text-purple-600">Begeto</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => onNavigate('marketplace')}>
                <ShoppingBag className="w-4 h-4 mr-2" />
                View Marketplace
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('home')}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r min-h-screen sticky top-16">
          <div className="p-6">
            <div className="mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-purple-600">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-gray-900">{user.name}</h3>
              <p className="text-gray-600">Creator Account</p>
            </div>

            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-purple-50 text-purple-600">
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600">
                <Package className="w-5 h-5" />
                <span>Products</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600">
                <ShoppingBag className="w-5 h-5" />
                <span>Orders</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600">
                <DollarSign className="w-5 h-5" />
                <span>Earnings</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-gray-600">Here's what's happening with your store today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <Package className="w-8 h-8 text-purple-600" />
                  <Badge variant="secondary">+12%</Badge>
                </div>
                <p className="text-gray-600 mb-1">Total Products</p>
                <h3 className="text-gray-900">{mockStats.totalProducts}</h3>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <ShoppingBag className="w-8 h-8 text-green-600" />
                  <Badge variant="secondary">+8%</Badge>
                </div>
                <p className="text-gray-600 mb-1">Total Sales</p>
                <h3 className="text-gray-900">{mockStats.totalSales}</h3>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                  <Badge variant="secondary">+15%</Badge>
                </div>
                <p className="text-gray-600 mb-1">Revenue</p>
                <h3 className="text-gray-900">${mockStats.revenue.toLocaleString()}</h3>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-8 h-8 text-orange-600" />
                  <Badge variant="secondary">+23%</Badge>
                </div>
                <p className="text-gray-600 mb-1">Profile Views</p>
                <h3 className="text-gray-900">{mockStats.views.toLocaleString()}</h3>
              </Card>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card className="p-6">
                    <h3 className="text-gray-900 mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                      {mockOrders.map(order => (
                        <div key={order.id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                          <div className="flex-1">
                            <p className="text-gray-900">{order.product}</p>
                            <p className="text-gray-600">{order.customer} • {order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-900">${order.amount}</p>
                            <Badge
                              variant={
                                order.status === 'Delivered' ? 'default' :
                                order.status === 'Shipped' ? 'secondary' : 'outline'
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Top Products */}
                  <Card className="p-6">
                    <h3 className="text-gray-900 mb-4">Top Selling Products</h3>
                    <div className="space-y-4">
                      {mockProducts.slice(0, 3).map((product, index) => (
                        <div key={product.id} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-600">#{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">{product.name}</p>
                            <p className="text-gray-600">{product.sales} sales</p>
                          </div>
                          <p className="text-gray-900">${product.price}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Performance Chart Placeholder */}
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4">Sales Performance</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">Sales chart would be displayed here</p>
                      <p className="text-gray-400">Using a charting library like Recharts</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="products">
                <Card className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-gray-900">Product</th>
                          <th className="text-left py-3 px-4 text-gray-900">Price</th>
                          <th className="text-left py-3 px-4 text-gray-900">Stock</th>
                          <th className="text-left py-3 px-4 text-gray-900">Sales</th>
                          <th className="text-left py-3 px-4 text-gray-900">Status</th>
                          <th className="text-right py-3 px-4 text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockProducts.map(product => (
                          <tr key={product.id} className="border-b last:border-b-0 hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-900">{product.name}</td>
                            <td className="py-3 px-4 text-gray-600">${product.price}</td>
                            <td className="py-3 px-4 text-gray-600">{product.stock}</td>
                            <td className="py-3 px-4 text-gray-600">{product.sales}</td>
                            <td className="py-3 px-4">
                              <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                                {product.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="p-6">
                  <div className="space-y-4">
                    {mockOrders.map(order => (
                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-gray-900">Order #{order.id}</p>
                            <Badge
                              variant={
                                order.status === 'Delivered' ? 'default' :
                                order.status === 'Shipped' ? 'secondary' : 'outline'
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-1">{order.product}</p>
                          <p className="text-gray-600">Customer: {order.customer} • {order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-gray-600">Total</p>
                            <p className="text-gray-900">${order.amount}</p>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
