/**
 * Returns the translation for a given component
 */

import React from 'react';
import { observer } from 'mobx-react';

export default function translate(key) {
  return Component => {
    class TranslationComponent extends React.Component {
      componentDidMount() {
        // Get the current component’s translation
        const { AppStore } = this.props.store;

        if(!AppStore.translationLoaded) {
          AppStore.getTranslation();
        }
      }

      render() {
        const { AppStore } = this.props.store;

        if(AppStore.translation) {
          // Return the translation for the component
          let translation = AppStore.translation[key];

          return (
            <Component
              {...this.props}
              translation={translation}
            />
          )
        } else {
          return (
            <span className="no-results">Translation not found</span>
          );
        }
      }
    }

    return observer(TranslationComponent);
  }
}