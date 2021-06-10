import logo from './logo.svg';
import './App.css';
import {Switch, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';

function App() {
  const showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
        result = routes.map((route, index) => {
            return <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />
        })
    }
    return <Switch>{result}</Switch>;
  }

  return (
    <Router>
      <div className="App">
        
        <div className='container-fluid p-0'>
          <Navbar />
          {showContentMenus(routes)}
          <Footer />
        </div>
      </div>
    </Router>
  );

  
}

export default App;
