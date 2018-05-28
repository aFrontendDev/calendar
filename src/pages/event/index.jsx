import React from 'react';

class Event extends React.Component {

  constructor() {
    super();
    this.state = {
      urlParam: ''
    };
  }

  componentDidMount() {
    const eventId = this.props.match.params.eventId;
    document.title = `Page: ${eventId}`;

    this.setState({
      urlParam: eventId
    });

  }

  render() {
    return (
      <section>
        <h2>Event page</h2>
        <p>{this.state.urlParam}</p>
      </section>
    )
  }
}

export default Event;