import React from 'react';

// Helpers
import { testGetUserMedia } from '../../helpers/helpers';

const Webcam = class Webcam extends React.Component {
  constructor() {
    super();

    // Set the initial state
    this.state = {
      isSupported: false
    };

    // Create refs
    this.preview = React.createRef();
  }

  componentDidMount() {
    const isSupported = testGetUserMedia();

    if(isSupported) {
      this.setState({
        isSupported
      });

      this.initWebcam();
      this.startFaceTrack();
    }
  }

  componentWillUnmount() {
    this.killWebcam();
  }
  
  initWebcam() {
    const constraints = {
      audio: false,
      video: {
        facingMode: 'user',
        height: 180,
        width: 320
      }
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(media => {
        this.stream = media;

        // Stream the media to the video element
        const videoEl = this.preview.current;
        videoEl.srcObject = media;

        videoEl.onloadedmetadata = (e) => {
          videoEl.play();
        }
      });
  }

  startFaceTrack() {
    const faceTrack = window.JEEFACEFILTERAPI;

    faceTrack.init({
      canvasId: '_webcamData',
      NNCpath: '/static/jeeliz/NNC.json',
      callbackReady: (error) => {
        if(error) {
          console.error(error);
          return;
        }
      },
      callbackTrack: (detectState) => {
        if(detectState.detected >= .8) {
          // Pass the x and y rotation values to a function
          // to handle the updating of the cursor
          this.handleMovement(detectState.rx, detectState.ry);
        }
      }
    });
  }

  handleMovement(rx, ry) {
    const { CursorStore } = this.props.store;

    if(ry >= .15) {
      // Left
      CursorStore.direction.x = -1;
    } else if(ry <= -.15) {
      // Right
      CursorStore.direction.x = 1;
    } else {
      CursorStore.direction.x = null;
    }

    if(rx >= .25) {
      // Down
      CursorStore.direction.y = 1;
    } else if(rx <= -.15) {
      // Up
      CursorStore.direction.y = -1;
    } else {
      CursorStore.direction.y = null;
    }
  }

  render() {
    return (
      <div>
        <video
          className="webcam"
          ref={this.preview}
          height="450"
          width="800"
        />

        <canvas
          id="_webcamData"
        />
      </div>
    )
  }
}

export default Webcam;