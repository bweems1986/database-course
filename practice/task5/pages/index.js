import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };

  }

  render() {
    return (
      <div
        style={{
          margin: "auto auto",
          width: "800px",
          textAlign: "center",
          background: "#daf6db",
          borderStyle: "groove",
        }}
      >
        <h1>National Park Search</h1>
        <img src="/static/nationalPark1.jpg" className="App-logo" />

        <p>
          <input
            className="input-style"
            type="text"
            value={this.state.search}
          />
        </p>

        <div className="button-style">
          Submit
        </div>

        <br />
        <style jsx>{`
          .button-style {
            margin: auto auto;
            margin-top: 35px;
            cursor: pointer;
            background-color: #166d17;
            color: #ffffff;
            width: 150px;
            height: 45px;
            font-family: "Arial";
            line-height: 1.9;
            font-size: 1.4rem;
          }

          .input-style {
            font-size: 1.4rem;
            line-height: 1.6;
          }

          h1 {
            font-size: 2.1rem;
            font-family: "Arial";
            color: #125213;
          }
          h2 {
            font-family: "Arial";
            font-size: 1.6rem;
          }

          h3 {
            font-family: "Arial";
            font-size: 1.4rem;
          }

          .App-logo {
            height: 500px;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
