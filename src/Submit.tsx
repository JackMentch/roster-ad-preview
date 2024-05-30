import React, { useState, useRef } from "react";
import "./Submit.css"

var key = require("./key.json")

interface Props {
    currentQuiz: number;
    submitQuiz(currentQuiz: number, myAnswer: string | string[], theAnswer: string[]): void;
    value: string[];

}

export interface Player {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    start_year: string;
    end_year: string;
    college: string;
    teams: string[];
}


export const Submit: React.FC<Props> = ({ currentQuiz, submitQuiz, value}) => {

    const theAnswer: string[] = key['key'][currentQuiz.toString()]["answer"]

    return (

        <div>
            <button
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full field-new"
                onClick={() => {
                    console.log(value)
                    submitQuiz(currentQuiz, value, theAnswer)
                }}
            >
                Submit
            </button>
        </div>
    );
};


export default Submit;