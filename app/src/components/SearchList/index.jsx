import React, { Component } from 'react';
import TextInput from "../TextInput";

import './styles.css';

class SearchList extends Component {
    state = {
      term: '',
    };

    filterItems() {
      const {
        items,
      } = this.props;
      console.log(this.props);
      
      const { term } = this.state;
      return items.filter(item => {
        return term.length === 0 || item.name.toUpperCase().includes(term.trim().toUpperCase());
      });
    }

    render() {
      const { term } = this.state;
      const { onItemSelect } = this.props;
      const items = this.filterItems();
      return (
        <div>
          <TextInput
            value={term}
            onChange={e => this.setState({ term: e.target.value })}
          />
          <div>
          {items.map((item, index) => {
            return (
              <div
                onClick={() => onItemSelect(item)}
                key={index}
              >
                <div className="search-list__item-container">
                  {item.name}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      );
    }
}
 
export default SearchList;