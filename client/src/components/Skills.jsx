import React from 'react'

function Skills(props) {
  
  return (
    <div id="skills" className='flex flex-col justify-center items-center'>
    <div className="text-center font-extrabold mt-20 my-10 md:text-4xl text-2xl  loading-s"></div>
    <div className="box  max-w-[900px] flex flex-wrap">
    
      {props.skills?.map((item,index)=>(
        <div key={index} className=" list p-[10px] h-[100px] w-[200px] grow m-[5px]">
                <div className="imgBx">
                  <img src={item.image} alt="skill_img" />
                </div>
                <div className="content extrabold text-xl">
                 {item.language}
                 
                </div>
              </div>
              
      ))}
    </div>
    </div>
  );
}

export default Skills