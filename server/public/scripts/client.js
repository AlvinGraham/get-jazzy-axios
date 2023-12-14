function onReady() {
    console.log('Hello from client.js');

    axios({
        method: 'GET',
        url: '/artist'
    })
        .then(function (response) {
            // Code that will run on successful response
            // from the server.
            console.log(response);
            // quotesFromServer will be an Array of quotes
            let quotesFromServer = response.data;
            let contentDiv = document.querySelector('#artistTableBody');
            for (let artist of quotesFromServer) {
                contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
            }
        }).catch(function (error) {
            // Code that will run on any errors from the server.
            console.log(error);
            alert('Something bad happened! Check the console for more details.')
        });

    // TODO Add Axios request for /songs and display on DOM
    axios({
        method: 'GET',
        url: '/song'
    })
        .then (function (response) {
            console.log(response);

            let songsFromServer = response.data;
            let songsTableEle = document.querySelector('#songTableBody');
            for (let song of songsFromServer) {
                songsTableEle.innerHTML += `
                <tr>
                    <td>${song.title}</td>
                    <td>${song.artist}</td>
                <tr>`;
            }
        }).catch(function (error) {
            console.log('There is an error in GET songs client');
        });


}

onReady();

function addArtistBtn(event) {
    event.preventDefault();
    console.log('Add Artist');
    
    // generate POST Body object
    const addNameEle = document.getElementById('artistNameInput');
    const addBornEle = document.getElementById('artistBornInput');
    const addDiedEle = document.getElementById('artistDiedInput');
    console.log('elements', addNameEle.value, addBornEle.value, addDiedEle.value);
    const newArtist = {
        name: addNameEle.value, 
        born: addBornEle.value,
        died: addDiedEle.value
    };
    console.log('POST data object:', newArtist);

    // POST route
    axios(
        {method: 'POST',
        url: '/artist',
        data: newArtist,
        })
        .then ((response) => {
            console.log('Response:', response);
            //clear fields
            addNameEle.value = null;
            addBornEle.value = null;
            addDiedEle.value = null;
            //clear DOM
            tableBodyEle = document.getElementById('artistTableBody');
            tableBodyEle.innerHTML = '';
            const songTableEle = document.getElementById('songTableBody');
            songTableEle.innerHTML = '';

            // render to DOM

        onReady();

        })
        .catch ((error) => {
            console.error('ERROR:', error);
        });
    
    

}

function addSongBtn(event) {
    event.preventDefault();
    console.log('addSongBtn function');

    // generate post data object
    const addTitleEle = document.getElementById('songTitleInput');
    const addArtistEle = document.getElementById('songArtistInput');
    
    const newSong = {
        title: addTitleEle.value,
        artist: addArtistEle.value
    };

    axios({
        method: 'POST',
        url: '/song',
        data: newSong
    })
    .then((response) => {
        console.log('POST new songs');

        //clear DOM
        addTitleEle.value = null;
        addArtistEle.value = null;

        const songTableEle = document.getElementById('songTableBody');
        songTableEle.innerHTML = '';
        tableBodyEle = document.getElementById('artistTableBody');
        tableBodyEle.innerHTML = '';

        //render DOM
        onReady();

    })
    .catch((err) => {
        console.error('Error in addSong POST', err);
    });

    console.log('New Song:', newSong);

}