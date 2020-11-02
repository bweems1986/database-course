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
    <div class= "container" style={{background: "linear-gradient(#00bf8f, #001510)"}}>
    <Layout>
      <br />
      <h1>Let's Go Exploring!</h1>

      <h3>Get Information On All Of Your Favorite Campgrounds</h3>
      <Link href="/search">
        <p>Go to <a style={indexLink}>Find A Campground</a> to begin your next adventure!</p>
      </Link>
      <img
        src="/static/norway.jpg"
        style={{
          marginBottom: "100px",
          padding: "25px",
          display: "block",
          width: "45%",
          margin: "auto",
        }}
      />
    
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        a,

        h1 {
          text-align: center;
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
