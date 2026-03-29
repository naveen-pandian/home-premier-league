import { useEffect } from "react";
import {animateScroll,Link} from "react-scroll";
import {motion,useScroll,useSpring} from "framer-motion";

const Navbar = () => {

    useEffect(()=>{
        const list = document.querySelectorAll('.list');
         function activeLink(){
         list.forEach((item)=>
         item.classList.remove('active'));
         this.classList.add('active');
           }
         list.forEach((item)=>
          item.addEventListener('click',activeLink));
//---------------------- for mobile or small responsive ----------------------------------------------------------
        const list2 = document.querySelectorAll('.list2');
        function activeLink2(){
        list2.forEach((item)=>
        item.classList.remove('active2'));
        this.classList.add('active2');
        }
        list2.forEach((item)=>
        item.addEventListener('click',activeLink2));

        },[]) ;

        const options = {
            duration: 500,
            smooth: true,
          };

        const scrollToTop = () => {
            animateScroll.scrollToTop(options);
        }
      
    return (
        <>
        <div className="hidden sm:block navigation ">
            <ul>
                <li className="list active">
                   <a href="#" onClick={scrollToTop}>
                        <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="text"><pre>   Home  </pre></span>
                    </a>
                  
                </li>
                <li className="list">
                 <Link to="about" smooth={true} offset={50} duration={500}  >
                         <a href="#">
                        <span className="icon"><ion-icon name="rocket-outline"></ion-icon></span>
                        <span className="text"><pre>  About </pre></span>
                         </a>
                 </Link>  
                </li>
                <li className="list">
                <Link to="skills" smooth={true} offset={50} duration={500}  >
                <a href="#">
                     <span className="icon"><ion-icon name="diamond-outline"></ion-icon></span>
                    <span className="text"><pre>  Skills </pre></span>
                    </a>
                </Link>   
                </li>
                <li className="list">
                <Link to="projects" smooth={true} offset={50} duration={500}  >
                <a href="#">
                    <span className="icon"><ion-icon name="albums-outline"></ion-icon></span>
                    <span className="text"><pre> Projects</pre></span>
                   </a>
                </Link>
                   
                </li>
                <li className="list">
                <Link to="contact" smooth={true} offset={50} duration={500}  >
                <a href="#">
                        <span className="icon"><ion-icon name="chatbox-ellipses-outline"></ion-icon></span>
                        <span className="text"><pre> Contact </pre></span>
                    </a>
                </Link>
                    
                </li>
                <div className=' hidden sm:block indicator'></div>
            </ul>
            </div>
{/* ------------------------ For Mobile View or small responsive---------------------------------- */}
        <div className="mobile-navigation sm:hidden">
            <ul>
                <li className="list2 active2">
                    <a href="#" onClick={scrollToTop}>
                        <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="text"><pre>  Home   </pre></span>
                    </a>
                </li>
                <li className="list2">
                <Link to="about" smooth={true} offset={50} duration={500}  >
                <a href="#">
                        <span className="icon"><ion-icon name="rocket-outline"></ion-icon></span>
                        <span className="text"><pre>About</pre></span>
                    </a>
                </Link>
                    
                </li>
                <li className="list2">
                <Link to="skills" smooth={true} offset={50} duration={500}  >
                 <a href="#">
                        <span className="icon"><ion-icon name="diamond-outline"></ion-icon></span>
                        <span className="text"><pre> Skills  </pre></span>
                    </a>
                </Link>
                   
                </li>
                <li className="list2">
                <Link to="projects" smooth={true} offset={50} duration={500}  >
                    <a href="#">
                        <span className="icon"><ion-icon name="albums-outline"></ion-icon></span>
                        <span className="text"><pre>Projects </pre></span>
                    </a>
                </Link>
                    
                </li>
                <li className="list2">
                <Link to="contact" smooth={true} offset={50} duration={500}  >
                    <a href="#">
                        <span className="icon"><ion-icon name="chatbox-ellipses-outline"></ion-icon></span>
                        <span className="text"><pre> Contact </pre></span>
                    </a>
                </Link>
                    
                </li>
                <div className='mobile-indicator sm:hidden'></div>
            </ul>
            </div>
        </>
    )
}

export default Navbar;