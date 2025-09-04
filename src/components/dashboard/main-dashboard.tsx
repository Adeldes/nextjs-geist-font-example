'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Building2,
  LogOut,
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { DashboardStats, Contract, Payment } from '@/types';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentContracts, setRecentContracts] = useState<Contract[]>([]);
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load dashboard statistics
      const statsResponse = await fetch('/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data);
      }

      // Load recent contracts
      const contractsResponse = await fetch('/api/contracts?limit=5&sort=created_at&order=desc', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (contractsResponse.ok) {
        const contractsData = await contractsResponse.json();
        setRecentContracts(contractsData.data?.contracts || []);
      }

      // Load pending payments
      const paymentsResponse = await fetch('/api/payments?status=pending&limit=5', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        setPendingPayments(paymentsData.data?.payments || []);
      }

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">إنجازك الأمثل</h1>
                <p className="text-sm text-gray-500">نظام إدارة العقود الإلكترونية</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'admin' && 'مدير النظام'}
                  {user?.role === 'manager' && 'مدير'}
                  {user?.role === 'employee' && 'موظف'}
                  {user?.branch?.name && ` - ${user.branch.name}`}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            مرحباً، {user?.email}
          </h2>
          <p className="text-gray-600">
            إليك نظرة عامة على نشاط العقود والمدفوعات
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي العقود</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_contracts || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.active_contracts || 0} عقد نشط
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">في انتظار التوقيع</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pending_signatures || 0}</div>
              <p className="text-xs text-muted-foreground">
                يتطلب إجراء
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المدفوعات المتأخرة</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats?.overdue_payments || 0}</div>
              <p className="text-xs text-muted-foreground">
                يتطلب متابعة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.total_revenue?.toLocaleString('ar-SA') || 0} ر.س
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.monthly_revenue?.toLocaleString('ar-SA') || 0} ر.س هذا الشهر
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">الإجراءات السريعة</h3>
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center space-x-2 space-x-reverse">
              <Plus className="h-4 w-4" />
              <span>عقد جديد</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
              <Search className="h-4 w-4" />
              <span>البحث في العقود</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
              <Download className="h-4 w-4" />
              <span>تصدير التقارير</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
              <Filter className="h-4 w-4" />
              <span>المرشحات المتقدمة</span>
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="contracts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contracts">العقود الحديثة</TabsTrigger>
            <TabsTrigger value="payments">المدفوعات المعلقة</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>العقود الحديثة</CardTitle>
                <CardDescription>آخر العقود التي تم إنشاؤها في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                {recentContracts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد عقود حديثة
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentContracts.map((contract) => (
                      <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{contract.contract_number}</h4>
                          <p className="text-sm text-gray-600">{contract.client_name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(contract.created_at).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            contract.status === 'fully_executed' ? 'default' :
                            contract.status === 'pending_client_signature' ? 'secondary' :
                            contract.status === 'client_signed' ? 'outline' : 'destructive'
                          }>
                            {contract.status === 'draft' && 'مسودة'}
                            {contract.status === 'pending_client_signature' && 'في انتظار توقيع العميل'}
                            {contract.status === 'client_signed' && 'وقع العميل'}
                            {contract.status === 'employee_approved' && 'معتمد من الموظف'}
                            {contract.status === 'fully_executed' && 'منفذ بالكامل'}
                            {contract.status === 'archived' && 'مؤرشف'}
                          </Badge>
                          <p className="text-sm font-medium mt-1">
                            {contract.value.toLocaleString('ar-SA')} ر.س
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>المدفوعات المعلقة</CardTitle>
                <CardDescription>المدفوعات التي تتطلب متابعة</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingPayments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد مدفوعات معلقة
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">دفعة رقم {payment.id}</h4>
                          <p className="text-sm text-gray-600">
                            تاريخ الاستحقاق: {new Date(payment.due_date).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            payment.status === 'overdue' ? 'destructive' : 'secondary'
                          }>
                            {payment.status === 'pending' && 'معلق'}
                            {payment.status === 'overdue' && 'متأخر'}
                            {payment.status === 'paid' && 'مدفوع'}
                          </Badge>
                          <p className="text-sm font-medium mt-1">
                            {payment.amount.toLocaleString('ar-SA')} ر.س
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تحليلات الأداء</CardTitle>
                <CardDescription>إحصائيات مفصلة حول أداء الفروع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>ستتوفر التحليلات المفصلة قريباً</p>
                  <p className="text-sm mt-2">سيتم عرض الرسوم البيانية والإحصائيات التفصيلية هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
