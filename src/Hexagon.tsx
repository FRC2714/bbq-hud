import React from 'react';
import './Hexagon.css';

interface HexagonProps {
    currentStalkNumber: number | null;
}

const Hexagon: React.FC<HexagonProps> = ({ currentStalkNumber }) => {

    const stalkClasses = [
        'l1', 'r1', 'l2', 'r2',
        'l3', 'r3', 'l4', 'r4',
        'l5', 'r5', 'l6', 'r6'
    ]

    const stalkPairs = [
        [0,1],
        [2,3],
        [4,5],
        [6,7],
        [8,9],
        [10,11]
    ]

    return (
        <div className="hexagon-container">
            <div className='hexagon' />
            {stalkClasses.map((className, index) => (
                <div
                key={index}
                className={`stalk ${className} ${
                    currentStalkNumber === index + 1 ? 'active' : ''
                }`}
                />
            ))}
            {stalkPairs.map(([leftIndex, rightIndex], sideIndex) => {
                const isSideActive = 
                    currentStalkNumber === leftIndex + 1 || 
                    currentStalkNumber === rightIndex + 1;

                return isSideActive ? (
                    <div key={`side-${sideIndex}`} className={`hex-side side${sideIndex + 1}`} />
                ) : null;
            })}
        </div>
    );
};

export default Hexagon;