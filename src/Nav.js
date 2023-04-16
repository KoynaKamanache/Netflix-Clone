import React, { useEffect, useState } from 'react';
import "./Nav.css";

function Nav() {
    const [show , handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>100){
                handleShow(true);
            }else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", );
        };
    }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
        <img src="https:pedia.org?wikipedia/commons/0/0f/" 
        alt="Netflix Logo" className="nav_logo" />

        <img src="https://pbs.twimg.com/profile_images/124011999041155" alt="Avatar Logo" className="nav_avatar" />
    </div>
  )
}

export default Nav;