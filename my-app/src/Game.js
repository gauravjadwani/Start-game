import React, { Component } from 'react';
// import {Button} from 'react-bootstrap';
import FaIcon from 'react-icons/lib/fa/star';
import * as lodash from 'lodash';


const Stars=(props)=>{
  const noofstars=1+Math.floor(Math.random()*9);

  return(
  <div className="col-md-5">
  {lodash.range(noofstars).map(i=> <i key={i} className="fa fa-star"><FaIcon/></i>)}

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
    <div>
    {props.selectedNumbers.map(i=> <i key={i} className="fa fa-star"><FaIcon/></i>)}
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
  <div className=" card col-md-5">
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
    selectedNumbers:[]
  }
  selectedNumber=(clickedNumber)=>{
    this.setState(prevState=>({
      selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
    }))
  };
  render(){
  return (
    <div className="container">
    <h3>  play game </h3>
      <hr/>

    <div className="row">
    <Stars/>
    <Button/>
    <Answer selectedNumbers={this.state.selectedNumbers}/>
    </div>
    <br/>
    <Numbers selectedNumbers={this.state.selectedNumbers} selectedNumber={this.selectedNumber}/>

    </div>
  );
}
}
export default Game;
