import React from 'react';
import * as mm from '@magenta/music';
import Track from './track'
import PlayButton from './playBtn'

class TrackCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying:false }
    this.onTogglePlay = () => { this.setState({ isPlaying: this.player.isPlaying() }) }
    this.player = new mm.Player(false, {
      run: () => {},
      stop: this.onTogglePlay
    });
    this.sequences = props.sequences;
  }

 render(){

    const combineSeqs = (sequences) =>{
      let newSeq = Object.assign({}, sequences[0]);
      let notes = []
      sequences.forEach((seq)=>{ notes.push(...seq.notes) })
      newSeq.notes = notes;
      return newSeq;
    }

    const onTogglePlay = () => {
      this.setState({ isPlaying: this.player.isPlaying() })
    }

    let PlayAllBtn = this.props.sequences.length > 0?<PlayButton seq={combineSeqs(this.props.sequences)}
                                                                 player={this.player}
                                                                 onTogglePlay={this.onTogglePlay}/>:"";

    return <div className="tracks container">
                {this.props.sequences.map((seq, index)=> {
                  return <div className="row" key={index} >
                            <div className="col-1 my-auto">
                              <PlayButton seq={seq} player={this.player} onTogglePlay={this.onTogglePlay}/>
                            </div>
                             <div className="col-11">
                              <Track seq={seq}/>
                             </div>
                           </div>
                })}
                <div className={"row" + (this.props.sequences.length > 0?"":" d-none")}>
                  {PlayAllBtn}
                </div>
            </div>
 }
}

export default TrackCanvas;
