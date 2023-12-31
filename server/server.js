const express = require('express');

const app = express();
const PORT = 5001;
app.use(express.json());

const artistListArray = require('./modules/artist');
const albumListArray = require('./modules/album');
const songListArray = require('./modules/song');

app.use(express.static('server/public'));

app.get('/artist', (req, res) => {
    res.send(artistListArray);
});

// TODO - Add GET for songs
app.get('/song', (req, res) => {
    res.send(songListArray);
});

app.get('/album', (req, res) => {
    res.send(albumListArray);
});

// POST routes
app.post('/artist', (req, res) => {
    const newArtist = req.body;
    console.log('req', req.body);
    console.log('newArtist', newArtist);
    artistListArray.push(newArtist);
    res.sendStatus(201);
    return;
})

// POST routes
app.post('/song', (req, res) => {
    const newSong = req.body;
    // console.log('req', req.body);
    console.log('newSong', newSong);
    songListArray.push(newSong);
    res.sendStatus(201);
    return;
})

app.post('/album', (req, res) => {
    const newAlbum = req.body;
    // console.log('req', req.body);
    console.log('newAlbum', newAlbum);
    albumListArray.push(newAlbum);
    res.sendStatus(201);
    return;
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});
