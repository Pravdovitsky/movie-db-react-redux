import React from 'react';
import ReactPaginate from 'react-paginate';

const Paginator = (props) => {
    return (
        <div>
            <ReactPaginate {...props}/>
        </div>
    )
}

export default Paginator;