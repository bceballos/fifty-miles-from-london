'use strict';
    module.exports = {}

    function haversine(lat, long) {
        // All Latitudes and Longitudes converted to radians
        // Latitude and Longitude of London gotten from https://www.latlong.net/place/london-the-uk-14153.html
        const londonLat = 51.509865;
        const londonLong = -0.118092;
        const toRadians = (Math.PI / 180);

        // Difference between the points
        const diffLat = (lat - londonLat) * toRadians;
        const diffLong = (long - londonLong) * toRadians; 

        // Big R for Radius of the earth in miles
        const R = 3958.8;

        const a = Math.pow(Math.sin(diffLat / 2), 2) + Math.cos(londonLat * toRadians) * Math.cos(londonLong * toRadians) * Math.pow(Math.sin(diffLong / 2));

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

        /*
         * POST the JSON object or the errors
         */
        // post(userArray) {

        // }