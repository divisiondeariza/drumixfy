import React from 'react';
import * as mm from '@magenta/music';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.seq = props.seq;
    this.ref = React.createRef();
  }

  componentDidMount(){
    this.pianoRoll = new mm.PianoRollSVGVisualizer(this.seq, this.ref.current);
  }


  render(){
     return <svg ref={this.ref}/>
  }
}

export default Track;
