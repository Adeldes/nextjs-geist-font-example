'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreateContractData, CONTRACT_TYPE_LABELS, BRANCH_DATA } from '@/types';

interface ContractFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ContractForm({ onSuccess, onCancel }: ContractFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateContractData>({
    client_name: '',
    client_phone: '',
    client_email: '',
    contract_type: 'agreement',
    branch_id: user?.branch_id || 1,
    value: 0,
    duration_months: 12,
    services_description: '',
    terms_and_conditions: ''
  });

  const handleInputChange = (field: keyof CreateContractData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Log the contract creation
        await fetch('/api/audit/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            actionType: 'create',
            tableName: 'contracts',
            recordId: result.data?.id,
            description: `تم إنشاء عقد جديد: ${formData.client_name}`,
            newValues: formData
          })
        });

        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard');
        }
      } else {
        const error = await response.json();
        alert(error.error || 'حدث خطأ أثناء إنشاء العقد');
      }
    } catch (error) {
      console.error('Error creating contract:', error);
      alert('حدث خطأ أثناء إنشاء العقد');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.client_name && formData.contract_type && formData.branch_id;
      case 2:
        return formData.value > 0 && formData.duration_months > 0;
      case 3:
        return true; // Optional fields
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">إنشاء عقد جديد</h1>
        <p className="text-gray-600">أدخل بيانات العقد والعميل</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center space-x-4 space-x-reverse">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
              ${currentStep >= step 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
              }
            `}>
              {step}
            </div>
            {step < 3 && (
              <div className={`
                w-16 h-1 mx-2
                ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-8 space-x-reverse text-sm">
        <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          بيانات العميل
        </span>
        <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          تفاصيل العقد
        </span>
        <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          الخدمات والشروط
        </span>
      </div>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: Client Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">بيانات العميل والعقد</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="client_name">اسم العميل *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => handleInputChange('client_name', e.target.value)}
                    placeholder="أدخل اسم العميل"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_phone">رقم الهاتف</Label>
                  <Input
                    id="client_phone"
                    value={formData.client_phone}
                    onChange={(e) => handleInputChange('client_phone', e.target.value)}
                    placeholder="05xxxxxxxx"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_email">البريد الإلكتروني</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => handleInputChange('client_email', e.target.value)}
                    placeholder="client@example.com"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contract_type">نوع العقد *</Label>
                  <Select
                    value={formData.contract_type}
                    onValueChange={(value) => handleInputChange('contract_type', value)}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر نوع العقد" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CONTRACT_TYPE_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch_id">الفرع *</Label>
                  <Select
                    value={formData.branch_id.toString()}
                    onValueChange={(value) => handleInputChange('branch_id', parseInt(value))}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الفرع" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANCH_DATA.map((branch, index) => (
                        <SelectItem key={index + 1} value={(index + 1).toString()}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contract Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">تفاصيل العقد المالية</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="value">قيمة العقد (ريال سعودي) *</Label>
                  <Input
                    id="value"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration_months">مدة العقد (بالأشهر) *</Label>
                  <Input
                    id="duration_months"
                    type="number"
                    min="1"
                    value={formData.duration_months}
                    onChange={(e) => handleInputChange('duration_months', parseInt(e.target.value) || 1)}
                    placeholder="12"
                    className="text-right"
                  />
                </div>
              </div>

              {/* Contract Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">ملخص العقد</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>العميل:</span>
                    <span className="font-medium">{formData.client_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نوع العقد:</span>
                    <span className="font-medium">{CONTRACT_TYPE_LABELS[formData.contract_type]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>القيمة:</span>
                    <span className="font-medium">{formData.value.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المدة:</span>
                    <span className="font-medium">{formData.duration_months} شهر</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services and Terms */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">الخدمات والشروط</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="services_description">وصف الخدمات المقدمة</Label>
                  <Textarea
                    id="services_description"
                    value={formData.services_description}
                    onChange={(e) => handleInputChange('services_description', e.target.value)}
                    placeholder="اكتب وصفاً تفصيلياً للخدمات التي سيتم تقديمها..."
                    className="text-right min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms_and_conditions">الشروط والأحكام</Label>
                  <Textarea
                    id="terms_and_conditions"
                    value={formData.terms_and_conditions}
                    onChange={(e) => handleInputChange('terms_and_conditions', e.target.value)}
                    placeholder="اكتب الشروط والأحكام الخاصة بالعقد..."
                    className="text-right min-h-[120px]"
                  />
                </div>
              </div>

              {/* Final Review */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-blue-900">مراجعة نهائية</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>بيانات العميل:</strong>
                    <div className="mt-1 space-y-1">
                      <div>الاسم: {formData.client_name}</div>
                      {formData.client_phone && <div>الهاتف: {formData.client_phone}</div>}
                      {formData.client_email && <div>البريد: {formData.client_email}</div>}
                    </div>
                  </div>
                  <div>
                    <strong>تفاصيل العقد:</strong>
                    <div className="mt-1 space-y-1">
                      <div>النوع: {CONTRACT_TYPE_LABELS[formData.contract_type]}</div>
                      <div>القيمة: {formData.value.toLocaleString()} ريال</div>
                      <div>المدة: {formData.duration_months} شهر</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <div className="space-x-2 space-x-reverse">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              إلغاء
            </Button>
          )}
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              السابق
            </Button>
          )}
        </div>

        <div className="space-x-2 space-x-reverse">
          {currentStep < 3 ? (
            <Button 
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
            >
              التالي
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !isStepValid(currentStep)}
            >
              {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء العقد'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
