import { NullablePlayer } from "./Home";
import { MyPlayer } from "./MyPlayer";
import Player from "./player";
import playerTeam from "./playerTeam";

const totalCards = require("./cards.json");

const selectPlayers = (players: NullablePlayer, pos: number, gold_odds: number, diamond_odds: number, correct: boolean, newCorrect: number) => {

    console.log(diamond_odds)

    const selectedPlayers: MyPlayer[] = [];

    const ippei_random: number = Math.random();
    console.log("IPPEI", ippei_random)
    
    if (!correct && ippei_random < 0.025){

        const ippei : MyPlayer = {
            id: "1111",
            image: false,
            rating: 0,
            base_rating: 0,
            name: "Ippei Mizuhara",
            special: "none",
            teams: [],
            chemistry: null
        }

        selectedPlayers.push(ippei);
        selectedPlayers.push(ippei);
        selectedPlayers.push(ippei);
        
    }

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const playerNames: string[] = players
        .filter(player => player !== null)
        .map(player => player!.name);

    const cards: MyPlayer[] = totalCards[pos.toString()]

    // Filter the cards array to get players with ratings between 80 and 89
    const goldPlayers = cards.filter(card => card.rating >= 80 && card.rating < 90);
    const diamondPlayers = cards.filter(card => card.rating > 89);

    // Check if there are any gold players
    if (goldPlayers.length > 0 && correct && newCorrect < 9) {
        // Select a random gold player
        const randomIndexGold = Math.floor(Math.random() * goldPlayers.length);
        const randomIndexDiamond = Math.floor(Math.random() * diamondPlayers.length);

        const correctRandomValue: number = Math.random();

        let randomPlayer: MyPlayer
        
        if (correctRandomValue < diamond_odds) {

            randomPlayer = diamondPlayers[randomIndexDiamond];

        }
        else{
            randomPlayer = goldPlayers[randomIndexGold];
        }
        
        let finalPlayer = playerTeam(randomPlayer);
        finalPlayer.base_rating = finalPlayer.rating;
        playerNames.push(finalPlayer.name);
        selectedPlayers.push(finalPlayer);
    }

    while (selectedPlayers.length < 3) {
        const randomValue: number = Math.random();
        let selectedPlayer: MyPlayer | undefined; // Initialize to undefined

        if (randomValue < diamond_odds) {
            // Select a player with a rating above 90
            const highRatedPlayers = cards.filter(card => card.rating >= 90);
            const filteredHighRatedPlayers = highRatedPlayers.filter(card => !selectedPlayers.includes(card));

            if (filteredHighRatedPlayers.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredHighRatedPlayers.length);
                selectedPlayer = filteredHighRatedPlayers[randomIndex];
            }

        } 
        
        else if (randomValue < gold_odds) {
            // Select a player with a rating above 90
            const midRatedPlayers = cards.filter(card => card.rating <= 90 && card.rating >= 80);
            const filteredHighRatedPlayers = midRatedPlayers.filter(card => !selectedPlayers.includes(card));

            if (filteredHighRatedPlayers.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredHighRatedPlayers.length);
                selectedPlayer = filteredHighRatedPlayers[randomIndex];
            }

        }
        
        else {
            // Select any player randomly
            const lowRatedPlayers = cards.filter(card => card.rating < 80);
            const filteredLowRatedPlayers = lowRatedPlayers.filter(card => !selectedPlayers.includes(card));

            if (filteredLowRatedPlayers.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredLowRatedPlayers.length);
                selectedPlayer = filteredLowRatedPlayers[randomIndex];
            }
        }

        if (selectedPlayer && !playerNames.includes(selectedPlayer.name)) {
            
            let finalPlayer = playerTeam(selectedPlayer);
            finalPlayer.base_rating = finalPlayer.rating;
            playerNames.push(finalPlayer.name);
            selectedPlayers.push(finalPlayer);
        }
    }

    // Shuffle the selected players before returning
    shuffleArray(selectedPlayers);
    return selectedPlayers;
};

export default selectPlayers;
