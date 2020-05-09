/* global google */
import React from "react";
import {compose, lifecycle, withProps} from "recompose";
import {DirectionsRenderer, GoogleMap, withGoogleMap} from "react-google-maps";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';






const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyCGR8QHY78WBq43zC_2i9ohE-sT5ZfgZ60&v=3.exp&libraries=geometry,drawing",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withGoogleMap,
    lifecycle({
        async componentDidMount() {

            const DirectionsService = new google.maps.DirectionsService();
            const DistanceService = new google.maps.DistanceMatrixService();

            let origin = {};
            let destination = {};


            await geocodeByAddress(this.props.origin).then(results => {
                // console.log(results[0]);
                return getLatLng(results[0])
            }).then(latLng => {
                // console.log('Success', latLng);
                origin = latLng;
                // console.log(destinationLat,destinationLon );
            });

            await geocodeByAddress(this.props.destination).then(results => {
                // console.log(results[0]);
                return getLatLng(results[0])
            }).then(latLng => {
                // console.log('Success', latLng);
                destination = latLng;
                // console.log(destinationLat,destinationLon );
            });


            await DirectionsService.route({
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(result);

                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                    console.log(result);
                }
            });
        }
    })
)(props => (
    <GoogleMap defaultZoom={6.5} defaultCenter={{ lat: 38.659778, lng: 22.641075 }}>
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
));

export default MyMapComponent;



