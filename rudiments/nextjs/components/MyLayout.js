import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  background: "linear-gradient(#00bf8f, #001510)",
  width: "100%",
  position: "fixed", 
  top: 0, 
  left: 0,
  bottom: 0, 
	
  /* Preserve aspet ratio */
  minWidth: "100%",
  minHeight: "100%"
}

export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      <Header />
      {props.children}
    </div>
  )
}
