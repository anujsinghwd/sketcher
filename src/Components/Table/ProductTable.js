import React, { Component } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, deleteProduct, updateProduct, addProduct } from '../../actions/productActions';
import Toast from '../Common/Toast';

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
      data: [],
      limit: 10,
      offset: 0,
      toastFlag: false
    }
  }

  componentDidMount(){
    this.props.getProducts({limit: this.state.limit, offset: this.state.offset});
  }

  render() {
    let toast;
    if(this.props.product.flag){
      toast = <Toast flag={true} type="success"/>
      this.props.product.flag = false;
    }
    if(this.props.product.products.length > 0 && this.state.data.length === 0){
      this.props.product.products.forEach((e ,i) => {
          e.desc = e.desc.val;
          e.brandName = e.brand.name;
      });
      this.setState({data: this.props.product.products});
    }
    return (
      <>
        { toast }
        <MaterialTable
          title="Products"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                let reqData = newData;
                resolve();
                if(reqData.brandName && reqData.name && reqData.lname && reqData.desc){
                  const data = [...this.state.data];
                  data.push(newData);
                  reqData.brandId = '123';
                  reqData.images = 'https://i.ytimg.com/vi/x4zz2yH1bLE/maxresdefault.jpg,https://i.ytimg.com/vi/x4zz2yH1bLE/maxresdefault.jpg';
                  this.props.addProduct(reqData);
                  this.setState({ ...this.state, data });
                }
              }, 500);
            }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  let r = data.splice(data.indexOf(oldData), 1);
                  this.setState({ ...this.state, data });
                  this.props.deleteProduct(r[0]._id);
                }, 500);
              }),
              onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data[data.indexOf(oldData)] = newData;
                  let req = {};
                  req.id = newData._id;
                  req.brandName = (newData.brandName !== oldData.brandName) ? newData.brandName : false;
                  req.name = (newData.name !== oldData.name) ? newData.name : false;
                  req.lname = (newData.lname !== oldData.lname) ? newData.lname : false;
                  req.desc = (newData.desc !== oldData.desc) ? newData.desc : false;
                  this.props.updateProduct(req);
                  this.setState({...this.state, data });
                }, 500);
              }),
          }}
        />
      </>
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

export default connect(mapStateToProp, { getProducts, deleteProduct, updateProduct, addProduct })(ProductTable);