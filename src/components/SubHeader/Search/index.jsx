// @flow
import React from 'react';
import './styles.less';

class Search extends React.Component {
  state: {
    inputValue: string,
  };
  // componentDidMount() {
  //   this.setState({
  //     inputValue: ''
  //   });
  // }
  // doSearch() {
  //   if (this.state.inputValue != '') {
  //     setTimeout( () => {
  //       alert(`Found: ${this.state.inputValue}`);
  //     }, 500);
  //   } else {
  //     setTimeout( () => {
  //       alert('Please enter some search text');
  //     }, 500);
  //   }
  // }
  // handleClick() {
  //   this.doSearch();
  // }
  // handleKeyPress(e) {
  //   if (e.key === 'Enter') {
  //     e.target.blur();
  //     this.doSearch();
  //   }
  // }
  // updateInputValue = (e) => {
  //   this.setState({
  //     inputValue: e.target.value
  //   });
  // }

  handleSearchClick = () => {
    alert('clicked');
  };
  render() {
    return (
      <div className="Search pt-input-group">
        <input
          className="Search__input pt-input"
          type="search"
          placeholder="Search"
          dir="auto"
        />
        <span
          onClick={this.handleSearchClick}
          className="Search__icon pt-icon pt-icon-search"
        />
      </div>
    );
  }
}

export { Search as default };
