import React, { Component } from "react";
import { render } from "react-dom";


export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                <p className="footer-text">Sudoku Game Solver © 2021</p>
            </div>
        );
    }
}


const footerDiv = document.getElementById("footer");
render(<Footer />, footerDiv);
