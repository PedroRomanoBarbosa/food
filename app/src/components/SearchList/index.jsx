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
      const { term } = this.state;
      return items.filter(item => {
        return term.length === 0 || item.name.toUpperCase().includes(term.trim().toUpperCase());
      });
    }

    render() {
      const { term } = this.state;
      const {
        onItemSelect,
        selectedItems,
        selectedItemValue,
        onItemRemove,
      } = this.props;
      const items = this.filterItems();
      return (
        <div>
          <div>
            {selectedItems && selectedItems.map((item, index) => {
              return (
                <div className="search-list__selected-item-container" key={index}>
                  <div className="search-list__remove-button" onClick={() => onItemRemove(item)}>+</div>
                  <div className="search-list__remove-button" onClick={() => onItemRemove(item)}>-</div>
                  <div>{selectedItemValue(item)}</div>
                </div>
              );
            })}
          </div>
          <TextInput
            value={term}
            onChange={e => this.setState({ term: e.target.value })}
          />
          <div className="search-list__items-container">
          {items.map((item, index) => {
            return (
              <div
                className="search-list__item-container"
                onClick={() => onItemSelect(item)}
                key={index}
              >
                {item.name}
              </div>
            );
          })}
          </div>
        </div>
      );
    }
}
 
export default SearchList;