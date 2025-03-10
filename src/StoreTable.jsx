import React, { useState } from "react";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Avatar,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem as SelectMenuItem,
} from "@mui/material";
import { FilterList, Search, SmartButton } from "@mui/icons-material";
import { tableConfig } from "./data/tableConfig";

export default function StoreTable({
  stores = [],
  filters,
  setFilters,
  totalCount,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("location");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  // Handle dropdown change for tabs
  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
    setSelectedAttribute(""); // Reset selected attribute when tab changes
  };

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setSelectedValues(event.target.value);
  };

  const applyFilter = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      attributes: {
        ...prevFilters.attributes,
        [activeTab]: {
          ...prevFilters.attributes[activeTab],
          [selectedAttribute]: selectedValues,
        },
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
    return true;
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
        <Badge badgeContent={totalCount} color="primary">
          <Typography variant="h6">
            {totalCount === 1 ? "Store" : "Stores"}
          </Typography>
        </Badge>

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
          <Button
            variant="contained"
            startIcon={<FilterList />}
            onClick={() => setFilters((prev) => ({ ...prev, attributes: {} }))}
            sx={{ whiteSpace: "nowrap",  }}
          >
            Clear Filters
          </Button>
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
        <FormControl variant="outlined" size="small"  sx={{ minWidth: 200 }}>
          <InputLabel>View</InputLabel>
          <Select value={activeTab} onChange={handleTabChange} label="View">
            {Object.keys(tableConfig).map((tab) => (
              <SelectMenuItem key={tab} value={tab}>
                {tab}
              </SelectMenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small"  sx={{ minWidth: 200 }}>
          <InputLabel>Attribute</InputLabel>
          <Select
            value={selectedAttribute}
            onChange={handleAttributeChange}
            label="Attribute"
          >
            {tableConfig[activeTab].columns.map((column) => (
              <SelectMenuItem key={column.id} value={column.id}>
                {column.label}
              </SelectMenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel>Values</InputLabel>
          <Select
            multiple
            value={selectedValues}
            onChange={handleFilterValueChange}
            label="Values"
          >
            {getAttributeValues().map((value) => (
              <SelectMenuItem key={value} value={value}>
                {value}
              </SelectMenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={applyFilter}>
          Apply Filter
        </Button>
      </Box>

      <TableContainer style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table sx={{ minWidth: 800 }}>
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
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStores.map((store) => (
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
