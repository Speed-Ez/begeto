import { useState } from 'react';
import { X, Palette, Ruler } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { AvatarCustomizer } from './AvatarCustomizer';

type CustomizeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  category: string;
  customColor: string;
  setCustomColor: (color: string) => void;
  pattern: string;
  setPattern: (pattern: string) => void;
  brightness: number[];
  setBrightness: (brightness: number[]) => void;
};

type Measurements = {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  shoulders: string;
  inseam: string;
  sleeveLength: string;
  bust: string;
  underBust: string;
  dressLength: string;
  headCircumference: string;
  shirtSize: string;
  pantsSize: string;
  shoeSize: string;
};

export function CustomizeModal({
  isOpen,
  onClose,
  productName,
  category,
  customColor,
  setCustomColor,
  pattern,
  setPattern,
  brightness,
  setBrightness
}: CustomizeModalProps) {
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');
  const [measurements, setMeasurements] = useState<Measurements>({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    shoulders: '',
    inseam: '',
    sleeveLength: '',
    bust: '',
    underBust: '',
    dressLength: '',
    headCircumference: '',
    shirtSize: '',
    pantsSize: '',
    shoeSize: ''
  });

  const handleInputChange = (field: keyof Measurements, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveMeasurements = () => {
    localStorage.setItem('userMeasurements', JSON.stringify({ ...measurements, unit }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            Customize Your {productName}
          </DialogTitle>
          <DialogDescription>
            Personalize colors, patterns, and add your measurements for the perfect fit
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="avatar" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="avatar">Avatar</TabsTrigger>
            <TabsTrigger value="colors">Colors & Patterns</TabsTrigger>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
            <TabsTrigger value="sizes">Standard Sizes</TabsTrigger>
          </TabsList>

          {/* Avatar Tab */}
          <TabsContent value="avatar" className="space-y-4">
            <AvatarCustomizer
              productName={productName}
              customColor={customColor}
              pattern={pattern}
              brightness={brightness[0]}
              category={category}
            />
          </TabsContent>

          {/* Colors & Patterns Tab */}
          <TabsContent value="colors" className="space-y-4">
            <Card className="p-6 space-y-6">
              <div>
                <h4 className="text-gray-900 mb-4">Choose Your Color</h4>
                <div className="grid grid-cols-8 gap-3">
                  {[
                    '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', 
                    '#3B82F6', '#EF4444', '#8B4513', '#FF1493',
                    '#4B0082', '#FFD700', '#00CED1', '#FF6347'
                  ].map(color => (
                    <button
                      key={color}
                      className={`w-12 h-12 rounded-full border-4 hover:scale-110 transition-transform ${
                        customColor === color ? 'border-gray-900' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setCustomColor(color)}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <Label htmlFor="customColorPicker">Custom Color</Label>
                  <div className="flex gap-2 mt-2">
                    <input
                      id="customColorPicker"
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-16 h-10 rounded cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="flex-1"
                      placeholder="#8B5CF6"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-900 mb-4">Select Pattern</h4>
                <div className="grid grid-cols-3 gap-4">
                  {['original', 'striped', 'dotted'].map(p => (
                    <Button
                      key={p}
                      variant={pattern === p ? 'default' : 'outline'}
                      onClick={() => setPattern(p)}
                      className="capitalize h-20"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-gray-900 mb-2">Brightness</h4>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  min={50}
                  max={150}
                  step={1}
                />
                <p className="text-gray-600 mt-2">{brightness[0]}%</p>
              </div>
            </Card>
          </TabsContent>

          {/* Measurements Tab */}
          <TabsContent value="measurements" className="space-y-4">
            <div className="flex justify-end mb-4">
              <div className="inline-flex rounded-lg border p-1">
                <button
                  className={`px-3 py-1 rounded ${unit === 'cm' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
                  onClick={() => setUnit('cm')}
                >
                  CM
                </button>
                <button
                  className={`px-3 py-1 rounded ${unit === 'inch' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
                  onClick={() => setUnit('inch')}
                >
                  Inches
                </button>
              </div>
            </div>

            <Card className="p-6">
              <h4 className="text-gray-900 mb-4">Body Measurements</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height ({unit === 'cm' ? 'cm' : 'inches'})</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder={unit === 'cm' ? "170" : "67"}
                    value={measurements.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight ({unit === 'cm' ? 'kg' : 'lbs'})</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder={unit === 'cm' ? "70" : "154"}
                    value={measurements.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chest">Chest ({unit})</Label>
                  <Input
                    id="chest"
                    type="number"
                    placeholder={unit === 'cm' ? "95" : "37"}
                    value={measurements.chest}
                    onChange={(e) => handleInputChange('chest', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waist">Waist ({unit})</Label>
                  <Input
                    id="waist"
                    type="number"
                    placeholder={unit === 'cm' ? "80" : "31"}
                    value={measurements.waist}
                    onChange={(e) => handleInputChange('waist', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hips">Hips ({unit})</Label>
                  <Input
                    id="hips"
                    type="number"
                    placeholder={unit === 'cm' ? "100" : "39"}
                    value={measurements.hips}
                    onChange={(e) => handleInputChange('hips', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shoulders">Shoulders ({unit})</Label>
                  <Input
                    id="shoulders"
                    type="number"
                    placeholder={unit === 'cm' ? "42" : "16"}
                    value={measurements.shoulders}
                    onChange={(e) => handleInputChange('shoulders', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inseam">Inseam ({unit})</Label>
                  <Input
                    id="inseam"
                    type="number"
                    placeholder={unit === 'cm' ? "75" : "29"}
                    value={measurements.inseam}
                    onChange={(e) => handleInputChange('inseam', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleeveLength">Sleeve Length ({unit})</Label>
                  <Input
                    id="sleeveLength"
                    type="number"
                    placeholder={unit === 'cm' ? "60" : "24"}
                    value={measurements.sleeveLength}
                    onChange={(e) => handleInputChange('sleeveLength', e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {category === 'Dresses' && (
              <Card className="p-6">
                <h4 className="text-gray-900 mb-4">Dress-Specific Measurements</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bust">Bust ({unit})</Label>
                    <Input
                      id="bust"
                      type="number"
                      placeholder={unit === 'cm' ? "90" : "35"}
                      value={measurements.bust}
                      onChange={(e) => handleInputChange('bust', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="underBust">Under Bust ({unit})</Label>
                    <Input
                      id="underBust"
                      type="number"
                      placeholder={unit === 'cm' ? "75" : "29"}
                      value={measurements.underBust}
                      onChange={(e) => handleInputChange('underBust', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="dressLength">Preferred Dress Length ({unit})</Label>
                    <Input
                      id="dressLength"
                      type="number"
                      placeholder={unit === 'cm' ? "100" : "39"}
                      value={measurements.dressLength}
                      onChange={(e) => handleInputChange('dressLength', e.target.value)}
                    />
                  </div>
                </div>
              </Card>
            )}

            {category === 'Headwear' && (
              <Card className="p-6">
                <h4 className="text-gray-900 mb-4">Headwear Measurements</h4>
                <div className="space-y-2">
                  <Label htmlFor="headCircumference">Head Circumference ({unit})</Label>
                  <Input
                    id="headCircumference"
                    type="number"
                    placeholder={unit === 'cm' ? "56" : "22"}
                    value={measurements.headCircumference}
                    onChange={(e) => handleInputChange('headCircumference', e.target.value)}
                  />
                  <p className="text-gray-600">
                    Measure around your head at the widest part, typically just above the eyebrows.
                  </p>
                </div>
              </Card>
            )}

            <Card className="p-4 bg-purple-50 border-purple-100">
              <h4 className="text-gray-900 mb-2 flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                How to Measure
              </h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Use a soft measuring tape</li>
                <li>• Measure over light clothing</li>
                <li>• Keep the tape snug but not tight</li>
                <li>• Stand naturally and breathe normally</li>
              </ul>
            </Card>

            <Button onClick={handleSaveMeasurements} className="w-full">
              Save Measurements
            </Button>
          </TabsContent>

          {/* Standard Sizes Tab */}
          <TabsContent value="sizes" className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shirtSize">Shirt/Top Size</Label>
                <select
                  id="shirtSize"
                  className="w-full p-2 border rounded-md"
                  value={measurements.shirtSize}
                  onChange={(e) => handleInputChange('shirtSize', e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="XXS">XXS</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pantsSize">Pants/Bottom Size</Label>
                <select
                  id="pantsSize"
                  className="w-full p-2 border rounded-md"
                  value={measurements.pantsSize}
                  onChange={(e) => handleInputChange('pantsSize', e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="XXS">XXS</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shoeSize">Shoe Size (US)</Label>
                <Input
                  id="shoeSize"
                  type="number"
                  placeholder="9"
                  value={measurements.shoeSize}
                  onChange={(e) => handleInputChange('shoeSize', e.target.value)}
                />
              </div>
            </Card>

            <Card className="p-4 bg-blue-50 border-blue-100">
              <h4 className="text-gray-900 mb-2">Size Guide</h4>
              <div className="text-gray-600 space-y-1">
                <p><strong>XS:</strong> Chest 81-86cm | Waist 66-71cm</p>
                <p><strong>S:</strong> Chest 86-91cm | Waist 71-76cm</p>
                <p><strong>M:</strong> Chest 91-97cm | Waist 76-81cm</p>
                <p><strong>L:</strong> Chest 97-102cm | Waist 81-86cm</p>
                <p><strong>XL:</strong> Chest 102-107cm | Waist 86-91cm</p>
              </div>
            </Card>

            <Button onClick={handleSaveMeasurements} className="w-full">
              Save Standard Sizes
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button onClick={onClose} className="flex-1">
            Apply Customization
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
