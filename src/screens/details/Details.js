import Header from "../../common/header/Header";
import React, { useEffect, useState } from "react";

const Details = (props) => {
 return (
        <div>
            <Header baseUrl={props.baseUrl} />
            <div>Movie Details page</div>
        </div>
    );
}
export default Details;