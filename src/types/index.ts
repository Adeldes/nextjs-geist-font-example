// Core entity types for the Electronic Contract Management System

export interface Branch {
  id: number;
  name: string;
  code: string;
  address?: string;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: 'employee' | 'manager' | 'admin';
  branch_id: number;
  branch?: Branch;
  signature_data?: string;
  created_at: string;
}

export interface Contract {
  id: number;
  contract_number: string;
  client_name: string;
  client_phone?: string;
  client_email?: string;
  contract_type: 'agreement' | 'concrete_supervision' | 'comprehensive_supervision';
  branch_id: number;
  branch?: Branch;
  value: number;
  duration_months: number;
  status: 'draft' | 'pending_client_signature' | 'client_signed' | 'employee_approved' | 'fully_executed' | 'archived';
  signing_link?: string;
  link_expires_at?: string;
  locked_at?: string;
  client_signed_at?: string;
  employee_signed_at?: string;
  management_approved_at?: string;
  created_by: number;
  created_by_user?: User;
  created_at: string;
  updated_at: string;
  services_description?: string;
  terms_and_conditions?: string;
}

export interface Payment {
  id: number;
  contract_id: number;
  contract?: Contract;
  amount: number;
  due_date: string;
  paid_date?: string;
  status: 'pending' | 'paid' | 'overdue';
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Signature {
  id: number;
  contract_id: number;
  user_id?: number;
  signature_type: 'client' | 'employee' | 'management_seal';
  signature_data: string; // Base64 encoded signature image
  signed_at: string;
  ip_address?: string;
}

export interface AuditLog {
  id: number;
  user_id?: number;
  user?: User;
  action_type: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'sign' | 'approve' | 'export' | 'search';
  table_name: string;
  record_id?: number;
  old_values?: string; // JSON string
  new_values?: string; // JSON string
  branch_id?: number;
  branch?: Branch;
  ip_address?: string;
  user_agent?: string;
  description?: string;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  user?: User;
  type: 'payment_due' | 'contract_expiring' | 'signature_required' | 'contract_signed' | 'payment_overdue';
  title: string;
  message: string;
  contract_id?: number;
  contract?: Contract;
  payment_id?: number;
  payment?: Payment;
  read: boolean;
  created_at: string;
}

// Form types for creating/updating entities
export interface CreateContractData {
  client_name: string;
  client_phone?: string;
  client_email?: string;
  contract_type: Contract['contract_type'];
  branch_id: number;
  value: number;
  duration_months: number;
  services_description?: string;
  terms_and_conditions?: string;
}

export interface CreatePaymentData {
  contract_id: number;
  amount: number;
  due_date: string;
  notes?: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  role: User['role'];
  branch_id: number;
}

export interface LoginData {
  email: string;
  password: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Search and filter types
export interface ContractFilters {
  branch_id?: number;
  status?: Contract['status'];
  contract_type?: Contract['contract_type'];
  client_name?: string;
  contract_number?: string;
  date_from?: string;
  date_to?: string;
  created_by?: number;
}

export interface PaymentFilters {
  branch_id?: number;
  status?: Payment['status'];
  contract_id?: number;
  due_date_from?: string;
  due_date_to?: string;
}

// Dashboard statistics types
export interface BranchStats {
  branch_id: number;
  branch_name: string;
  total_contracts: number;
  active_contracts: number;
  pending_payments: number;
  overdue_payments: number;
  total_revenue: number;
  pending_revenue: number;
}

export interface DashboardStats {
  total_contracts: number;
  active_contracts: number;
  pending_signatures: number;
  overdue_payments: number;
  total_revenue: number;
  monthly_revenue: number;
  branch_stats: BranchStats[];
}

// Signature workflow types
export interface SignatureWorkflowStep {
  step: 'client_sign' | 'employee_approve' | 'management_seal';
  completed: boolean;
  completed_at?: string;
  completed_by?: string;
}

export interface SignatureWorkflow {
  contract_id: number;
  steps: SignatureWorkflowStep[];
  current_step: number;
  is_complete: boolean;
}

// Report types
export interface ReportFilters {
  branch_id?: number;
  date_from: string;
  date_to: string;
  contract_type?: Contract['contract_type'];
  status?: Contract['status'];
}

export interface ContractReport {
  contract_number: string;
  client_name: string;
  contract_type: string;
  branch_name: string;
  value: number;
  status: string;
  created_at: string;
  signed_at?: string;
}

// Authentication context types
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Branch context types
export interface BranchContextType {
  currentBranch: Branch | null;
  branches: Branch[];
  switchBranch: (branchId: number) => void;
  canAccessBranch: (branchId: number) => boolean;
}

// Contract type labels (Arabic)
export const CONTRACT_TYPE_LABELS: Record<Contract['contract_type'], string> = {
  agreement: 'عقد اتفاق',
  concrete_supervision: 'عقد إشراف على الهيكل الخرساني',
  comprehensive_supervision: 'عقد إشراف شامل التشطيبات'
};

// Status labels (Arabic)
export const CONTRACT_STATUS_LABELS: Record<Contract['status'], string> = {
  draft: 'مسودة',
  pending_client_signature: 'في انتظار توقيع العميل',
  client_signed: 'وقع العميل',
  employee_approved: 'معتمد من الموظف',
  fully_executed: 'منفذ بالكامل',
  archived: 'مؤرشف'
};

// Payment status labels (Arabic)
export const PAYMENT_STATUS_LABELS: Record<Payment['status'], string> = {
  pending: 'معلق',
  paid: 'مدفوع',
  overdue: 'متأخر'
};

// User role labels (Arabic)
export const USER_ROLE_LABELS: Record<User['role'], string> = {
  employee: 'موظف',
  manager: 'مدير',
  admin: 'مدير النظام'
};

// Branch codes and names
export const BRANCH_DATA = [
  { code: 'JED', name: 'جدة' },
  { code: 'MEC', name: 'مكة' },
  { code: 'AHS', name: 'الأحساء' },
  { code: 'HAL', name: 'حلي' }
];
