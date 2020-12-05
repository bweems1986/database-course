import Layout from "../components/MyLayout.js";
import Link from 'next/link'


const indexLink = {
  display: "inline",
  textAlign: "center",
  fontSize: "1em",
  textColor: "#000000"

}

export default function Index() {
  return (
    <div className= "container" >
    <Layout>
      <br />
      <h1>Search for Information About Your Local Community</h1>

      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        a,

        h1 {
          text-align: center;
          color: #1f618d;          
        }

        p {
          color: #000000;
          font-family: "Arial";
          text-align: center;

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
    </div>
  );
}
