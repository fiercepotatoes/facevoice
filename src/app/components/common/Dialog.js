/**
 * Renders a pop-up dialog box
 */

import React from 'react';
import { observer } from 'mobx-react';

const Dialog = observer(class Dialog extends React.Component {
  closeDialog(e) {
    e.preventDefault();
    this.props.store.AppStore.closeDialog()
  }

  render() {
    const { dialogContent } = this.props.store.AppStore;

    return (
      <aside className="dialog" role="alert">
        <div className="dialog__content">
          <strong className="dialog__title">
            {dialogContent.heading}
          </strong>

          <p>{dialogContent.body}</p>

          <div className="dialog__action">
            <a
              href="#app"
              className="btn"
              onClick={(e) => this.closeDialog(e)}
            >
              {dialogContent.button}
            </a>
          </div>
        </div>
      </aside>
    )
  }
})

export default observer(Dialog);
