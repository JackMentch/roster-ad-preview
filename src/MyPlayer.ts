
export interface MyPlayer {
    id: string;
    image: boolean;
    name: string;
    rating: number;
    base_rating: number;
    special: string;
    teams: string[];
    chemistry: string | null;
}