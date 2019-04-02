import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {getSocket} from '../index';

import * as actionCreators from '../../common/action_creators';

export const Header = React.createClass({
    render() {
        return <div className={"navbar navbar-default navbar-fixed-top"} style={{width: '100%'}}>
            <div className={"container-fluid"}>
                <ul className={"nav navbar-nav"}>
                    <li>
                        <Link to={"/"}>Sessions</Link>
                    </li>
                    <li>
                        <Link to={"/queries"}>Queries</Link>
                    </li>
                </ul>
                <ul className={"nav navbar-nav pull-right"}>
                    <li>
                        <input type="file" name="file" multiple onChange={this.handleUpload} />
                    </li>
                    <li>
                        <a href="javascript:void(0)" onClick={this.props.clear}>Clear</a>
                    </li>
                </ul>
            </div>
        </div>
        ;
    },
    handleUpload(evt){
      _.each(evt.target.files, file => {
        let reader = new FileReader()
        reader.onload = () => {
          let data = JSON.parse(reader.result);
          let socket = this.props.socket;
          document.tmp = this.props.socket;
          _.each(data, entry => {
            socket.emit('action', actionCreators.addEntry(entry));
          });
          //this.props.store.dispatch(actionCreators.setState(data));
        };
        reader.readAsText(file);
      });
    },
});

export const HeaderContainer = connect(
  (state) => {
    return {
      socket: getSocket()
    };
  },
  actionCreators
)(Header);

