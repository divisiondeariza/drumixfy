import React from 'react';
import Button from 'react-bootstrap/Button';

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.player = props.player;
    this.seq = props.seq;
    this.onTogglePlay = props.onTogglePlay;
  }

  render(){
    const startOrStop = (seq) => {
      console.log(seq);
       if (this.player.isPlaying()) {
         this.player.stop();
       } else {
         this.player.start(seq);
       }
       this.onTogglePlay()
     }

     return   <Button
               variant="primary"
               onClick={() => startOrStop(this.seq)}
              >
                {this.player.isPlaying()?"stop":"play"}
             </Button>
  }
}

export default PlayButton;
