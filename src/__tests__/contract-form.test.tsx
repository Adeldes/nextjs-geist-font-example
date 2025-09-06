import { render, screen, fireEvent } from '@testing-library/react';
import ContractForm from '@/components/contracts/contract-form';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Mock the useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ContractForm', () => {
  const mockUseAuth = useAuth as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockPush = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 1,
        name: 'Test User',
        branch_id: 1,
      },
    });
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { id: 1 } }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the first step of the form by default', () => {
    render(<ContractForm />);
    expect(screen.getByText('بيانات العميل والعقد')).toBeInTheDocument();
    expect(screen.getByLabelText('اسم العميل *')).toBeInTheDocument();
  });

  it('should enable the next button when required fields are filled', () => {
    render(<ContractForm />);

    const clientNameInput = screen.getByLabelText('اسم العميل *');
    fireEvent.change(clientNameInput, { target: { value: 'Test Client' } });

    const nextButton = screen.getByText('التالي');
    expect(nextButton).not.toBeDisabled();
  });

  it('should navigate to the next step when the next button is clicked', () => {
    render(<ContractForm />);

    const clientNameInput = screen.getByLabelText('اسم العميل *');
    fireEvent.change(clientNameInput, { target: { value: 'Test Client' } });

    const nextButton = screen.getByText('التالي');
    fireEvent.click(nextButton);

    expect(screen.getByText('تفاصيل العقد المالية')).toBeInTheDocument();
    expect(screen.getByLabelText('قيمة العقد (ريال سعودي) *')).toBeInTheDocument();
  });

  it('should navigate to the previous step when the previous button is clicked', () => {
    render(<ContractForm />);

    // Go to step 2
    fireEvent.change(screen.getByLabelText('اسم العميل *'), { target: { value: 'Test Client' } });
    fireEvent.click(screen.getByText('التالي'));

    // Go back to step 1
    const prevButton = screen.getByText('السابق');
    fireEvent.click(prevButton);

    expect(screen.getByText('بيانات العميل والعقد')).toBeInTheDocument();
  });

  it('should show the submit button on the final step', () => {
    render(<ContractForm />);

    // Go to step 2
    fireEvent.change(screen.getByLabelText('اسم العميل *'), { target: { value: 'Test Client' } });
    fireEvent.click(screen.getByText('التالي'));

    // Go to step 3
    fireEvent.change(screen.getByLabelText('قيمة العقد (ريال سعودي) *'), { target: { value: '1000' } });
    fireEvent.click(screen.getByText('التالي'));

    expect(screen.getByText('إنشاء العقد')).toBeInTheDocument();
  });

  it('should submit the form when the submit button is clicked', async () => {
    const onSuccess = jest.fn();
    render(<ContractForm onSuccess={onSuccess} />);

    // Fill step 1
    fireEvent.change(screen.getByLabelText('اسم العميل *'), { target: { value: 'Test Client' } });
    fireEvent.click(screen.getByText('التالي'));

    // Fill step 2
    fireEvent.change(screen.getByLabelText('قيمة العقد (ريال سعودي) *'), { target: { value: '1000' } });
    fireEvent.click(screen.getByText('التالي'));

    // Submit form
    const submitButton = screen.getByText('إنشاء العقد');
    fireEvent.click(submitButton);

    await screen.findByText('جاري الإنشاء...');

    expect(global.fetch).toHaveBeenCalledTimes(2); // One for contract, one for audit log
    expect(onSuccess).toHaveBeenCalled();
  });
});
