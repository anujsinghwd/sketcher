import React, { Component } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';

class ProductTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      columns: [
            { title: 'Name', field: 'name' },
            { title: 'LName', field: 'lname' },
            { title: 'Description', field: 'desc'},
            {title: 'Brand Name',field: 'brandName'},
          ],
          data: [
            { name: 'Mehmet', lname: 'Baran', desc: 1987, brandName: 63 },
            {
              name: 'Zerya Betül',
              lname: 'Baran',
              desc: 2017,
              brandName: 34,
            },
          ]
    }
  }

  componentDidMount(){
    this.props.getProducts({limit: 10, offset: 0});
  }

  render() {
    console.log(this.props.product);
    return (
      <MaterialTable
      title="Products"
      columns={this.state.columns}
      data={this.state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...this.state.data];
              data.push(newData);
              this.setState({ ...this.state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...this.state.data];
              data[data.indexOf(oldData)] = newData;
              this.setState({ ...this.state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...this.state.data];
              data.splice(data.indexOf(oldData), 1);
              this.setState({ ...this.state, data });
            }, 600);
          }),
      }}
    />
    );
  }
}

ProductTable.prototypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
}

const mapStateToProp = state => ({
  product: state.product
});

export default connect(mapStateToProp, { getProducts })(ProductTable);