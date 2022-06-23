import React, { Component } from 'react';
import "./Showswrapper.css";
import Show from './Show/Show';
class Showswrapper extends Component {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        apidataTobeAdded: []
    }
    state = {
        loaded: false,
        apiData: [],
        searchResult: [],
        searching: false
    }
    componentDidMount() {
        this.setState({
            searching: this.props.seaching,
            searchResult: this.props.searchResult
        });
    }

    static getDerivedStateFromProps(nextProps, preState) {
        let dataArr = nextProps.apidataTobeAdded;
        let startIndex = nextProps.startApiDataIndex;
        let endIndex = nextProps.endApiDataIndex;
        for (let i = startIndex; i < endIndex; i++) {
            preState.apiData[i] = nextProps.apidataTobeAdded[i - startIndex];
        }
        return {
            apiData: preState.apiData,
            seaching: nextProps.seaching,
            searchResult: nextProps.searchResult
        }
    }

    render() {
        if (this.props.searching == true) {
            return (<div className='Showswrapper'>
                {this.props.searchResult.map((dataI, index) => dataI ? <Show key={dataI.id} data={dataI} /> : null)}
            </div>);
        }
        else {
            return (<div className='Showswrapper'>
                {this.state.apiData.map((apidataI, index) => apidataI ? <Show key={apidataI.id} data={apidataI} /> : null)}
            </div>)
        }
    }
}
export default Showswrapper;