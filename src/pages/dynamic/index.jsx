import React from 'react';

class Dynamic extends React.Component {

  constructor() {
    super();
    this.state = {
      urlParam: ''
    };
  }

  componentDidMount() {
    const anId = this.props.match.params.anId;
    document.title = `Page: ${anId}`;

    this.setState({
      urlParam: anId
    });

  }

  render() {
    return (
      <section>
        <h2>Dynamic page</h2>
        <p>{this.state.urlParam}</p>
      </section>
    )
  }
}

export default Dynamic;