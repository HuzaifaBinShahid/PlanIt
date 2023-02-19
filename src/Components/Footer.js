import React from "react";

const Footer = () =>{

    let footerStyle = {
        position: "relative",
        width: "100%",
        top:"120%"
        
    }

    return(

        <footer className="bg-dark text-light py-3" style={footerStyle}>

        <p className="text-center my-3">
             
             Copyright &copy; My TodosList.com


        </p>

        </footer>

    )


}


export default Footer;