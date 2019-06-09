import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import './styles.less';

class CustomToolbar extends Toolbar {
  render() {
    return (
      <div className="CustomToolbar">
        <div className="rbc-toolbar">
          <span className="rbc-btn-group">
            <button type="button" onClick={this.navigate.bind(null, 'PREV')}>
              <span className="pt-icon pt-icon-chevron-left" />
            </button>
            <span className="rbc-toolbar-label">{this.props.label}</span>
            <button type="button" onClick={this.navigate.bind(null, 'NEXT')}>
              <span className="pt-icon pt-icon-chevron-right" />
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default CustomToolbar;
