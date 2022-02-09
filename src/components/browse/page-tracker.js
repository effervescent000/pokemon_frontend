import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const PageTracker = ({ setListingOffset, itemsPerPage }) => {
    const [pageCount, setPageCount] = useState(Math.ceil(1118 / itemsPerPage));

    const handlePageClick = (event) => {
        console.log(`Setting item offset to ${event.selected * itemsPerPage}`);
        setListingOffset(event.selected * itemsPerPage);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            pageCount={pageCount}
            onPageChange={handlePageClick}
        />
    );
};

export default PageTracker;
