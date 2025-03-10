import React, { useState, useMemo } from "react";
import { mockStores } from "./data/mockStores";
import StoreTable from "./StoreTable";
import { Container, Typography } from "@mui/material";

import { tableConfig } from "./data/tableConfig";
export default function App() {
  const [filters, setFilters] = useState({
    attributes: {}, // Tab-specific filters
  });

  // Filter stores based on selected filters
  const filteredStores = useMemo(() => {
    return mockStores.filter((store) => {
      // Tab-specific attribute filters
      const attributeMatch = Object.entries(filters.attributes).every(
        ([tab, attributes]) => {
          return Object.entries(attributes).every(([key, values]) => {
            if (values.length === 0) return true; // No filter applied
            const storeValue = tableConfig[tab].getData(store)[key];
            return values.includes(storeValue);
          });
        }
      );

      return attributeMatch;
    });
  }, [filters]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Store Portfolio
      </Typography>

      <div style={{ overflow: "auto", maxHeight: "calc(100vh - 120px)" }}>
        <StoreTable
          stores={filteredStores}
          filters={filters}
          setFilters={setFilters}
          totalCount={filteredStores.length}
        />
      </div>
    </Container>
  );
}