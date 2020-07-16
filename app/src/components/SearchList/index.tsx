import React, { Component, FunctionComponent } from 'react';
import TextInput from "../TextInput";

import './styles.css';
import Spinner from '../Spinner';

export interface Item {
  identifier: string
  name: string
}

interface SearchListControls {
  onItemAdd: (item: Item) => any
  onItemSubtract: (item: Item) => any
  selectedItemValue: (item: Item) => any
  selectedItemQuantity: (item: Item) => any
}

interface SearchListProps extends SearchListControls {
  items: Item[]
  selectedItems: Item[]
}

interface SearchItemProps extends SearchListControls {
  item: Item
}

const SearchItem: FunctionComponent<SearchItemProps> = ({
  item,
  onItemAdd,
  onItemSubtract,
  selectedItemValue,
  selectedItemQuantity,
}) => {
  return (
    <div className="search-list__selected-item-container">
      <div className="search-list__remove-button" onClick={() => onItemAdd(item)}>+</div>
      <div className="search-list__remove-button" onClick={() => onItemSubtract(item)}>-</div>
      <div>{selectedItemValue(item)}</div>
      <div>{`${selectedItemQuantity(item)} quantity`}</div>
      <Spinner values={["lol", "lel", "kek"]}/>
    </div>
  );
}

class SearchList extends Component<SearchListProps> {
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
        selectedItems,
        selectedItemValue,
        selectedItemQuantity,
        onItemAdd,
        onItemSubtract,
      } = this.props;
      const items = this.filterItems();
      return (
        <div>
          <div>
            {selectedItems && selectedItems.map((item, index) => {
              return <SearchItem
                item={item}
                onItemAdd={onItemAdd}
                onItemSubtract={onItemSubtract}
                selectedItemValue={selectedItemValue}
                selectedItemQuantity={selectedItemQuantity}
              />
            })}
          </div>
          <TextInput
            value={term}
            onChange={(e: any) => this.setState({ term: e.target.value })}
          />
          <div className="search-list__items-container">
          {items.map((item, index) => {
            return (
              <div
                className="search-list__item-container"
                onClick={() => onItemAdd(item)}
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