import React from "react"
import "./Header.css"
import logo  from "../../assets/logo.svg";


const Header = (props) => {
return(
    <div className="header"> 
        <img className= "logo" src= {logo} alt="logo"/>
    </div>
);
}
export default Header;