import React from 'react';
import './player.css';
import { MyPlayer } from './MyPlayer';

let myBoolean = false;

interface Props {
    myPlayer: (MyPlayer | null);
    correct: (boolean | null);
}

const Player: React.FC<Props> = ({ myPlayer, correct }) => {
    const playerStyle: React.CSSProperties = {
        width: '75.5px',
        height: '104px',
        backgroundColor: 'white',
        borderRadius: '5px',
    };

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

    let borderColor: string = 'black';
    if (correct === false) {
        borderColor = '#9D0000';
    }

    let image_link: string = "/playerImages/256.png";

    if (myPlayer !== null) {


        if (myPlayer.image) {

            image_link = "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/" + myPlayer.id + ".png&w=350&h=254"
        }
        else {

            image_link = "/playerImages/" + myPlayer.id + ".png"
        }



    }


    return (

        <div className="player" style={playerStyle}>

            {myPlayer === null ? (
                <h3 className='empty'>+</h3>
            ) : (


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
                        border: '2px solid',
                        borderColor: borderColor,
                        zIndex: -1, // Place the image behind the text elements
                    }}
                />

            )}
            {myPlayer !== null && myPlayer.chemistry !== null ? (<img
                src={
                    'logos/' + myPlayer.chemistry + '.png'
                }
                style={{
                    position: 'absolute',
                    maxHeight: '15px',
                    top: '4px',
                    left: '4px',
                }}
            />
            ) : (null)}
            {myPlayer === null ? (null) : (
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

            )}

            {myPlayer === null ? (null) : (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0px',
                        left: '0', // Adjust left position to start from the left edge
                        right: '0', // Adjust right position to end at the right edge
                        color: 'white',
                        fontSize: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        borderBottomLeftRadius: '5px', // Apply borderRadius only to the bottom-left corner
                        borderBottomRightRadius: '5px', // Apply borderRadius only to the bottom-right corner
                    }}
                >
                    {myPlayer.name}
                </div>)}

            {myPlayer === null ? (null) : (
                <div
                    style={{
                        position: 'absolute',
                        top: '0px',
                        right: '5px',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        textShadow: '2px 1px 4px black',

                    }}
                >
                    {myPlayer.rating}
                </div>

            )}

        </div>


    );
};


export default Player;
