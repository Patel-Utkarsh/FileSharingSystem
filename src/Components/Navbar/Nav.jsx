import { Link } from "react-router-dom";
import "./nav.css"
import { UseSelector, useSelector } from "react-redux";


export default function Navbar() {
    const { user } = useSelector((state => state.auth));
    //console.log(user);

    return (
        <div className="navWrapper">
            <div className="navInnerDiv1">
                <div className="navInnerDiv2">
                    <img id="logo" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1712579283/canal_qqknrl.png" alt="" />

                   <Link to={'/'}><p id="logoName">DataBridge</p> </Link> 

                </div>

                <div className="navInnerDiv3">



                  
                     <div>

                         {user ?   
                         <Link to={'/myAccount'}>
                            <img id="profileImg" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1712758061/output_trc7vd.png" alt="" />
                        </Link> : 

                        <div>
                             <Link to={'/login'}>  <button id="loginBtn">Login</button> </Link>

                              <Link to={'/signup'}><button id="signUpBtn">Sign Up</button></Link>  

                        </div>}
                        
                      
                        
                     </div>

                    
                </div>

                

            </div>


        </div>
    );
}