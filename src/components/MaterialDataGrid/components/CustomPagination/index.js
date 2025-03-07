import { Pagination } from '@mui/material';
import {
    useGridApiContext,
    useGridSelector,
    gridPageCountSelector
} from '@mui/x-data-grid';
import React, { useState } from 'react'

const CustomizedPagination = ({
    page,
    onPageChange,
    className,
    getHSNDetails
}) => {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    // const [searchResults, setSearchResults] = useState([])
    const [paginated, setPaginated] = useState({
        isPaginated: false,
        page: page + 1,
        totalPages: pageCount,
        totalCount: 0,
        nextPage: null,
        previousPage: null
    })

    return (
        <>
            <Pagination
                color="dark"
                variant="outlined"
                className={className}
                count={pageCount}
                page={page + 1}
                onChange={(event, newPage) => {
                    onPageChange(event, newPage - 1);
                }}
            />

            {/* <Pagination variant="outlined" className={className} color="success" count={paginated.totalPages} page={paginated.page} 
                            onChange={(event, page) => {
                                onPageChange(event, page - 1)
                            }} /> */}

        </>
    )
}

export default CustomizedPagination