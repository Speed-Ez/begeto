import { useState } from 'react';
import { Globe, Mail, Lock, User as UserIcon, ShoppingBag, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, PageType } from '../types';

type AuthProps = {
  onNavigate: (page: PageType) => void;
  onLogin: (user: User) => void;
};

export function Auth({ onNavigate, onLogin }: AuthProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'creator' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignup && !selectedRole) {
      alert('Please select a role');
      return;
    }

    // Mock login
    const user: User = {
      id: '1',
      name: formData.name || 'Test User',
      email: formData.email,
      role: selectedRole || 'buyer'
    };

    onLogin(user);
  };

  const handleGoogleSignIn = () => {
    // Mock Google sign-in
    const user: User = {
      id: '1',
      name: 'Google User',
      email: 'user@gmail.com',
      role: selectedRole || 'buyer'
    };

    if (isSignup && !selectedRole) {
      alert('Please select a role first');
      return;
    }

    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <Globe className="w-8 h-8 text-purple-600" />
              <span className="text-purple-600">Begeto</span>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('home')}>
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Marketing */}
          <div className="space-y-6">
            <h1 className="text-gray-900">
              Join Begeto's Global Fashion Community
            </h1>
            <p className="text-gray-600">
              Connect with makers and shoppers from around the world. Experience authentic cultural fashion and fair trade craftsmanship.
            </p>
            
            <div className="space-y-4 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-gray-900">For Buyers</h3>
                  <p className="text-gray-600">Discover unique fashion from 150+ countries, customize designs, and try them on with AR</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Palette className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-gray-900">For Creators</h3>
                  <p className="text-gray-600">Reach a global audience, showcase your craftsmanship, and receive fair compensation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <Card className="p-8">
            <Tabs value={isSignup ? 'signup' : 'signin'} onValueChange={(v) => setIsSignup(v === 'signup')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-gray-500">or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>I want to...</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRole('buyer')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedRole === 'buyer'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <ShoppingBag className={`w-6 h-6 mx-auto mb-2 ${
                          selectedRole === 'buyer' ? 'text-purple-600' : 'text-gray-400'
                        }`} />
                        <p className={`${
                          selectedRole === 'buyer' ? 'text-purple-600' : 'text-gray-600'
                        }`}>
                          Buy Fashion
                        </p>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedRole('creator')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedRole === 'creator'
                            ? 'border-pink-600 bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Palette className={`w-6 h-6 mx-auto mb-2 ${
                          selectedRole === 'creator' ? 'text-pink-600' : 'text-gray-400'
                        }`} />
                        <p className={`${
                          selectedRole === 'creator' ? 'text-pink-600' : 'text-gray-600'
                        }`}>
                          Sell Fashion
                        </p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={!selectedRole}>
                    Create Account
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-gray-500">or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={!selectedRole}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  <p className="text-gray-600 mt-4">
                    By signing up, you agree to our Terms of Service and Privacy Policy. 
                    <br />
                    <span className="text-purple-600">Note: Figma Make is not meant for collecting PII or securing sensitive data.</span>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
