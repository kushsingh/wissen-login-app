import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';

import useToken from './Services/auth.useToken';
import Header from './Components/Organisms/Header';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route exact path="/" element={ <Dashboard /> } />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
