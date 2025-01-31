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
        </div>
    );
};

export default Hexagon;