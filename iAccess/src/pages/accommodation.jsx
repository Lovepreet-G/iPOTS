import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Accommodation = () => {
    const [response, setResponse] = useState(null);
    const locat = useLocation(); // Get the current location object
    const queryParams = new URLSearchParams(locat.search); // Parse the query string
    const location = queryParams.get('location');
    const accommodation = queryParams.get('accommodation');
    // const [selectedLocation, setSelectedLocation] = useState(location);


    const data = async () => {
        try {
            const response = await axios.get('accommodation.php', {
                params: {
                    accommodation : accommodation,
                    location: location,
                },
            });
            console.log(response);
    
            setResponse(response); // Set the response data to the state
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    }   
    

    return (
        <div>
            { response[1]}
        </div>
    );
};

export default Accommodation;
