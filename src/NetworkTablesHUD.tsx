import React, { useEffect, useState } from 'react';
import { NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
import './NetworkTablesHUD.css';
import Hexagon from './Hexagon';

const ReefHUD: React.FC = () => {
    const [currentStalkNumber, setCurrentStalkNumber] = useState<number | null>(null);
    const [matchTimer, setMatchTimer] = useState<number | null>(null);
    const [connection, setConnection] = useState<string>("Unknown");

    useEffect(() => {
        // Initialize and connect to NetworkTables
        const ntcore = NetworkTables.getInstanceByURI('localhost');

        ntcore.addRobotConnectionListener((connected) => {
            console.log(connected ? 'Connected to NetworkTables!' : 'Disconnected from NetworkTables.');
            setConnection(connected ? "Connected" : "Disconnected");
        });

        const stalkNumberTopic = ntcore.createTopic<number>('/SmartDashboard/Reef Stalk Number', NetworkTablesTypeInfos.kDouble);
        const matchTimerTopic = ntcore.createTopic<number>('/SmartDashboard/Match Time', NetworkTablesTypeInfos.kDouble);

        // Subscribe to stalk number updates
        const subscriptionId1 = stalkNumberTopic.subscribe((value) => {
            console.log(`Got Stalk Number: ${value}`);
            setCurrentStalkNumber(value);
        });

        // Subscribe to match timer updates directly
        const subscriptionId2 = matchTimerTopic.subscribe((value) => {
            console.log(`Got Match Time: ${value}`);
            setMatchTimer(value);
        });

        // Cleanup on component unmount
        return () => {
            stalkNumberTopic.unsubscribe(subscriptionId1);
            matchTimerTopic.unsubscribe(subscriptionId2);
        };
    }, []);

    return (
        <>
            <p className={`connection-status ${connection === "Connected" ? 'connected' : 'disconnected'}`}>
                Connection Status: {connection}
            </p>
            <p className="current-stalk">Current Stalk: {currentStalkNumber ?? "No stalk identified"}</p>
            <p className="current-matchtime">Time Left: {matchTimer !== null 
                ? `${Math.floor(matchTimer / 60)}:${String(Math.floor(matchTimer % 60)).padStart(2, '0')}` 
                : 'N/A'
            } </p>
            <h1 id='barge-text'>Barge</h1>
            <Hexagon currentStalkNumber={currentStalkNumber}/>
            <h1 id='driver-text'>Driver</h1>
        </>
    );
};

export default ReefHUD;
