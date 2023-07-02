import "./attribution.style.css";

export function Attribution() {
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img
          src="https://pt.vitejs.dev/logo.svg"
          className="logo"
          alt="Vite logo"
        />
      </a>
      <a href="https://react.dev" target="_blank" rel="noreferrer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
          className="logo react"
          alt="React logo"
        />
      </a>
      <a href="https://tanstack.com/query/v3" target="_blank" rel="noreferrer">
        <img
          src="https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png"
          className="logo query"
          alt="React logo"
        />
      </a>
      <a href="https://axios-http.com" target="_blank" rel="noreferrer">
        <img
          src="https://axios-http.com/assets/favicon.ico"
          className="logo axios"
          alt="React logo"
        />
      </a>
    </div>
  );
}
