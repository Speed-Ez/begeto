import { useState } from 'react';
import { RotateCw, ZoomIn, ZoomOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';

type AvatarCustomizerProps = {
  productName: string;
  customColor: string;
  pattern: string;
  brightness: number;
  category: string;
};

export function AvatarCustomizer({ 
  productName, 
  customColor, 
  pattern, 
  brightness,
  category 
}: AvatarCustomizerProps) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState([100]);
  const [view, setView] = useState<'front' | 'side' | 'back'>('front');

  const getAvatarStyle = () => {
    return {
      transform: `rotate(${rotation}deg) scale(${zoom[0] / 100})`,
      filter: `brightness(${brightness}%)`
    };
  };

  const getItemColor = () => {
    if (pattern === 'striped') {
      return `repeating-linear-gradient(45deg, ${customColor}, ${customColor} 10px, ${adjustColor(customColor, -20)} 10px, ${adjustColor(customColor, -20)} 20px)`;
    } else if (pattern === 'dotted') {
      return `radial-gradient(circle, ${customColor} 20%, transparent 20%), radial-gradient(circle, ${customColor} 20%, transparent 20%)`;
    }
    return customColor;
  };

  const adjustColor = (color: string, percent: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900">Avatar Preview</h3>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={view === 'front' ? 'default' : 'outline'}
            onClick={() => setView('front')}
          >
            Front
          </Button>
          <Button
            size="sm"
            variant={view === 'side' ? 'default' : 'outline'}
            onClick={() => setView('side')}
          >
            Side
          </Button>
          <Button
            size="sm"
            variant={view === 'back' ? 'default' : 'outline'}
            onClick={() => setView('back')}
          >
            Back
          </Button>
        </div>
      </div>

      {/* Avatar Display */}
      <div className="relative bg-gradient-to-b from-purple-50 to-white rounded-lg aspect-[3/4] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center" style={getAvatarStyle()}>
          {/* Avatar Body */}
          <div className="relative w-48 h-80">
            {/* Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-amber-200 rounded-full" />
            
            {/* Neck */}
            <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-8 h-6 bg-amber-200" />
            
            {/* Torso */}
            <div className="absolute top-[92px] left-1/2 -translate-x-1/2 w-32 h-40 bg-gray-200 rounded-t-3xl" />
            
            {/* Product Overlay - Dress */}
            {category === 'Dresses' && (
              <div 
                className="absolute top-[92px] left-1/2 -translate-x-1/2 w-36 h-48 rounded-t-3xl"
                style={{ 
                  background: getItemColor(),
                  backgroundSize: pattern === 'dotted' ? '20px 20px, 20px 20px' : 'auto',
                  backgroundPosition: pattern === 'dotted' ? '0 0, 10px 10px' : 'auto'
                }}
              />
            )}
            
            {/* Product Overlay - Headwear */}
            {category === 'Headwear' && (
              <div 
                className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-20 h-12 rounded-full"
                style={{ 
                  background: getItemColor(),
                  backgroundSize: pattern === 'dotted' ? '20px 20px, 20px 20px' : 'auto',
                  backgroundPosition: pattern === 'dotted' ? '0 0, 10px 10px' : 'auto'
                }}
              />
            )}
            
            {/* Product Overlay - Tops */}
            {category === 'Tops' && (
              <div 
                className="absolute top-[92px] left-1/2 -translate-x-1/2 w-36 h-24 rounded-t-3xl"
                style={{ 
                  background: getItemColor(),
                  backgroundSize: pattern === 'dotted' ? '20px 20px, 20px 20px' : 'auto',
                  backgroundPosition: pattern === 'dotted' ? '0 0, 10px 10px' : 'auto'
                }}
              />
            )}
            
            {/* Product Overlay - Jewelry */}
            {category === 'Jewelry' && (
              <>
                <div 
                  className="absolute top-[90px] left-1/2 -translate-x-1/2 w-20 h-8 rounded-full border-4"
                  style={{ borderColor: customColor }}
                />
                <div 
                  className="absolute top-[98px] left-1/2 -translate-x-1/2 w-3 h-8"
                  style={{ background: customColor }}
                />
              </>
            )}
            
            {/* Arms */}
            <div className="absolute top-[100px] left-[8px] w-8 h-32 bg-amber-200 rounded-full" />
            <div className="absolute top-[100px] right-[8px] w-8 h-32 bg-amber-200 rounded-full" />
            
            {/* Legs */}
            <div className="absolute bottom-0 left-[40px] w-12 h-48 bg-gray-300 rounded-b-lg" />
            <div className="absolute bottom-0 right-[40px] w-12 h-48 bg-gray-300 rounded-b-lg" />
          </div>
        </div>

        {/* View Indicator */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full">
          <span className="capitalize">{view} View</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-900">Rotation</label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>
          <Slider
            value={[rotation]}
            onValueChange={(val) => setRotation(val[0])}
            min={0}
            max={360}
            step={1}
          />
          <p className="text-gray-600 mt-1">{rotation}°</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-900">Zoom</label>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setZoom([Math.max(50, zoom[0] - 10)])}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setZoom([Math.min(150, zoom[0] + 10)])}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Slider
            value={zoom}
            onValueChange={setZoom}
            min={50}
            max={150}
            step={5}
          />
          <p className="text-gray-600 mt-1">{zoom[0]}%</p>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <p className="text-gray-900 mb-1">Customize Your Avatar</p>
            <p className="text-gray-600">
              Rotate and zoom to see how <strong>{productName}</strong> looks from different angles. The colors and patterns you select will be reflected on the avatar.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
