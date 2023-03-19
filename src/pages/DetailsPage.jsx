import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import {ProgressSpinner} from "primereact/progressspinner";

/* Author : Saperthan Sivasuthan Date: 19/03/2021 */

const DetailsPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [asteroid, setAsteroid] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/asteroid`, {
                params: {
                    id: id,
                },
            })
            .then((response) => {
                const { name, is_potentially_hazardous_asteroid, nasa_jpl_url, close_approach_data, estimated_diameter } = response.data;
                const missDistance = close_approach_data[0].miss_distance.kilometers;
                const velocity = close_approach_data[0].relative_velocity.kilometers_per_hour;
                const size = estimated_diameter.kilometers.estimated_diameter_max;
                setAsteroid({ name, is_potentially_hazardous_asteroid, nasa_jpl_url, missDistance, velocity, size });
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <span className="Background">Loading asteriod...
                <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </span>
        );
    }

    if (error) {
        return <div>Failed to load data. Please try again later.</div>;
    }

    return (
        <div className={"Background"}>
            <Card style={{ width: "50rem" , height: "30rem", lineHeight: "1.5" }} >
                <br/>
                <h1>Asteroid Details</h1>
                <Card.Body>
                    <Card.Title>{asteroid.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Size: {asteroid.size} km</ListGroup.Item>
                        <ListGroup.Item>Miss Distance: {asteroid.missDistance} km</ListGroup.Item>
                        <ListGroup.Item>Velocity: {asteroid.velocity} km/h</ListGroup.Item>
                        <ListGroup.Item>
                            Potentially Hazardous: {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer">
                                View on NASA JPL
                            </a>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default DetailsPage;
