import React, { useState, useRef } from "react";
import './Quiz.css';
import Searchbar from './Searchbar';
import Input from './Input';
import AudioPlayer from './audio';
import Draggable, { DraggableObject } from './Draggable';
import Submit from './Submit';

var key = require("./key.json")

interface Props {
    myNull: null;
    currentQuiz: number;
    submitQuiz(currentQuiz: number, myAnswer: string, theAnswer: string[]): void;

}



const Quiz: React.FC<Props> = ({ myNull, currentQuiz, submitQuiz }) => {

    const question: string = key["key"][currentQuiz.toString()]["question"]
    const image: string = key["key"][currentQuiz.toString()]["image"]
    const submitted: string = key["key"][currentQuiz.toString()]["submitted"]
    const submittedLink: string = "https://twitter.com/" + submitted
    const qType: string = key["key"][currentQuiz.toString()]["type"]
    const pattern: string[] = key["key"][currentQuiz.toString()]["pattern"]
    const mp3: string = key["key"][currentQuiz.toString()]["mp3"]
    const career: string[] = key["key"][currentQuiz.toString()]["career"]
    const years: string[] = key["key"][currentQuiz.toString()]["years"]
    const multiple: string[] = key["key"][currentQuiz.toString()]["multiple"]

    const [ordering, setOrdering] = useState(multiple);


    return (

        <div>


            <h2 className='text'>{question}</h2>

            {image ? (<img
                src={
                    image
                }
                alt="Player"
                className="guessPlayer"
            />) : (null)}

            {mp3 ? (<div><AudioPlayer src={mp3} /></div>) : (null)}


            {pattern ? (
                <div>
                    <div className='br-line'></div>
                    {pattern.map((item) => (
                        <h6 className="pattern">{item}
                        </h6>
                    ))}
                    <div className='br-line'></div>

                </div>
            ) : (null)}


            {career ? (
                <div>
                    <div className='br-line'></div>
                    <div className='career-container'>
                        {career.map((item, index) => (
                            (<div><img
                                src={
                                    'logos/' + item + '.png'
                                }
                                className="career"
                            />
                                <h4 className='team-name'>{years[index]}</h4>
                            </div>)))}
                    </div>
                    <div className='br-line'></div>

                </div>
            ) : (null)}

            {multiple ? (
                <div>
                    <h2 className='submitted'>drag and drop objects below</h2>
                    <DraggableObject ordering={ordering} setOrdering={setOrdering}></DraggableObject>
                </div>
            ) : (null)}


            {submitted ? (<h2 className='submitted'>submitted by <a href={submittedLink} target="_blank">@{submitted}</a></h2>) : (null)}


            {qType === "input" ? (
                <Input currentQuiz={currentQuiz} submitQuiz={submitQuiz} />
            ) : qType === "order" ? (
                <Submit currentQuiz={currentQuiz} submitQuiz={submitQuiz} value={ordering} />
            ) : (
                <Searchbar currentQuiz={currentQuiz} submitQuiz={submitQuiz} />
            )}

        </div>
    )
}



export default Quiz;
