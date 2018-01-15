// FCC Twitch App

$(document).ready(function(){
    const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "eleaguetv", "cereth"];
    
    let url = 'https://api.twitch.tv/kraken/streams/';
        
    for(let i=0; i < streamers.length; i++) {
        $.ajax({
            type: 'GET',
            url: url + streamers[i],
            headers: {
                'Client-ID': 'ih5iuqp6tkypb67i807h73vw5ou8bu'
            },
            success: function(data) {
                console.log(data);
                addStreamer(data);
                
            },
            error: function(errMessage) {
                console.log(errMessage);
            }
        });
    };

    function addStreamer(data) {
        if (data.stream == null) {
            // console.log('offline');
            // console.log(data);
            
            // get streamer name
            const streamerName = data._links.self;
            //console.log(streamerName);

            // get streamer name from array
            let namesList = [];
            namesList.push(streamerName.split('streams/'));
            
            let gamerName = namesList[0][1];
            
            // create and add gamer module
            let offlineNode = document.querySelector('.container');

            offlineNode.innerHTML += `<div><div class='header'><div class='offline' ></div><div>Offline</div><div class="name">${gamerName}</div></div><div class='profile'><img src='https://techmoran.com/wp-content/uploads/2013/07/offline.png'></div><div class='body'>No stream at the moment. Check again later.</div><div class='footer'></div></div>`;
            
        } else {
            
            // get streamer name
            let streamerName = data.stream.channel.display_name
            //console.log(streamerName);
            
            // create and add gamer module
            let onlineNode = document.querySelector('.container');

            onlineNode.innerHTML += `<div><div class='header'><div class='online'></div><div>Online</div><div class="name">${streamerName}</div></div><div class='profile'><img src='${data.stream.channel.profile_banner}'></div><div class='body'>${data.stream.channel.status}</div><div class='footer'></div></div>`;
            
            //console.log(data.stream.channel.display_name);
            //console.log(data.stream.game);
            //console.log(data.stream.channel.status);
            //console.log(data.stream.channel.profile_banner);
        }
    }
});

