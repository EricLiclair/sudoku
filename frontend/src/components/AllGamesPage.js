import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";


export default class AllGamesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grids: [[]],
        };
        this.getAllGames = this.getAllGames.bind(this);
        this.renderGames = this.renderGames.bind(this);

    }

    componentDidMount() {
        this.getAllGames();
    }

    getAllGames() {
        fetch('/api/grids')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({
                grids: data,
            });
        });
    }

    renderGames() {
        
        return (
            <div id="main-container">
                <h1 className="title">Available Games</h1>
                {this.state.grids.map((items, index) => {
                    return (
                        <a key={index} className="games" href={`/play-game/${items.id}`}>
                            <h1 className="title">Game Id {`1084-${items.id}`}</h1>
                            <p className="content"><strong>Level:</strong> Easy</p>
                        </a>
                    );
                })}
            </div>

        );
    }

    render() {
        return (
            <div>
                {this.renderGames()}
            </div>
        )
    }
}

