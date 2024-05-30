import React from 'react';
import './Cards.css';
import { MyPlayer } from './MyPlayer';
import { useSpring, animated } from 'react-spring';

let myBoolean = false;

interface Props {
    myPlayer: MyPlayer;
}

const Cards: React.FC<Props> = ({ myPlayer }) => {
    const playerStyle: React.CSSProperties = {
        width: '105px',
        height: '140px',
        backgroundColor: 'white',
        borderRadius: '5px',
    };

    const styles = useSpring({
        from: { opacity: 0, transform: 'translateY(100px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 400, friction: 100, delay: 10000 }, // Adjust tension and friction for the bounce effect
    });

    let background: string = 'linear-gradient(to bottom right, #ad8a58, #faeede ,#ad8a58)';

    if (myPlayer) {

        if (myPlayer.rating > 89) {
            background = 'linear-gradient(to bottom right, #00f6ff, #ddb6fc, #00f6ff)';
        }
        else if (myPlayer.rating > 79) {
            background = 'linear-gradient(to bottom right, #e6bc35, #fff3d4, #e6bc35)';
        }
        else if (myPlayer.rating > 69) {
            background = 'linear-gradient(to bottom right, #a19f9f, white, #a19f9f)';
        }
        if (myPlayer.special === "spring") {
            background = 'linear-gradient(to bottom right, #FCF55F, #B0EACF, #3EB489)';
        }


    }

    let image_link: string;

    if (myPlayer.image) {

        image_link = "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/" + myPlayer.id + ".png&w=350&h=254"
    }
    else {

        image_link = "/playerImages/" + myPlayer.id + ".png"
    }

    return (

        <animated.div style={{ ...styles }}>

            <div className="player" style={playerStyle}>

                {myPlayer !== null && myPlayer.chemistry !== null ? (<img
                    src={
                        'logos/' + myPlayer.chemistry + '.png'
                    }
                    style={{
                        position: 'absolute',
                        maxHeight: '22px',
                        top: '2px',
                        left: '2px',
                    }}
                />
                ) : (null)}

                <img
                    src={
                        image_link
                    }
                    alt="Player"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        background: background,
                        borderRadius: '5px', // Match the radius of the animated.div
                        border: '2px solid white',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '26px',  // Adjust width as needed
                        height: '20px', // Adjust height as needed
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',  // Change color as needed
                        borderTopRightRadius: '5px', // Apply borderRadius only to the bottom-right corner
                        borderBottomLeftRadius: '5px', // Apply borderRadius only to the bottom-right corner
                        zIndex: 0,  // Ensure it's above the image
                    }}
                ></div>


                <div
                    style={{
                        position: 'absolute',
                        bottom: '0px',
                        left: '0', // Adjust left position to start from the left edge
                        right: '0', // Adjust right position to end at the right edge
                        color: 'white',
                        fontSize: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        borderBottomLeftRadius: '3px', // Apply borderRadius only to the bottom-left corner
                        borderBottomRightRadius: '3px', // Apply borderRadius only to the bottom-right corner
                    }}
                >
                    {myPlayer.name}


                    <div
                        style={{
                            position: 'absolute',
                            top: '-125px',
                            right: '5px',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            textShadow: '2px 1px 4px black',

                        }}
                    >
                        {myPlayer.rating}
                    </div>

                </div>
            </div>
        </animated.div>
    )
}



export default Cards;
