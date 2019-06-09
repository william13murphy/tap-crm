// @flow
import React from 'react';
import './styles.less';

class Search extends React.Component {
  state: {
    inputValue: string,
  };
  constructor() {
    super();
  }
  componentDidMount() {
    this.setState({
      inputValue: '',
    });
  }
  doSearch() {
    if (this.state.inputValue != '') {
      setTimeout(() => {
        alert(`Found: ${this.state.inputValue}`);
      }, 500);
    } else {
      setTimeout(() => {
        alert('Please enter some search text');
      }, 500);
    }
  }
  handleClick() {
    this.doSearch();
  }
  handleKeyPress(e: Event & { key: string, currentTarget: HTMLButtonElement }) {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      this.doSearch();
    }
  }
  updateInputValue = (e: Event & { currentTarget: HTMLButtonElement }) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };
  render() {
    return (
      <div className="Search">
        <input
          className="Search__input"
          type="text"
          placeholder="Search"
          onChange={this.updateInputValue}
          onKeyPress={e => this.handleKeyPress(e)}
        />
        <i
          onClick={() => this.handleClick()}
          className="Search__icon fa fa-search"
          aria-hidden="true"
        />
        <div className="Search__advanced-search">
          <a href="/">Advanced Search</a>
        </div>
      </div>
    );
  }
}

export { Search as default };
