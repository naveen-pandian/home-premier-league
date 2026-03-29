import React from 'react'

function About(props) {

  return (
    <div id="about" className="flex flex-col justify-center items-center ">
    <div className="loading-a text-center  font-extrabold md:text-4xl text-2xl  mt-20 my-10 "></div>
    <div className=" backdrop-filter backdrop-blur-xl bg-white/30 rounded-2xl shadow-xl w-full max-w-4xl md:p-8 p-4 flex justify-center md:gap-10 gap-2 items-center">
     <img src={props.user?.about?.image2} alt="" className="ball" />
     <div className="shadow"></div>
     <div className="md:p-4 p-2 rounded-2xl font-extrabold md:text-2xl text-lg shadow-black shadow-inner bg-[#00d2ff] text-black  ">" {props.user?.about?.description} "</div>
    </div>
    
      
  </div>
   
  )
}

export default About;