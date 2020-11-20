import Layout from "../components/MyLayout.js";

import { getInfo } from "../lib/utils";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { search: "" };
    //this.handleSearch();
  }
   async handleUpdate(evt) {
    this.setState({ search: evt.target.value });
  }

  async handleSearch(evt) {
    const food = await getInfo(this.state.search);
    console.log(food);
    this.setState({ food });
    
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
        <h2>Food Search</h2>
        <input
          type="text"
          className="text-style"
          value={this.state.search}//something wrong here, when value is zero results are still displayed
          onChange={this.handleInput.bind(that)}
        />
        <br />
        <br />
        <br /> <br />
        {this.state.food && this.state.search !== '' ? (
          <table id="entries">
                        <th>Description</th>
                        <th>Kcal</th>
                        <th>fa_sat_g</th>
                        <th>fa_mono_g</th>
                        <th>fa_poly_g</th>
                        <th>Total Fat</th>

          <tbody>{this.state.food.food.map(function(item, key) {
                 
                   return (
                      <tr key = {key}>
                          <td>{item.description}</td>
                          <td>{item.kcal}</td>
                          <td>{item.fa_sat_g}</td>
                          <td>{item.fa_mono_g}</td>
                          <td>{item.fa_poly_g}</td>
                          <td>{(item.fa_sat_g + item.fa_mono_g + item.fa_poly_g).toFixed(2)}</td>
                      </tr>
                    )
                 
                 })}</tbody>
           </table>
        ) : null}
        <style jsx>{`
          h1,
          td,
          table,
          th,
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
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          #entries {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          #entries td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          #entries tr:nth-child(even){background-color: #f2f2f2;}
          
          #entries tr:hover {background-color: #ddd;}
          
          #entries th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;

