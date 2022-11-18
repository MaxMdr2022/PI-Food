import React from "react";
import "../Pagination/Pagination.css"

const Pagination = ({cantidadReciXPag, recipes, funPagination, pag}) => {


    const numPag = [];

    const total = Math.ceil( recipes / cantidadReciXPag );

    for(let i = 1; i <= total; i++){

        numPag.push(i);
    };



    return (
        <div className="pagination">

            <button onClick={pag > 1 ? ()=> funPagination( pag - 1) : null} hidden={ pag === 1? true : false}>&lt;</button>

            {numPag && numPag.map( numero => 

                <button key={numero} onClick={ ()=> funPagination(numero)}>{numero}</button>
            )}

            <button onClick={pag < total ? ()=> funPagination( pag + 1) : null} hidden={ pag === total ? true : false}>&gt;</button>

        </div>
    )
};

export default Pagination;