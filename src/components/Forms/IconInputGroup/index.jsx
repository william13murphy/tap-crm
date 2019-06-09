import React from 'react';
import './styles.less';
import TextInput from 'components/Forms/TextInput';

class IconInputGroup extends React.Component {
  props: {
    icon: string,
    iconPlacement: 'left' | 'right',
    intent?: 'success' | 'danger',
    children: React.Element,
  };
  renderBlueprintjsIcon() {
    if (this.props.iconPlacement === 'left') {
      return (
        <div className="pt-input-group">
          <span className={`pt-icon ${this.props.icon}`} aria-hidden="true" />
          {this.props.children}
        </div>
      );
    } else if (this.props.iconPlacement === 'right') {
      return (
        <div className="pt-input-group">
          {this.props.children}
          <span className={`pt-icon ${this.props.icon}`} aria-hidden="true" />
        </div>
      );
    }
  }

  renderFontawesomeIcon() {
    return (
      <div className="pt-input-group">
        {this.props.children}
        <i
          className={`fa ${this.props.icon} icon-${this.props.iconPlacement}`}
          aria-hidden="true"
        />
      </div>
    );
  }
  renderIconGroup() {
    if (this.props.icon.substr(0, 2) == 'pt') {
      return this.renderBlueprintjsIcon();
    }
    if (this.props.icon.substr(0, 2) == 'fa') {
      return this.renderFontawesomeIcon();
    }
  }
  render() {
    return <div className="IconInputGroup">{this.renderIconGroup()}</div>;
  }
}

export default IconInputGroup;
