import React from 'react';
import connect from 'src/redux/connect';
import { compose, withProps, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import countryLocationCoordinates from 'src/redux/data/countryLocationCoordinates';

type StudentLocationProps = {
  report: {
    studentLocation: {
      fetching: boolean,
      payload: [],
      status: string,
    },
  },
  schoolId: any,
  schoolProfile: {
    payload: CountryId,
  },
  references: {},
};

const StudentsMap = compose(
  withStateHandlers(
    () => ({
      openMarker: false,
    }),
    {
      onToggleOpen: () => item => ({
        openMarker: item,
      }),
    }
  ),
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAKVltnl4S1Scjkno-BbX6mF44Kpx24Hp4',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '500px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={{
      lat: props.locationCoordinates.lat,
      lng: props.locationCoordinates.lng,
    }}
    options={{
      scrollwheel: false,
    }}
  >
    {props.markers.map(cV => {
      return (
        <Marker
          key={cV.id}
          position={{ lat: cV.lat, lng: cV.lng }}
          onClick={() => props.onToggleOpen(cV.id)}
        >
          {props.openMarker === cV.id && (
            <InfoWindow onCloseClick={() => props.onToggleOpen(false)}>
              <div>{cV.name}</div>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
  </GoogleMap>
));

class StudentLocation extends React.Component {
  props: StudentLocationProps;

  constructor(props) {
    super(props);
    this.state = {
      studentMarkers: [],
      zoom: 0,
      locationCoordinates: {
        lat: 0,
        lng: 0,
      },
    };
  }

  componentDidMount() {
    const { studentLocation } = this.props.report;

    let countriesListData = [];
    let countryId, zoomLevel;
    let locationCoordinates = { lat: 0, lng: 0 };

    this.props.references.payload.map(cV => {
      if (cV.Name === 'LstCountries') {
        countriesListData = cV;
      }
    });

    countriesListData.ReferenceItems.map(cV => {
      if (cV.Id === this.props.schoolProfile.payload.CountryId) {
        countryId = cV.Id;
      }
    });

    if (studentLocation.payload) {
      let studentMarkers = studentLocation.payload.map((item, index) => {
        return {
          lat: item['Latitude'],
          lng: item['Longitude'],
          id: 'marker' + index,
          name: item['Name'],
        };
      });

      if (countryLocationCoordinates.hasOwnProperty(countryId)) {
        locationCoordinates.lat =
          countryLocationCoordinates[countryId].latitude;
        locationCoordinates.lng =
          countryLocationCoordinates[countryId].longitude;
        zoomLevel = countryLocationCoordinates[countryId].zoomLevel;
      }

      this.setState({ studentMarkers, locationCoordinates, zoom: zoomLevel });
    } else {
      locationCoordinates.lat = countryLocationCoordinates[countryId].latitude;
      locationCoordinates.lng = countryLocationCoordinates[countryId].longitude;
      zoomLevel = countryLocationCoordinates[countryId].zoomLevel;
    }
    this.setState({
      locationCoordinates: locationCoordinates,
      zoom: zoomLevel,
    });
  }

  render() {
    return (
      <StudentsMap
        markers={this.state.studentMarkers}
        zoom={this.state.zoom}
        locationCoordinates={this.state.locationCoordinates}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    report: state.report,
    references: state.utility.references,
  };
}

export default connect(
  StudentLocation,
  mapStateToProps
);
