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
  TextField,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Paper,
  Grid,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { tableConfig } from "./data/tableConfig";

export default function StoreTable({ stores = [] }) {
  const [selectedAttributes, setSelectedAttributes] = useState(["name"]); // Store Name is mandatory
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [searchQuery, setSearchQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState(
    // Initialize columnFilters with default values for all selected attributes
    selectedAttributes.reduce((acc, attribute) => {
      acc[attribute] = [];
      return acc;
    }, {})
  );

  const handleAttributeSelection = (attributeId) => {
    const isSelected = selectedAttributes.includes(attributeId);
    if (isSelected && attributeId !== "name") {
      // Prevent deselecting Store Name
      setSelectedAttributes(selectedAttributes.filter((id) => id !== attributeId));
      // Remove the filter for the deselected attribute
      setColumnFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[attributeId];
        return updatedFilters;
      });
    } else if (!isSelected && selectedAttributes.length < 20) {
      setSelectedAttributes([...selectedAttributes, attributeId]);
      // Initialize the filter for the newly selected attribute
      setColumnFilters((prevFilters) => ({
        ...prevFilters,
        [attributeId]: [],
      }));
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };

  const getStoreValue = (store, attributeId) => {
    // Find the view that contains the attribute
    const view = Object.keys(tableConfig).find((view) =>
      tableConfig[view].columns.some((col) => col.id === attributeId)
    );

    // If the view is found, return the value; otherwise, return a default value
    if (view) {
      const value = tableConfig[view].getData(store)[attributeId];
      return value !== undefined ? value.toString() : "-"; // Ensure value is a string
    }
    return "-"; // Default value if the attribute is not found
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnFilterChange = (attributeId, value) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [attributeId]: value,
    }));
  };

  const filteredStores = stores.filter((store) => {
    return selectedAttributes.every((attribute) => {
      const filterValues = columnFilters[attribute] || [];
      if (filterValues.length === 0) return true; // No filter applied
      const storeValue = getStoreValue(store, attribute)?.toLowerCase() || "";
      return filterValues.some((filterValue) =>
        storeValue.includes(filterValue.toString().toLowerCase())
      );
    });
  });

  const sortedStores = [...filteredStores].sort((a, b) => {
    if (sortConfig.direction === "none") return 0;

    const aValue = getStoreValue(a, sortConfig.key);
    const bValue = getStoreValue(b, sortConfig.key);

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedStores = sortedStores.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const filteredColumns = Object.keys(tableConfig).reduce((acc, view) => {
    const columns = tableConfig[view].columns.filter((column) =>
      column.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (columns.length > 0) {
      acc[view] = columns;
    }
    return acc;
  }, {});

  const resetSelections = () => {
    setSelectedAttributes(["name"]); // Reset to only storeName
    setColumnFilters({ name: [] }); // Clear all filters except for "name"
  };

  return (
    <Grid container spacing={2} sx={{ height: "100%", p: 0 }}>
      {/* Permanent Sidebar */}
      <Grid item xs={12} md={2.5} sx={{ height: '100%' }}>
        <Paper sx={{ height: "100%", p: 2, overflowY: "auto", borderRadius: 0 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Attributes (Max of 20)
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search attributes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
            {Object.keys(filteredColumns).map((view) => (
              <Accordion key={view}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {view}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {filteredColumns[view].map((column) => (
                    <Box key={column.id} sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        checked={selectedAttributes.includes(column.id)}
                        onChange={() => handleAttributeSelection(column.id)}
                        disabled={column.id === "name"} // Disable deselecting Store Name
                      />
                      <ListItemText primary={column.label} />
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Selected: {selectedAttributes.length} / 20
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={resetSelections} fullWidth>
              Reset
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Main Content Area */}
      <Grid item xs={12} md={9.5} sx={{ height: '100%', paddingLeft:'0 !important' }}>
        <Paper sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 0 }}>
          {/* Dynamic Table */}
          <TableContainer sx={{ flex: 1, overflow: "auto" }}>
            <Table stickyHeader sx={{ minWidth: "auto" }}>
              <TableHead>
                <TableRow>
                  {selectedAttributes
                    .map((attribute) => {
                      const column = Object.keys(tableConfig)
                        .map((view) => tableConfig[view].columns.find((col) => col.id === attribute))
                        .find((col) => col);
                      return column ? { id: column.id, label: column.label } : null;
                    })
                    .filter((column) => column) // Remove null values
                    .map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          backgroundColor: "#eeeeee",
                          border: "1px solid #ddd",
                          whiteSpace: "nowrap",
                          position: column.id === "name" ? "sticky" : "static",
                          left: 0,
                          zIndex: 10,
                          textAlign: 'left', // Force left alignment
                          minWidth: column.id === "name" ? '200px' : undefined, // Set minimum width for name column
                          width: column.id === "name" ? 'auto' : undefined, // Allow other columns to adjust width
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}>
                          <TableSortLabel
                            active={sortConfig.key === column.id}
                            direction={
                              sortConfig.key === column.id && sortConfig.direction !== "none"
                                ? sortConfig.direction
                                : "asc"
                            }
                            onClick={() => handleSort(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                          {column.id !== "name" && (
                            <FormControl variant="outlined" size="small" sx={{ justifyContent: 'flex-start', width: "100%" }}>
                              <InputLabel>Filter</InputLabel>
                              <Select
                                multiple
                                value={columnFilters[column.id] || []} // Ensure value is always defined
                                onChange={(e) => handleColumnFilterChange(column.id, e.target.value)}
                                input={<OutlinedInput label="Filter" />}
                                renderValue={(selected) => {
                                  // Customize the display of selected values
                                  if (selected.length === 0) {
                                    return "Filter"; // Show "Filter" when no items are selected
                                  }
                                  return `${selected.length} selected`; // Show "X selected" when items are selected
                                }}
                              >
                                {[
                                  ...new Set(
                                    stores.map((store) => getStoreValue(store, column.id))
                                  ),
                                ].map((value, index) => (
                                  <MenuItem key={index} value={value}>
                                    <Checkbox checked={columnFilters[column.id]?.includes(value)} />
                                    <ListItemText primary={value} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </Box>
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStores.map((store) => (
                  <TableRow key={store.id}>
                    {selectedAttributes
                      .map((attribute) => {
                        const column = Object.keys(tableConfig)
                          .map((view) => tableConfig[view].columns.find((col) => col.id === attribute))
                          .find((col) => col);
                        return column ? { id: column.id, value: getStoreValue(store, column.id) } : null;
                      })
                      .filter((column) => column) // Remove null values
                      .map((column) => (
                        <TableCell
                          key={column.id}
                          style={{
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            whiteSpace: "nowrap",
                            position: column.id === "name" ? "sticky" : "static",
                            left: 0,
                            zIndex: 10,
                            textAlign: 'left', // Force left alignment
                            minWidth: column.id === "name" ? '200px' : undefined, 
                          }}
                        >
                          {column.value || "-"}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={filteredStores.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}