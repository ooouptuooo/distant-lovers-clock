(function() {
    var trip;

    var loadTrip = function(callback) {
        $.get('data/config.json', function(config) {
            chooseTrip(config);
            circleColor(config);
            callback();
        }, 'json');
    };

    var chooseTrip = function(config) {
        var today = getDate(getHere());

        for(var tripName in config.trips) {
            if(today in config.trips[tripName].words) {
                trip = config.trips[tripName];
            }
        }

        if(typeof trip == typeof undefined) {
            trip = {
                'here': config.home.place,
                'there': config.home.place,
                'timeDiff': 0,
                'words': {}
            };
            trip.words[today] = config.home.words;
        }
    };

    var circleColor = function(config) {
        $('#here-circle').attr('fill', config.colors.here);
        $('#there-circle').attr('fill', config.colors.there);
    };

    var getHere = function() {
        return new Date();
    };

    var getThere = function() {
        var now = new Date();
        var timeDiff = trip.timeDiff;
        return new Date(now.getTime() + timeDiff * 60 * 60 * 1000);
    };

    var getTime = function(now) {
        var hour = now.getHours();
        var minute = now.getMinutes();
        if(minute < 10) {
            minute = '0' + minute;
        }
        return hour + ':' + minute;
    };

    var getDate = function(now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        return year + '/' + month + '/' + date;
    };

    var putPlaces = function() {
        $('#here-text .place').html(trip.here);
        $('#there-text .place').html(trip.there);
    };

    var updateClock = function() {
        var here = getHere();
        var there = getThere();
        $('#here-text .time').html(getTime(here));
        $('#here-text .date').html(getDate(here));
        $('#there-text .time').html(getTime(there));
        $('#there-text .date').html(getDate(there));
    };

    var fadeInAll = function() {
        var items = [
            $('#here-text .place'),
            $('#here-text .time'),
            $('#here-text .date'),
            $('#there-text .place'),
            $('#there-text .time'),
            $('#there-text .date'),
            $('#love-words-title'),
            $('#love-words-content'),
        ];

        var idx = 0;
        var token = setInterval(function() {
            if(idx >= items.length) {
                clearInterval(token);
                return;
            }
            items[idx].fadeTo('slow', 1);
            ++ idx;
        }, 300);
    };

    var putLoveWords = function() {
        var today = trip.words[getDate(getHere())];
        $('#love-words-content').html(today);
    };

    loadTrip(function() {
        putPlaces();
        updateClock();
        setInterval(updateClock, 5000);
        putLoveWords();
        fadeInAll();
    });
})();

