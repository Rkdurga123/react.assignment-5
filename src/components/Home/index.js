import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-page">
      <div className="home-content">
        <h1 className="heading">Fins The Job That Fits To Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs">
            FindJobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)
export default Home
