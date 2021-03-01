module.exports = io => {
    console.log('*****************************t');
    
    let players = {};
    let country;
    let acertadas = [];
    
    let flags = [
        'Chile',
        'Bolivia',
        'Brazil',
        'Paraguay',
        'Argentina',
        'Uruguay',
        'Ecuador',
        'Colombia',
        'Venezuela',
        'Peru',
        'Suriname',
        'French Guiana',
        'Guyana'
    ]

    let latinoamerica = []
    console.log('LA', latinoamerica);
    console.log('flags', flags);
    
    for (a of flags) {
        latinoamerica.push(a);
    }
    console.log('LA', latinoamerica);

        
    function randomFlags(){
        
        let random = Math.floor(Math.random() * latinoamerica.length);
        country = latinoamerica[random];
        latinoamerica.splice(random, 1);
        
        if(latinoamerica.length == 0)
        {
            console.log('finish game');
            for (a of flags) {
                latinoamerica.push(a);
            }
        }
    }
    randomFlags();
    // console.log(country);
    
    io.on('connection', (socket) => {
        // console.log('new user connected', socket.id);

        socket.on('Connected', data => {
            players[socket.id] = {
                name: data.name,
                id: socket.id,
                pts: 0
            }
            // console.log(Object.keys(players).length);
            io.sockets.emit('newPlayer', players);
            socket.emit('FirstCountry', country);
        });
       
        socket.on('Choose', (data) => {
            if(data.name == country){
                console.log('Good Look');
                randomFlags();
                socket.emit( "PlayerSucces", {id: data.id});
                socket.broadcast.emit("OtherSucces", {id: data.id});
                io.sockets.emit('Country', {pais: country});

                players[socket.id].pts += 10;
                io.sockets.emit('newPlayer', players);
                
            }
        });
        
        socket.on('disconnect', () => {
            delete players[socket.id];
            console.log(Object.keys(players).length);
        });
    });
}