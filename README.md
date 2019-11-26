# FaceVoice

An app where you control the cursor by turning your face and click by saying the word “click”.

This was originally intended to be a bad UI that was [posted to /r/badUIbattles](https://www.reddit.com/r/badUIbattles/comments/e1npf6/an_app_where_you_control_the_cursor_by_turning/) but some people in the comments pointed out that it could be a useful interface for people with certain disabilities. As such, I decided to share the code so people could rip it apart and make it into something good.

Just as a note, I wrote this very quickly using a starter kit that I already had. The code isn’t great and there are definitely areas where improvements could be made, but my goal was just to get a working prototype together so I could post it and get some sweet, sweet karma.

The technologies used are Create React App, [Jeeliz Face Filter](https://github.com/jeeliz/jeelizFaceFilter) for tracking the user’s face, and the [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API) for listening for the user to say the word “click”.

This has only been tested in Chrome and Chrome may actually be the only browser that supports Speech Recognition right now.
