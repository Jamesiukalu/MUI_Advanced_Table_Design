import React, { useState } from "react";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  TableHead,
  TableRow,
  ListItemText,
  OutlinedInput,
  Checkbox,
  Paper,
  Button,
  Chip,
  Avatar,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";
import { tableConfig } from "./data/tableConfig";

export default function StoreTable({ stores = [], setFilters, totalCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("location");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const [sortConfig, setSortConfig] = useState({
    key: null, // Column key to sort by
    direction: "none", // Sorting direction: "asc", "desc", or "none"
  });

  // Handle dropdown change for tabs
  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
    setSelectedAttribute(""); // Reset selected attribute when tab changes
    setActiveFilters([]); // Clear active filters when tab changes
    setFilters((prevFilters) => ({ ...prevFilters, attributes: {} })); // Clear global filters
    setSortConfig({ key: null, direction: "none" }); // Reset sorting
  };

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    // const {
    //   target: { value },
    // } = event;
    // setSelectedValues(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    setSelectedValues(event.target.value);
  };

  const addFilter = () => {
    if (selectedAttribute && selectedValues.length > 0) {
      const newFilter = {
        attribute: selectedAttribute,
        values: selectedValues,
      };
      const updatedFilters = [...activeFilters, newFilter];
      setActiveFilters(updatedFilters);

      // Update global filters immediately
      setFilters((prevFilters) => ({
        ...prevFilters,
        attributes: {
          ...prevFilters.attributes,
          [activeTab]: updatedFilters.reduce((acc, filter) => {
            acc[filter.attribute] = filter.values;
            return acc;
          }, {}),
        },
      }));

      // Reset dropdowns
      setSelectedAttribute("");
      setSelectedValues([]);
    }
  };

  const removeFilter = (index) => {
    const updatedFilters = activeFilters.filter((_, i) => i !== index);
    setActiveFilters(updatedFilters);

    // Update global filters immediately
    setFilters((prevFilters) => ({
      ...prevFilters,
      attributes: {
        ...prevFilters.attributes,
        [activeTab]: updatedFilters.reduce((acc, filter) => {
          acc[filter.attribute] = filter.values;
          return acc;
        }, {}),
      },
    }));
  };

  const getAttributeValues = () => {
    if (!selectedAttribute) return [];
    return [
      ...new Set(
        stores.map(
          (store) => tableConfig[activeTab].getData(store)[selectedAttribute]
        )
      ),
    ];
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };

  // Filter the stores first
  const filteredStores = stores.filter((store) => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        store.name.toLowerCase().includes(searchLower) ||
        store.status.toLowerCase().includes(searchLower) ||
        store.province.toLowerCase().includes(searchLower) ||
        store.region.toLowerCase().includes(searchLower) ||
        store.location.city.toLowerCase().includes(searchLower) ||
        store.location.address.toLowerCase().includes(searchLower) ||
        store.salesFloor.departments.some((dept) =>
          dept.toLowerCase().includes(searchLower)
        );
      if (!matchesSearch) return false;
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      const storeData = tableConfig[activeTab].getData(store);
      return activeFilters.every((filter) =>
        filter.values.includes(storeData[filter.attribute])
      );
    }

    return true;
  });

  // Sort the filtered stores based on the current sort configuration
  const sortedStores = [...filteredStores].sort((a, b) => {
    if (sortConfig.direction === "none") return 0;

    const aValue = tableConfig[activeTab].getData(a)[sortConfig.key];
    const bValue = tableConfig[activeTab].getData(b)[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Paper>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>View</InputLabel>
          <Select value={activeTab} onChange={handleTabChange} label="View">
            {Object.keys(tableConfig).map((tab) => (
              <MenuItem key={tab} value={tab}>  
                {tab}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search fontSize="small" />,
            }}
            sx={{ width: { xs: "auto", sm: "auto" } }}
          />

          <Chip
            color="primary"
            avatar={<Avatar>{totalCount}</Avatar>}
            label={totalCount === 1 ? "Store" : "Stores"}
          />
        </Box>
      </Box>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Attribute</InputLabel>
          <Select
            value={selectedAttribute}
            onChange={handleAttributeChange}
            label="Attribute"
          >
            {tableConfig[activeTab].columns.map((column) => (
              <MenuItem key={column.id} value={column.id}>
                {column.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel>Values</InputLabel>
          <Select
            value={selectedValues}
            onChange={handleFilterValueChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            label="Values"
            multiple
          >
            {getAttributeValues().map((value, index) => (
              <MenuItem key={index} value={value}>
                <Checkbox checked={selectedValues.includes(value)} />
                <ListItemText primary={value} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={addFilter}>
          Add Filter
        </Button>
        <Button
          variant="contained"
          startIcon={<FilterList />}
          onClick={() => {
            // Clear global filters
            setFilters((prev) => ({ ...prev, attributes: {} }));
            // Clear local filters
            setActiveFilters([]);
            setSelectedAttribute("");
            setSelectedValues([]);
            // Reset sorting
            setSortConfig({ key: null, direction: "none" });
          }}
          sx={{ whiteSpace: "nowrap" }}
        >
          Clear Filters
        </Button>
      </Box>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {activeFilters.map((filter, index) => (
          <Chip
            key={index}
            label={`${filter.attribute}: ${filter.values.join(", ")}`}
            onDelete={() => removeFilter(index)}
          />
        ))}
      </Box>

      <TableContainer style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table sx={{ minWidth: "auto" }}>
          <TableHead>
            <TableRow>
              {tableConfig[activeTab].columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  sx={{
                    position: index === 0 ? "sticky" : "static",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: "background.paper",
                    border: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  <TableSortLabel
                    active={sortConfig.key === column.id}
                    direction={
                      sortConfig.key === column.id &&
                      sortConfig.direction !== "none"
                        ? sortConfig.direction
                        : "asc"
                    }
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStores.map((store) => (
              <TableRow key={store.id}>
                {tableConfig[activeTab].columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    style={{
                      position: index === 0 ? "sticky" : "static",
                      left: 0,
                      zIndex: 1,
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tableConfig[activeTab].getData(store)[column.id] || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
