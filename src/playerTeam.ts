import { NullablePlayer } from "./Home";
import { MyPlayer } from "./MyPlayer";
import Player from "./player";

const totalCards = require("./cards.json");

const playerTeam = (player: MyPlayer) => {

    const chemistry: number = Math.random();

    if (player.teams.length > 0 && chemistry < 0.50) {
        const randomIndex = Math.floor(Math.random() * player.teams.length);
        player.chemistry = player.teams[randomIndex];
    }

    else {
        player.chemistry = null
    }

    return player

};

export default playerTeam;
