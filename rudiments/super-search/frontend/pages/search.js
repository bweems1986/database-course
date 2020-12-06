import Layout from "../components/MyLayout.js";
import jsCookie from "js-cookie";
import { getInfo, getLoggedInfo, getNotLogged } from "../lib/utils";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      search: '',
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
    //no user
    if(jsCookie.get("screenname") == undefined){
      const results = await getNotLogged(this.state.search);
      if(results){
        this.setState({ results: results });
      } else {
        this.setState({ 
          results: {
            movie_name: [],
            restaurant_type: [],
            restaurant_name: [],
            theater_name: []
          } 
        });
      }
    }else {
      //with a user
      const results = await getLoggedInfo(this.state.search,jsCookie.get("screenname"));
      if(results){
        this.setState({ results: results });
      } else {
        this.setState({ 
          results: {
            movie_name: [],
            restaurant_type: [],
            restaurant_name: [],
            theater_name: []
          } 
        });
      }
    }
          
  }

   handleInput(evt){
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
          onChange={this.handleInput.bind(that)}
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
          td,
          p {
            color: #1f618d;          
            font-family: "Arial";
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

          table {  
            color: #333; /* Lighten up font color */
            font-family: Helvetica, Arial, sans-serif; /* Nicer font */
            width: 100%; 
            border-collapse: 
            collapse; 
            border-spacing: 0;
          }
        
          td, th { border: 1px solid #CCC; height: 30px; } /* Make cells a bit taller */
        
          th {  
            background: #F3F3F3; /* Light grey background */
            font-weight: bold; /* Make sure they're bold */
          }
        
          td {  
            background: #FAFAFA; /* Lighter grey background */
            text-align: center; /* Center our text */
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;
