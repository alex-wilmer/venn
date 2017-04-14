import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

let App = () =>
  <Router>
    <div>
      <h1>Venn</h1>
      <Link to="/">Home</Link>
      <Link to="/test">Test</Link>
      <div>
        <Route path="/test" component={() => <div>test</div>} />
      </div>
    </div>
  </Router>

export default App
