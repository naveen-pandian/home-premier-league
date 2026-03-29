import React, { useState } from 'react';

function Timeline(props) {
 
  const [activeTab, setActiveTab] = useState('education');

  return (
    
      
      <div className="flex justify-center mt-[90px] backdrop-filter backdrop-blur-xl bg-white/30 rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full ">
      <div className="p-8 text-center">
        
        <div className="flex justify-center my-4">
          <button
            className={`px-4 py-2 mx-2 rounded-xl shadow-black shadow-inner  focus:outline-none ${
              activeTab === 'education' ? 'bg-[#00d2ff] text-black font-extrabold '  : 'hover:bg-white/50 hover:text-black font-extrabold bg-black text-white'
            }`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-xl  shadow-black shadow-inner focus:outline-none ${
              activeTab === 'experience' ? 'bg-[#00d2ff] text-black font-extrabold  ' : 'hover:bg-white/50 hover:text-black font-extrabold bg-black text-white'
            }`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
        </div>
        
        <div className="relative">
          {activeTab === 'education' &&
            props.education?.map((item, index) => (
              <div key={index} className="relative mb-4 ml-8 p-4 bg-black text-white rounded-lg">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className=' text-gray-400'>{item.duration}</p>
                <p>{item.company}<br/>{item.location}</p>
                <span class="absolute top-0 left-0 bottom-0 h-full w-full bg-black text-white flex justify-center items-center text-md opacity-0 transition-opacity duration-[0.5s] hover:opacity-[1] font-extrabold">" {item.desc} "</span>
                <div className="absolute left-0 top-0 bottom-0 w-2 h-full bg-[#00d2ff]"></div>
              
              </div>
              
            ))}
          {activeTab === 'experience' &&
            props.experience?.map((item, index) => (
              <div key={index} className="relative mb-4 ml-8 p-4 bg-black text-white rounded-lg">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className=' text-gray-400'>{item.duration}</p>
                <p>{item.company}<br/>{item.location}</p>
                <span class="absolute top-0 left-0 bottom-0 h-full w-full bg-black text-white flex justify-center items-center text-md opacity-0 transition-opacity duration-[0.5s] hover:opacity-[1] font-extrabold">" {item.desc} "</span>
               
                <div className="absolute left-0 top-0 bottom-0 w-2 h-full bg-[#00d2ff]"></div>
              </div>
            ))}
        </div>
      </div>
    </div>

    
    
  );
}

export default Timeline;
