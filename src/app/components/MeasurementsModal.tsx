import { useState } from 'react';
import { Ruler, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type MeasurementsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: string;
};

type Measurements = {
  // Body measurements
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  shoulders: string;
  inseam: string;
  sleeveLength: string;
  
  // Dress specific
  bust: string;
  underBust: string;
  dressLength: string;
  
  // Headwear specific
  headCircumference: string;
  
  // Standard sizes
  shirtSize: string;
  pantsSize: string;
  shoeSize: string;
};

export function MeasurementsModal({ isOpen, onClose, category }: MeasurementsModalProps) {
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

  const handleSave = () => {
    // Save measurements to localStorage or state
    localStorage.setItem('userMeasurements', JSON.stringify({ ...measurements, unit }));
    onClose();
  };

  const handleInputChange = (field: keyof Measurements, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-purple-600" />
            Your Measurements
          </DialogTitle>
          <DialogDescription>
            Add your measurements to ensure the perfect fit. All measurements are stored locally and securely.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="body" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="specific">Specific</TabsTrigger>
            <TabsTrigger value="standard">Standard Sizes</TabsTrigger>
          </TabsList>

          {/* Unit Toggle */}
          <div className="flex justify-end my-4">
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

          <TabsContent value="body" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="specific" className="space-y-4">
            {category === 'Dresses' && (
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
            )}

            {category === 'Headwear' && (
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
            )}

            {(category === 'Tops' || category === 'Jewelry') && (
              <Card className="p-6">
                <p className="text-gray-600">
                  For {category.toLowerCase()}, the main body measurements from the "Body" tab will be used for sizing recommendations.
                </p>
              </Card>
            )}

            <Card className="p-4 bg-purple-50 border-purple-100">
              <h4 className="text-gray-900 mb-2">How to Measure</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Use a soft measuring tape</li>
                <li>• Measure over light clothing</li>
                <li>• Keep the tape snug but not tight</li>
                <li>• Stand naturally and breathe normally</li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="standard" className="space-y-4">
            <div className="space-y-4">
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
            </div>

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
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Measurements
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
