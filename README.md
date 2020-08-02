# PROGRAMMING TEST
## TASK

The task is to build an API which calls the given herokuapp API and returns a list of people who are listed as living in London, or whose current coordinates are within 50 miles of London

> Notes: Within 50 miles of London is fairly ambigous, does it mean from the centre of London? From the edges of London City? From the edges of Greater London? For the purpose of this task I will be assuming that it means central London and not the boroughs on the edge. 
>
>https://www.britannica.com/place/Greater-London and https://www.researchgate.net/figure/Map-of-London-with-a-30-km-radius-from-a-central-London-location_fig1_321783807 show that the radius of a circle drawn around Greater London is 45 miles while the radius of central London is 30 Miles.

![Image of 30 Mile Radius around London](https://www.researchgate.net/profile/Peninah_Murage/publication/321783807/figure/fig1/AS:584096308809733@1516270820417/Map-of-London-with-a-30-km-radius-from-a-central-London-location.png)
> The within 50 miles catchment area shall be based off of the circumference of the circle drawn with a 30 mile radius this introduces an improvement which I will talk about later
____________

## RESOURCES

The heroku app link provides a set of endpoints which can be pinged:

1) GET "https://bpdts-test-app.herokuapp.com/city/{cityName}/users"  
    Returns: A list of users "near" the city

2) GET "https://bpdts-test-app.herokuapp.com/instructions"  
    Returns: The instructions for the task

3) GET "https://bpdts-test-app.herokuapp.com/user/{userID}"  
    Returns: Specific user based on the user ID provided

4) GET "https://bpdts-test-app.herokuapp.com/users"  
Returns: A list of all 1000 users

> Notes: All the returns are using the -H "accept: application/json" in order to return an array of JSON Objects

All user objects are in the following format:

    {
        "id": {int},
        "first_name": {string},
        "last_name": {string},
        "email": {string},
        "ip_address": {string},
        "latitude": {float},
        "longitude": {float}
    }

> Notes: For the most part everything except latitutde and longitude are bulk and uneccessary to core of the task
____________

## SOLUTION

The solution I have come up with will split the API into 4 segments which will be tested by JEST tests and shown on a Swagger for individual user testing purposes.

The idea is to use the latitude and longitude of london which are static values being latitude: 51.509865, longitude: -0.118092 and perform a haversine function between those two latitude and longitude values, and the values provided in the user object.

A haversine function can be used to calculate the distance between two point over the surface of the earth. This does not take into account terrain, but I do not think it is relevant to the solution.

### PSEUDO CODE

    function GET(string url) {
        using a library GET the JSON Object array from url

        if the status of the GET is okay (200) {
            return the JSON Object array
        } else {
            return status and error
        }
    }

    function OPERATE(float latitude (u1), float longitude(u2)) {
        if u1 or u2 are not floats {
            return status and error (bad data?)
        }

        const latitude (l1) of London -> convert to radians
        const latitude (l2) of London -> convert to radians
        const u1 -> convert to radians
        const u2 -> convert to radians

        const R = Radius of the Earth in miles

        const diff1 = (u1 - l1) -> convert to radians
        const diff2 = (u2 - l2) -> convert to radians

        const a = sin(diff1/2) * sin(diff1/2) + cos(l1) * cos (l2) * sin(diff2/2) * sin(diff2/2)

        const c = 2 * atan2(sqrt(a), sqrt(1 - a))

        const distance = R * c

        return distance
    }

    function returnUsers(array JSON Objects) {
        if input is not array {
            return status and error (bad data?)
        }

        const post data

        array.every( () => (object, index )) {
            const distance = OPERATE(object.latitude, object.longitude)

            if distance is not an error {
                if distance > 80 {
                    array.pop(this object)
                    return true
                } else {
                    post data[] += object
                }
            } else {
                post data[] += OPERATE ERROR (bad data?)
                return false
            }
        }

        POST post data
    }

    POST(GET(url))

> Notes: The downside is the value of 80 used in the operate function is composed of the 30 mile radius of Central London + 50 miles of catchment, this is not correct as London is not a perfect circle. A solution to this problem would be to calculate the distance of 50 miles towards the latitude and longitude of London and then use an external library to check if the PostCode of the new latitude and longitude values is in London