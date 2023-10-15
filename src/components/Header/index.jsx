import { Link } from "react-router-dom"
import './Header.css'
const Header = () =>{
    return (
    <div>
        <header className="">
            <div className="container-fluid d-flex justify-content-center navbar-brand bg-danger">
                <div className="container d-flex justify-content-center">
                    <h1 className="m-0 p-0" style={{color:'white'}}>MARVEL</h1>
                </div>
            </div>
            <div className="container-fluid bg-dark">
                <div className="container d-flex pt-3 pb-3 justify-content-center pe-5 ">
                    <li className="nav-item"><Link to={"/"} className="item">Home</Link></li>
                    <li className="nav-item"><Link to={"/series"} className="item">Series</Link></li>
                    <li className="nav-item"><Link to={"/about"} className="item">Sobre</Link></li>
                </div>
            </div>
        </header>
    </div>)
}

export default Header