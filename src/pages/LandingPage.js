import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Link } from "react-router-dom";
import {Alert, Card} from "react-bootstrap";
import { ProgressSpinner } from 'primereact/progressspinner';

/* Author : Saperthan Sivasuthan Date: 19/03/2021 */

const LandingPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10)); // set initial start date to today
    const [asteroids, setAsteroids] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/asteroids", {
                params: {
                    startDate
                },
            })
            .then((response) => {
                const asteroidsArray = Object.values(response.data.near_earth_objects).flat().map((asteroid) => {
                    const { id, name, is_potentially_hazardous_asteroid, close_approach_data } = asteroid;
                    const missDistance = close_approach_data[0].miss_distance.kilometers;
                    return { id, name, is_potentially_hazardous_asteroid, missDistance };
                });
                setAsteroids(asteroidsArray);
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
            });
    }, [startDate]);

    const handleDateChange = (event) => {
        setStartDate(event.target.value);
        setLoading(true);
    };

    if (loading) {
        return (
            <span className="Background">Loading asteriods data...
                <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </span>
        );
    }

    if (error) {
        return <Alert variant="danger">Failed to load data. Please try again later.</Alert>;
    }

    return (
        <div className={"App-header"}>
            <Card>
                <Card.Body>
                    <h1>List of Asteroids</h1>
                    <div>
                        <label htmlFor="startDate">Start Date: </label> &nbsp;
                        <input type="date" id="startDate" name="startDate" value={startDate} onChange={handleDateChange} />
                    </div>
                    <br/>
                </Card.Body>
            </Card>

            <TableContainer>
                <Table className={"table"}>
                    <TableHead>
                        <TableRow >
                            <TableCell >Asteroid Name</TableCell>
                            <TableCell>Miss Distance (km)</TableCell>
                            <TableCell>Potentially Hazardous</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {asteroids
                            .sort((a, b) => a.missDistance - b.missDistance)
                            .map((asteroid) => (
                                <TableRow key={asteroid.id}>
                                    <TableCell>
                                        <Link to={`/details/${asteroid.id}`}>{asteroid.name}</Link>
                                    </TableCell>
                                    <TableCell>{asteroid.missDistance}</TableCell>
                                    <TableCell>{asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default LandingPage;