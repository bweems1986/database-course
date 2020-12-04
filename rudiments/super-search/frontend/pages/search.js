import Layout from "../components/MyLayout.js";
import jsCookie from "js-cookie";
import { getInfo, getLoggedInfo, getNotLogged } from "../lib/utils";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      search: "",
      results: {
        movie_name: [],
        restaurant_type: [],
        restaurant_name: [],
        theater_name: []
      }
    };
    
    //this.handleSearch();
  }

  handleUpdate(evt) {
    this.setState({ search: evt.target.value }, this.handleSearch);
  }

  async handleSearch(evt) {
    
    const results = await getLoggedInfo(this.state.search,jsCookie.get("screenname"));
    this.setState({ results })
    console.log(results + "adsfadsf");
    if(results === null){
      console.log("we up in this bitch?");
      const results = await getNotLogged(this.state.search);
      console.log(results + "results?");
      console.log("again?");
      this.setState({ results })

    }
    
  }

  async handleInput(evt){
    this.handleUpdate(evt);
    this.handleSearch(evt);
  }

  render() {
    const that = this;
    return (
      <Layout
        style={{ margin: "auto auto", width: "600px", textAlign: "center" }}
      >
        <h2>Start Searching Your Community!</h2>
        <input
          type="text"
          className="text-style"
          value={this.state.search}
          onChange={this.handleInput.bind(this)}
        />
        <br />
        <br />
        
        <br /> <br />
        {this.state.results.restaurant_type.length > 0 && this.state.search !== '' ? (
          <table id="entries">

          <tbody>{this.state.results.restaurant_type.map(function(item, key) {
                 
                   return (
                      <tr key = {key}>
                          <td>{item.name}</td>
                          <td>{item.restaurant_type}</td>
                          <td>{item.address}</td>
                          <td>{item.city}</td>
                          <td>{item.zip}</td>
                      </tr>
                    )
                 
                 })}</tbody>
           </table>
        ) : null}
        {this.state.results.restaurant_name.length > 0 && this.state.search !== '' ? (
          <table id="entries">

          <tbody>{this.state.results.restaurant_name.map(function(item, key) {
                 
                   return (
                      <tr key = {key}>
                          <td>{item.name}</td>
                          <td>{item.restaurant_type}</td>
                          <td>{item.address}</td>
                          <td>{item.city}</td>
                          <td>{item.zip}</td>
                      </tr>
                    )
                 
                 })}</tbody>
           </table>
        ) : null}
        {this.state.results.movie_name.length > 0 && this.state.search !== '' ? (
          <table id="entries">

          <tbody>{this.state.results.movie_name.map(function(item, key) {
                 
                   return (
                      <tr key = {key}>
                          <td>{item.movie}</td>
                          <td>{item.theater}</td>
                          <td>{item.address}</td>
                          <td>{item.city}</td>
                          <td>{item.zip}</td>
                      </tr>
                    )
                 
                 })}</tbody>
           </table>
        ) : null}
        {this.state.results.theater_name.length > 0 && this.state.search !== '' ? (
          <table id="entries">

          <tbody>{this.state.results.theater_name.map(function(item, key) {
                 
                   return (
                      <tr key = {key}>
                          <td>{item.movie}</td>
                          <td>{item.theater}</td>
                          <td>{item.address}</td>
                          <td>{item.city}</td>
                          <td>{item.zip}</td>
                      </tr>
                    )
                 
                 })}</tbody>
           </table>
        ) : null}
        <style jsx>{`
          h1,
          h2,
          h3,
          h4,
          a,
          p {
            font-family: "Arial";
            color: #006600;
          }

          .button-style {
            margin: auto auto;
            cursor: pointer;
            background-color: #228b22;
            color: #ffffff;
            width: 100px;
            font-family: "Arial";
          }

          .text-style {
            margin: auto auto;
            width: 200px;
          }

          input {
            margin: auto auto;
            width: 200px;
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
