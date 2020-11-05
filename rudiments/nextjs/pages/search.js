import Layout from "../components/MyLayout.js";

import { getInfo } from "../lib/utils";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { search: "" };
  }
  handleUpdate(evt) {
    this.setState({ search: evt.target.value });
  }

  async handleSearch(evt) {
    const campground = await getInfo(this.state.search);
    this.setState({campground});
    console.log(campground);

  }

  render() {
    const that = this;
    return (
      <Layout position="fixed">
        <h2>Campground Search</h2>
        <p style={{width:"600px", margin: "auto auto", paddingTop: "10px", paddingRight:"78px", textAlign: "center"}}>
        <input
          type="text"
          className="text-style"
          value={(this.state.search)}
          onChange={this.handleUpdate.bind(this)}
        />
        </p>        
        <br />
        <br />
        <div onClick={this.handleSearch.bind(that)} className="button-style">
          Submit
        </div>
        <br /> <br />
        {this.state.campground ? (
          <div>
            <br />
            <h3>{this.state.campground.name}</h3>
            <br />
            <img
              style={{ maxWidth: "700px", maxHeight: "500px" }}
              src={this.state.campground.image_url}
            />
            <br /> <h4>{this.state.campground.closest_town}</h4>
            <br />
            <div className="description">
              <p>{this.state.campground.description}</p>
              <br />{" "}
            </div>
          </div>
        ) : null}
        {"campground" in this.state && this.state.campground == undefined ? (
          <p>{this.state.search} Campground Not Found</p>
        ) : null}
        <style jsx>{`
          h1,
          h2,
          h3,
          h4,
          input,
          a,

          h3 {
            color: black;
            font-size: 35px;
          }

          div {
            text-color: black;
          }
          p {
            font-family: "Arial";
            color: #006600;
            font-size: 35px;
          }

          h2 {
            margin: 50px 725px;
            width: 20%;
            border: 3px solid black;
            top-padding: 10px;
            text-align: center;
            color: #000000;
          }

          .button-style {
            margin-left: 865px;
            cursor: pointer;
            border: 3px solid black;
            background-color: #228b22;
            color: #000000;
            width: 100px;
            font-family: "Arial";
            text-align: center;
          }
          
          .text-style {
            margin: 20px;
          }

          input {
            margin: auto;
            width: 400px;
            text-align: center;
          }

          .description {
            font-family: "Arial";
            font-size: "10px";
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
            margin: 5px 0;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;