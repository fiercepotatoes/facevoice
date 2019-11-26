/**
 * Renders a tooltip element
 * @property {string} id - The ID attribute for the tooltip element
 * @property {string} content - The tooltip content
 */

import React from 'react';

const Tooltip = class Tooltip extends React.Component {
  render() {
    const { brief, content, down, hideLabel, id, left, right } = this.props;

    return (
      <div
        className={
          `tooltip${
            brief ? ' tooltip--brief' : ''
          }${
            down ? ' tooltip--down' : ''
          }${
            left ? ' tooltip--left' : ''
          }${
            right ? ' tooltip--right' : ''
          }`
        }
      >
        {!hideLabel &&
          <span
            className="tooltip__label"
            role="presentation"
            aria-hidden="true"
          >
            (?)
          </span>
        }

				<div
					id={id}
					className="tooltip__body"
					role="tooltip"
				>
					{content}
				</div>
			</div>
    )
  }
}

export default Tooltip;
