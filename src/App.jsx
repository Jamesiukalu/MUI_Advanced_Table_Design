import React, { useState, useMemo } from "react";
import { mockStores } from "./data/mockStores";
import StoreTable from "./StoreTable";
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import { tableConfig } from "./data/tableConfig";

export default function App() {
  const [filters, setFilters] = useState({
    attributes: {}, // Tab-specific filters
  });
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
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
    <Box sx={{ display: "flex" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <SnippetFolderIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Store IQ Portfolio Prototype
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: "64px" }} // Adjust marginTop to account for AppBar
      >
        <Container>
          <Box role="presentation" onClick={handleClick} sx={{ mb: 2 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="primary"
                href="/"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Store Lists
              </Link>
              <Typography
                sx={{
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SnippetFolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Portfolio Page
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box style={{ maxHeight: "calc(100vh - 120px)" }}>
            <StoreTable
              stores={filteredStores}
              filters={filters}
              setFilters={setFilters}
              totalCount={filteredStores.length}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
