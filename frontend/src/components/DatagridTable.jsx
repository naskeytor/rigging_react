import React, { useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BuildIcon from "@mui/icons-material/Build";

const MuiDataGrid = ({ rows, columns, pageSize, loading, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleMenuOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(rowId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const handleEdit = () => {
        if (onEdit) onEdit(selectedRow);
        handleMenuClose();
    };

    const handleDelete = () => {
        if (onDelete) onDelete(selectedRow);
        handleMenuClose();
    };

    // Asegurar que las demás columnas se expandan correctamente
    const adjustedColumns = columns.map(col => ({
        ...col,
        flex: 1, // 🔴 Todas las columnas se expanden proporcionalmente
        minWidth: 120, // 🔴 Evita que sean demasiado pequeñas
    }));

    // Agregar la columna de acciones al final con un ancho fijo
    const enhancedColumns = [
        ...adjustedColumns,
        {
            field: "actions",
            headerName: "",
            width: 100, // 🔴 Fija el ancho de la columna
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            resizable: false, // 🔴 Evita que el usuario la redimensione
            headerAlign: "center",
            align: "center",
            renderHeader: () => <BuildIcon sx={{ color: "#fff" }} />, // 🔴 Ícono en el encabezado
            renderCell: (params) => (
                <Box>
                    <IconButton onClick={(event) => handleMenuOpen(event, params.row.id)}>
                        <MoreVertIcon sx={{ color: "#fff" }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedRow === params.row.id}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleEdit}>Editar</MenuItem>
                        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                    </Menu>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ height: 600, width: "100%", backgroundColor: "#374249", color: "#fff", marginTop: 20 }}>
            <DataGrid
                rows={rows}
                columns={enhancedColumns}
                pageSize={pageSize || 5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableRowSelectionOnClick
                loading={loading}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    [`& .${gridClasses.row}`]: {
                        bgcolor: "#374249",
                        "&:hover": {
                            backgroundColor: grey[700],
                        },
                        "&.Mui-selected": {
                            backgroundColor: grey[600] + " !important",
                        },
                    },
                    "& .MuiDataGrid-root": { backgroundColor: "#374249", color: "#fff" },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#1277bc !important",
                        color: "#ffffff !important",
                    },
                    "& .MuiDataGrid-cell": { color: "#fff" },
                    "& .MuiTablePagination-root": { color: "#fff" },
                    "& .MuiCheckbox-root": { color: "#fff" },
                    "& .MuiDataGrid-footerContainer": { backgroundColor: "#252b30", color: "#fff" },
                    "& .MuiSvgIcon-root": { color: "#fff !important" },
                    "& .MuiDataGrid-cell:focus-within": {
                        outline: "none",
                    },
                    "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitleContainer": {
                        justifyContent: "center",
                    },
                }}
            />
        </Box>
    );
};

// Validar los props para evitar errores
MuiDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number,
    loading: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default MuiDataGrid;
