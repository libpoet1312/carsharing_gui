/* global google */
import React from "react";
import {compose, lifecycle, withProps} from "recompose";
import {DirectionsRenderer, GoogleMap, withGoogleMap} from "react-google-maps";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

import {GOOGLE_MAPS_KEY} from "../../config";
import classes from './Map.module.css';

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key="+ GOOGLE_MAPS_KEY +"&v=3.exp&libraries=geometry,drawing",
        loadingElement: <div  style={{ height: `100%`}} />,
        containerElement: <div className={classes.Map} style={{ height: `400px`,  border: 'black 1px solid' }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withGoogleMap,
    lifecycle({
        async componentDidMount() {

            const DirectionsService = new google.maps.DirectionsService();

            let origin = {};
            let destination = {};


            await geocodeByAddress(this.props.origin).then(results => {
                console.log(results[0]);
                return getLatLng(results[0])
            }).then(latLng => {
                // console.log('Success', latLng);
                origin = latLng;
                // console.log(destinationLat,destinationLon );
            });

            await geocodeByAddress(this.props.destination).then(results => {
                console.log(results[0]);
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
                unitSystem: google.maps.UnitSystem.METRIC,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(result);

                    this.setState({
                        directions: result,
                    });
                    this.props.handleDuration(result.routes[0].legs[0].duration.text);
                    this.props.handleDistance(result.routes[0].legs[0].distance.text);
                } else {
                    console.error(`error fetching directions`);
                    console.log(result);
                }
            });


        }
    })
)(props => (
    <div>



        <GoogleMap defaultZoom={6.5} defaultCenter={{ lat: 38.659778, lng: 22.641075 }} >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
    </div>



));

export default MyMapComponent;



