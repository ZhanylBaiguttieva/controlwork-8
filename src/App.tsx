
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';

import Quotes from './containers/Quotes/Quotes';
import QuoteForm from './containers/QuoteForm/QuoteForm';

function App() {

  return (
    <div>
      <header>
        <NavLink to="/quotes" >Quotes</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="/new-quote" >Submit new quote</NavLink>
      </header>
      <div className="d-flex m-5">
        <div className="text-start">
          <ul>
            <li><NavLink to="/quotes" >All</NavLink></li>
            <li><NavLink to="/quotes/star-wars" >Star wars</NavLink></li>
            <li><NavLink to="/quotes/celebrities" >Famous people</NavLink></li>
            <li><NavLink to="/quotes/motivational" >Motivational</NavLink></li>
            <li><NavLink to="/quotes/saying" >Saying</NavLink></li>
            <li><NavLink to="/quotes/humour" >Humour</NavLink></li>
          </ul>
        </div>
        <div className="flex-fill ms-5">
          <Routes>
            <Route path='/' element={(<Quotes />)}></Route>
            <Route path='/quotes' element={(<Quotes/>)}></Route>
            <Route path='/new-quote' element={(<QuoteForm/>)}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
