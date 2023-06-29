import axios from '../utils/servivuelo.util'

export const getTimetables = () => {
    const queryParams = new URLSearchParams({
        adults: passenger.adults.toString(),
        childrens: passenger.childrens.toString(),
        total: passenger.total.toString(),
    }).toString();

    console.log(queryParams);

    const response = await axios.post(
        `http://localhost:80/servivuelo/timetables?${queryParams}`,
        ...journeys,
        {
            params: {
                adults: passenger.adults.toString()
            }
        }
    );
};
