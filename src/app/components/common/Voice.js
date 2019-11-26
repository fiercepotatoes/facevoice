import React from 'react';

const Voice = class Voice extends React.Component {
  constructor() {
    super();

    // Set the initial state
    this.state = {
      isSupported: false
    };
  }

  componentDidMount() {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    if(window.SpeechRecognition) {
      this.setState({
        isSupported: true
      });

      this.initVoice();
    }
  }

  initVoice() {
    this.voice = new window.SpeechRecognition();
    this.voice.lang = 'en-US';
    this.voice.continuous = true;

    this.voice.onresult = (e) => {
      let transcript = e.results[e.results.length - 1][0].transcript;

      // For some reason it looks likce the Speech Recognition
      // API adds a space to the beginning of results after
      // the first one, so let’s remove that
      if(transcript[0] === ' ') {
        transcript = transcript.replace(' ', '');
      }

      if(transcript.toLowerCase() === 'click') {
        console.log('Clicking…');

        this.handleClick();
      } else {
        console.log(`User may have said ${transcript}`);
      }
    }

    // Not sure why, but this.voice kept stopping
    // after a random amount of time, so rather
    // than trying to figure it out, let’s just
    // stop it on our own and restart it every
    // 10 seconds or something
    setInterval(() => {
      this.voice.stop();

      setTimeout(() => {
        try {
          this.voice.start();
        } catch(e) {
          console.error(e);
        }
      }, 100);
    }, 10000);

    this.voice.start();
  }

  handleClick() {
    const { position } = this.props.store.CursorStore;
    const element = document.elementFromPoint(position.x, position.y);

    console.log(element, element.click);

    if(element && element.click) {
      element.click();
    }
  }

  render() {
    return null;
  }
}

export default Voice;