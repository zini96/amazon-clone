import React, {useEffect, useState} from 'react';
import useCurrentLocation from "../../hooks/useCurrentLocation";
import Geocode from "react-geocode";

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
};

function Findadd({location, error}){
    //위치정보 불러오기

    const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);
    location = currentLocation
    error = currentError

    // console.log(currentLocation);

    //새로고침 할때마다 렌더링이 느려서 state가 정의되지 않아서 undifinded..해결은 했지만 이해는 못한...
    //다시 공부해보기!!!!!!!!
    useEffect(() => {
        if (currentLocation) {
            const long = currentLocation["longitude"];
            const lat = currentLocation["latitude"];

            //react-geocode 사용하기
            Geocode.setApiKey("AIzaSyDSuDK_wDe62AF0c1vfB5J9ZIefpleb_UI");
            Geocode.setLanguage("en");
            Geocode.setRegion("kr");
            Geocode.setLocationType("ROOFTOP");
            Geocode.enableDebug();

            Geocode.fromLatLng(lat, long).then(
                (response) => {
                    const address = response.results[0].formatted_address;

                    let city, state, country;
                    for (let i = 0; i < response.results[0].address_components.length; i++) {
                        for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                            switch (response.results[0].address_components[i].types[j]) {
                                case "locality":
                                    city = response.results[0].address_components[i].long_name;
                                break;
                                case "administrative_area_level_1":
                                    state = response.results[0].address_components[i].long_name;
                                break;
                                case "country":
                                    country = response.results[0].address_components[i].long_name;
                                break;
                            }
                        }
                    }
                    // console.log(city, state, country);
                    var str = document.getElementById("text");
                    str.innerHTML = `${state}, ${country}`;
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }, [currentLocation]);

    return(
        <div>
            {location ? (
                    <p  id='text'></p>
                ) : (
                <p>Loading...</p>
            )}
            {error && <p className="errorMessage">Location Error: {error}</p>}
        </div>
    )
}

export default Findadd;