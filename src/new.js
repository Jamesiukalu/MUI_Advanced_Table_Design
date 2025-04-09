import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext } from '../../app/AuthContext';
import ProfitAndLoss from './ProfitAndLoss';
import { useParams } from 'react-router-dom';
import { getPnl, getStoreById } from '../../api';

// Mock the necessary modules
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../api/finance', () => ({
  getPnl: jest.fn(),
}));

jest.mock('../../api/stores', () => ({
  getStoreById: jest.fn(),
}));

// Mock child components
jest.mock('../common/PageHeader', () => () => <div>PageHeader Mock</div>);
jest.mock('../common/Loading', () => () => <div>Loading Mock</div>);

describe('ProfitAndLoss Component', () => {
  const mockAuthContext = {
    isLoading: false,
    setIsLoading: jest.fn(),
  };

  const mockStoreId = '123';
  const mockStoreDetails = {
    Gross_Area_Quantity: 1000,
    Market: 'Test Market',
  };

  const mockPnlData = [
    {
      Store: '123',
      Metric: 'NetSales',
      Fiscal_Year: 2023,
      Value: '100000',
      YTD: '50000',
    },
    // Add more mock data as needed
  ];

  const mockMarketData = [
    {
      Store: '456',
      Metric: 'NetSales',
      Fiscal_Year: 2023,
      Value: '120000',
      YTD: '60000',
    },
    // Add more mock data as needed
  ];

  beforeEach(() => {
    useParams.mockReturnValue({ storeId: mockStoreId });
    getPnl.mockImplementation((_, market, storeId) => {
      if (market) return Promise.resolve(mockMarketData);
      if (storeId) return Promise.resolve(mockPnlData);
      return Promise.resolve([]);
    });
    getStoreById.mockResolvedValue(mockStoreDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when isLoading is true', () => {
    render(
      <AuthContext.Provider value={{ ...mockAuthContext, isLoading: true }}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Loading Mock')).toBeInTheDocument();
  });

  it('fetches data on mount', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(getPnl).toHaveBeenCalledWith(undefined, undefined, mockStoreId);
      expect(getPnl).toHaveBeenCalledWith(undefined, 'Test Market', undefined);
      expect(getStoreById).toHaveBeenCalledWith(mockStoreId);
    });
  });

  it('renders the component with card view by default', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Store Profit and Loss Metrics')).toBeInTheDocument();
      expect(screen.getByText('Comparison Indicators:')).toBeInTheDocument();
      expect(screen.getByText('Sales')).toBeInTheDocument();
      expect(screen.getByText('Gross Profit')).toBeInTheDocument();
    });
  });

  it('switches between card and table view', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      const switchInput = screen.getByRole('checkbox');
      fireEvent.click(switchInput);
      expect(screen.getByText('High Level Summary')).toBeInTheDocument();
    });
  });

  it('expands and collapses NRE and RE sections', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      const nreLink = screen.getByText('View More', { selector: 'a' });
      fireEvent.click(nreLink);
      expect(screen.getByText('View Less')).toBeInTheDocument();
    });
  });

  it('handles year change', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      // Mock the PageHeader's year change handler
      const yearSelect = screen.getByRole('combobox');
      fireEvent.change(yearSelect, { target: { value: '2022' } });
      // Add assertions for year change behavior
    });
  });

  it('displays correct arrow icons based on comparison', async () => {
    // Mock data where store value is higher than market
    const highStoreData = [
      {
        Store: '123',
        Metric: 'NetSales',
        Fiscal_Year: 2023,
        Value: '150000',
        YTD: '75000',
      },
    ];

    const lowMarketData = [
      {
        Store: '456',
        Metric: 'NetSales',
        Fiscal_Year: 2023,
        Value: '100000',
        YTD: '50000',
      },
    ];

    getPnl.mockImplementation((_, market) => {
      if (market) return Promise.resolve(lowMarketData);
      return Promise.resolve(highStoreData);
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      // Should show up arrow for store (green) and down arrow for market (red)
      const upArrows = screen.getAllByTestId('ArrowDropUpIcon');
      const downArrows = screen.getAllByTestId('ArrowDropDownIcon');
      expect(upArrows.length).toBeGreaterThan(0);
      expect(downArrows.length).toBeGreaterThan(0);
    });
  });

  it('handles error state when data is not available', async () => {
    getPnl.mockResolvedValue([]);
    getStoreById.mockResolvedValue({});

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/N\/A|0/)).toBeInTheDocument();
    });
  });

  it('formats percentage values correctly', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      const percentageValues = screen.getAllByText(/%/);
      percentageValues.forEach(value => {
        expect(value.textContent).toMatch(/\d+\.\d{2}%/);
      });
    });
  });

  it('formats dollar values correctly', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfitAndLoss />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      const dollarValues = screen.getAllByText(/\$\d+/);
      expect(dollarValues.length).toBeGreaterThan(0);
    });
  });
});



