import { NullablePlayer } from "./Home";
import { MyPlayer } from "./MyPlayer";
import Player from "./player";

function countOccurrences<T>(arr: T[], target: T): number {
    return arr.reduce((count, currentValue) => {
        return currentValue === target ? count + 1 : count;
    }, 0);
}

const chemistry = (players: NullablePlayer) => {

    const teams: string[] = []
    players.forEach(player => {
        if (player !== null) {
            if (player.chemistry !== null) {
                teams.push(player.chemistry);
            }
        }
    });

    players.forEach(player => {
        if (player !== null && player.chemistry !== null) {

            const occurrences: number = countOccurrences(teams, player.chemistry);

            if (occurrences === 2) {

                player.rating = player.base_rating + 2
            }
            else if (occurrences === 3) {

                player.rating = player.base_rating + 5
            }
            else if (occurrences >= 4) {

                player.rating = player.base_rating + 7
            }

            if (player.rating > 99) {
                player.rating = 99;
            }


        }
    }
    )


    return players

};

export default chemistry;
