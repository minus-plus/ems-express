"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {search, setInput, resetSearch} from '../actions/searchActions';

import {Grid, Row, Col} from 'react-bootstrap';

class Tracking extends Component {
    constructor(props) {
         super(props);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.onChangeInput = this.onChangeInput.bind(this);
         this.onReset = this.onReset.bind(this);
    }


    handleSubmit() {
        const inputStr = this.input.value;
        this.props.search(inputStr);
        this.onReset();

    }

    onChangeInput() {
        const inputStr = this.input.value;
        this.props.setInput(inputStr);
    }

    onReset() {
        this.props.resetSearch();
    }


    render() {
        const {searchInput, whaleResult, emsResult} = this.props;
        const items = whaleResult.items || [];
        const trackingList = items.map((item, index) => {
            return (
                <Row key={index}>
                    <Col xs={12} sm={6} md={6}>
                        {item.time}
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                        {item.context}
                    </Col>
                </Row>
            )
        });

        const emsTrackingList =  emsResult.map((item, index) => {
            return (
                <Row key={index}>
                    <Col xs={12} sm={6} md={6}>
                        {item.time}
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                        {item.context}
                    </Col>
                </Row>
            )
        });

        return (
            <div>
                <div className="input-container">
                    <div className="input-form-container">
                        <div>
                            <h5>请输入订单号:</h5>
                        </div>
                        <input className="input-field" ref={(node) => this.input = node} value={searchInput} onChange={this.onChangeInput}/>
                        <button className="submit-button" onClick={this.handleSubmit}>点击查询</button>
                    </div>

                </div>
                <div>
                    <h4>
                        运单信息:
                    </h4>
                    <Grid>
                        {trackingList}
                    </Grid>
                    <Grid>
                        {emsTrackingList}
                    </Grid>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchInput: state.search.searchInput,
        whaleResult: state.search.whaleResult,
        emsResult: state.search.emsResult
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            search: search,
            setInput: setInput,
            resetSearch: resetSearch
        }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking);