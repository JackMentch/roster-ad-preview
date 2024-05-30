import React from 'react';
import './Summary.css';
import AudioPlayer from './audio';

var key = require("./key.json")

interface Props {
    currentQuiz: number;
    percentile: string;
    answer: string[];
    myAnswer: string | null;
    correct: boolean | null;

}



const Summary: React.FC<Props> = ({ currentQuiz, percentile, answer, myAnswer, correct }) => {

    const question: string = key["key"][currentQuiz.toString()]["question"]
    const image: string = key["key"][currentQuiz.toString()]["image"]
    const submitted: string = key["key"][currentQuiz.toString()]["submitted"]
    const submittedLink: string = "https://twitter.com/" + submitted
    const qType: string = key["key"][currentQuiz.toString()]["type"]
    const pattern: string[] = key["key"][currentQuiz.toString()]["pattern"]
    const mp3: string = key["key"][currentQuiz.toString()]["mp3"]
    const career: string[] = key["key"][currentQuiz.toString()]["career"]
    const years: string[] = key["key"][currentQuiz.toString()]["years"]

    function isStringArray(variable: unknown): variable is string[] {
        return Array.isArray(variable) && variable.every(item => typeof item === 'string');
    }

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

            <h2 className="answer-title-summary">My Answer:</h2>

            {correct ? (<h2 className="answer-correct-summary">
                {
                    isStringArray(myAnswer) ? myAnswer.map((answer: string) => (
                        <h2>{answer}</h2>)) : myAnswer}
            </h2>) :
                (<h2 className="answer-incorrect-summary">{
                    isStringArray(myAnswer) ? myAnswer.map((answer: string) => (
                        <h2>{answer}</h2>)) : myAnswer}</h2>)}

            <h2 className="answer-title-summary">Correct Answer(s):</h2>

            {answer.map((answer: string) => (
                <h2 className="answer-summary">{answer}</h2>))}


            <h2 className="percentile-summary"><b>{percentile}%</b> of players answered correctly</h2>



        </div>
    )
}



export default Summary;
