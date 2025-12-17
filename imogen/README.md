# Rastaman Jan Music Page

This page displays audio tracks with scrolling titles and a download album feature.

## How to Add New Tracks

1. Add your MP3 file to the `resources/` folder
2. Open `rastamanjan.html`
3. Find the `tracks` array (around line 85)
4. Add a new entry to the array:

```javascript
const tracks = [
    { title: 'Dharmaman Jan (dub version)', file: 'Rastaman Jan - Dharmaman Jan (dub version).mp3' },
    { title: 'CEO of Everything', file: 'Rastaman Jan - CEO of Everything.mp3' },
    // Add your new track here:
    { title: 'Your Song Title', file: 'Your-File-Name.mp3' }
];
```

That's it! The page will automatically:
- Generate the audio player with scrolling title
- Add it to the single-play system (only one track plays at a time)
- Include it in the "Download Album" button

## Features

- **Scrolling Titles**: Song titles scroll from right to left
- **Single Playback**: Only one track can play at a time
- **Download Album**: Downloads all tracks with a single click
- **Responsive Design**: Works on desktop and mobile devices
