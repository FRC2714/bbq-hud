import React, { useEffect, useState } from 'react';
import { NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
import './NetworkTablesHUD.css';
import Hexagon from './Hexagon';

const ReefHUD: React.FC = () => {
    const [currentStalkNumber, setCurrentStalkNumber] = useState<number | null>(null);
    const [connection, setConnection] = useState<string | null>("Unknown");

    useEffect(() => {
        // Initialize and connect to NetworkTables
        const ntcore = NetworkTables.getInstanceByURI('localhost');

        ntcore.addRobotConnectionListener((connected) => {
            console.log(connected ? 'Connected to NetworkTables!' : 'Disconnected from NetworkTables.');
            setConnection(connected ? "Connected" : "Disconnected");
        });

        const stalkNumberTopic = ntcore.createTopic<number>('/SmartDashboard/Reef Stalk Number', NetworkTablesTypeInfos.kDouble);

        // Subscribe to the topic and store the subscription IDs
        const subscriptionId1 = stalkNumberTopic.subscribe((value) => {
            console.log(`Got Elevator Setpoint Value: ${value}`);
            setCurrentStalkNumber(value);
        });

        // Cleanup on component unmount
        return () => {
            // Unsubscribe using the subscription IDs
            stalkNumberTopic.unsubscribe(subscriptionId1);
        };
    }, []);

    return (
        <>
            <p className={`connection-status ${connection === "Connected" ? 'connected' : 'disconnected'}`}>
                Connection Status: {connection}
            </p>
            <p className="current-stalk">Current Stalk: {currentStalkNumber ? currentStalkNumber : "No stalk identified"}</p>
            <h1 id='barge-text'>Barge</h1>
            <Hexagon currentStalkNumber={currentStalkNumber} />
            <h1 id='driver-text'>Driver</h1>
        </>
    );
};

export default ReefHUD;