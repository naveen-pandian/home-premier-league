import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Projects(props) {
  const [selectedId, setSelectedId] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedId('');
      }
    };

    if (selectedId) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedId]);

  return (
    <div id='projects' className='flex flex-col justify-center items-center'>
      <div className="text-center font-extrabold mt-20 my-10 md:text-4xl text-2xl loading-p"></div>
      <div className="box max-w-[900px] w-full flex flex-wrap gap-2">
        {props.projects?.map((item) => (
          <motion.div
            className={`relative overflow-hidden h-[200px] w-[250px] m-[5px] bg-[rgba(0,0,0,0.1)] rounded-[15px] grow shadow-md cursor-pointer transform transition-transform duration-500 hover:scale-105 ${
              selectedId === item.number ? 'card-selected' : ''
            }`}
            layoutId={`card-container-${item.number}`}
            onClick={() => setSelectedId(item.number)}
            key={item.number}
            initial={{ scale: 1 }}
            animate={{ scale: selectedId === item.number ? 1.1 : 1 }} // Increase scale on selected card
            transition={{ duration: 0.3 }}
          >
            <motion.div className='absolute justify-center text-center flex-col flex items-center top-0 bottom-0 left-0 right-0 opacity-0 hover:opacity-100 bg-[#00d2ff] shadow-black shadow-inner transition-all duration-1000'>
              <motion.h2 className="text-xl mb-2 text-black font-extrabold">{item.name}</motion.h2>
              <motion.h5 className=" text-sm mb-1 text-gray-700 font-extrabold">{item.duration}</motion.h5>
            </motion.div>
            <motion.img className="w-full h-full" src={item.image} alt="skill_img" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed z-[100] inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {props.projects?.map(
              (item) =>
                item.number === selectedId && (
                  <motion.div
                    className="bg-pink-400 rounded-lg p-4 shadow-md max-w-lg mx-auto overflow-auto max-h-[80vh]"
                    layoutId={`card-container-${item.number}`}
                    key={item.number}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    ref={modalRef}
                  >
                    <motion.div className="relative">
                      <motion.button
                        className="absolute top-[-10px] right-[-10px] py-1 px-2 text-center text-red-500 font-extrabold bg-black rounded-full"
                        onClick={() => setSelectedId('')}
                      >
                        X
                      </motion.button>
                      <motion.img className="w-full rounded-2xl" src={item.image} alt="skill_img" />
                      <motion.div className="mt-4 bg-[#00d2ff] p-4 shadow-black shadow-inner rounded-2xl ">
                        <motion.h2 className="text-xl font-bold mb-2 text-purple-600">{item.name}</motion.h2>
                      <motion.h5 className="text-sm font-bold mb-1 text-black">{item.duration}</motion.h5>
                      <motion.p className="text-md text-gray-700 mb-4">{item.description}</motion.p>
                      <motion.p
                        className="text-md text-black "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.p className='text-pink-900'>Tech Stack : {item.techStack.join(', ')}</motion.p>
                        <motion.p className='my-4 text-2xl'>
                          <a href={item.source} target='_blank'><ion-icon name="logo-github"></ion-icon></a>
                          &nbsp;&nbsp;
                          <a href={item.live} target="_blank"><ion-icon name="open-outline"></ion-icon></a>
                          &nbsp;&nbsp;
                          <a href={item.demo} target='_blank'><ion-icon name="logo-youtube"></ion-icon></a>
                        </motion.p>
                      </motion.p>
                    </motion.div>
                  </motion.div>
                      </motion.div>
                      
                )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
