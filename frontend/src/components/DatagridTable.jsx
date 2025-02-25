import React from "react";
import {DataGrid, gridClasses} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import {grey} from "@mui/material/colors";

const MuiDataGrid = ({rows, columns, pageSize}) => {
    return (
        <Box sx={{height: 400, width: "100%", backgroundColor: "#374249", color: "#fff"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize || 5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    [`& .${gridClasses.row}`]: {
                        bgcolor: "#374249", // Fondo oscuro en todas las filas
                        '&:hover': {
                            backgroundColor: grey[700], // Color al pasar el ratón
                        },
                        '&.Mui-selected': {
                            backgroundColor: grey[600] + " !important", // Color cuando está seleccionada
                        },
                    },
                    '& .MuiDataGrid-root': {
                        backgroundColor: '#374249',
                        color: '#fff',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#1277bc !important', // Forzar fondo azul
                        color: '#ffffff !important', // Forzar letras blancas
                    },
                    '& .MuiDataGrid-cell': {
                        color: '#fff',
                    },
                    '& .MuiTablePagination-root': {
                        color: '#fff',
                    },
                    '& .MuiCheckbox-root': {
                        color: '#fff',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#252b30', // Fondo del footer
                        color: '#fff',
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#fff !important', // Iconos de paginación en blanco
                    },
                }}
            />
        </Box>
    );
};

export default MuiDataGrid;
