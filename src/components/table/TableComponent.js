import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/index';
import { styled } from '@mui/material/styles';
import { TablePagination } from '@mui/material/index';
import { Typography } from '../../../node_modules/@mui/material/index';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

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

const TableComponent = ({ columns, data = [], key_search = '' }) => {
    const { search } = useSelector((state) => state.menu);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const data_filter = data.filter((e) => {
        if (key_search == '') return true;

        if (e[key_search]) {
            return e[key_search].toLowerCase().includes(search.toLowerCase());
        }
        return true;
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Tính số hàng trống để hiển thị
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data_filter.length - page * rowsPerPage);
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
                        {columns.map((column, index) => (
                            <TableCellHeadCustom key={column.field + index} width={column.width}>
                                {column.headerName}
                            </TableCellHeadCustom>
                        ))}
                    </TableRow>
                </TableHeadCustom>

                {/* Nội dung bảng */}
                <TableBody>
                    {/* Render các hàng từ mảng data */}
                    {(rowsPerPage > 0 ? data_filter.slice(startItem, endItem) : data_filter).map((row) => (
                        <TableRowCustom key={row.id}>
                            {/* Render các ô từ mảng columns */}
                            {columns.map((column, index) => (
                                <TableCellCustom key={column.field + index} width={column.width}>
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
            {data_filter.length == 0 && (
                <Typography variant="h5" sx={{ textAlign: 'center' }} py={5}>
                    Không có dữ liệu
                </Typography>
            )}

            {/* Phân trang */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data_filter.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số hàng"
            />
        </TableContainer>
    );
};

export default TableComponent;
