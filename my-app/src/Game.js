import React, { Component } from 'react';
// import {Button} from 'react-bootstrap';
import FaIcon from 'react-icons/lib/fa/star';
import * as lodash from 'lodash';


const Stars=(props)=>{
console.log(props);

  return(
  <div className="col-md-5">
  {lodash.range(props.starsstate).map(i=> <i key={i} className="fa fa-star"><FaIcon/></i>)}

  </div>
);
};
const Button=(props)=>{
  return(
  <div className="col-md-2">
  <button type="button">==</button>
  </div>
);
}
const Answer=(props)=>{
  return(
    <div className="col-md-5">
    {props.selectedNumbers.map((number,i) =>
      <span key={i} onClick={() => props.unselectedNumber(number)}>
      {number}
      </span>
    )}
    </div>
);
}

const Numbers=(props)=>{
  const check=(number)=>{
    if(props.selectedNumbers.indexOf(number)>=0){

      console.log(number);
            return 'selected';
    }
  }
  return(
  <div className=" card ">
  {Numbers.list.map((number,i) =>
    <span key={i} className={check(number)} onClick={() => props.selectedNumber(number)}>{number}
    </span>
  )}

  </div>
);
}

Numbers.list=lodash.range(1,10);
class Game extends Component{
  state={
    selectedNumbers:[],
    randomnoofstarts:1+Math.floor(Math.random()*9)
  }
  selectedNumber=(clickedNumber)=>{
      if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){
        return;
      }
    this.setState(prevState=>({
      selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
    }))

};
unselectedNumber=(clickedNumber)=>{
    // if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){
    //   return;
    // }
  this.setState(prevState=>({
    selectedNumbers:prevState.selectedNumbers.filter(number=>number !== clickedNumber )
  }))

};
  render(){
  return (
    <div className="container">
    <h3>  play game </h3>
      <hr/>

    <div className="row">
    <Stars starsstate={this.state.randomnoofstarts}/>
    <Button/>
    <Answer selectedNumbers={this.state.selectedNumbers} unselectedNumber={this.unselectedNumber}/>
    </div>
    <br/>
    <Numbers selectedNumbers={this.state.selectedNumbers} selectedNumber={this.selectedNumber}/>

    </div>
  );
}
}
export default Game;
