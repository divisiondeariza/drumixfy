import React from 'react';
import * as mm from '@magenta/music';
import Button from 'react-bootstrap/Button';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.seq = props.seq;
    this.ref = React.createRef();
    this.startOrStop = props.startOrStop;
  }

  componentDidMount(){
    this.pianoRoll = new mm.PianoRollSVGVisualizer(this.seq, this.ref.current);
  }


  render(){
    console.log("render Track");
     return  <div className="row">
             <div className="col-1 my-auto">
                <Button
                  variant="primary"
                  onClick={() => this.startOrStop(this.seq)}
                >{this.props.isPlaying?"stop":"play"}</Button>
             </div>
              <div className="col-11">
               <svg ref={this.ref}/>
              </div>
             </div>
  }
}

export default Track;
