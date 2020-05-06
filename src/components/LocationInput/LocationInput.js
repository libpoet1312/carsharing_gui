import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {Input} from "antd";
import classes from './LocationInput.module.css'


class LocationInput extends React.Component {

    state = {
        address: '',
        errorMessage: '',
    };

    handleChange = address => {
        this.setState({
            address,
            errorMessage: '',
        });
        console.log(this.state.address);
    };

    handleSelect = selected => {

        this.setState({ address: selected });
        console.log(this.state.address);

    };

    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };

    fetchCity = () => {
        let city = this.state.address.split(',')[0]
    };

    render() {
        const {
            address,
            errorMessage,
        } = this.state;

        return (
            <div className={classes.autocompleteContainer}>
                <PlacesAutocomplete
                    onChange={this.handleChange}
                    value={address}
                    onSelect={this.handleSelect}
                    onError={this.handleError}
                    shouldFetchSuggestions={address.length > 2}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                        return (
                            <div>
                                <Input
                                    {...getInputProps({
                                        placeholder: `${this.props.placeholder}...`,
                                        allowClear: true,
                                        classnames: `${classes.Input}`
                                    })}
                                />

                                <div className={classes.autocompleteContainer}>
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? classes.SuggestionItem
                                            : classes.SuggestionItemActive;
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }}
                </PlacesAutocomplete>
                {errorMessage.length > 0 && (
                    <div className="Demo__error-message">{this.state.errorMessage}</div>
                )}

            </div>
        );
    }
}

export default LocationInput;