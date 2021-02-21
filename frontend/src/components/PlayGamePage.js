import React, { Component } from "react";


export default class PlayGamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            whichState: "unsolved",
            unsolvedGrid: [[]],
            solvedGrid: [[]],
        };
        this.gridId = this.props.match.params.gridId;
        this.getGridDetails();
        this.solveButtonPressed = this.solveButtonPressed.bind(this);
        this.checkButtonPressed = this.checkButtonPressed.bind(this);
        this.renderSolvedGrid = this.renderSolvedGrid.bind(this);
        this.renderUnsolvedGrid = this.renderUnsolvedGrid.bind(this);
        this.renderCheckButton = this.renderCheckButton.bind(this);
    }

    renderSolvedGrid() {
        // console.log(this.state.solvedGrid);
        return (
            <div id="row-container">
              {this.state.solvedGrid.map((items, index) => {
                return (
                  <div className="col-container" key={index}>
                    {items.map((subItems, sIndex) => {
                        return <div className="val-container"><input className="filled" type="text" value={subItems} id={"" + index + sIndex} key={sIndex} /></div>;
                    })}
                  </div>
                );
              })}
            </div>
          );
    }

    renderCheckedGrid() {
        // console.log(this.state.solvedGrid);
        return (
            <div id="row-container">
              {this.state.solvedGrid.map((items, index) => {
                return (
                  <div className="col-container" key={index}>
                    {items.map((subItems, sIndex) => {
                        let target = document.getElementById("" + index + sIndex);
                        if (target.value == subItems) {
                            return <div className="val-container"><input className="filled" type="text" value={target.value} id={"" + index + sIndex} key={sIndex} /></div>;
                        } else {
                            return <div className="val-container"><input className="error" type="text" value={target.value} id={"" + index + sIndex} key={sIndex} /></div>;
                        }
                    })}
                  </div>
                );
              })}
            </div>
          );
    }

    renderUnsolvedGrid() {
        // console.log(this.state.unsolvedGrid);
        return (
            <div id="row-container">
              {this.state.unsolvedGrid.map((items, index) => {
                return (
                  <div className="col-container" key={index}>
                    {items.map((subItems, sIndex) => {
                        if (subItems == 0) {
                            return <div className="val-container"><input className="empty" type="text" placeholder="" id={"" + index + sIndex} key={sIndex} /></div>;
                        } else {
                            return <div className="val-container"><input className="filled" type="text" value={subItems} id={"" + index + sIndex} key={sIndex} /></div>;
                        }
                    })}
                  </div>
                );
              })}
            </div>
          );
    }

    getGridDetails() {
        fetch(`/api/get-grid?gridId=${this.gridId}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({
                unsolvedGrid: data.unsolved_grid,
                solvedGrid: data.solved_grid
            });
        });
    }

    solveButtonPressed() {
        this.setState({
            whichState: "solved",
        })
        console.log(this.state.whichState);
    }

    checkButtonPressed() {
        this.state.whichState === "check" ? this.setState({ whichState: "unsolved"}) : this.setState({ whichState: "check"});
        console.log(this.state.whichState);
    }

    renderCheckButton() {
        return (
            <button className="buttons check-btn" onClick={this.checkButtonPressed}>{this.state.whichState === "unsolved" ? "Check" : "Retry"}</button>
        );
    }

    renderSolveButton() {
        return (
            this.state.whichState !== "solved" ? 
            <button className="buttons check-btn" onClick={this.solveButtonPressed}>Solve</button> :
            <a href={`/play-game/${this.gridId}`}>
                <button className="buttons check-btn" onClick={this.solveButtonPressed}>Play Again</button>
            </a>
        );
    }

    render() {
        return (
            <div id="main-container">
                    <h1 className="title">Game Id {`1084-${this.gridId}`}</h1>
                    
                {
                    this.state.whichState === "unsolved" ? this.renderUnsolvedGrid() : (
                        this.state.whichState === "check" ? this.renderCheckedGrid() : this.renderSolvedGrid()
                    )
                }
                <div className="button-holder">
                    {this.state.whichState !== "solved" ? this.renderCheckButton() : null}
                    {this.renderSolveButton()}
                </div>

                <p className="content"><a className="redirect" href="/#tips">#Sudoku Tips</a></p>
                <p className="content"><a className="redirect" href="/#howto">#How To Play?</a></p>
            </div>                    
        );
    }
}

