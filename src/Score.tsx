import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Score.css';

interface AnimatedNumberProps {
    endValue: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ endValue }) => {
    const { value } = useSpring({
        from: { value: 0 },
        to: async (next) => {
            await next({ value: endValue });
            // Add more steps as needed
        },
        config: { duration: 650 }, // Adjust the duration as needed
    });

    const animatedStyle = {
        color: 'white', // Change the color to your desired value
        fontWeight: 'bold', // Make the font bold
    };

    return (
        <div>
            <animated.span className="animated-number">{value.to((val) => Math.floor(val))}</animated.span>
        </div>
    );
};

export default AnimatedNumber;
