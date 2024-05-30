import React, { useState } from 'react';
import './Table.css';
import Player from './player';

interface Player {
    id: string;
    image: boolean;
    name: string;
    rating: number;
}

interface Data {
    [key: string]: Player[];

}

const positionMap: Record<string, string> = {
    "DH": "0",
    "C": "1",
    "1B": "2",
    "2B": "3",
    "3B": "4",
    "SS": "5",
    "LF": "6",
    "CF": "7",
    "RF": "8",
    "All": "9",
    // Add more key-value pairs as needed
};

const removeDuplicatePlayers = (players: Player[]): Player[] => {
    const playerMap = new Map<string, Player>();
    players.forEach(player => playerMap.set(player.id, player));
    return Array.from(playerMap.values());
};

const Table: React.FC = () => {
    const cards = require("./cards.json") as Data;
    const [pos, setPos] = useState("9");

    const defaultSortConfig: { key: keyof Player; direction: string } = { key: 'rating', direction: 'desc' };
    const [sortConfig, setSortConfig] = useState<{ key: keyof Player; direction: string } | null>(
        defaultSortConfig
    );

    const handleSort = (key: keyof Player) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const dynamicSort = (a: Player, b: Player) => {
        if (sortConfig) {
            const aValue = String(a[sortConfig.key]);
            const bValue = String(b[sortConfig.key]);

            return sortConfig.direction === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        }

        return 0;
    };

    let uniquePlayers: Player[] = []

    if (pos === "9"){

        let fullPlayers = Object.values(cards).flat();
        uniquePlayers = removeDuplicatePlayers(fullPlayers);

    }else{

        uniquePlayers = removeDuplicatePlayers(cards[pos]);

    }

    const sortedData = [...uniquePlayers].sort(dynamicSort);

    return (
        <div className='center-div'>
            <h1 className="topText">Player Database</h1>

            {/* Dropdown to select position */}
            <div className="mt-4 mb-6">
                <label className="text-gray-700">Select Position:</label>
                <select
                    className="px-2 py-1  border-gray-800 rounded-md focus:outline-none focus:border-indigo-500"
                    value={pos}
                    onChange={(e) => setPos(e.target.value)}
                >
                    {Object.keys(positionMap).map((position) => (
                        <option key={positionMap[position]} value={positionMap[position]}>
                            {position}
                        </option>
                    ))}
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>
                            Name {renderSortIcon('name')}
                        </th>
                        <th onClick={() => handleSort('rating')}>
                            Rating {renderSortIcon('rating')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((player) => (
                        <tr key={player.id}>
                            <td>{player.name}</td>
                            <td>{player.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    function renderSortIcon(column: keyof Player) {
        if (sortConfig && sortConfig.key === column) {
            const rotationStyle = sortConfig.direction === 'asc' ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' };
            return <img src="arrow.svg" alt="Rotation" width="17" height="17" style={{ marginLeft: '70px', marginTop: '-22px', ...rotationStyle }} />;
        }
        return null;
    }
};

export default Table;
