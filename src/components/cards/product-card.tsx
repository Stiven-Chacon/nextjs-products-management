"use client"

import { Card, CardContent, Typography, Chip, Box, IconButton } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { Product } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
  onEdit?: (product: Product) => void
  onDelete?: (productId: string) => void
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const categoryInfo = getCategoryInfo(product.categoria)

  return (
    <Card
      sx={{
        height: 340, 
        width: "100%", 
        maxWidth: 300,
        minWidth: 280,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.3s ease-in-out",
        border: "2px solid",
        borderColor: categoryInfo.borderColor,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${categoryInfo.bgGradient.from} 0%, ${categoryInfo.bgGradient.to} 100%)`,
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 12px 30px 0 ${categoryInfo.shadowColor}, 0 6px 15px -3px rgb(0 0 0 / 0.1)`,
          borderColor: categoryInfo.hoverBorderColor,
          "& .product-actions": {
            opacity: 1,
          },
          "& .category-chip": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 56, 
          p: 2,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Chip
          className="category-chip"
          label={product.categoria}
          size="small"
          sx={{
            bgcolor: categoryInfo.chipColor,
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 600,
            border: `1px solid ${categoryInfo.chipBorder}`,
            transition: "transform 0.3s ease-in-out",
            boxShadow: `0 2px 8px ${categoryInfo.chipShadow}`,
            maxWidth: 120,
          }}
        />

        <Box
          className="product-actions"
          sx={{
            display: "flex",
            gap: 0.5,
            opacity: 0.7,
            transition: "opacity 0.3s ease-in-out",
            flexShrink: 0,
          }}
        >
          {onEdit && (
            <IconButton
              onClick={() => onEdit(product)}
              sx={{
                p: 0.5,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #e3f2fd",
                "&:hover": {
                  bgcolor: "#0d47a1",
                  color: "white",
                  transform: "scale(1.1)",
                },
                color: "#0d47a1",
                transition: "all 0.3s ease-in-out",
              }}
              size="small"
            >
              <Edit fontSize="small" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              onClick={() => onDelete(product.id)}
              sx={{
                p: 0.5,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #ffebee",
                "&:hover": {
                  bgcolor: "#d32f2f",
                  color: "white",
                  transform: "scale(1.1)",
                },
                color: "#d32f2f",
                transition: "all 0.3s ease-in-out",
              }}
              size="small"
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Content */}
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          p: 2, 
          pt: 0, 
          display: "flex", 
          flexDirection: "column",
          height: "calc(100% - 56px)",
          overflow: "hidden", 
        }}
      >
        {/* title */}
        <Box sx={{ height: 52, mb: 1, flexShrink: 0 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: "1.1rem",
              lineHeight: 1.3,
              height: "100%",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              wordBreak: "break-word",
            }}
          >
            {product.nombre}
          </Typography>
        </Box>

        {/* Description */}
        <Box sx={{ height: 84, mb: 2, flexShrink: 0 }}>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.4,
              height: "100%",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              color: "rgba(0, 0, 0, 0.7)",
              wordBreak: "break-word",
            }}
          >
            {product.descripcion}
          </Typography>
        </Box>

        {/* Price*/}
        <Box
          sx={{
            height: 60,
            mt: "auto", 
            p: 1.5,
            borderRadius: 2,
            background: `linear-gradient(45deg, ${categoryInfo.priceGradient.from}, ${categoryInfo.priceGradient.to})`,
            border: `1px solid ${categoryInfo.priceBorder}`,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0, 
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "white",
              fontSize: "1.4rem",
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
              wordBreak: "break-word",
            }}
          >
            ${product.precio.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

function getCategoryInfo(categoria: string) {
  const defaultStyle = {
    chipColor: "#0d47a1",
    chipBorder: "#08306b",
    chipShadow: "rgba(13, 71, 161, 0.4)",
    borderColor: "#bbdefb",
    hoverBorderColor: "#0d47a1",
    shadowColor: "rgba(13, 71, 161, 0.2)",
    bgGradient: { from: "#ffffff", to: "#e3f2fd" },
    priceGradient: { from: "#0d47a1", to: "#08306b" },
    priceBorder: "#08306b",
  }

  return defaultStyle
}