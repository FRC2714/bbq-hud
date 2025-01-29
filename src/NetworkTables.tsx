import React, { useEffect } from 'react';
import { NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';

const NetworkTablesComponent: React.FC = () => {
    useEffect(() => {
        // Initialize and connect to NetworkTables
        const ntcore = NetworkTables.getInstanceByURI('localhost');

        ntcore.addRobotConnectionListener((connected) => {
            console.log(connected ? 'Connected to NetworkTables!' : 'Disconnected from NetworkTables.');
        });
        const elevatorSetpointTopic = ntcore.createTopic<number>('/SmartDashboard/Elevator Setpoint', NetworkTablesTypeInfos.kDouble);

        // Subscribe to the topic and store the subscription IDs
        const subscriptionId1 = elevatorSetpointTopic.subscribe((value) => {
            console.log(`Got Elevator Setpoint Value: ${value}`);
        });

        const subscriptionId2 = elevatorSetpointTopic.subscribe((value, params) => {
            console.log(`Got Elevator Setpoint Value: ${value} at from topic id ${params.id}`);
        });

        // Cleanup on component unmount
        return () => {
            // Unsubscribe using the subscription IDs
            elevatorSetpointTopic.unsubscribe(subscriptionId1);
            elevatorSetpointTopic.unsubscribe(subscriptionId2);
        };
    }, []);

    return (
        <div>
            <h1>NetworkTables Example</h1>
            <p>Check the console for Elevator Setpoint updates.</p>
        </div>
    );
};

export default NetworkTablesComponent;