export default function Loader() {
  return (
    <div style={s.wrapper}>
      <div style={s.spinner}></div>
      <p style={s.text}>Loading...</p>
    </div>
  );
}

const s = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #4fc3f7",
    borderTop: "4px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  text: {
    marginTop: "10px",
    color: "#4fc3f7"
  }
};