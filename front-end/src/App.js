
import {Routes,Route,BrowserRouter} from 'react-router-dom'

import SideNavigation from './components/MasterLayout/SideNavigation';
import DashboardPage from './pages/dashboard/DashboardPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <DashboardPage/>
      </BrowserRouter>
    </div>
  );
}

export default App;
