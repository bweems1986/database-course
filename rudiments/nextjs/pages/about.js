import Layout from '../components/MyLayout.js'

export default function About() {
  return (
    
    <Layout style={{background: "linear-gradient(#00bf8f, #001510)", display: "block"}}>
      <iframe width="853" height="480" src="https://www.youtube.com/embed/IeMw2K9Mlbg" 
      frameborder="0" allowfullscreen ng-show="showvideo"></iframe>

      <style jsx>{`

        iframe {
          margin-top: 50px;
          padding-left: 475px;
        }
      `}
      </style>
    </Layout>
    
  )
}
