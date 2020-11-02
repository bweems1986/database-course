import Link from 'next/link'

const linkStyle = {
  marginLeft: "225px",
  marginBottom: "200px",
  padding: "100px",
  display: "inline",
  textAlign: "center",
  fontSize: "1.5em",
  color: "#000000"


}

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/search">
        <a style={linkStyle}>Find A Campground</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
    </div>
  )
}
