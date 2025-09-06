import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '@/components/dashboard/main-dashboard';
import { useAuth } from '@/hooks/useAuth';

// Mock the useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('Dashboard', () => {
  const mockUseAuth = useAuth as jest.Mock;
  const mockLogout = jest.fn();

  const mockStats = {
    total_contracts: 10,
    active_contracts: 8,
    pending_signatures: 2,
    overdue_payments: 1,
    total_revenue: 100000,
    monthly_revenue: 10000,
  };

  const mockContracts = [
    { id: 1, contract_number: 'C-001', client_name: 'Client A', created_at: '2023-01-01', status: 'fully_executed', value: 5000 },
  ];

  const mockPayments = [
    { id: 1, due_date: '2023-01-15', status: 'pending', amount: 1000 },
  ];

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 1,
        email: 'test@example.com',
        role: 'admin',
        branch: { name: 'Main Branch' },
      },
      logout: mockLogout,
    });

    global.fetch = jest.fn((url) => {
      if (url.toString().includes('/api/dashboard/stats')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockStats }),
        });
      }
      if (url.toString().includes('/api/contracts')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: { contracts: mockContracts } }),
        });
      }
      if (url.toString().includes('/api/payments')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: { payments: mockPayments } }),
        });
      }
      return Promise.resolve({ ok: false });
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText('جاري تحميل لوحة التحكم...')).toBeInTheDocument();
  });

  it('should render the dashboard with data after a successful fetch', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('مرحباً، test@example.com')).toBeInTheDocument();
    });

    expect(screen.getByText('10')).toBeInTheDocument(); // Total contracts
    expect(screen.getByText('Client A')).toBeInTheDocument(); // Recent contract
    expect(screen.getByText('دفعة رقم 1')).toBeInTheDocument(); // Pending payment
  });

  it('should call the logout function when the logout button is clicked', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('مرحباً، test@example.com')).toBeInTheDocument();
    });

    const logoutButton = screen.getByText('تسجيل الخروج');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  it('should log an error to the console if fetching data fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch = jest.fn(() => Promise.reject('API Error')) as jest.Mock;

    render(<Dashboard />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load dashboard data:', 'API Error');
    });

    consoleErrorSpy.mockRestore();
  });
});
