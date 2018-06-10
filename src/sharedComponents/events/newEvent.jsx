import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../config.js";

// import * as eventActions from "../../actions/events/eventActions";
import * as authActions from "../../actions/auth/authActions";
import * as dateFunctions from "../../utility/dates";

import Calendar from "../calendar/calendar";

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
      selectedPlace: null,
      calendarOpened: false,
      date: '',
      loadingPlaceResults: false,
      description: '',
      showTimes: false,
      timeFromHours: 0,
      timeFromMins: 0,
      timeToHours: 0,
      timeToMins: 0
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
    this.openCalendar = this.openCalendar.bind(this);
    this.handleDaySelected = this.handleDaySelected.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimeFromHoursChange = this.handleTimeFromHoursChange.bind(this);
    this.handleTimeFromMinsChange = this.handleTimeFromMinsChange.bind(this);
    this.handleTimeToHoursChange = this.handleTimeToHoursChange.bind(this);
    this.handleTimeToMinsChange = this.handleTimeToMinsChange.bind(this);
    this.validateTime = this.validateTime.bind(this);

    if (!this.props.loggedin) {
      this.checkLoggedin();
    }
  }

  openCalendar() {

    this.setState({calendarOpened: true});
  }

  closeCalendar() {
    this.setState({calendarOpened: false});
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
    this.setState({
      where: search
    });

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

  handleDaySelected(date) {
    console.log('new event: ', date);
    this.setState({
      date
    });

    this.closeCalendar();
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleTimeChange(e) {
    const val = e.target.value;
    const isallDay = val === 'all-day';

    this.setState({
      showTimes: !isallDay
    })
  }

  handleTimeFromHoursChange(e) {
    let val = e.target.value;
    val = parseInt(val, 10);

    this.setState({
      timeFromHours: val
    })
  }

  handleTimeFromMinsChange(e) {
    let val = e.target.value;
    val = parseInt(val, 10);

    this.setState({
      timeFromMins: val
    })
  }

  handleTimeToHoursChange(e) {
    let val = e.target.value;
    val = parseInt(val, 10);

    this.setState({
      timeToHours: val
    })
  }

  handleTimeToMinsChange(e) {
    let val = e.target.value;
    val = parseInt(val, 10);

    this.setState({
      timeToMins: val
    })
  }
  
  validateTime() {
    let isValid = false;

    const timeFromHours = this.state.timeFromHours;
    const timeFromMins = this.state.timeFromMins;
    const timeToHours = this.state.timeToHours;
    const timeToMins = this.state.timeToMins;

    const isLessThanToHours = timeFromHours < timeToHours;
    if (isLessThanToHours) {
      isValid = true;
      return isValid;
    }

    const isMoreThanToHours = timeFromHours > timeToHours;
    if (isMoreThanToHours) {
      isValid = false;
      return isValid;
    }

    // if we're here then the hours are equal
    if (timeFromMins < timeToMins) {
      isValid = true;
      return isValid;
    }

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();

    // if the user has specified a time then we need to validate it
    if (this.state.showTimes) {
      const timeIsValid = this.validateTime();
      console.log('timeIsValid', timeIsValid);
      if (!timeIsValid) {
        return
      }
    }
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

    this.setState({
      loadingPlaceResults: true
    });

    fetch(`http://localhost:3000/api/places/search?term=${search}`)
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            whereResults: [],
            loadingPlaceResults: false
          })
          return null
        }

        res.json()
          .then(json => {
            this.setState({
              whereResults: json,
              loadingPlaceResults: false
            })
          })
      })
      .catch(err => {
        this.setState({
          whereResults: [],
          loadingPlaceResults: false
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

    const dates = dateFunctions.getMonthData(2018, 6);
    console.log(dates);
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
    const hoursArray = [];
    for (let i = 0; i < 24; i++) {
      hoursArray.push(i);
    }

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
              <input type="text" name="name" id="name" value={this.state.name} placeholder="e.g. Night out in Manchester" onChange={this.handleNameChange} />
            </div>

            <div className="form-field">
              <label htmlFor="description">Description: </label>
              <textarea name="description" id="description" value={this.state.description} placeholder="e.g. We've not met up in ages so lets make this a night to remember" onChange={this.handleDescriptionChange} />
            </div>

            <div className="form-field">
              <label htmlFor="date">Date of event: </label>
              <input disabled type="text" id="date" name="date" value={this.state.date} placeholder="e.g. 10/08/2018" />
              <button type="button" onClick={this.openCalendar}>open calendar</button>
            </div>

            <div className="form-field">
              <label htmlFor="time-all-day">What time: </label>

              <label className="radio">
                <input onChange={this.handleTimeChange} type="radio" name="time" id="time-all-day" value="all-day" defaultChecked/>
                <label htmlFor="time-all-day" className="radio--replace"></label>
                All Day
              </label>

              <label className="radio">
                <input onChange={this.handleTimeChange} type="radio" name="time" id="time-specify" value="specify" />
                <label htmlFor="time-specify" className="radio--replace"></label>
                Specific times
              </label>

              {
                this.state.showTimes ?
                  <div>

                    <div className="form-field">
                      <label htmlFor="time-from-hours">From: </label>
                      <span className="select-replace">
                        <select onChange={this.handleTimeFromHoursChange} name="time-from-hours" id="time-from-hours">
                          {
                            hoursArray.map((item, index) => {

                              return (
                                <option key={`hours-from_${index}`} value={item}>
                                  {item}
                                </option>
                              )
                            })
                          }
                        </select>
                      </span>
                       : 
                      <span className="select-replace">
                        <select onChange={this.handleTimeFromMinsChange} name="time-from-mins" id="time-from-mins">
                          <option value="0">00</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                          <option value="45">45</option>
                        </select>
                      </span>
                    </div>

                    <div className="form-field">
                      <label htmlFor="time-to-hours">To: </label>
                      <span className="select-replace">
                        <select onChange={this.handleTimeToHoursChange} name="time-to-hours" id="time-to-hours">
                          {
                            hoursArray.map((item, index) => {

                              return (
                                <option key={`hours-to_${index}`} value={item}>
                                  {item}
                                </option>
                              )
                            })
                          }
                        </select>
                      </span>
                       : 
                      <span className="select-replace">
                        <select onChange={this.handleTimeToMinsChange} name="time-to-mins" id="time-to-mins">
                          <option value="0">00</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                          <option value="45">45</option>
                        </select>
                      </span>
                    </div>

                  </div>
                : null
              }
            </div>

            <div className="form-field">
              <label htmlFor="where">Where: </label>
              <input type="text" name="where" id="where" value={this.state.where} placeholder="e.g. Ply, Manchester" onChange={this.handleWhereChange} />
              <div>
                {
                  this.state.loadingPlaceResults
                  ? <span className="spinner spinner--in spinner--local spinner--small" role="presentation" aria-hidden="true"></span>
                  : null
                }
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

        <div className={`modal ${this.state.calendarOpened ? 'modal--open' : ''}`}>
          <button onClick={() => this.closeCalendar()} className="modal__close-btn">Close</button>
          <Calendar onDayClick={this.handleDaySelected}/>
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
