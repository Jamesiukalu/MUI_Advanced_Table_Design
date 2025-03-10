import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
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
import { FilterList, Search } from "@mui/icons-material";
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedAttribute("");
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
        stores.map((store) => tableConfig[activeTab].getData(store)[selectedAttribute])
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
      <div style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Chip color="primary" avatar={<Avatar>{totalCount}</Avatar>} label={totalCount === 1 ? "Store" : "Stores"} />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search fontSize="small" />,
            }}
          />
          <Button
            variant="contained"
            startIcon={<FilterList />}
            onClick={() => setFilters((prev) => ({ ...prev, attributes: {} }))}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {Object.keys(tableConfig).map((tab) => (
          <Tab key={tab} label={tab} value={tab} />
        ))}
      </Tabs>

      <div style={{ padding: 16, display: "flex", gap: 16 }}>
        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
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
      </div>

      <TableContainer style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table style={{ minWidth: 800, borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              {tableConfig[activeTab].columns.map((column, index) => (
                <TableCell 
                  key={column.id} 
                  style={{ 
                    position: index === 0 ? "sticky" : "static", 
                    left: 0, 
                    zIndex: 1, 
                    color: "#fff",
                    backgroundColor: "#0071DC", 
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