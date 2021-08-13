import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card, Grid, Loader } from "semantic-ui-react";
// import { response } from "msw";
import { handlers } from '../mocks/handlers'

function Character () {
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore]     = useState(true);
    const [pages, setPages]         = useState(1);

    useEffect(() => {
       getItems(pages);
       setPages((pages) => pages +1);
    },[]);
    
    const getItems = async (page) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve,1000));
        console.log(page);
        await axios
            .get(`https://swapi.dev/api/people/?page=${page}`)
            .then(res => {
                setPeople([...people, ...res.data.results])
                setIsLoading(false)
            });     
    }  
    return (
        <>
            <div>
                <Grid columns={2}>
                    {people.map((people, i) => {
                        console.log(people);
                        return(
                            <Grid.Column key={i}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>
                                            {people.name}
                                        </Card.Header>
                                        <strong>Gender: </strong><p>{people.gender}</p>
                                        <strong>Height: </strong><p>{people.height}</p>
                                        <strong>Mass: </strong><p>{people.mass}</p>
                                        <strong>Birth Year:</strong><p> {people.birth_year}</p>
                                        <strong>Eye Color:</strong><p> {people.eye_color}</p>
                                        <strong>Hair Color:</strong><p> {people.hair_color}</p>
                                        <strong>Skin Color:</strong><p> {people.skin_color}</p>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )
                    })}
                </Grid>
            </div>
            {isLoading && <Loader />}
        </>
    );
}

export default Character; 