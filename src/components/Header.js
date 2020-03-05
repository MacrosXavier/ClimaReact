import React from 'react';


function Header({titulo}){
    return(
        <nav>
            <div>
                <div className="nav-wrapper light-blue darken-2">
                    <a href="#!" className="brand-logo">{titulo}</a>
                </div>
            </div>
        </nav>
    )
}

export default Header;