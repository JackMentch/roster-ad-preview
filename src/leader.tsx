import React, { useState, useRef, useEffect } from "react";
import "./leader.css"


interface Props {
    setLeader(): void;
    setOverlay(): void;
    draft_id: string;
}

interface Leader {
    id: number;
    score: number;
    draft_id: number;
    name: string;
}

export const Leader: React.FC<Props> = ({ setLeader, setOverlay, draft_id }) => {

    const [apiResponseData, setApiResponseData] = useState<Leader[]>([]);

    const [value, setValue] = useState('');

    const [loading, setLoading] = useState(true);


    const onChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value)
    }

    const [name, setName] = useState(localStorage.getItem('accountName'))

    const [changeName, setChangeName] = useState(false)

    let twitterLink = 'https://twitter.com/' + name;
    let twitter = 'https://twitter.com/';

    const updateAccount = (accountName: string) => {

        const usernameRegex = /^[a-zA-Z0-9_]{1,15}$/;

        if (usernameRegex.test(accountName)) {
            localStorage.setItem('accountName', accountName);
            setName(accountName);
            return 'account updated'
        }
        else {
            return 'incorrect username'
        }
    }


    const url = `https://imac-draft-api.vercel.app/api/getLeaders?draft_id=${draft_id}`;


    useEffect(() => {
        // Simulating an API call
        const fetchData = async () => {
            try {

                setLoading(true);
                // Replace this with your actual API call
                const response = await fetch(url);
                const data = await response.json();

                const myData = data['data'];

                let leaders: Leader[] = [];

                leaders = myData;

                setApiResponseData(leaders);

                console.log('Acquiring data');

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (

        <div className="instruction">
            <div className="close-btn" onClick={() => {
                setLeader();
                setOverlay();
            }}>X</div>

            <h5 className="title">Today's Leaderboard</h5>

            {changeName ? (
                <div>

                    <h6 className="account-text">Add your Twitter account if you want to appear on the Leaderboard. Remove if you do not want to appear.</h6>
                    <h6 className="account-text-small"><b>Note:</b> username must be set prior to finishing draft</h6>
                    <div className="fade-in-element fade-out fade-out-element field">
                        <div className="flex justify-between items-center border-blue-200 rounded button">
                            <input
                                autoFocus
                                type="text"
                                value={value}
                                onChange={onChange}
                                className="block submit px-4 py-2 text-black-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="account name"
                            />

                        </div>

                        <span>
                            <button onClick={() => {
                                updateAccount(value);
                                setChangeName(false);
                            }} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1.5 px-4 rounded-full bottom-update">
                                update
                            </button>
                            <button onClick={() => {
                                localStorage.removeItem('accountName');
                                setChangeName(false);
                                setName(null);
                            }} className="bg-red-500 hover:bg-red-400 text-white font-bold py-1.5 px-4 rounded-full bottom-delete">
                                remove
                            </button>
                        </span>
                    </div>
                </div>


            ) : (
                <div>
                    <br></br>

                    {loading && <h5 className="loading">Loading...</h5>}

                    {apiResponseData.slice(0, 10).map((item, index) => (
                        <h6 className="body" key={index}>
                            <b>{index + 1}. </b>
                            <a href={twitter + item.name} target="_blank">@{item.name}</a>
                            <span className="score">{item.score}</span>
                        </h6>
                    ))}


                    {name === null ? null : (<h6 className="account"><b>account: </b><a href={twitterLink} target="_blank">@{name}</a></h6>)}

                    <button onClick={() => { setChangeName(true); }} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1.5 px-4 rounded-full bottom">
                        update account
                    </button>
                </div>
            )}




        </div>

    );
};