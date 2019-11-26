import React from 'react';
import { observer } from 'mobx-react';

// Translation
import translate from '../translate/Translate';

const Home = observer(class Home extends React.Component {
  render() {
    const { store, translation } = this.props;
    const { AppStore } = store;

    return (
      <main className="page">
        <div className="panel panel--md panel--solo">
          <h1>{translation.heading}</h1>

          <p>{translation.body}</p>

          <button
            type="button"
            className="btn"
            onClick={(e) => { e.preventDefault(); AppStore.showDialog(translation.clicked) }}
          >
            {translation.button}
          </button>
        </div>
      </main>
    )
  }
})

export default translate('Home')(Home);
