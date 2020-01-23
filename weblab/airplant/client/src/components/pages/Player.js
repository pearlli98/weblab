import React, { Component } from "react";
import RoutineCard from "../modules/RoutineCard.js"
import { get } from "../../utilities";
import "./Player.css";

/**
 *
 * Proptypes
 * @param {string} card_id
 */

import BeautifulMemories from "../../public/audios/BeautifulMemories.mp3";
import DeepMeditation from "../../public/audios/DeepMeditation.mp3";

const audios = {"BeautifulMemories": BeautifulMemories, "DeepMeditation": DeepMeditation}

class Player extends Component {
    constructor(props) {
      super(props);
      this.state = {
        routine : null,
        currentAudio: 0
     }
    }
    
    componentDidMount() {
      get("/api/getSingleRoutines", {card_id: this.props.card_id}).then((routineObj) => {
          this.setState({ routine:  routineObj});
      });
    }

    handleEnd = () => {
      if(this.state.currentAudio === this.state.routine.audio.length - 1) {
        return
      }
       this.setState({currentAudio: this.state.currentAudio + 1})
    }

    render() {  
      if (this.state.routine === null) {
        return (
          <div>Loading!</div>
        ) 
      } else {
        return (
          <div className = 'box'>
          <div className = "player">
                  <audio autoPlay preload={"true"} controls src={audios[this.state.routine.audio[this.state.currentAudio]]} onEnded = {this.handleEnd}/>
              
          </div>
          </div>
      );

      }
        
    }
  }
  
export default Player;