"use client"

import { AppBar, Toolbar, Typography, Container } from "@mui/material"
import { Inventory } from "@mui/icons-material"

export function Header() {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "primary.main", borderBottom: "1px solid #e5e7eb" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0 }}>
          <Inventory sx={{ mr: 2, color: "primary.contrastText" }} />
          <Typography
            variant="h6"
            component="h1"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: "primary.contrastText",
            }}
          >
            Gestión de Productos
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
