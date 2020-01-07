import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Files from 'react-files'
import * as mm from '@magenta/music';
import { Model } from './Model'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import TrackCanvas from "./trackCanvas/trackCanvas"


class Drummer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isFileLoaded:false, isPlaying:false }
    this.model = new Model();
    this.model.load();
    this.player = new mm.Player();
  }


 render(){

   const onFilesChange = (files) => {
     mm.blobToNoteSequence(files[0]).then( async  (seq) =>  {
       this.seq = seq;
       this.drums = await this.model.drumify(seq, 1);
       this.setState({ isFileLoaded:true })
     } )
   }

   const onFilesError = (error, file) => {
     console.log('error code ' + error.code + ': ' + error.message);
   }

   return <div className="container">
              <Files
                className={ 'files-dropzone row' + (this.state.isFileLoaded?'':' no-files-droped') }
                dropActiveClassName="drop-active"
                onChange={onFilesChange}
                onError={onFilesError}
                accepts={['audio/*']}
                multiple
                maxFiles={3}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
              >
                <div className="col-12 text-center my-auto">
                  Drop files here or click to upload
                </div>
            </Files>
            <TrackCanvas sequences={[this.seq, this.drums].filter((seq) => seq != undefined)}/>

        </div>
 }
}

ReactDOM.render(<Drummer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
