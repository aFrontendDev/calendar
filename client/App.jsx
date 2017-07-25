import React from 'react';
import {
  Switch, Route
} from 'react-router-dom';

// header and footer to be included on every page
import Header from './components/_header/header.jsx';
import Footer from './components/_footer/footer.jsx';

// Pages
import Home from './pages/home';
import User from './pages/user';
import Calendar from './pages/calendar';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <main className="main" id="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={User} />
            <Route path="/calendar/:calId" component={Calendar} />
            <Route component={Home} />
          </Switch>
        </main>

        <Footer />
      </div>
    );
  }
}