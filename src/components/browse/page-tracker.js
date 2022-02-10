import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const PageTracker = ({ setListingOffset, itemsPerPage, filteredListings }) => {
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        setPageCount(Math.ceil(filteredListings.length / itemsPerPage));
    }, [filteredListings]);

    const handlePageClick = (event) => {
        setListingOffset(event.selected * itemsPerPage);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            breakLinkClassName="page-link"
        />
    );
};

export default PageTracker;
