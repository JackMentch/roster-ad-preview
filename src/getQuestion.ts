import { NullablePercentiles } from "./Home";

type MyFunctionType = (arg: NullablePercentiles) => void;

const getQuestion = async (
    draft_id: number,
    pos_id: number,
    correct: boolean,
    percentiles: NullablePercentiles,
    setPercentile: MyFunctionType
) => {
    let percentile: number | null = null; // Declare percentile outside the try block

    try {
        let correct_num = correct ? 1 : 0;

        const url = `https://imac-draft-api.vercel.app/api/getQuestion?draft_id=${draft_id}&pos_id=${pos_id}&correct=${correct_num}`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const correctCount = data?.data?.correct || 0;
            const totalCount = data?.data?.total || 0;

            percentile = (totalCount > 0) ? Number((correctCount / totalCount).toFixed(4)) : null;

            console.log('API Percentile: ', percentile);
        } else {
            console.error('API request failed:', response.status, data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    } finally {

        const updatedPercentile = [...percentiles];
        updatedPercentile [pos_id] = percentile;
        setPercentile(updatedPercentile);

    }
};

export default getQuestion;