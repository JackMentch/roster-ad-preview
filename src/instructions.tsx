import React, { useState, useRef } from "react";
import "./instructions.css"


interface Props {
    setModal(): void;
    setOverlay(): void;
}

export const Modal: React.FC<Props> = ({ setModal, setOverlay }) => {


    return (

        <div className="instruction">
            <div className="close-btn" onClick={() => {
                setModal();
                setOverlay();
            }}>X</div>

            <h5 className="title">How To Play</h5>

            <div style={{ maxWidth: '350px' }} className="scrollable">

                <h6 className="body">Click on each empty card (denoted with a '+')</h6>
                <h6 className="body">Answer the trivia prompt</h6>
                <h6 className="body">Select from 1 of the 3 possible players to fill the position. Once all 9 positions are filled the Immacualte Draft of the day is completed.</h6>

                <h5 className="sub-title">Card Probabilities:</h5>

                <h6 className="body">There are 4 total card possbilities: Broze, Silver, Gold, and Diamond. If a question is answered incorrectly, the user is only give Bronze or Silver to
                    pick from.</h6>

                <h6 className="body">If a user answers correctly, Gold and Diamond probabilities are detailed below</h6>

                <div className="image-with-text">
                    <img style={{ marginLeft: '30px', marginRight: '10px', width: '70px', paddingTop: '10px' }} src="./gold.png" />
                    <h5 className="textImage">Gold <span className="notBold">(80-89)</span><br /><br />
                        <span className="smallerTextImage">Base Odds: 10%</span><br /><br />
                        <span className="smallerTextImage">increases by 5% with each correct answer (maximum of 55%)</span>
                    </h5>

                </div>

                <div className="image-with-text">
                    <img style={{ marginLeft: '30px', marginRight: '10px', width: '70px', paddingTop: '10px' }} src="./diamond.png" />
                    <h5 className="textImage">Diamond <span className="notBold">(90-99)</span><br /><br />
                        <span className="smallerTextImage">Base Odds: 1%</span><br /><br />
                        <span className="smallerTextImage">increases by 1% with each correct answer (maximum of 10%)</span>
                    </h5>

                </div>

                <h5 className="sub-title">Feedback:</h5>

                <h6 className="body">If you have any feedback, please feel free to DM me on Twitter: <a href='https://twitter.com/ImmaculateDraft' target="_blank">@ImmaculateDraft</a></h6>

                <h6 className="body">It's just me running everything but if you take the time to write me, I will do my best to reply. Thank you!</h6>

            </div>



        </div>

    );
};