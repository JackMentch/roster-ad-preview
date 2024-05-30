import React, { useEffect, useState, useRef, useReducer } from "react"
import "./Home.css"
import Card from './card'
import AnimatedNumber from "./Score";
import { MyPlayer } from "./MyPlayer";
import Player from "./player";
import Cards from "./Cards";
import Quiz from "./Quiz";
import selectPlayers from "./select";
import CopyToClipboard from "react-copy-to-clipboard";
import { Modal } from "./instructions"
import { Analytics } from '@vercel/analytics/react';
import { Leader } from "./leader";
import postDraft from "./postDraft";
import getQuestion from "./getQuestion";
import Summary from "./Summary";
import chemistry from "./chemistry";
import AdBanner from "./adManager";

var key = require("./key.json")

export type NullablePlayer = (MyPlayer | null)[];

export type NullablePossiblePlayers = (MyPlayer | null)[][];

export type NullableQuiz = (boolean | null)[];

export type NullablePercentiles = (number | null)[];

export type NullableAnswers = (string | null)[];


const Home: React.FC = () => {

    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);

        // Reset viewport scale to 1
        (document.documentElement.style as any).zoom = '1';
    });

    const [refreshKey, setRefreshKey] = useState(0);

    const [currentPage, setCurrentPage] = useState<string>('home');

    const [players, setPlayers] = useState<NullablePlayer>([null, null, null, null, null, null, null, null, null])

    const [quiz, setQuiz] = useState<NullableQuiz>([null, null, null, null, null, null, null, null, null])

    const [submittedAnswers, setSubmittedAnswers] = useState<NullableAnswers>([null, null, null, null, null, null, null, null, null])

    const [overlay, setOverlay] = useState(false)

    const [percentiles, setPercentiles] = useState<NullablePercentiles>([null, null, null, null, null, null, null, null, null])

    const [end, setEnd] = useState(false)

    const [numberCorrect, setNumberCorrect] = useState(0)

    const [selectCards, setSelectCards] = useState(false)

    const [displayQuiz, setDisplayQuiz] = useState(false)

    const [displaySummary, setSummary] = useState(false)

    const [quizIndex, setQuizIndex] = useState(key['id'].toString())

    const [currentQuiz, setCurrentQuiz] = useState(-1)

    const [modal, setModal] = useState(false);

    const [leader, setLeader] = useState(false);

    const [possiblePlayers, setPossiblePlayers] = useState<NullablePossiblePlayers>(
        [
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    )

    const quizJSON = localStorage.getItem(quizIndex);

    const quizData = {
        players: players,
        quiz: quiz,
        numberCorrect: numberCorrect,
        possiblePlayers: possiblePlayers,
        percentiles: percentiles,
        submittedAnswers: submittedAnswers
    }



    localStorage.setItem(quizIndex, JSON.stringify(quizData));



    if (quiz.every(element => element === null)) {

        if (quizJSON) {

            const quizData = JSON.parse(quizJSON);
            const myQuiz: NullableQuiz = quizData.quiz;

            if (myQuiz.some(element => element !== null)) {

                setPlayers(quizData.players)
                setQuiz(quizData.quiz)
                setPercentiles(quizData.percentiles)
                setNumberCorrect(quizData.numberCorrect)
                setPossiblePlayers(quizData.possiblePlayers)
                setSubmittedAnswers(quizData.submittedAnswers)

            }


        }
    }


    const updatePercentiles = (index: number, newValue: null | any) => {

        setPercentiles(prevPercentile => [
            ...prevPercentile.slice(0, index),
            newValue,
            ...prevPercentile.slice(index + 1),
        ]);

    };


    const updateQuiz = (index: number, newValue: null | any) => {

        setQuiz(prevQuiz => [
            ...prevQuiz.slice(0, index),
            newValue,
            ...prevQuiz.slice(index + 1),
        ]);

    };

    const updateAnswers = (index: number, newValue: null | any) => {

        setSubmittedAnswers(prevQuiz => [
            ...prevQuiz.slice(0, index),
            newValue,
            ...prevQuiz.slice(index + 1),
        ]);

    };

    const updatePlayers = (index: number, newValue: null | any) => {

        const newList = [...players.slice(0, index), newValue, ...players.slice(index + 1)];

        const finalList = chemistry(newList);

        setPlayers(finalList);

        if (players.filter(value => value === null || value === undefined).length <= 1) {
            console.log("ENDD")
            setEnd(true)
        }

    };

    let averageRating: number;

    const validPlayers = players.filter((player): player is MyPlayer => player !== null);
    const sumOfRatings = validPlayers.reduce((sum, player) => sum + player.rating, 0);
    if (validPlayers.length === 0) {
        averageRating = 0;
    }
    else {
        averageRating = sumOfRatings / validPlayers.length;
    }

    const openQuiz = (pos: number) => {

        if (players[pos] === null) {

            console.log("IM A NULL PLAYER")

            setCurrentQuiz(pos);
            setOverlay(true);

            if (quiz[pos] === null) {

                setDisplayQuiz(true);

            }
            else {

                openPlayers(pos);

            }
        }
        else {

            setCurrentQuiz(pos);
            setOverlay(true);
            setSummary(true);

        }
    };

    const openPlayers = (pos: number) => {
        setDisplayQuiz(false)
        setSelectCards(true)
    };


    const closePlayers = (pos: number, myPlayer: MyPlayer) => {

        updatePlayers(pos, myPlayer);
        setDisplayQuiz(false);
        setSelectCards(false);
        setOverlay(false);
    };

    function areListsIdentical<T>(list1: T[], list2: T[]): boolean {
        return list1.length === list2.length && list1.every((value, index) => value === list2[index]);
    }

    const submitQuiz = (pos: number, myAnswer: string | string[], theAnswer: string[]) => {
        
        updateAnswers(pos, myAnswer)

        let correct: boolean = false;

        if (typeof myAnswer === 'string') {
            correct = theAnswer.includes(myAnswer);
        }
        else {
            correct = areListsIdentical(myAnswer, theAnswer);
        }

        getQuestion(quizIndex, pos, correct, percentiles, setPercentiles);

        let newCorrect: number = numberCorrect;

        if (correct) {
            newCorrect++
        }

        // Once the quiz is submitted, we need to generate 3 random players to choose from

        if (possiblePlayers[pos].every(value => value === null)) {

            // Calc gold oods
            let gold_odds: number = 0.10 + 0.05 * newCorrect;

            // Calc diamond odds
            let diamond_odds: number = 0.01 + 0.01 * newCorrect;


            if (newCorrect === 9) {
                diamond_odds = 1.0
            }

            if (!correct) {
                diamond_odds = 0;
                gold_odds = 0;
            }

            possiblePlayers[pos] = selectPlayers(players, pos, gold_odds, diamond_odds, correct, newCorrect);

        }

        setDisplayQuiz(false);
        updateQuiz(pos, correct);
        setNumberCorrect(newCorrect)
        setSelectCards(true);

    };

    const correctAnswers: number = quiz.filter(value => value === true).length;


    const top3Players = (players: NullablePlayer) => {
        // Filter out null values before sorting
        const nonNullPlayers = players.filter(player => player !== null) as MyPlayer[];

        // Create a new array before sorting to avoid modifying the original array
        const sortedPlayers: MyPlayer[] = nonNullPlayers.slice().sort((a, b) => b.rating - a.rating);

        const top3 = sortedPlayers.slice(0, 3);

        const top3_names = top3.map(myplayer => myplayer.name);

        return top3_names;
    };

    if (end) {

        const name = localStorage.getItem('accountName');

        if (name !== null && name !== undefined) {

            postDraft(name, averageRating.toString(), quizIndex)
            console.log("SUBMITING SCORE", averageRating)

        }
        setEnd(false)
    }

    const tweetText =
        '💎⚾ ImmaculateDraft #' + quizIndex + ' ⚾💎\n\n' + "Correct Answers: " + correctAnswers + "\n" + "Overall: " + averageRating.toFixed(0) + "\n\n" + "Franchise Players:\n - " + top3Players(players).join('\n - ') +

        '\n\n' + '@ImmaculateDraft\nImmaculateDraft.com';

    const handleCopy = () => {
        // Perform any additional actions when the text is copied if needed
        console.log('Text copied to clipboard');
    };

    const handleTweet = () => {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, '_blank');
    };

    return (

        <div>

            {overlay === false ? (null) : (<div className="overlay-full" onClick={() => {

                if (modal) {
                    setOverlay(false);
                    setModal(false);
                }
                else if (leader) {
                    setOverlay(false);
                    setLeader(false);
                }
                else {
                    setSummary(false);
                    setDisplayQuiz(false);
                    setOverlay(false);
                    setSelectCards(false);
                }

            }}></div>)}

            {modal ? (<Modal setModal={() => { setModal(false) }} setOverlay={() => { setOverlay(false) }} />) : null}

            {leader ? (<Leader draft_id={quizIndex} setLeader={() => { setLeader(false) }} setOverlay={() => { setOverlay(false) }} />) : null}

            <img className="foregroundImage" src="/field.png" alt="Second Image"></img>

            <h1 className="topLeftText">ImmaculateDraft.com</h1>

            <img onClick={() => {
                setModal(true)
                setOverlay(true)
                setCurrentPage('uber')
            }} className="info" src="/info.png" alt="info"></img>

            <img onClick={() => {
                setLeader(true)
                setOverlay(true)
            }} className="leaders" src="/leaders.png" alt="info"></img>

            {/* {end === false ? (null) : (
                <div onClick={() => { setEnd(false) }} className="end-overlay" >
                    <img className="end" src="/end.png" alt="info"></img>
                </div>
            )} */}

            {displayQuiz === false ? (null) : (
                <div className="border">

                    <Quiz myNull={null} currentQuiz={currentQuiz} submitQuiz={submitQuiz}></Quiz>

                </div>
            )}

            {displaySummary === false ? (null) : (
                <div className="border">
                    <Summary correct={quiz[currentQuiz]} currentQuiz={currentQuiz} percentile={(100 * percentiles[currentQuiz]!).toFixed(2)} answer={key['key'][currentQuiz.toString()]["answer"]} myAnswer={submittedAnswers[currentQuiz]}></Summary>
                </div>
            )}

            {selectCards === false ? (null) : (
                <div>

                    {quiz[currentQuiz] === null ? (null) :
                        quiz[currentQuiz] ? <h2 className="header-correct">correct</h2> :
                            <h2 className="header-incorrect">incorrect</h2>}

                    {possiblePlayers[currentQuiz][0]?.name === 'Ippei Mizuhara' ? (
                        <div>
                            <h2 className="ippei">you just got Ippei'd</h2>
                            <div className="cards">
                                <div className="card" onClick={() => closePlayers(currentQuiz, possiblePlayers[currentQuiz][2]!)}>
                                    <Cards myPlayer={possiblePlayers[currentQuiz][0]!}></Cards>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="cards">
                            <div className="card" onClick={() => closePlayers(currentQuiz, possiblePlayers[currentQuiz][0]!)}>
                                <Cards myPlayer={possiblePlayers[currentQuiz][0]!}></Cards>
                            </div>
                            <div className="card" onClick={() => closePlayers(currentQuiz, possiblePlayers[currentQuiz][1]!)}>
                                <Cards myPlayer={possiblePlayers[currentQuiz][1]!}></Cards>
                            </div>
                            <div className="card" onClick={() => closePlayers(currentQuiz, possiblePlayers[currentQuiz][2]!)}>
                                <Cards myPlayer={possiblePlayers[currentQuiz][2]!}></Cards>
                            </div>
                        </div>
                    )}


                    <br></br>

                    <h2 className="answer-title">Answer:</h2>

                    {key['key'][currentQuiz.toString()]["answer"].map((answer: string) => (
                        <h2 className="answer">{answer}</h2>))}


                    {key['key'][currentQuiz.toString()]["extra"] ? (<h2 className="answer-extra">{key['key'][currentQuiz.toString()]["extra"]}</h2>
                    ) : (null)}


                    {percentiles[currentQuiz] === null ? null : <h2 className="percentile"><b>{(100 * percentiles[currentQuiz]!).toFixed(2)}%</b> of players answered correctly</h2>}

                </div>
            )
            }

            <div style={{ textAlign: 'center' }}>

                <div className="left-field" onClick={() => openQuiz(6)}>
                    <Player myPlayer={players[6]} correct={quiz[6]}></Player>
                </div>

                <div className="center-field" onClick={() => openQuiz(7)}>
                    <Player myPlayer={players[7]} correct={quiz[7]}></Player>
                </div>

                <div className="right-field" onClick={() => openQuiz(8)}>
                    <Player myPlayer={players[8]} correct={quiz[8]}></Player>
                </div>

                <div className="catcher" onClick={() => openQuiz(1)}>
                    <Player myPlayer={players[1]} correct={quiz[1]}></Player>
                </div>

                <div className="third-base" onClick={() => openQuiz(4)}>
                    <Player myPlayer={players[4]} correct={quiz[4]}></Player>
                </div>

                <div className="shortstop" onClick={() => openQuiz(5)}>
                    <Player myPlayer={players[5]} correct={quiz[5]}></Player>
                </div>

                <div className="second-base" onClick={() => openQuiz(3)}>
                    <Player myPlayer={players[3]} correct={quiz[3]}></Player>
                </div>

                <div className="first-base" onClick={() => openQuiz(2)}>
                    <Player myPlayer={players[2]} correct={quiz[2]}></Player>
                </div>

                <div className="designated-hitter" onClick={() => openQuiz(0)}>
                    <Player myPlayer={players[0]} correct={quiz[0]}></Player>
                </div>

                <div className="absolute-element">

                    <svg width="100%" height="100%">
                        <circle cx="50%" cy="50%" r="40" className="animated-circle" />

                        <foreignObject x="25%" y="27%" width="50%" height="50%">
                            <AnimatedNumber endValue={averageRating} />
                            <p>OVR</p>
                        </foreignObject>

                    </svg>

                </div>
            </div>

            {players.every(element => element !== null) ? (<div className="botRightButton">
                <CopyToClipboard text={tweetText} onCopy={handleCopy}>
                    <button onClick={handleTweet} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1.5 px-4 rounded-full">Tweet score</button>
                </CopyToClipboard>
            </div >) : (null)
            }


            <div className="botRightText">
                <h1 >correct answers: {correctAnswers}</h1>
            </div >

            
            <AdBanner />
            <Analytics />

        </div >
    );
};

export default Home;
