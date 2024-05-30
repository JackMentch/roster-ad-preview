import React, { useState, useRef } from "react";
import "./Input.css"

var key = require("./key.json")

interface Props {
    currentQuiz: number;
    submitQuiz(currentQuiz: number, myAnswer: string, theAnswer: string[]): void;

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


export const Input: React.FC<Props> = ({ currentQuiz, submitQuiz }) => {

    const theAnswer: string[] = key['key'][currentQuiz.toString()]["answer"]

    const [value, setValue] = useState('');

    const onChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value)
    }

    return (

        <div>

            <div className="fade-in-element fade-out fade-out-element field-new">
                <div className="flex justify-between items-center border-blue-200 rounded button">
                    <input
                        autoFocus
                        type="text"
                        value={value}
                        onChange={onChange}
                        className="block submit-new px-4 py-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Answer"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full right"
                        onClick={() => { submitQuiz(currentQuiz, value, theAnswer) }}
                    >
                        Submit
                    </button>
                </div>


            </div>
        </div>
    );
};


export default Input;