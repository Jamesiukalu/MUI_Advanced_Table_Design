import React, { useContext } from 'react';
import {
  Box,
  styled,
  Link,
  Typography,
  Divider,
  Grid2 as Grid,
  Card,
  CardContent,
  Tooltip,
  Switch,
  FormControlLabel,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { green, red } from '@mui/material/colors';
import { MainContentContainer } from '../common/styles';
import PageHeader from '../common/PageHeader';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPnl } from '../../api/finance';
import { getFormattedDollarValue } from '../performance/common';
import { AuthContext } from '../../app/AuthContext';
import LoadingLayout from '../common/Loading';
import { getStoreById } from '../../api/stores';

const Legend = () => {
  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 1, md: 2 },
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        Comparison Indicators:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 1,
        }}
      >
        <ArrowDropUpIcon sx={{ color: green[500] }} />
        <Typography variant="body2">
          Store value is higher than market{' '}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ArrowDropDownIcon sx={{ color: red[500] }} />
        <Typography variant="body2">
          Store value is lower than market{' '}
        </Typography>
      </Box>
    </Box>
  );
};
const MetricCard = styled(Card)(({ theme }) => ({
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2),
  width: '100%',
}));
const MetricTitle = styled(Typography)(({ theme }) => ({
  backgroundColor: '#EAF3E6',
  padding: theme.spacing(1),
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  fontWeight: 700,
  fontSize: '1.1rem',
  paddingLeft: theme.spacing(1.5),
}));
const DataRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0.5),
}));
const DataLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));
const DataValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

// Helper function to determine arrow direction
const parseValue = (value) => {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/[^0-9.-]/g, ''));
  }
  return value;
};
const getArrowIcon = (storeValue, marketValue, isMarket = false) => {
  const parsedStoreValue = parseValue(storeValue);
  const parsedMarketValue = parseValue(marketValue);

  if (parsedStoreValue > parsedMarketValue) {
    return isMarket ? (
      <Tooltip title="Store value is higher than market">
        <ArrowDropDownIcon sx={{ color: red[500] }} />
      </Tooltip>
    ) : (
      <Tooltip title="Store value is higher than market">
        <ArrowDropUpIcon sx={{ color: green[500] }} />
      </Tooltip>
    );
  } else if (parsedStoreValue < parsedMarketValue) {
    return isMarket ? (
      <Tooltip title="Store value is lower than market">
        <ArrowDropUpIcon sx={{ color: green[500] }} />
      </Tooltip>
    ) : (
      <Tooltip title="Store value is lower than market">
        <ArrowDropDownIcon sx={{ color: red[500] }} />
      </Tooltip>
    );
  }
  return null;
};

const ProfitAndLoss = () => {
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const fiscalYear = currentMonth === 1 ? currentYear : currentYear + 1;

  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [selectedYear, setSelectedYear] = useState(fiscalYear);
  const [pandLData, setPandLData] = useState();
  const [marketData, setMarketData] = useState();
  const [storeDetails, setStoreDetails] = useState();
  const [isTableView, setIsTableView] = useState(false);

  const metricMapping = {
    NetSales: 'Sales',
    'Gross Profit': 'Gross Profit',
    'Non-Real Estate Expenses': 'NRE',
    'Non-Real Estate Expenses / Wages': '- Wages',
    'Non-Real Estate Expenses / Utilities': '- Utility',
    'Non-Real Estate Expenses / Maintanence': '- Maintenance',
    'Real Estate': 'RE',
    'Real Estate / Rent': '- Rent',
    'Real Estate / Third Party Rent': '- Third Party Rent',
    'Real Estate / Amortization n Depreciation Expenses': '- Depreciation',
    'Real Estate / Property Tax': '- RE/Prop Tax',
    'Real Estate / Maintenance and Repair Expense': '- Maintenance',
    'Real Estate / Common Area Maintenance': '- Common Area Maintenance',
    'Real Estate / Pre-Opening Expense': '- Pre-Opening Expense',
    'Segment Income': 'Segment Income',
  };

  const [expandedSections, setExpandedSections] = useState({
    NRE: false,
    RE: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getSubMetrics = (parentMetric) => {
    return displayedData.filter((row) => {
      const isSubMetric = row.metric.startsWith('-');
      if (parentMetric === 'NRE') {
        return (
          isSubMetric &&
          ['- Wages', '- Utility', '- Maintenance'].includes(row.metric)
        );
      } else if (parentMetric === 'RE') {
        return (
          isSubMetric &&
          [
            '- Rent',
            '- Third Party Rent',
            '- Depreciation',
            '- RE/Prop Tax',
            '- Maintenance',
            '- Common Area Maintenance',
            '- Pre-Opening Expense',
          ].includes(row.metric)
        );
      }
      return false;
    });
  };
  const updateDisplayedData = (year) => {
    const totalSquareFeet = storeDetails?.['Gross_Area_Quantity'] ?? 0;
    const formatPercentageValue = (value) => {
      if (value === 'Coming soon') {
        return 'Coming soon';
      }
      if (!isFinite(value)) {
        return 'N/A';
      }
      return `${parseFloat(value).toFixed(2)}%`;
    };

    const updatedRows = displayedData.map((row) => {
      const matchedMetric = Object.keys(metricMapping).find(
        (key) => metricMapping[key] === row.metric
      );

      const {
        actual: storeDollarRaw,
        dollarComp: storeDollarPctRaw,
        dollarPerSquareFeet: storeDollarPerSqftRaw,
      } = getMetricForMarket(year, matchedMetric, totalSquareFeet, pandLData);

      const {
        actual: marketDollarRaw,
        dollarComp: marketDollarPctRaw,
        dollarPerSquareFeet: marketDollarPerSqftRaw,
      } = getMetricForMarket(year, matchedMetric, totalSquareFeet, marketData);
      const store_dollar = getFormattedDollarValue({ v: storeDollarRaw }, 'v');
      const store_dollar_pct = formatPercentageValue(storeDollarPctRaw);
      const store_dollar_per_sqft = getFormattedDollarValue(
        { v: storeDollarPerSqftRaw },
        'v'
      );

      const market_dollar = getFormattedDollarValue(
        { v: marketDollarRaw },
        'v'
      );
      const market_dollar_pct = formatPercentageValue(marketDollarPctRaw);
      const market_dollar_per_sqft = getFormattedDollarValue(
        { v: marketDollarPerSqftRaw },
        'v'
      );

      return {
        ...row,
        store_dollar,
        store_dollar_pct,
        store_dollar_per_sqft,
        market_dollar,
        market_dollar_pct,
        market_dollar_per_sqft,
      };
    });
    setDisplayedData(updatedRows);
    const _value = displayedData.filter(
      (x) =>
        x.metric == 'Sales' && (x.store_dollar == '0.0' || x.store_dollar == 0)
    );
    if (_value && _value.length != 0) setIsDataAvailable(true);
    if (isDataAvailable) {
      setSelectedYear(currentYear);
    } else {
      setSelectedYear(fiscalYear);
    }
  };

  // Function to handle year change from dropdown
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    updateDisplayedData(year); // Update displayed data for the new year
  };

  const [displayedData, setDisplayedData] = useState([
    {
      metric: 'Sales',
      id: '1',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: 'Gross Profit',
      id: '2',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: 'NRE',
      id: '4',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- Wages',
      id: '5',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- Utility',
      id: '6',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- Maintenance',
      id: '7',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: 'RE',
      id: '8',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- Rent',
      id: '9',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- Third Party Rent',
      id: '10',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- Depreciation',
      id: '11',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- RE/Prop Tax',
      id: '12',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- Common Area Maintenance',
      id: '13',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: '- Pre-Opening Expense',
      id: '14',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
    {
      metric: 'Segment Income',
      id: '15',
      store_dollar: 0.0,
      store_dollar_pct: '0.0%',
      store_dollar_per_sqft: 0.0,
      market_dollar: 0.0,
      market_dollar_pct: '0.0%',
      market_dollar_per_sqft: 0.0,
    },
  ]);

  const { storeId } = useParams();
  const isSubMetric = (metric) => metric.startsWith('-');

  const getMetricForMarket = (yr, metricName, squareFootage, data) => {
    const distinctStores = new Set(data.map((x) => x.Store)).size;
    let totalNetSales = data
      .filter((x) => x.Fiscal_Year === yr && x.Metric === metricName)
      .map((x) => parseInt(x.Value))
      .reduce((acc, curr) => acc + curr, 0);

    let prevTotalNetSales = data
      .filter((x) => x.Fiscal_Year === yr - 1 && x.Metric === metricName)
      .map((x) => parseInt(x.Value))
      .reduce((acc, curr) => acc + curr, 0);
    if (new Date().getFullYear() + 1 === yr) {
      totalNetSales = data
        .filter((x) => x.Fiscal_Year === yr && x.Metric === metricName)
        .map((x) => parseInt(x.YTD, 10) || 0) // Default to 0 if parsing fails
        .reduce((acc, curr) => acc + curr, 0);

      prevTotalNetSales = data
        .filter((x) => x.Fiscal_Year === yr - 1 && x.Metric === metricName)
        .map((x) => parseInt(x.YTD))
        .reduce((acc, curr) => acc + curr, 0);
    }
    let dollarCompValue =
      ((totalNetSales / distinctStores - prevTotalNetSales / distinctStores) /
        (prevTotalNetSales / distinctStores)) *
      100;
    const actual = totalNetSales / distinctStores;
    const dollarComp = dollarCompValue;

    const dollarPerSquareFeet = totalNetSales / distinctStores / squareFootage;
    return {
      actual,
      dollarComp,
      dollarPerSquareFeet,
    };
  };
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const pandLDataRaw = await getPnl(undefined, undefined, storeId);
      setPandLData(pandLDataRaw);

      const marketDataRaw = await getPnl(
        undefined,
        pandLDataRaw?.[0]?.['Market'],
        undefined
      );
      setMarketData(marketDataRaw);
      const storeDetails = await getStoreById(storeId);
      setStoreDetails(storeDetails);
      setIsLoading(false);
    }

    fetchData();
  }, [storeId]);

  useEffect(() => {
    if (pandLData && storeDetails) {
      updateDisplayedData(selectedYear);
    }
  }, [pandLData, storeDetails, selectedYear]);

  const breadcrumbs = [
    { name: 'Stores', href: '/stores' },
    { name: 'Stores Details', href: `/store/${storeId}/details` },
    { name: 'P&L' },
  ];
  if (isLoading) {
    return (
      <div style={{ position: 'fixed', top: '0', left: '0' }}>
        <LoadingLayout />
      </div>
    );
  }

  const renderCardView = () => (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: { xs: 'center', md: 'left' },
      }}
    >
      {displayedData
        .filter((row) => !row.metric.startsWith('-')) // Hide sub-metrics by default
        .map((row, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} md={6}>
              <MetricCard>
                <MetricTitle>
                  {row.metric}
                  {(row.metric === 'NRE' || row.metric === 'RE') && (
                    <Link
                      component="button"
                      variant="body2"
                      underline="hover"
                      onClick={() => toggleSection(row.metric)}
                      sx={{
                        ml: 1,
                      }}
                    >
                      {expandedSections[row.metric] ? 'View Less' : 'View More'}
                    </Link>
                  )}
                </MetricTitle>
                <CardContent>
                  <Grid container spacing={3} sx={{ mx: { xs: 0, md: 2 } }}>
                    <Grid item xs={6}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Store:
                      </Typography>
                      <DataRow>
                        <DataLabel
                          sx={{ minWidth: { xs: '30px', md: '60px' } }}
                        >
                          $
                        </DataLabel>
                        <DataValue>
                          {row.store_dollar}
                          {getArrowIcon(row.store_dollar, row.market_dollar)}
                        </DataValue>
                      </DataRow>

                      <DataRow>
                        <DataLabel
                          sx={{ minWidth: { xs: '30px', md: '60px' } }}
                        >
                          Comp
                        </DataLabel>
                        <DataValue>
                          {row.store_dollar_pct}
                          {getArrowIcon(
                            parseFloat(row.store_dollar_pct),
                            parseFloat(row.market_dollar_pct)
                          )}
                        </DataValue>
                      </DataRow>

                      <DataRow>
                        <DataLabel
                          sx={{ minWidth: { xs: '30px', md: '60px' } }}
                        >
                          $/Sqft
                        </DataLabel>
                        <DataValue>
                          {row.store_dollar_per_sqft}
                          {getArrowIcon(
                            row.store_dollar_per_sqft,
                            row.market_dollar_per_sqft
                          )}
                        </DataValue>
                      </DataRow>
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ mx: { xs: 0, md: 2 } }}
                    />
                    <Grid item xs={6}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Market:
                      </Typography>

                      <DataRow>
                        <DataLabel
                          sx={{ minWidth: { xs: '30px', md: '60px' } }}
                        >
                          $
                        </DataLabel>
                        <DataValue>
                          {row.market_dollar}
                          {getArrowIcon(
                            row.store_dollar,
                            row.market_dollar,
                            true
                          )}
                        </DataValue>
                      </DataRow>

                      <DataRow>
                        <DataLabel
                          sx={{ minWidth: { xs: '30px', md: '60px' } }}
                        >
                          Comp
                        </DataLabel>
                        <DataValue>
                          {row.market_dollar_pct}
                          {getArrowIcon(
                            parseFloat(row.store_dollar_pct),
                            parseFloat(row.market_dollar_pct),
                            true
                          )}
                        </DataValue>
                      </DataRow>

                      <DataRow>
                        <DataLabel
                          sx={{ minWidth: { xs: '30px', md: '60px' } }}
                        >
                          $/Sqft
                        </DataLabel>
                        <DataValue>
                          {row.market_dollar_per_sqft}
                          {getArrowIcon(
                            row.store_dollar_per_sqft,
                            row.market_dollar_per_sqft,
                            true
                          )}
                        </DataValue>
                      </DataRow>
                    </Grid>
                  </Grid>
                </CardContent>
              </MetricCard>
            </Grid>
            {/* Render sub-metrics if section is expanded */}
            {(row.metric === 'NRE' || row.metric === 'RE') &&
              expandedSections[row.metric] && (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: { xs: 'center', md: 'left' },
                  }}
                >
                  {getSubMetrics(row.metric).map((subRow, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <Grid item xs={12} md={6}>
                        <MetricCard>
                          <MetricTitle sx={{ color: '#0071ce' }}>
                            {row.metric === 'NRE'
                              ? `NRE${subRow.metric}`
                              : `RE${subRow.metric}`}
                          </MetricTitle>
                          <CardContent>
                            <Grid
                              container
                              spacing={3}
                              sx={{ mx: { xs: 0, md: 2 } }}
                            >
                              <Grid item xs={6}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    mb: 2,
                                    fontWeight: 600,
                                    color: '#0071ce',
                                  }}
                                >
                                  Store:
                                </Typography>
                                <DataRow>
                                  <DataLabel
                                    sx={{
                                      minWidth: { xs: '30px', md: '60px' },
                                    }}
                                  >
                                    $
                                  </DataLabel>
                                  <DataValue sx={{ color: '#0071ce' }}>
                                    {subRow.store_dollar}
                                    {getArrowIcon(
                                      subRow.store_dollar,
                                      subRow.market_dollar
                                    )}
                                  </DataValue>
                                </DataRow>

                                <DataRow>
                                  <DataLabel
                                    sx={{
                                      minWidth: { xs: '30px', md: '60px' },
                                    }}
                                  >
                                    Comp
                                  </DataLabel>
                                  <DataValue sx={{ color: '#0071ce' }}>
                                    {subRow.store_dollar_pct}
                                    {getArrowIcon(
                                      parseFloat(subRow.store_dollar_pct),
                                      parseFloat(subRow.market_dollar_pct)
                                    )}
                                  </DataValue>
                                </DataRow>

                                <DataRow>
                                  <DataLabel
                                    sx={{
                                      minWidth: { xs: '30px', md: '60px' },
                                    }}
                                  >
                                    $/Sqft
                                  </DataLabel>
                                  <DataValue sx={{ color: '#0071ce' }}>
                                    {subRow.store_dollar_per_sqft}
                                    {getArrowIcon(
                                      subRow.store_dollar_per_sqft,
                                      subRow.market_dollar_per_sqft
                                    )}
                                  </DataValue>
                                </DataRow>
                              </Grid>
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ mx: { xs: 0, md: 2 } }}
                              />
                              <Grid item xs={6}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    mb: 2,
                                    fontWeight: 600,
                                    color: '#0071ce',
                                  }}
                                >
                                  Market:
                                </Typography>

                                <DataRow>
                                  <DataLabel
                                    sx={{
                                      minWidth: { xs: '30px', md: '60px' },
                                    }}
                                  >
                                    $
                                  </DataLabel>
                                  <DataValue sx={{ color: '#0071ce' }}>
                                    {subRow.market_dollar}
                                    {getArrowIcon(
                                      subRow.store_dollar,
                                      subRow.market_dollar,
                                      true
                                    )}
                                  </DataValue>
                                </DataRow>

                                <DataRow>
                                  <DataLabel
                                    sx={{
                                      minWidth: { xs: '30px', md: '60px' },
                                    }}
                                  >
                                    Comp
                                  </DataLabel>
                                  <DataValue sx={{ color: '#0071ce' }}>
                                    {subRow.market_dollar_pct}
                                    {getArrowIcon(
                                      parseFloat(subRow.store_dollar_pct),
                                      parseFloat(subRow.market_dollar_pct),
                                      true
                                    )}
                                  </DataValue>
                                </DataRow>

                                <DataRow>
                                  <DataLabel
                                    sx={{
                                      minWidth: { xs: '30px', md: '60px' },
                                    }}
                                  >
                                    $/Sqft
                                  </DataLabel>
                                  <DataValue sx={{ color: '#0071ce' }}>
                                    {subRow.market_dollar_per_sqft}
                                    {getArrowIcon(
                                      subRow.store_dollar_per_sqft,
                                      subRow.market_dollar_per_sqft,
                                      true
                                    )}
                                  </DataValue>
                                </DataRow>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </MetricCard>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              )}
          </React.Fragment>
        ))}
    </Grid>
  );

  const renderTableView = () => (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="financial table">
        <TableHead>
          <TableRow>
            <TableCell
              rowSpan={2}
              sx={{
                borderRight: '1px solid #e0e0e0',
                fontWeight: 700,
                backgroundColor: '#f5f5f5',
              }}
            >
              Metric
            </TableCell>
            <TableCell
              colSpan={3}
              align="center"
              sx={{
                fontWeight: 700,
                backgroundColor: '#f5f5f5',
                borderRight: '1px solid #e0e0e0',
              }}
            >
              Store
            </TableCell>
            <TableCell
              colSpan={3}
              align="center"
              sx={{ fontWeight: 700, backgroundColor: '#f5f5f5' }}
            >
              Market
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, backgroundColor: '#f9f9f9' }}>
              $ ('000)
            </TableCell>
            <TableCell sx={{ fontWeight: 600, backgroundColor: '#f9f9f9' }}>
              $
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                backgroundColor: '#f9f9f9',
                borderRight: '1px solid #e0e0e0',
              }}
            >
              $/Sqft
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                backgroundColor: '#f9f9f9',
              }}
            >
              $ ('000)
            </TableCell>
            <TableCell sx={{ fontWeight: 600, backgroundColor: '#f9f9f9' }}>
              $
            </TableCell>
            <TableCell sx={{ fontWeight: 600, backgroundColor: '#f9f9f9' }}>
              $/Sqft
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {displayedData.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  borderRight: '1px solid #e0e0e0',
                  fontWeight: 600,
                  backgroundColor: '#fafafa',
                  color: isSubMetric(row.metric) ? '#0071ce' : 'inherit',
                }}
              >
                {row.metric}
              </TableCell>
              <TableCell
                sx={{ color: isSubMetric(row.metric) ? '#0071ce' : 'inherit' }}
              >
                {row.store_dollar}
                {getArrowIcon(row.store_dollar, row.market_dollar)}
              </TableCell>

              <TableCell
                sx={{ color: isSubMetric(row.metric) ? '#0071ce' : 'inherit' }}
              >
                {row.store_dollar_pct}
                {getArrowIcon(
                  parseFloat(row.store_dollar_pct),
                  parseFloat(row.market_dollar_pct)
                )}
              </TableCell>

              <TableCell
                sx={{
                  borderRight: '1px solid #e0e0e0',
                  color: isSubMetric(row.metric) ? '#0071ce' : 'inherit',
                }}
              >
                {row.store_dollar_per_sqft}
                {getArrowIcon(
                  row.store_dollar_per_sqft,
                  row.market_dollar_per_sqft
                )}
              </TableCell>

              <TableCell
                sx={{ color: isSubMetric(row.metric) ? '#0071ce' : 'inherit' }}
              >
                {row.market_dollar}
                {getArrowIcon(row.store_dollar, row.market_dollar, true)}
              </TableCell>

              <TableCell
                sx={{ color: isSubMetric(row.metric) ? '#0071ce' : 'inherit' }}
              >
                {row.market_dollar_pct}
                {getArrowIcon(
                  parseFloat(row.store_dollar_pct),
                  parseFloat(row.market_dollar_pct),
                  true
                )}
              </TableCell>

              <TableCell
                sx={{ color: isSubMetric(row.metric) ? '#0071ce' : 'inherit' }}
              >
                {row.market_dollar_per_sqft}
                {getArrowIcon(
                  row.store_dollar_per_sqft,
                  row.market_dollar_per_sqft,
                  true
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        currentYearSelected={selectedYear}
        filterYearChangeHandler={handleYearChange}
        showLastUpdatedDate={true}
      />
      <MainContentContainer>
        <Box
          sx={{
            padding: { xs: '8px', md: '16px' },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 700,
              display: 'flex',
            }}
          >
            Store Profit and Loss Metrics
            <FormControlLabel
              control={
                <Switch
                  checked={isTableView}
                  onChange={(event) => setIsTableView(event.target.checked)}
                  color="primary"
                />
              }
              label={!isTableView ? 'Detailed Overview' : 'High Level Summary'}
              sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}
            />
          </Typography>
          <Legend />
          {isTableView ? renderTableView() : renderCardView()}
        </Box>
      </MainContentContainer>
    </>
  );
};

export default ProfitAndLoss;



import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import CurrentYearSale from './CurrentYearSale';
import LastThreeYearSale from './LastThreeYearSale';
import { MainContentContainer } from '../common/styles';
import PageHeader from '../common/PageHeader';
import PerformanceTab from './PerformanceTab';
import { Typography } from '@mui/material';
import AgeOfpopulation from './immigration/AgeOfPopulation';
import { getPopulationStatsByStoreIdAndCategory } from '../../api/demographics';
import { AuthContext } from '../../app/AuthContext';
import LoadingLayout from '../common/Loading';
import { getStoreById } from '../../api/stores';

import {
  getStoreExecutiveSummaryById,
  getStoreBandMById,
  getStoreMetricsById,
} from '../../api/stores';
import { useParams } from 'react-router-dom';
import { getDollarValue, formatTrafficByYear } from './common';
import rem from '../../helpers/PixelToRem';
import {
  getExecutiveSummary,
  getGPMarginPerFiscal,
  getGPMarginValFiscal,
  getSalesFiscal,
  salesSqFeet,
  foodPercentage,
  getSegmentIncFiscal,
  getCompSalesFiscal,
} from '../../api/finance';

const SummaryDetailContainer = styled('div')`
  display: grid;
`;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: '20px 10px' }}>{children}</Box>}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const getPerformanceData = (stats, currentYearSelected) => {
  return [
    {
      icon: (
        <img
          src="/images/icons/sales-icon.svg"
          alt="Sales icon"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: getSalesFiscal(stats, currentYearSelected),
      label: 'Sales',
    },
    {
      icon: (
        <img
          src="/images/icons/compsales-icon.svg"
          alt="Comp Sales icon"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: getCompSalesFiscal(stats, currentYearSelected) + '%',
      label: 'Comp Sales %',
    },
    {
      icon: (
        <img
          src="/images/icons/editdar-icon.svg"
          alt="EBITDAR icon"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: getSegmentIncFiscal(stats, currentYearSelected),
      label: 'Segment Income $',
    },
    {
      icon: (
        <img
          src="/images/icons/gp-margin-icon.svg"
          alt="GP Margin icon"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      label: 'GP Margin',
      value: getGPMarginValFiscal(stats, currentYearSelected),
    },
    {
      icon: (
        <img
          src="/images/icons/gp-margin-percentage.svg"
          alt="GP Margin % icon"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      label: 'GP Margin %',
      value: getGPMarginPerFiscal(stats, currentYearSelected),
    },
  ];
};
// need to verify thus sql value are same fotr all object
const getProductivityData = (currentYear, finance, master, storeDetails) => {
  return [
    {
      icon: (
        <img
          src="/images/icons/sales-sqft-box.svg"
          alt="Sales/Sqft(BOX)"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      label: 'Sales/Sqft(BOX)',
      value: salesSqFeet(
        finance,
        storeDetails?.['Gross_Area_Quantity'] ?? 0,
        currentYear
      ),
    },
    {
      icon: (
        <img
          src="/images/icons/sales-sqft-selling.svg"
          alt="Sales/Sqft(Selling)"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: salesSqFeet(
        finance,
        storeDetails?.['Merchandise_Sales_Area_Quantity'] ?? 0,
        currentYear
      ),
      label: 'Sales/Sqft(Selling)',
    },
    {
      icon: (
        <img
          src="/images/icons/weekly-traffic.svg"
          alt="Weekly Traffic"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      label: 'Average Weekly Traffic',
      value: formatTrafficByYear(
        master,
        currentYear,
        'Average_Traffic_By_Week'
      ),
    },
    {
      icon: (
        <img
          src="/images/icons/average-basket.svg"
          alt="Average Basket"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: formatTrafficByYear(master, currentYear, 'Average_Basket'),
      label: 'Average Basket',
    },
    {
      icon: (
        <img
          src="/images/icons/food-sales-percentage.svg"
          alt="Food Sales %"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: foodPercentage(
        finance,
        master?.[0]?.Food_Sales ?? 0,
        currentYear,
        'Food Sales'
      ),
      label: 'Food Sales %',
    },
    {
      icon: (
        <img
          src="/images/icons/gm-sales-percentage.svg"
          alt="GM Sales %"
          style={{ width: '24px', height: '24px' }}
        />
      ),

      value: foodPercentage(
        finance,
        master?.[0]?.GM_Sales ?? 0,
        currentYear,
        'GM Sales'
      ),
      label: 'GM Sales %',
    },
  ];
};
const getTotalShare = (total, financeSummary, year, metric) => {
  let currentYearData =
    financeSummary && financeSummary.length > 0
      ? financeSummary.filter((dataValue) => dataValue.Fiscal_Year === year)
      : [];
  let currData = currentYearData.find((x) => x.Metric === metric);
  return (currData?.['Value'] / total) * 100;
};
const getPotentialData = (finance, storeId, metrics, financeSummary, year) => {
  const storeDetails = finance.find((x) => x['Store_Number'] === storeId);

  const totalAtrs = storeDetails?.['Total ATRS'];
  const foodAtrs = storeDetails?.['Food ATRS'];
  const gmAtrs = storeDetails?.['GM ATRS'];
  const totalAtrsPercentage = getTotalShare(
    totalAtrs,
    financeSummary,
    year,
    'NetSales'
  );
  const foodAtrsPercentage = getTotalShare(
    foodAtrs,
    financeSummary,
    year,
    'Food Sales'
  );

  const gmAtrsPercentage = getTotalShare(
    gmAtrs,
    financeSummary,
    year,
    'GM Sales'
  );

  return [
    {
      icon: (
        <img
          src="/images/icons/total-atrs.svg"
          alt="Total ATRS"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: getDollarValue({ v: totalAtrs }, 'v'),
      label: 'Total ATRS',
    },
    {
      icon: (
        <img
          src="/images/icons/food-atrs.svg"
          alt="Food ATRS"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: getDollarValue({ v: foodAtrs }, 'v'),
      label: 'Food ATRS',
    },
    {
      icon: (
        <img
          src="/images/icons/gm-atrs.svg"
          alt="GM ATRS"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: getDollarValue({ v: gmAtrs }, 'v'),
      label: 'GM ATRS',
    },
    {
      icon: (
        <img
          src="/images/icons/total-market-share.svg"
          alt="Total Market Share"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: totalAtrsPercentage.toFixed(2) + '%',
      label: 'Total Market Share',
    },
    {
      icon: (
        <img
          src="/images/icons/food-market-share.svg"
          alt="Food Market Share"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: foodAtrsPercentage.toFixed(2) + '%',
      label: 'Food Market Share',
    },
    {
      icon: (
        <img
          src="/images/icons/gm-market-share.svg"
          alt="GM Market Share"
          style={{ width: '24px', height: '24px' }}
        />
      ),
      value: gmAtrsPercentage.toFixed(2) + '%',
      label: 'GM Market Share',
    },
  ];
};
const SummaryDetail = () => {
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const [executiveSummary, setExecutiveSummary] = useState([]);
  const [financeSummary, setFinanceSummary] = useState([]);
  const [atrsData, setAtrsData] = useState([]);
  const [storeMetrics, setStoreMetrics] = useState([]);
  const [storeBandM, setStoreBandM] = useState([]);

  const { storeId } = useParams();
  const [AgeOfPopulation, setAgeOfPopulation] = useState([]);
  const [AgeOfPopulationSeries, setAgeOfPopulationSeries] = useState([]);
  const [AgeHhIncome, setAgeHhIncome] = useState([]);
  const [AgeHhIncomeSeries, setAgeHhIncomeSeries] = useState([]);
  const [Ethnicity, setEthnicity] = useState([]);
  const [EthnicitySeries, setEthnicitySeries] = useState([]);
  const [storeDetails, setStoreDetails] = useState({});
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const fiscalYear = currentMonth === 1 ? currentYear : currentYear + 1;
  const [currentYearSelected, setCurrentYearSelected] = useState(fiscalYear);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const onFilterYearChange = (event) => {
    setCurrentYearSelected(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    getPerformanceData(financeSummary, currentYearSelected);
    const performanceData = getPerformanceData(
      financeSummary,
      currentYearSelected
    );
    const _value = performanceData.filter(
      (x) => x.value == 0 || x.value == null
    );
    if (_value && _value.length != 0) {
      setIsDataAvailable(true);
    }
    if (isDataAvailable) {
      setCurrentYearSelected(currentYearSelected);
    } else {
      setCurrentYearSelected(currentYear);
    }
  }, [currentYearSelected, financeSummary]);

  const updatePopulationData = (apiData) => {
    // Filter to only include relevant data (based on 'catg_nm')
    const filteredData = apiData.filter(
      (data) => data.catg_nm === 'Age of Population'
    );

    // Extract unique categories dynamically from API data
    const dynamicCategories = Array.from(
      new Set(filteredData.map((data) => data.var_nm))
    );

    setAgeOfPopulation(dynamicCategories);
    const data = dynamicCategories.map((category) => {
      const categoryData = filteredData.find(
        (data) => data.var_nm === category
      );

      return {
        y: categoryData
          ? parseFloat((parseFloat(categoryData.var_pct_amt) * 100).toFixed(2)) // Convert to percentage and format to 2 decimals
          : 0,
        color: getColorForCategory(category),
        category: category, // Adding category for easy sorting and mapping
      };
    });

    // Sort the data by `y` values in descending order
    data.sort((a, b) => b.y - a.y);
    // Update `dynamicSeries` using the sorted data
    const dynamicSeries = [
      {
        name: 'Age of Population',
        data: data.map((item) => ({
          y: item.y,
          color: item.color,
        })),
      },
    ];

    // Set the series with the sorted data
    setAgeOfPopulationSeries(dynamicSeries);

    // Set the sorted categories as labels if needed elsewhere
    setAgeOfPopulation(data.map((item) => item.category));
  };

  const getColorForCategory = (category) => {
    const colorMap = {
      'Mid Aged Adults (35 - 64)': '#FA6400',
      'Young Kids (<15)': '#004F9A',
      'Young Adults (20 - 34)': '#3F931C',
      'Mobile Seniors (65 - 79)': '#FFC836',
      'Teens (15 - 19)': '#459FBC',
      'Older Seniors (>80)': '#DE1C24',
    };

    return colorMap[category] || '#CCCCCC';
  };

  const updateHhIncomeData = (apiData) => {
    // Filter to only include relevant data (based on 'catg_nm')
    const filteredData = apiData.filter(
      (data) => data.catg_nm === 'Household Income'
    );

    // Extract unique categories dynamically from API data
    const dynamicCategories = Array.from(
      new Set(filteredData.map((data) => data.var_nm))
    );

    // Build AgeHhIncomeSeries dynamically based on API data
    let dynamicSeries = [
      {
        name: 'Household Income',
        data: dynamicCategories.map((category) => {
          // Find the corresponding data object for the current category
          const categoryData = filteredData.find(
            (data) => data.var_nm === category
          );

          return {
            y: categoryData
              ? parseFloat(
                  (parseFloat(categoryData.var_pct_amt) * 100).toFixed(2)
                )
              : 0, // Convert to percentage and format to 2 decimals
            color: getColorForCategoryHhIncome(category), // You can define a color logic based on your requirement
          };
        }),
      },
    ];

    // Sort the series data by the `y` values in descending order
    dynamicSeries[0].data.sort((a, b) => b.y - a.y);

    // Update AgeHhIncome with sorted dynamic categories
    setAgeHhIncome(
      dynamicCategories.sort((a, b) => {
        const dataA = filteredData.find((data) => data.var_nm === a);
        const dataB = filteredData.find((data) => data.var_nm === b);
        const yA = dataA
          ? parseFloat((parseFloat(dataA.var_pct_amt) * 100).toFixed(2))
          : 0;
        const yB = dataB
          ? parseFloat((parseFloat(dataB.var_pct_amt) * 100).toFixed(2))
          : 0;
        return yB - yA; // Sort in descending order
      })
    );

    // Update the series with sorted data
    setAgeHhIncomeSeries(dynamicSeries);
  };

  // Helper function to assign colors based on the category (or use a default color logic)
  const getColorForCategoryHhIncome = (category) => {
    const colorMap = {
      'Very High Income (>$150k)': '#FA6400',
      'High Income ($100k to $150k)': '#3F931C',
      'Mid Income ($60k to $99k)': '#004F9A',
      'Low Income ($40k to $59k)': '#FFC836',
      'Very Low Income (<$40k)': '#459FBC',
    };

    return colorMap[category] || '#CCCCCC'; // Fallback to a default color
  };

  const updateEthnicityData = (apiData) => {
    const filteredData = apiData.filter(
      (data) => data.catg_nm === 'Visible Minority'
    );

    const dynamicCategories = Array.from(
      new Set(filteredData.map((data) => data.var_nm))
    );

    let dynamicSeries = [
      {
        name: 'Ethnicity',
        data: dynamicCategories.map((category) => {
          const categoryData = filteredData.find(
            (data) => data.var_nm === category
          );

          return {
            y: categoryData
              ? parseFloat(
                  (parseFloat(categoryData.var_pct_amt) * 100).toFixed(2)
                )
              : 0,
            color: getColorForCategoryEthnicity(category),
          };
        }),
      },
    ];

    // Sort the series data by the `y` values in descending order
    dynamicSeries[0].data.sort((a, b) => b.y - a.y);

    // Update Ethnicity with sorted dynamic categories
    setEthnicity(
      dynamicCategories.sort((a, b) => {
        const dataA = filteredData.find((data) => data.var_nm === a);
        const dataB = filteredData.find((data) => data.var_nm === b);
        const yA = dataA
          ? parseFloat((parseFloat(dataA.var_pct_amt) * 100).toFixed(2))
          : 0;
        const yB = dataB
          ? parseFloat((parseFloat(dataB.var_pct_amt) * 100).toFixed(2))
          : 0;
        return yB - yA; // Sort in descending order
      })
    );

    // Update the series with sorted data
    setEthnicitySeries(dynamicSeries);
  };

  // Helper function to assign colors based on the category (or use a default color logic)
  const getColorForCategoryEthnicity = (category) => {
    const colorMap = {
      'Not a Visible Minority': '#FA6400',
      'South Asian': '#3F931C',
      Black: '#004F9A',
      Arab: '#FFC836',
      Filipino: '#FFC836',
    };

    return colorMap[category] || '#CCCCCC'; // Fallback to a default color
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const details = await getStoreById(storeId);
      setStoreDetails(details);
      const result = await getExecutiveSummary(storeId);
      if (result && result.execSummaryForStore)
        setFinanceSummary(result.execSummaryForStore);
      if (result && result.atrsData) setAtrsData(result.atrsData);
      const storeExecutiveSummary = await getStoreExecutiveSummaryById(storeId);
      const storeMetrics = await getStoreMetricsById(storeId);
      const storeBandM = await getStoreBandMById(storeId);

      const ageOfPopulation = await getPopulationStatsByStoreIdAndCategory(
        storeId,
        'Age of Population'
      );
      updatePopulationData(ageOfPopulation);
      const avgHhIncome = await getPopulationStatsByStoreIdAndCategory(
        storeId,
        'Household Income'
      );
      updateHhIncomeData(avgHhIncome);
      const ethnicity = await getPopulationStatsByStoreIdAndCategory(
        storeId,
        'Visible Minority'
      );
      updateEthnicityData(ethnicity);
      setExecutiveSummary(storeExecutiveSummary);
      setStoreMetrics(storeMetrics);
      setStoreBandM(storeBandM);
      setIsLoading(false);
    }

    fetchData();
  }, [storeId]);

  let currentYearStats = null;
  if (executiveSummary && executiveSummary.length) {
    currentYearStats = executiveSummary.sort(
      (a, b) => b.Fiscal_Year - a.Fiscal_Year
    )[0];
  }

  const breadcrumbs = [
    { name: 'Stores', href: '/stores' },
    { name: 'Stores Details', href: `/store/${storeId}/details` },
    { name: 'Executive Summary', href: '' },
  ];

  if (isLoading) {
    return (
      <div style={{ position: 'fixed', top: '0', left: '0' }}>
        <LoadingLayout />
      </div>
    );
  }

  if (!currentYearStats) {
    // return <></>;
  }

  const CardBox = styled(Box)({
    flex: 1,
    borderRadius: '15px',
    background: 'var(--Base-No-Contrast, #FFF)',
    display: 'flex',
    flexDirection: 'column',
  });

  const TitleTypography = styled(Typography)({
    marginTop: '10px',
    borderRadius: 'var(--radius-lg, 10px)',
    background: 'var(--Background-Gray, #F8F8F8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0px',
    marginBottom: rem(20),
    color: '#000',
    fontFamily: 'Bogle',
    fontSize: rem(18),
    fontWeight: '600',
    lineHeight: '36px',
  });

  return (
    <SummaryDetailContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        filterYearChangeHandler={onFilterYearChange}
        currentYearSelected={currentYearSelected}
        showLastUpdatedDate={true}
      />
      {/* <Box
        sx={{
          marginTop: '2rem',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'row',
          gap: '.6rem',
          alignItems: 'flex-end',
          alignContent: 'flex-end',
          justifyContent: 'flex-end',
          padding: '16px',
          borderBottom: '1px solid var(--Base-Disabled, #BABBBE)',
          borderTopLeftRadius: rem(15),
          borderTopRightRadius: rem(15),
        }}
      >
        <FormControl>
          <Select
            value={currentYearSelected}
            onChange={onFilterYearChange}
            displayEmpty
            sx={{ height: '40px' }}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {Object.entries(options).map(([label, value]) => (
              <MenuItem key={label} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}
      <MainContentContainer
        sx={{
          marginTop: '2rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          padding: 0,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            padding: '15px 20px 15px',
            borderRadius: '15px',
            '@media (max-width: 480px)': {
              padding: '10px',
            },
          }}
        >
          {/* <Card> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { sm: 'row', xs: 'column' },
              gap: '.6rem',
            }}
          >
            <CardBox>
              <TitleTypography>Performance</TitleTypography>
              <PerformanceTab
                objectProp={getPerformanceData(
                  financeSummary,
                  currentYearSelected
                )}
              />
            </CardBox>
            <CardBox>
              <TitleTypography>Sales Classification</TitleTypography>
              {/* <PerformanceTab
              objectProp={getProductivityData(currentYearStats)}
            /> */}
              <CustomTabPanel sx={{ padding: '0', margin: 0 }}>
                <CurrentYearSale
                  metrics={storeBandM}
                  maxFiscalYear={currentYearSelected}
                  financeSummary={financeSummary}
                />
              </CustomTabPanel>
            </CardBox>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { sm: 'row', xs: 'column' },
              gap: '.6rem',
            }}
          >
            <CardBox>
              <TitleTypography>Productivity</TitleTypography>
              <PerformanceTab
                objectProp={getProductivityData(
                  currentYearSelected,
                  financeSummary,
                  executiveSummary,
                  storeDetails
                )}
              />
            </CardBox>
            <CardBox>
              <TitleTypography>Potential</TitleTypography>
              <PerformanceTab
                objectProp={getPotentialData(
                  atrsData,
                  storeId,
                  storeMetrics,
                  financeSummary,
                  currentYearSelected
                )}
              />
            </CardBox>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: '15px',
          }}
        >
          <CustomTabPanel>
            <TitleTypography>Sales Trend</TitleTypography>

            {financeSummary && financeSummary.length > 0 && (
              <LastThreeYearSale stats={financeSummary} />
            )}
          </CustomTabPanel>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            padding: '15px 20px 15px',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: '.6rem',
          }}
        >
          {/* <AllImmigrationTabs /> */}
          <CardBox
            sx={{ border: '1px solid var(--Base-Minimum-Contrast, #E3E4E5);' }}
          >
            <TitleTypography sx={{ margin: '10px' }}>
              Age of Population
            </TitleTypography>
            <AgeOfpopulation
              categories={AgeOfPopulation}
              series={AgeOfPopulationSeries}
            />
          </CardBox>
          <CardBox
            sx={{ border: '1px solid var(--Base-Minimum-Contrast, #E3E4E5);' }}
          >
            <TitleTypography sx={{ margin: '10px' }}>
              Avg HH Income
            </TitleTypography>
            <AgeOfpopulation
              categories={AgeHhIncome}
              series={AgeHhIncomeSeries}
            />
          </CardBox>
          <CardBox
            sx={{
              border: '1px solid var(--Base-Minimum-Contrast, #E3E4E5);',
            }}
          >
            <TitleTypography sx={{ margin: '10px' }}>Ethnicity</TitleTypography>
            <AgeOfpopulation categories={Ethnicity} series={EthnicitySeries} />
          </CardBox>
        </Box>
      </MainContentContainer>
    </SummaryDetailContainer>
  );
};

export default SummaryDetail;
