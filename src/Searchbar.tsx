import React, { useState, useRef } from "react";
import "./Searchbar.css"



var playerData = require("./players.json")
var teamData = require("./teams.json")
var key = require("./key.json")

interface Props {
    currentQuiz: number;
    submitQuiz(currentQuiz: number, myAnswer: string, theAnswer: string[]): void;

}

export interface Player {
    id: string;
    full_name: string;
    first_name: string;
    last_name: string;
    start_year: string;
    end_year: string;
}


export const Searchbar: React.FC<Props> = ({ currentQuiz, submitQuiz }) => {

    const theAnswer: string[] = key['key'][currentQuiz.toString()]["answer"]

    const qType: string = key['key'][currentQuiz.toString()]["type"]

    let data: any;

    if (qType === "team") {
        data = teamData;
    }
    else {
        data = playerData;
    }

    const [value, setValue] = useState('');

    const onChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value)
    }

    const onSearch = (searchTerm: string) => {
        console.log('search', searchTerm)
    }


    return (

        <div>

            <div className="fade-in-element fade-out fade-out-element">
                <div className="flex border-blue-200 rounded button">
                    <input autoFocus
                        type="text"
                        value={value}
                        onChange={onChange}
                        className="block w-full px-4 py-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                    />

                </div>
                <div className="dropdown">
                    {data.filter((player: Player) => {
                        const searchTerm = value.toLowerCase();
                        const first_name = player.first_name.toLowerCase() + ' ' + player.last_name.toLowerCase();
                        const last_name = player.last_name.toLowerCase() + ' ' + player.first_name.toLowerCase();

                        return (searchTerm && first_name.startsWith(searchTerm)) || (searchTerm && last_name.startsWith(searchTerm));
                    }).sort((a: Player, b: Player) => {
                        const aEndYear = Number(a.end_year);
                        const bEndYear = Number(b.end_year);
                        return bEndYear - aEndYear;
                    }).slice(0, 10)
                        .map((player: Player) => (
                            <div className="flex border-blue-200 rounded button new">

                                <div
                                    className="dropdown-row"
                                    key={player.id}
                                >
                                    {player.full_name}
                                    {qType === "team" ? (null) : <span className="start-year">({player.start_year}-</span>}
                                    {qType === "team" ? (null) : <span className="end-year">{player.end_year})</span>}

                                </div>


                                <button className="ml-auto right px-2 py-1 text-white bg-blue-600 rounded button-config"
                                    onClick={() => {
                                        submitQuiz(currentQuiz, player.full_name, theAnswer)

                                    }}>
                                    Submit
                                </button>


                            </div>

                        ))}

                </div>
            </div>
        </div>
    );
};


export default Searchbar;