import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Accommodation = () => {
    const host = "http://localhost";
    const [accommodations, setAccommodations] = useState([]);
    const locat = useLocation();
    const queryParams = new URLSearchParams(locat.search);
    const location = queryParams.get('location');
    const category = queryParams.get('category');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url =  host + '/iPots/iAccess-Server/accommodation.php'
                const response = await axios.get(url , {
                    params: {
                        category: category,
                        location: location,
                    },
                    // headers: {
                    //     'Accept': 'application/json'
                    // }
                });

                console.log('Response:', response); // Log the full response for debugging

                if (Array.isArray(response.data)) {
                    setAccommodations(response.data);
                } else {
                    console.error('The fetched data is not an array:', response.data);
                }
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };

        fetchData();
    }, [location, category]);


    return (
        <div>
            <h1>Accommodations</h1>
            {accommodations.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Disability Category</th>
                            <th>Symptom</th>
                            <th>Medical Condition</th>
                            <th>Location</th>
                            <th>Accommodation</th>
                            <th>Description</th>
                            <th>Article</th>
                            <th>Website</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accommodations.map((accommodation) => (
                            <tr key={accommodation.id}>
                                <td>{accommodation.id}</td>
                                <td>{accommodation.disability_category}</td>
                                <td>{accommodation.symptom}</td>
                                <td>{accommodation.medical_condition}</td>
                                <td>{accommodation.location}</td>
                                <td>{accommodation.accommodation}</td>
                                <td>{accommodation.description}</td>
                                <td>{accommodation.article}</td>
                                <td><a href={accommodation.website} target="_blank" rel="noopener noreferrer">Link</a></td>
                                <td>
                                    <button onClick={() => handleAccommodationClick(accommodation.accommodation)}>Select</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading accommodations...</p>
            )}
        </div>
    );
};

export default Accommodation;
