'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Contract, ContractFilters, CONTRACT_TYPE_LABELS, CONTRACT_STATUS_LABELS, BRANCH_DATA } from '@/types';
import ContractForm from './contract-form';

interface ContractListProps {
  showCreateButton?: boolean;
  limit?: number;
}

export default function ContractList({ showCreateButton = true, limit }: ContractListProps) {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filters, setFilters] = useState<ContractFilters>({
    branch_id: user?.role === 'admin' ? undefined : user?.branch_id,
    status: undefined,
    contract_type: undefined,
    client_name: '',
    contract_number: ''
  });

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filters.branch_id) params.append('branch_id', filters.branch_id.toString());
      if (filters.status) params.append('status', filters.status);
      if (filters.contract_type) params.append('contract_type', filters.contract_type);
      if (filters.client_name) params.append('client_name', filters.client_name);
      if (filters.contract_number) params.append('contract_number', filters.contract_number);
      if (limit) params.append('limit', limit.toString());
      
      params.append('sort', 'created_at');
      params.append('order', 'desc');

      const response = await fetch(`/api/contracts?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setContracts(result.data || []);
      } else {
        console.error('Failed to fetch contracts');
      }
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [filters, limit]);

  const handleFilterChange = (key: keyof ContractFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      branch_id: user?.role === 'admin' ? undefined : user?.branch_id,
      status: undefined,
      contract_type: undefined,
      client_name: '',
      contract_number: ''
    });
  };

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
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ar-SA') + ' ريال';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">العقود</h2>
          <p className="text-gray-600">إدارة ومتابعة جميع العقود</p>
        </div>
        {showCreateButton && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>عقد جديد</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إنشاء عقد جديد</DialogTitle>
              </DialogHeader>
              <ContractForm
                onSuccess={() => {
                  setShowCreateDialog(false);
                  fetchContracts();
                }}
                onCancel={() => setShowCreateDialog(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم العقد</label>
              <Input
                placeholder="البحث برقم العقد"
                value={filters.contract_number || ''}
                onChange={(e) => handleFilterChange('contract_number', e.target.value)}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">اسم العميل</label>
              <Input
                placeholder="البحث باسم العميل"
                value={filters.client_name || ''}
                onChange={(e) => handleFilterChange('client_name', e.target.value)}
                className="text-right"
              />
            </div>

            {user?.role === 'admin' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">الفرع</label>
                <Select
                  value={filters.branch_id?.toString() || 'all'}
                  onValueChange={(value) => handleFilterChange('branch_id', value === 'all' ? undefined : parseInt(value))}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="جميع الفروع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفروع</SelectItem>
                    {BRANCH_DATA.map((branch, index) => (
                      <SelectItem key={index + 1} value={(index + 1).toString()}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">نوع العقد</label>
              <Select
                value={filters.contract_type || 'all'}
                onValueChange={(value) => handleFilterChange('contract_type', value === 'all' ? undefined : value)}
              >
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="جميع الأنواع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  {Object.entries(CONTRACT_TYPE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">حالة العقد</label>
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
              >
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  {Object.entries(CONTRACT_STATUS_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={clearFilters}>
              مسح المرشحات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600">جاري تحميل العقود...</p>
              </div>
            </div>
          ) : contracts.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-gray-600 mb-4">لا توجد عقود مطابقة للمرشحات المحددة</p>
                {showCreateButton && (
                  <Button onClick={() => setShowCreateDialog(true)}>
                    إنشاء عقد جديد
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم العقد</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">نوع العقد</TableHead>
                    <TableHead className="text-right">الفرع</TableHead>
                    <TableHead className="text-right">القيمة</TableHead>
                    <TableHead className="text-right">المدة</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium text-right">
                        {contract.contract_number}
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <div className="font-medium">{contract.client_name}</div>
                          {contract.client_phone && (
                            <div className="text-sm text-gray-500">{contract.client_phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {CONTRACT_TYPE_LABELS[contract.contract_type]}
                      </TableCell>
                      <TableCell className="text-right">
                        {getBranchName(contract.branch_id)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(contract.value)}
                      </TableCell>
                      <TableCell className="text-right">
                        {contract.duration_months} شهر
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={getStatusBadgeColor(contract.status)}>
                          {CONTRACT_STATUS_LABELS[contract.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(contract.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex space-x-2 space-x-reverse">
                          <Button variant="outline" size="sm">
                            عرض
                          </Button>
                          {(user?.role === 'admin' || user?.role === 'manager') && (
                            <Button variant="outline" size="sm">
                              تعديل
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      {!loading && contracts.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          عرض {contracts.length} عقد
          {limit && contracts.length === limit && ' (محدود)'}
        </div>
      )}
    </div>
  );
}
