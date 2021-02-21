import React, { Component } from "react";


export default class Solver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solved: false,
            error: "",
            unsolvedGrid: [[]],
            unsolved: {},
            solvedGrid: [[]],
        };
        this.renderUnsolvedGrid = this.renderUnsolvedGrid.bind(this);
        this.renderSolvedGrid = this.renderSolvedGrid.bind(this);
        this.createUnsolvedGrid =  this.createUnsolvedGrid.bind(this);
        this.getSolutionButtonClicked = this.getSolutionButtonClicked.bind(this);
        this.createGridString = this.createGridString.bind(this);
        this.handleValChange = this.handleValChange.bind(this);

        
    }

    componentDidMount() {
        this.createUnsolvedGrid();
    }

    handleValChange(e) {
        let unsolved_ = this.state.unsolved;
        unsolved_[e.target.id] = e.target.value;
        this.setState({
          unsolved: unsolved_,
        });
    }

    createUnsolvedGrid() {
        let theGrid = [];
        for (let i = 0; i < 9; i++) {
            let row = [];
            for (let j = 0; j < 9; j++) {
                const valId = "" + i + j;
                let unsolved_ = this.state.unsolved;
                unsolved_[valId] = 0;
                this.setState({
                    unsolved: unsolved_,
                });
                row.push(0);
            }
            theGrid.push(row);
        }

        this.setState({
            unsolvedGrid: theGrid,
        })
    }

    renderSolvedGrid() {
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

    renderUnsolvedGrid() {
        return (
            <div id="row-container">
              {this.state.unsolvedGrid.map((items, index) => {
                return (
                  <div className="col-container" key={index}>
                    {items.map((subItems, sIndex) => {
                        return <div className="val-container"><input onChange={this.handleValChange} type="text" placeholder="" id={"" + index + sIndex} key={sIndex} /></div>;
                    })}
                  </div>
                );
              })}
            </div>
          );
    }

    createGridString() {
        let gridString = "";
        const values = this.state.unsolved;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const valId = "" + i + j;
                gridString += values[valId] + " ";
            }    
        }
        return gridString;
    }

    getSolutionButtonClicked() {
        const gridString = this.createGridString();
        let count = 0;
        for (let i = 0; i < gridString.length; i++) {
            if (gridString[i] == 0) {
                count += 1;
                console.log(gridString[i], count);
            }
            if (count > 30) {
                this.setState({
                    error: "Too Few Arguments!",
                });
                return;
            }
        }

        fetch(`/api/get-solution?gridString=${gridString}`)
        // fetch(`/api/get-grid?gridId=1`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({
                // unsolvedGrid: data.unsolved_grid,
                solvedGrid: data.solved_grid,
                solved: true,
            });
        })
        .catch((err) => {
            this.setState({
                error: err,
            })
        });
    }

    render() {
        return (
            <div id="main-container">
                <div>
                    <h1 className="title">Get Solution For Sudoku</h1>
                    <p className="content">Enter the corresponding grid values and leave blank for the unknown values.</p><br/>
                </div>
                {this.state.error === "" ? (this.state.solved ? this.renderSolvedGrid() : this.renderUnsolvedGrid()) : <h1 className="error-notif">{this.state.error}</h1>}
                <div className="button-holder">
                {this.state.error === "" ?  <button className="buttons check-btn" onClick={this.getSolutionButtonClicked}>Get Solution</button> : <a href="/solver"><button className="buttons check-btn">Re Submit</button></a>
                }
                </div>

            </div>
        );
    }
}

