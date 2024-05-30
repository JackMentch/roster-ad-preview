import React from 'react';
import { useSpring, animated } from 'react-spring';
import './card.css';
import { useNavigate } from 'react-router';

const Card: React.FC = () => {


    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Hello World');
        navigate('/');
    };
    const styles = useSpring({
        from: { opacity: 0, transform: 'translateY(100px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 400, friction: 100, delay: 10000 }, // Adjust tension and friction for the bounce effect
    });

    return (
        <div className="card" onClick={ handleClick }>
            <animated.div
                style={{
                    ...styles,
                    width: '120px',
                    height: '180px',
                    borderRadius: '5px', // Adjust the radius as needed
                    position: 'relative',

                }}
            >
                <img
                    src={
                        '/playerImages/17499.png'
                    }
                    alt="Player"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        background: 'linear-gradient(to bottom right, #00f6ff, #ddb6fc, #00f6ff)',
                        borderRadius: '15px', // Match the radius of the animated.div
                        border: '2px solid black',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: -1, // Place the image behind the text elements
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '0px',
                        right: '7px',
                        color: 'white',
                        fontSize: '22px',
                        fontWeight: 'bold',
                        textShadow: '2px 1px 4px black',

                    }}
                >
                    95
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '42px',  // Adjust width as needed
                        height: '34px', // Adjust height as needed
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',  // Change color as needed
                        borderTopRightRadius: '15px', // Apply borderRadius only to the bottom-right corner
                        borderBottomLeftRadius: '15px', // Apply borderRadius only to the bottom-right corner
                        zIndex: -1,  // Ensure it's above the image
                    }}
                ></div>
                <div
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '5px',
                        color: 'black',
                        fontSize: '18px',

                    }}
                >
                    {/* 1B */}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0px',
                        left: '0', // Adjust left position to start from the left edge
                        right: '0', // Adjust right position to end at the right edge
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold', // Make the font bold
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        borderBottomLeftRadius: '15px', // Apply borderRadius only to the bottom-left corner
                        borderBottomRightRadius: '15px', // Apply borderRadius only to the bottom-right corner
                    }}
                >
                    Bryce Harper
                </div>
            </animated.div>
        </div>
    );
};

export default Card;
