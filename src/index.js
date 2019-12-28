import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Files from 'react-files'
import * as mm from '@magenta/music';

class Drummer extends React.Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.output = React.createRef();
  }




 render(){
   var inputPianoRoll;
   var outputPianoRoll;
   var player = new mm.Player();
   var model = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/groovae/tap2drum_4bar');

   const drumify = async (ns, tempo, temperature) => {
     const z = await model.encode([ns]);
     const output = await model.decode(z, temperature, undefined, undefined, tempo);
     return output[0];
   }

   const onFilesChange = (files) => {
     mm.blobToNoteSequence(files[0]).then( async  (seq) =>  {
       inputPianoRoll = new mm.PianoRollSVGVisualizer(seq, this.input.current);
       seq.notes = seq.notes.filter((note) => true)
       var drums = await drumify(seq, 120, 1);
       console.log(drums);
       outputPianoRoll = new mm.PianoRollSVGVisualizer(drums, this.output.current);
     } )

     console.log(mm);
   }
   const onFilesError = (error, file) => {
     console.log('error code ' + error.code + ': ' + error.message);
   }

   const startOrStop = (seq) => {
      if (player.isPlaying()) {
        player.stop();
        // playBtn.textContent = 'Play';/
      } else {
        player.start(seq);
        // playBtn.textContent = 'Stop';
      }
    }

   return <div className="files">
              <Files
                className='files-dropzone'
                onChange={onFilesChange}
                onError={onFilesError}
                accepts={['image/png', '.pdf', 'audio/*']}
                multiple
                maxFiles={3}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
              >
                Drop files here or click to upload
              </Files>
              <svg ref={this.input}/>
              <button onClick={() => startOrStop(inputPianoRoll.noteSequence)}>dale al play</button>
              <svg ref={this.output}/>
              <button onClick={() => startOrStop(outputPianoRoll.noteSequence)}>dale al play</button>
              </div>
 }
}

ReactDOM.render(<Drummer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
