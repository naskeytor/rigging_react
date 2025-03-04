import React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";

const MuiDataGrid = ({ rows, columns, pageSize, loading }) => {
    return (
        <Box sx={{ height: 400, width: "100%", backgroundColor: "#374249", color: "#fff" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize || 5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
                loading={loading}  // ⬅️ Muestra un spinner si está cargando datos
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    [`& .${gridClasses.row}`]: {
                        bgcolor: "#374249",
                        '&:hover': {
                            backgroundColor: grey[700],
                        },
                        '&.Mui-selected': {
                            backgroundColor: grey[600] + " !important",
                        },
                    },
                    '& .MuiDataGrid-root': { backgroundColor: '#374249', color: '#fff' },
                    '& .MuiDataGrid-columnHeaders': { backgroundColor: '#1277bc !important', color: '#ffffff !important' },
                    '& .MuiDataGrid-cell': { color: '#fff' },
                    '& .MuiTablePagination-root': { color: '#fff' },
                    '& .MuiCheckbox-root': { color: '#fff' },
                    '& .MuiDataGrid-footerContainer': { backgroundColor: '#252b30', color: '#fff' },
                    '& .MuiSvgIcon-root': { color: '#fff !important' },
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
};

export default MuiDataGrid;
