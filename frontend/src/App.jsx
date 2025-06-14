import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Layout from './comps/Layout';

import Home from './comps/pages/Home';
import About from './comps/pages/About';
import AbsorbSim from './comps/pages/AbsorbSim';


function App() {
  return (
    
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/absorbsim" element={<AbsorbSim></AbsorbSim>}></Route>
        </Routes>
      </Router>
    </Layout>

  )
}
  



export default App
