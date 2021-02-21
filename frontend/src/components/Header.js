import React, { Component } from "react";
import { render } from "react-dom";


export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
                    <div>
                        <a className="nav-icon" href='/' ><p>Sudoku<span className="nav-dot">.</span>in</p></a>
                    </div>
                    <div>
                        <a className="nav-link" href='/all-games' > Play Game </a>
                        <a className="nav-link" href='/solver' > Get Solution </a>
                    </div>
            </div>
        );
    }
}


const headerDiv = document.getElementById("header");
render(<Header />, headerDiv);
