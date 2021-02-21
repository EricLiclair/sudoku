import React, { Component } from "react";
import { render } from "react-dom";


export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                <a href='https://github.com/EricLiclair/sudoku' className="footer-text">Sudoku Game Solver © 2021</a>
            </div>
        );
    }
}


const footerDiv = document.getElementById("footer");
render(<Footer />, footerDiv);
