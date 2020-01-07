import React from 'react';
import * as mm from '@magenta/music';
import Button from 'react-bootstrap/Button';
import Track from './track'


class TrackCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying:false }
    this.player = new mm.Player();
    this.sequences = props.sequences;
  }
 render(){
   const startOrStop = (seq) => {
      if (this.player.isPlaying()) {
        this.player.stop();
      } else {
        this.player.start(seq);
      }
      this.setState({ isPlaying:this.player.isPlaying() })
    }

    const combineSeqs = (sequences) =>{
      let newSeq = Object.assign({}, sequences[0]);
      let notes = []
      sequences.forEach((seq)=>{ notes.push(...seq.notes) })
      newSeq.notes = notes;
      return newSeq;
    }

    return <div className="tracks container">
                {this.props.sequences.map((seq, index)=> {
                  return <Track seq={seq} startOrStop={startOrStop} isPlaying={this.player.isPlaying()} key={index}/>
                })}
                <div className={"row" + (this.props.sequences.length > 0?"":" d-none")}>
                  <Button onClick={() => startOrStop(combineSeqs(this.props.sequences))}>
                  {this.player.isPlaying()?"stop":"play"} all
                  </Button>
                </div>
            </div>
 }
}

export default TrackCanvas;
