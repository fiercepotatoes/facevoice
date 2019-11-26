/**
 * Checks if getUserMedia is supported
 * @param {object} callback
 */
export function testGetUserMedia(constraints = { audio: true, video: true }) {
  let supported = true;

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    async function testMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if(stream.getTracks().length === 0) {
          console.error('Got media stream but no tracks exist!');
          supported = false;
        }

        stream.getTracks().forEach(track => {
          track.stop();
        })
      } catch(error) {
        console.error(error);
        supported = false;
      }
    }

    testMedia();
  } else {
    supported = false;
  }

  return supported;
}