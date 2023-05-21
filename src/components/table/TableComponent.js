import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/index';
import { styled } from '@mui/material/styles';
import { TablePagination } from '@mui/material/index';

// Tạo styled component cho bảng
const TableCustom = styled(Table)`
    min-width: 650px;
    width: 100%;
`;

// Tạo styled component cho ô trong bảng
const TableCellCustom = styled(TableCell)`
    width: ${({ width }) => width};
`;

// Tạo styled component cho ô tiêu đề trong bảng
const TableCellHeadCustom = styled(TableCell)`
    color: #fff;
    padding-top: 12px;
    padding-bottom: 12px;
`;

// Tạo styled component cho hàng trong bảng
const TableRowCustom = styled(TableRow)`
    &:hover {
        background-color: #f5f5f5;
    }
    &:nth-of-type(even) {
        background-color: #f2f2f2;
    }
`;

// Tạo styled component cho phần tiêu đề bảng
const TableHeadCustom = styled(TableHead)`
    background-color: #40a9ff;
    height: 30px;
    color: white;
`;

const TableComponent = ({ columns, data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Tính số hàng trống để hiển thị
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const startItem = page * rowsPerPage;
    const endItem = page * rowsPerPage + rowsPerPage;

    return (
        <TableContainer component={Paper} style={{ width: '100%' }}>
            {/* Bảng */}
            <TableCustom aria-label="my table">
                {/* Tiêu đề bảng */}
                <TableHeadCustom>
                    <TableRow>
                        {/* Render các ô tiêu đề từ mảng columns */}
                        {columns.map((column) => (
                            <TableCellHeadCustom key={column.field} width={column.width}>
                                {column.headerName}
                            </TableCellHeadCustom>
                        ))}
                    </TableRow>
                </TableHeadCustom>

                {/* Nội dung bảng */}
                <TableBody>
                    {/* Render các hàng từ mảng data */}
                    {(rowsPerPage > 0 ? data.slice(startItem, endItem) : data).map((row) => (
                        <TableRowCustom key={row.id}>
                            {/* Render các ô từ mảng columns */}
                            {columns.map((column) => (
                                <TableCellCustom key={column.field} width={column.width}>
                                    {/* Kiểm tra nếu field là 'action', sử dụng hàm renderCell, ngược lại hiển thị giá trị từ data */}
                                    {column.field === 'action' ? column.renderCell(row) : row[column.field]}
                                </TableCellCustom>
                            ))}
                        </TableRowCustom>
                    ))}

                    {/* Hiển thị hàng trống nếu cần */}
                    {emptyRows > 0 && <></>}
                </TableBody>
            </TableCustom>

            {/* Phân trang */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default TableComponent;
