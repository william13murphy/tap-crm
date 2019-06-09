import React from 'react';
import connect from 'src/redux/connect';
import { Tab, Tabs } from '@blueprintjs/core';
import AvailableItemsGrid from '../AvailableItemsGrid';
import { getReferenceItems } from 'api/referenceItems';

class CategoryDetail extends React.Component {
  props: {
    vertical: boolean,
    active: string,
    onChange: Function,
    data: [
      {
        key: string,
        panel: Function,
      },
    ],
    utility: Object,
  };
  state = {
    activeCategory: null,
    displayCategories: [],
    categories: [],
  };

  componentWillMount() {
    const categories = [];
    const categoryTypes = getReferenceItems(
      'LstSkuCategory',
      this.props.utility.references
    );

    this.props.pos.schoolPos.payload.Skus.forEach(item => {
      let itemInstock = categoryTypes.find(
        element => element.Id === item.CategoryId
      );
      if (!categories.includes(itemInstock)) {
        categories.push(itemInstock);
      }
    });
    this.setState({ categories });
  }

  componentWillReceiveProps() {
    const displayCategories = [];
    const { Skus } = this.props.pos.schoolPos.payload;
    let updatedQuantity = 0;

    //Loop through array of items in inventory
    Skus.forEach(item => {
      //Find category details that match current item's category
      let currentItemCategory = this.state.categories.find(
        item2 => item2.Id === item.CategoryId
      );

      //Check if there are items in the cart
      //If so, find the cart item that equals the current inventory item
      //And account for the new quantity
      if (this.props.pos.cart.payload.length > 0) {
        let itemInCart = this.props.pos.cart.payload.find(
          cartItem => cartItem.id === item.Id
        );
        if (itemInCart) updatedQuantity = itemInCart.quantity;
      }

      const formattedData = {
        id: item.Id,
        tax: item.SellingPrice * (item.TaxRate / 100),
        name: item.Name,
        price: item.SellingPrice,
        stock: item.AvailableQuantity - updatedQuantity,
        quantity: updatedQuantity,
        properties: item,
      };

      //Check if the current item's category is found in the updatedCategoryDetail
      //categoryFound prevents the updatedCategoryDetail array from growing larger
      //than the total # of categories found in the school pos
      let categoryFound = displayCategories.find(
        tab => tab.key === currentItemCategory.Description
      );

      if (displayCategories.length > 0 && categoryFound) {
        let index = displayCategories.findIndex(
          item => item.key === categoryFound.key
        );
        displayCategories[index]['data'].push(formattedData);
      } else {
        displayCategories.push({
          key: currentItemCategory.Description,
          data: [formattedData],
        });
      }
    });

    if (!this.state.activeCategory) {
      this.setState({
        displayCategories,
        activeCategory: this.state.categories[0].Description,
      });
    }
  }

  onTabChange = activeCategory => {
    this.setState({ activeCategory });
  };

  render() {
    return (
      <div className="CategoryDetail">
        <Tabs
          animate={true}
          className="pt-large"
          large={true}
          id="navbar"
          vertical={this.props.vertical}
          onChange={this.onTabChange}
          selectedTabId={this.state.activeCategory}
        >
          {this.state.displayCategories.map(item => {
            return (
              <Tab
                key={item.key}
                className="CategoryDetail_item"
                id={item.key}
                title={item.key}
                panel={
                  <AvailableItemsGrid
                    data={item.data}
                    cartData={this.props.cartData}
                  />
                }
              />
            );
          })}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    utility: state.utility,
  };
}

export default connect(
  CategoryDetail,
  mapStateToProps
);
