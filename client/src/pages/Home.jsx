import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import Contact from '../components/Contact';
import Loading from '../components/Loading';
import Background from '../components/Background';
import MatchTable from '../components/MatchTable';

const Home = () => {

    const BASE_URL = 'https://home-premier-league.vercel.app/api/hpl_data';

    const [user, setUser] = useState(null);
    const [hpl_data, setHpl_data] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  

    useEffect(() => {

        fetch(BASE_URL)
        .then(response => response.json())
        .then(response => setHpl_data(response[0]?.hpl));
       
        setTimeout(()=>{
            setIsLoading(false);
        },2000);
        
     } , []);
    console.log(hpl_data);

    document.title = `${user?.about?.name + ' - ' + user?.about?.title}`;

// filtering all the data from the API
    const sortedFilteredSkills = user?.skills;
    const sortedFilteredProject = user?.projects?.sort((a,b)=>{return b.number - a.number});
    const filteredSocialHandles = user?.socials;
    const filteredEducation = user?.timeline.filter(item => item.education == true);
    const filteredExperience = user?.timeline.filter(item => item.education == false);
    const players = hpl_data?.players;
    const matchHistory = hpl_data?.matchHistory;
    

    if (isLoading) {
        document.title = 'Personal Portfolio';
        return <Loading />;
    }
    return (
        
        <>
        <MatchTable matchHistory={matchHistory} players = {players} />
            {/* <Navbar/> 
            <Background />
            <div className=' sm:ml-[140px] sm:mt-[25px] mt-[100px] flex flex-col justify-center items-center p-4' > 
            <Hero user={user}/>
            <About user={user}/>
            <Timeline education={filteredEducation} experience={filteredExperience}/>
            
            <Skills skills={sortedFilteredSkills} />
            <Projects projects={sortedFilteredProject} />
             <Contact social={filteredSocialHandles} user={user}/>
            </div> */}
   </>
    );
}

export default Home;
