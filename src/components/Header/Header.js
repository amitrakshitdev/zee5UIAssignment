import React, { Component } from 'react';
import "./Header.css";
class Header extends Component {
    constructor(props) {
        super(props);
        this.searchHandler = this.searchHandler.bind(this);
    }
    async getSearchResult(string) {
        let allApiData = [];
        let searchResult = [];
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");
            let data = await res.json();
            allApiData = data;
        } catch (error) {
            if (error) throw error;
        }
        allApiData.forEach(dataI => {
            let inSmallCase = string.toLowerCase();
            let condition1 = dataI.title.includes(string);
            let condition2 = dataI.title.includes(inSmallCase);
            if (condition1 || condition2) {
                searchResult.push(dataI);
            }
        });
        // console.log(searchResult);
        return searchResult;
    }
    searchHandler(ev) {
        if (ev.key == "Enter" && ev.target.value.length > 2) {
            this.props.appStateHandler({ loading: true });
            this.getSearchResult(ev.target.value).then(res => {
                this.props.appStateHandler({
                    searchResult: res,
                    searching: true,
                    loading: false
                });
                let showsWrapperWindow = document.querySelector(".App-Showswrapper-window");
                showsWrapperWindow.scroll({ top: 0 })
            });
        }
    }
    state = {}
    render() {
        return (<div className='Header'>
            <div className='Header-search-bar'>
                <input className={"Header-search-bar-input"} type={"text"} placeholder={"Search"} onKeyDown={this.searchHandler} name="text" />
            </div>
        </div>);
    }
}

export default Header;