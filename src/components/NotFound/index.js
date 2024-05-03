import './index.css'

const NotFound = () => (
  <div className="not-found-card">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-desc">
      We' re sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
