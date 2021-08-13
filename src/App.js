import React from 'react';
import './App.css';
import Character from "./components/Character";
import styled from "styled-components";

const StyledHeader = styled.h1`
    text-shadow: 1px 1px 5px #fff;
    margin: 5%;
    font-family: 'Bungee Outline', cursive;
    /* this is not working, so I put a className at h1 */
    font-size: 8vw;
    background-color:  rgb(49, 46, 46);
    color: yellow;
`; 

const StyledApp = styled.div`
  text-align: center;
  display:flex;
  flex-direction:column;
  padding:0% 10%;
  text-shadow: 1px 1px 5px rgb(255, 255, 255);
  background-color: rgb(49, 46, 46);
`


const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  return (
    <div>
      <StyledApp>
        <StyledHeader>
          <h1 className="Header">Star Wars</h1>
        </StyledHeader>
        <Character />
      </StyledApp>
    </div>
  );
}

export default App;
