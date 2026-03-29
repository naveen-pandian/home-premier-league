import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MatchTable from '../components/MatchTable';
import Loading from '../components/Loading';

const Home = () => {
    const BASE_URL = 'https://home-premier-league.vercel.app/api/hpl_data';

    const [hpl_data, setHpl_data] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState("home"); // ← controls which tab is shown

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(response => setHpl_data(response[0]?.hpl));

        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    const players = hpl_data?.players;
    const matchHistory = hpl_data?.matchHistory;

    if (isLoading) {
        document.title = 'HPL';
        return <Loading />;
    }

    // Map each tab id → the component to render
    const pages = {
        home:    <div> Home Page</div>,
        Points:  <div>Points Page</div>,   // replace with your real component
        Amount:  <div>Amount Page</div>,
        Status:  <div>Status Page</div>,
        History: <MatchTable matchHistory={matchHistory} players={players} />,
    };

    return (
        <>
            {/* Only the active page renders, others are hidden */}
            <div className="bg-gray-50" style={{ paddingBottom: 100 }}>
                {pages[active]}
            </div>

            <Navbar active={active} onTabChange={setActive} />
        </>
    );
};

export default Home;