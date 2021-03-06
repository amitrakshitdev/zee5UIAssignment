import React, { Component } from 'react';
import "./App.css";
import Header from "./Header/Header";
import Showswrapper from './Showswrapper/Showswrapper';
class App extends Component {
    constructor(props) {
        super(props);
        this.handleLazyLoad = this.handleLazyLoad.bind(this);
        this.onScrollHandler = this.onScrollHandler.bind(this);
        this.appStateHandler = this.appStateHandler.bind(this);
        this.backButtonClickHandler = this.backButtonClickHandler.bind(this);
    }
    state = {
        searching: false,
        searchResult: [],
        loading: false,
        apiData: [],
        startApiDataIndex: 0,
        endApiDataIndex: 10
    }
    async appStateHandler(stateObject) {
        this.setState((state, props) => {
            return {
                ...stateObject
            }
        });
    }
    async getData(startIndex, endIndex) {
        let outputData = [];
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");
            let data = await res.json();
            outputData = [...data];
        } catch (error) {
            if (error) throw error;
        }
        return outputData.slice(startIndex, endIndex);
    }
    async handleLazyLoad(num = 10) {
        if (this.state.endApiDataIndex < 50) {
            let startIndex = this.state.endApiDataIndex;
            let endIndex = startIndex + num;
            let apiData = await this.getData(startIndex, endIndex);
            this.setState({
                apiData: apiData,
                startApiDataIndex: startIndex,
                endApiDataIndex: endIndex
            });
        }
    }
    async onScrollHandler(ev) {
        let showsWrapperWindow = document.querySelector(".App-Showswrapper-window");
        if (!this.state.searching && showsWrapperWindow.scrollTop + showsWrapperWindow.offsetHeight > showsWrapperWindow.scrollHeight * 0.9) {
            if (!this.state.loading) {
                this.setState({ loading: true });
                await this.handleLazyLoad();
                this.setState({ loading: false });
            }
        }
    }

    async componentDidMount() {
        let apiData = await this.getData(this.state.startApiDataIndex, this.state.endApiDataIndex);
        this.setState({ apiData: apiData });
    }
    backButtonClickHandler() {
        this.setState({
            searchResult: [],
            searching: false
        })
    }
    render() {
        return (<div className="App">
            <Header appStateHandler={this.appStateHandler} />
            {this.state.searching ? <div className='back-to-home-button-wrapper'>
                <button className='App-back-to-home-button' onClick={this.backButtonClickHandler}>Back</button>
                <h2 className='searchResults-text'>Search result(s) ... </h2>
            </div> : null}
            <div className='App-Showswrapper-window' onScroll={this.onScrollHandler}>
                <Showswrapper apidataTobeAdded={this.state.apiData}
                    startApiDataIndex={this.state.startApiDataIndex} endApiDataIndex={this.state.endApiDataIndex}
                    searchResult={this.state.searchResult} searching={this.state.searching} />
            </div>
            {this.state.loading ? <div className='App-loadingScreen'>
                <svg width="100" height="100">
                    {/* <circle cx="50" cy="50" r="40" stroke="#fff" stroke-width="4" fill='transparent' /> */}
                    <path d="M5 50 A45 45 0 0 1 95 50" fill='transparent' stroke='#fff' strokeWidth={4} strokeLinecap={"round"} />
                </svg>
            </div> : null}
        </div>);
    }
}

export default App;