import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toast extends Component {
  success = () => { 
      toast.success('SUCCESS!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        })
    }

    // error = () => { 
    //   toast.success('Error!', {
    //         position: "top-right",
    //         autoClose: 4000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true
    //     })
    // }

    // warning = () => { 
    //   toast.success('Warning!', {
    //         position: "top-right",
    //         autoClose: 4000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true
    //     })
    // }
  
  render(){
    return (
      <div>
        {this.success()}
        <ToastContainer />
      </div>
    );
  }
}


export default Toast;