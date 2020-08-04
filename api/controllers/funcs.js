'use strict';

const e = require('express');
const superagent = require('superagent');
const { json } = require('express');

    module.exports = {
        get: returnUsers,
    }

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

        
        const a = Math.pow(Math.sin(diffLat / 2), 2) + Math.cos(londonLat * toRadians) * Math.cos(lat * toRadians) * Math.pow(Math.sin(diffLong / 2),2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    function limitUserId(url) {
        if (url.includes("/user/")) {
            let group = url.match(/([^\/]+$)/gm);
            if (Array.isArray(group)) {
                if (group[0] < 1) {
                    url = url.replace(group[0], "1");
                } else if (group[0] > 1000) {
                    url = url.replace(group[0], "1000");
                }
            }
        }
        return url;
    }

    function verifyLatAndLong(object) {
        if (object.hasOwnProperty('latitude') && object.hasOwnProperty('longitude')) {
            if (isFinite(object.latitude) && isFinite(object.longitude)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function userPropertiesError(object) {
        if (object.hasOwnProperty('latitude') && object.hasOwnProperty('longitude')) {
            if (!isFinite(object.latitude) && !isFinite(object.longitude)) {
                return "ERROR: The latitude and longitude of the data are not property type int";
            }
        } else {
            return "ERROR: The data does not have latitude or longitude";
        }
    }

    function userError(id, error, message) {
        return {id: id, message: message}
    }

    // function getMaxUsers(req, res) {
    //     let maxId = 0;
    //     superagent
    //         .get("https://bpdts-test-app.herokuapp.com/users")
    //         .then(response => {
    //             maxId = response.body[response.body.length - 1].id;
    //         })
    //         .catch((err) => err.message);
    //     return maxId;
    // }

    function returnUsers(req, res) {
        // Further validation could include checking that the id of user does not go above dynamic limits done by using a function similar to above to get the max and min ids
        const url = limitUserId(req.swagger.params.url.value || "https://bpdts-test-app.herokuapp.com/users");
        
        superagent.get(url).end((err, result) => {
            if (err) {
                //Better error handling on bad get
                return err; 
            }
            else { 
                let usersList = result.body;
                // Check if body is an array
                if (Array.isArray(result.body)) {
                    // If result is an array then it is iterable
                    Object.entries(usersList).forEach(([key, value]) => {
                        // Validate that users have int lat and int long values
                        if (haversine(value.latitude, value.longitude) > 80) { //If the distance is greater than 80 miles delete the user
                            delete usersList[key];
                        }
                    });
                    // Prune off empty users
                    usersList = usersList.filter(user => user);
                } else {
                    if (haversine(result.body.latitude, result.body.longitude) > 80) {
                        return res.json();
                    }
                }

                return res.json(usersList);
            }
        });
    }
