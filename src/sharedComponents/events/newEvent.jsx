import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../config.js";

// import * as eventActions from "../../actions/events/eventActions";
import * as authActions from "../../actions/auth/authActions";

class NewEvent extends Component {

  constructor(props) {
    super(props);

    this.fetchWhereDelay = 500;
    this.fetchWhereTimeout = null;
    this.checkMapDelay = 500;
    this.checkMapTimeout = null;
    this._Map = null;
    this.map = null;
    this.marker = null;
    this.mapInitiated = false;

    this.state = {
      password: null,
      targetDate: null,
      targetTime: null,
      locationName: null,
      locationLat: null,
      locationLon: null,
      name: '',
      where: '',
      whereResults: [],
      selectedPlace: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleWhereChange = this.handleWhereChange.bind(this);
    this.checkLoggedin = this.checkLoggedin.bind(this);
    this.fetchWhereResults = this.fetchWhereResults.bind(this);
    this.handleWhereResultClick = this.handleWhereResultClick.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.checkMapReady = this.checkMapReady.bind(this);
    this.initMap = this.initMap.bind(this);

    if (!this.props.loggedin) {
      this.checkLoggedin();
    }
  }

  checkLoggedin() {
    const loggedinToken = window.localStorage.getItem('site_loggedin');
    if (loggedinToken) {
      this.props.checkLoggedin(loggedinToken);
    }
  }

  checkMapReady() {
    const self = this;
    clearTimeout(self.checkMapTimeout);

    if (window.mapReady) {
      self.initMap();
    } else {
      setTimeout(() => {
        self.checkMapReady();
      }, self.checkMapDelay);
    }
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleWhereChange(e) {
    clearTimeout(this.fetchWhereTimeout);
    const self = this;
    const search = e.target.value;
    this.setState({where: search});

    this.fetchWhereTimeout = setTimeout(() => {
      self.fetchWhereResults(search);
      clearTimeout(self.fetchWhereTimeout);
    }, self.fetchWhereDelay);
  }

  handleWhereResultClick(result) {
    // console.log('result', result);
    if (!result) {
      return;
    }
    
    const lat = result.geometry.location.lat;
    const lon = result.geometry.location.lng;

    this.setState({
      selectedPlace: result,
      locationLat: lat,
      locationLon: lon
    })

    if (window.mapReady) {
      if (lat && lon) {
        this.updateMap(lat, lon);
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }


  initMap() {
    this._Map = document.querySelector('#map');
    if (!this._Map) {
      return;
    }

    const manchester = {lat: 53.480759, lng: -2.242631}

    this.map = new google.maps.Map(this._Map, {
      center: manchester,
      zoom: 14
    });
    this.marker = new google.maps.Marker({position: manchester, map: this.map});
    this.mapInitiated = true;
  }

  updateMap(lat, lon) {
    const newLocation = {
      lat: lat,
      lng: lon
    };
    this.map.setCenter(newLocation)
    this.marker.setPosition(newLocation);
  }

  fetchWhereResults(search) {
    if (!search) {
      return;
    }

    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=${config.googleapiKey}`)
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            whereResults: []
          })
          return null
        }

        res.json()
          .then(json => {
            // console.log(json)
            this.setState({
              whereResults: json.results
            })
          })
      })
      .catch(err => {
        // console.log('err', err);
        this.setState({
          whereResults: []
        })
      })
  }



  static getDerivedStateFromProps(props, state) {
    return props;
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleapiKey}&callback=initMap`;
    script.async = true;

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    if (window.mapReady) {
      if (!this.mapInitiated) {
        this.initMap();
      }
    } else {
      this.checkMapReady();
    }
  }

  render() {

    if (!this.props.loggedin) {
      return null;
    }

    return (
      <section>
        <header>
          <h2>
            Create new event
          </h2>
        </header>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Event name: </label>
              <input type="text" name="name" value={this.state.name} placeholder="e.g. Night out in Manchester" onChange={this.handleNameChange} />
            </div>

            <div className="form-field">
              <label htmlFor="where">Where: </label>
              <input type="text" name="where" value={this.state.where} placeholder="e.g. Ply, Manchester" onChange={this.handleWhereChange} />
              <div>
                <ul>
                {
                  this.state.whereResults && this.state.whereResults.length > 0 ?
                    this.state.whereResults.map((result, index) => {

                      return (
                        <li key={`where_result__${index}`} onClick={() => this.handleWhereResultClick(result)}>
                          {result.formatted_address}
                        </li>
                      )
                    })
                  : null
                }
                </ul>
              </div>
            </div>
            <div>
              <div style={{height: '500px', width: '500px'}} id='map'></div>
            </div>

            <div className="form-actions">
              <button className="btn btn--style-a">Create event</button>
            </div>
          </form>
        </div>

      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    username: state.auth.username,
    loggedin: state.auth.loggedin
  };
};

const mapDispatchToProps = {
  checkLoggedin: authActions.checkLoggedin
};


export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
