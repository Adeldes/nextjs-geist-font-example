'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Contract, Payment, Signature, CONTRACT_TYPE_LABELS, CONTRACT_STATUS_LABELS, BRANCH_DATA } from '@/types';

interface ContractDetailsProps {
  contractId: number;
  onClose?: () => void;
}

export default function ContractDetails({ contractId, onClose }: ContractDetailsProps) {
  const { user } = useAuth();
  const [contract, setContract] = useState<Contract | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContractDetails = async () => {
    setLoading(true);
    try {
      // Fetch contract details
      const contractResponse = await fetch(`/api/contracts/${contractId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (contractResponse.ok) {
        const contractResult = await contractResponse.json();
        setContract(contractResult.data);
      }

      // Fetch payments
      const paymentsResponse = await fetch(`/api/payments?contract_id=${contractId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (paymentsResponse.ok) {
        const paymentsResult = await paymentsResponse.json();
        setPayments(paymentsResult.data || []);
      }

      // Fetch signatures
      const signaturesResponse = await fetch(`/api/signatures?contract_id=${contractId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (signaturesResponse.ok) {
        const signaturesResult = await signaturesResponse.json();
        setSignatures(signaturesResult.data || []);
      }

    } catch (error) {
      console.error('Error fetching contract details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractDetails();
  }, [contractId]);

  const getStatusBadgeColor = (status: Contract['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending_client_signature':
        return 'bg-yellow-100 text-yellow-800';
      case 'client_signed':
        return 'bg-blue-100 text-blue-800';
      case 'employee_approved':
        return 'bg-purple-100 text-purple-800';
      case 'fully_executed':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBranchName = (branchId: number) => {
    const branch = BRANCH_DATA[branchId - 1];
    return branch ? branch.name : 'غير محدد';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ar-SA') + ' ريال سعودي';
  };

  const getPaymentStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canEdit = () => {
    if (!contract || !user) return false;
    if (user.role === 'admin') return true;
    if (user.role === 'manager' && contract.branch_id === user.branch_id) return true;
    return false;
  };

  const canSign = () => {
    if (!contract || !user) return false;
    return contract.status === 'client_signed' && user.role !== 'employee';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">جاري تحميل تفاصيل العقد...</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">لم يتم العثور على العقد</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تفاصيل العقد</h1>
          <p className="text-gray-600 mt-1">رقم العقد: {contract.contract_number}</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Badge className={getStatusBadgeColor(contract.status)}>
            {CONTRACT_STATUS_LABELS[contract.status]}
          </Badge>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              إغلاق
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">تفاصيل العقد</TabsTrigger>
          <TabsTrigger value="payments">المدفوعات</TabsTrigger>
          <TabsTrigger value="signatures">التوقيعات</TabsTrigger>
          <TabsTrigger value="history">السجل</TabsTrigger>
        </TabsList>

        {/* Contract Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>بيانات العميل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">اسم العميل</label>
                  <p className="text-lg font-medium">{contract.client_name}</p>
                </div>
                {contract.client_phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">رقم الهاتف</label>
                    <p>{contract.client_phone}</p>
                  </div>
                )}
                {contract.client_email && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">البريد الإلكتروني</label>
                    <p>{contract.client_email}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contract Information */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات العقد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">نوع العقد</label>
                  <p className="text-lg">{CONTRACT_TYPE_LABELS[contract.contract_type]}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">الفرع</label>
                  <p>{getBranchName(contract.branch_id)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">قيمة العقد</label>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(contract.value)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">مدة العقد</label>
                  <p>{contract.duration_months} شهر</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Description */}
          {contract.services_description && (
            <Card>
              <CardHeader>
                <CardTitle>وصف الخدمات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{contract.services_description}</p>
              </CardContent>
            </Card>
          )}

          {/* Terms and Conditions */}
          {contract.terms_and_conditions && (
            <Card>
              <CardHeader>
                <CardTitle>الشروط والأحكام</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{contract.terms_and_conditions}</p>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>الجدول الزمني</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium">تم إنشاء العقد</p>
                    <p className="text-sm text-gray-500">{formatDate(contract.created_at)}</p>
                  </div>
                </div>
                
                {contract.client_signed_at && (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">وقع العميل</p>
                      <p className="text-sm text-gray-500">{formatDate(contract.client_signed_at)}</p>
                    </div>
                  </div>
                )}

                {contract.employee_signed_at && (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">اعتمد الموظف</p>
                      <p className="text-sm text-gray-500">{formatDate(contract.employee_signed_at)}</p>
                    </div>
                  </div>
                )}

                {contract.management_approved_at && (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">اعتمدت الإدارة</p>
                      <p className="text-sm text-gray-500">{formatDate(contract.management_approved_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex space-x-4 space-x-reverse">
            {canEdit() && (
              <Button>تعديل العقد</Button>
            )}
            {canSign() && (
              <Button variant="outline">اعتماد العقد</Button>
            )}
            <Button variant="outline">تحميل PDF</Button>
            {contract.signing_link && contract.status === 'pending_client_signature' && (
              <Button variant="outline">نسخ رابط التوقيع</Button>
            )}
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المدفوعات</CardTitle>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">لا توجد مدفوعات مسجلة لهذا العقد</p>
                  <Button>إضافة دفعة</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{formatCurrency(payment.amount)}</p>
                        <p className="text-sm text-gray-500">
                          تاريخ الاستحقاق: {formatDate(payment.due_date)}
                        </p>
                        {payment.notes && (
                          <p className="text-sm text-gray-600 mt-1">{payment.notes}</p>
                        )}
                      </div>
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status === 'paid' ? 'مدفوع' : 
                         payment.status === 'pending' ? 'معلق' : 'متأخر'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Signatures Tab */}
        <TabsContent value="signatures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التوقيعات</CardTitle>
            </CardHeader>
            <CardContent>
              {signatures.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">لا توجد توقيعات لهذا العقد</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {signatures.map((signature) => (
                    <div key={signature.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">
                            {signature.signature_type === 'client' ? 'توقيع العميل' :
                             signature.signature_type === 'employee' ? 'توقيع الموظف' :
                             'ختم الإدارة'}
                          </p>
                          <p className="text-sm text-gray-500">{formatDate(signature.signed_at)}</p>
                        </div>
                        <Badge variant="outline">مكتمل</Badge>
                      </div>
                      {signature.signature_data && (
                        <div className="mt-2">
                          <img 
                            src={signature.signature_data} 
                            alt="التوقيع" 
                            className="max-w-xs h-20 border rounded"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل التعديلات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600">سيتم إضافة سجل التعديلات قريباً</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
