import { useState, useEffect } from 'react';
import { Camera, X, RotateCcw, Download, Sparkles, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Product } from '../App';

type ARTryOnProps = {
  product: Product;
  customColor: string;
  pattern: string;
  isOpen: boolean;
  onClose: () => void;
};

export function ARTryOn({ product, customColor, pattern, isOpen, onClose }: ARTryOnProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [trackingPoints, setTrackingPoints] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      // Simulate camera initialization
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCameraActive(true);
        // Simulate face/body tracking points
        generateTrackingPoints();
      }, 1500);
    }
  }, [isOpen]);

  const generateTrackingPoints = () => {
    // Simulate tracking points for body/face detection
    const points = [];
    if (product.category === 'Headwear') {
      // Head tracking points
      points.push(
        { x: 50, y: 20 },  // Top of head
        { x: 35, y: 30 },  // Left ear
        { x: 65, y: 30 },  // Right ear
        { x: 50, y: 45 }   // Chin
      );
    } else if (product.category === 'Dresses' || product.category === 'Tops') {
      // Upper body tracking points
      points.push(
        { x: 35, y: 30 },  // Left shoulder
        { x: 65, y: 30 },  // Right shoulder
        { x: 50, y: 50 },  // Center chest
        { x: 40, y: 70 },  // Left hip
        { x: 60, y: 70 }   // Right hip
      );
    } else if (product.category === 'Jewelry') {
      // Neck tracking points
      points.push(
        { x: 50, y: 35 },  // Neck center
        { x: 40, y: 40 },  // Neck left
        { x: 60, y: 40 }   // Neck right
      );
    }
    setTrackingPoints(points);
  };

  const handleCapture = () => {
    // Simulate capturing the AR view
    setCapturedImage('captured');
  };

  const handleReset = () => {
    setCapturedImage(null);
    generateTrackingPoints();
  };

  const handleDownload = () => {
    // In a real implementation, this would download the captured image
    alert('Image would be downloaded in a real implementation');
  };

  if (!isOpen) return null;

  const getItemOverlayStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      transition: 'all 0.3s ease'
    };

    if (product.category === 'Headwear') {
      return {
        ...baseStyle,
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        height: '120px',
        background: customColor,
        borderRadius: '50% 50% 45% 45%',
        opacity: 0.85
      };
    } else if (product.category === 'Dresses') {
      return {
        ...baseStyle,
        top: '28%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '280px',
        height: '420px',
        background: customColor,
        borderRadius: '20% 20% 0 0',
        opacity: 0.8
      };
    } else if (product.category === 'Tops') {
      return {
        ...baseStyle,
        top: '28%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '280px',
        height: '220px',
        background: customColor,
        borderRadius: '20% 20% 5% 5%',
        opacity: 0.8
      };
    } else if (product.category === 'Jewelry') {
      return {
        ...baseStyle,
        top: '32%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '180px',
        height: '40px',
        border: `6px solid ${customColor}`,
        borderRadius: '50%',
        opacity: 0.9
      };
    }

    return baseStyle;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="w-full h-full max-w-6xl mx-auto p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white">AR Try-On</h2>
              <p className="text-gray-400">{product.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </Button>
        </div>

        {/* AR View */}
        <div className="flex-1 relative rounded-xl overflow-hidden bg-gray-900">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="text-white">
                  <p>Initializing AR Camera...</p>
                  <p className="text-gray-400">Detecting your position</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Simulated Camera Feed */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
                {/* Simulated person silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-[600px] opacity-30">
                    {/* Head */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-28 bg-gray-400 rounded-full" />
                    {/* Neck */}
                    <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-12 h-10 bg-gray-400" />
                    {/* Body */}
                    <div className="absolute top-[130px] left-1/2 -translate-x-1/2 w-48 h-80 bg-gray-400 rounded-t-[100px]" />
                    {/* Arms */}
                    <div className="absolute top-[150px] left-[12px] w-12 h-60 bg-gray-400 rounded-full" />
                    <div className="absolute top-[150px] right-[12px] w-12 h-60 bg-gray-400 rounded-full" />
                  </div>
                </div>

                {/* AR Overlay - Product */}
                <div style={getItemOverlayStyle()}>
                  {pattern === 'striped' && (
                    <div 
                      className="absolute inset-0" 
                      style={{
                        background: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`
                      }}
                    />
                  )}
                  {pattern === 'dotted' && (
                    <div 
                      className="absolute inset-0" 
                      style={{
                        background: `radial-gradient(circle, rgba(0,0,0,0.15) 20%, transparent 20%)`,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  )}
                </div>

                {/* Tracking Points */}
                {!capturedImage && trackingPoints.map((point, index) => (
                  <div
                    key={index}
                    className="absolute w-3 h-3 bg-green-400 rounded-full animate-pulse"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}

                {/* Tracking Status */}
                <div className="absolute top-4 left-4 bg-green-500/90 text-white px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Tracking Active
                </div>

                {/* Product Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Card className="p-4 bg-black/60 backdrop-blur border-white/20">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="opacity-80">Currently Trying</p>
                        <p>{product.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="opacity-80">Color</p>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white"
                            style={{ backgroundColor: customColor }}
                          />
                          <span className="capitalize">{pattern}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Captured State */}
              {capturedImage && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <ImageIcon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-white">
                      <h3>Photo Captured!</h3>
                      <p className="text-gray-400">Your AR try-on has been saved</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>

          <Button
            size="lg"
            onClick={handleCapture}
            disabled={isLoading || capturedImage !== null}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            <Camera className="w-5 h-5 mr-2" />
            Capture Photo
          </Button>

          {capturedImage && (
            <Button
              size="lg"
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-5 h-5 mr-2" />
              Download
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            <Video className="w-4 h-4 inline mr-1" />
            Move around to see the {product.name} from different angles
          </p>
        </div>
      </div>
    </div>
  );
}
