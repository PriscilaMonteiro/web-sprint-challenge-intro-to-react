// Write your Character component here
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card, Grid } from "semantic-ui-react";
import loading from '../images/24S3.gif';
import bg from '../images/sw-bg.jpg';

const StyledDiv = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${bg});
    background-position: left center;
    font-family: 'Goldman', cursive;
    padding: 14px 14px;
    font-size: 1.5rem;
    


`; 

const Item = ({ children, reference }) => {
    return (
        <div ref={reference}>
            {children}
        </div>
    );
};

const Spinner = () => {
    return (
        <img src={loading} alt="loading..." />
    )
}

function Character () {
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore]     = useState(true);
    const [page, setPage]         = useState(1);
    const observer                  = useRef();

    useEffect(() => {
       getItems(page);
       setPage((page) => page +1);
     
    },[]); 
    
    const lastItemRef = React.useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
        
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    if (page < 82) {
                        getItems(page);
                        setPage((page) => page + 1);
                    } else {
                        setHasMore(false);
                    }
                }
            });
        
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    const getItems = async (page) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve,1000));
        console.log('pagina--->',page);
        await axios
            .get(`https://swapi.dev/api/people/?page=${page}`)
            .then(res => {
                console.log('res--->',res);
                setPeople([...people, ...res.data.results])
                setIsLoading(false)
            });
    }
    return (
        <>
            <div>
                <Grid columns={3}>
                    {people.map((item, index) =>
                        index + 1 === people.length ? (
                            <Grid.Column key={index}>
                                <Card >
                                    <StyledDiv>
                                    <Card.Content>
                                        <Card.Header>{item.name}</Card.Header>
                                        <Item reference={lastItemRef} key={index}></Item>
                                        <strong>Gender: </strong><p>{item.gender}</p>
                                        <strong>Height: </strong><p>{item.height}</p>
                                        <strong>Mass: </strong><p>{item.mass}</p>
                                        <strong>Birth Year:</strong><p> {item.birth_year}</p>
                                        <strong>Eye Color:</strong><p> {item.eye_color}</p>
                                        <strong>Hair Color:</strong><p> {item.hair_color}</p>
                                        <strong>Skin Color:</strong><p> {item.skin_color}</p>
                                    </Card.Content>
                                    </StyledDiv>
                                </Card>
                            </Grid.Column>
                        ) : (
                            <Grid.Column key={index}>
                                <Card >
                                    <StyledDiv>
                                    <Card.Content>
                                        <Card.Header>{item.name}</Card.Header>
                                        <Item key={index}></Item>
                                        <strong>Gender: </strong><p>{item.gender}</p>
                                        <strong>Height: </strong><p>{item.height}</p>
                                        <strong>Mass: </strong><p>{item.mass}</p>
                                        <strong>Birth Year:</strong><p> {item.birth_year}</p>
                                        <strong>Eye Color:</strong><p> {item.eye_color}</p>
                                        <strong>Hair Color:</strong><p> {item.hair_color}</p>
                                        <strong>Skin Color:</strong><p> {item.skin_color}</p>
                                    </Card.Content>
                                    </StyledDiv>
                                </Card>
                            </Grid.Column>
                        )
                    )}
                    {isLoading && <Spinner />}
                </Grid> 
            </div>
        </>
    );
}

export default Character;
