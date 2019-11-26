import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Routes
import { routes } from '../routes';

// Import common components
import Cursor from './common/Cursor';
import Dialog from './common/Dialog';
import Voice from './common/Voice';
import Webcam from './common/Webcam';

// Import views
import Home from './views/Home';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Set the initial state
    this.state = {
      render: true
    };

    // Load translation
    const { AppStore } = props.store;

    if(!AppStore.translation) {
      AppStore.getTranslation();
    }
  }

  render() {
    const { render } = this.state;
    const { AppStore } = this.props.store;

    if(render) {
      return (
        <BrowserRouter>
          <div className="viewport">
            <Route render={({location}) => (
              <Switch location={location}>
                <Route path={routes.index} render={(routing) => (
                  <Home
                    {...routing}
                    {...this.props}
                  />
                )}/>    
              </Switch>
            )} />

            <Webcam {...this.props} />

            <Voice {...this.props} />

            <Cursor {...this.props} />

            {AppStore.dialog &&
              <Dialog {...this.props} />
            }
          </div>
        </BrowserRouter>
      )
    }

    return null;
  }
}

export default observer(App);
