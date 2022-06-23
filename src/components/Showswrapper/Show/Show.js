import React, { Component } from 'react';
import "./Show.css";
class Show extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    state = {
        data: {
            albumId: 1,
            id: 1,
            title: "",
            url: "",
            thumbnailUrl: ""
        }
    }
    onClickHandler() {
        window.open(this.props.data.url);
    }
    render() {
        return (<div className='Show' >
            <div className='Show-thumbnail' >
                <img className="thumbnail-img" src={this.props.data.thumbnailUrl} onClick={this.onClickHandler} />
            </div>
            <h3 className='Show-title'>{this.props.data.title}</h3>
        </div>);
    }
}

export default Show;