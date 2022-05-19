import React from 'react';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastNotify extends React.Component {
    constructor(props) {
        super(props);

        this.notify = this.notify.bind(this);
        this.error = this.error.bind(this);
        this.success = this.success.bind(this);
        this.info = this.info.bind(this);
        this.warn = this.warn.bind(this);
        this.clear = this.clear.bind(this);
    }

    notify() {
        // default type
        return toast('Hello World!');
    }
    error(msg) {
        // add type: 'error' to options
        return toast.error(msg);
    }
    success(msg) {
        // add type: 'success' to options
        return toast.success(msg);
    }
    info() {
        // add type: 'info' to options
        return toast.info('Info');
    }
    warn(msg) {
        // add type: 'warning' to options
        return toast.warn(msg);
    }
    clear() {
        // Remove all toasts !
        return toast.dismiss();
    }

    render() {
        const containerStyle = {
            zIndex: 1999
        };
        const { toastData: { type, message } = {} } = this.props;
        switch (type) {
            case 'SUCCESS':
                this.success(message);
                break;
            case 'ERROR':
                this.error(message);
                break;
            case 'WARNING':
                this.warn(message);
                break;
            default:
                console.log('type', type);
        }
        return (
            <React.Fragment>
                <div className="animated">
                    <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        toastData: state.toast.toastData,
    };
}

export default connect(mapStateToProps, null)(ToastNotify);