
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';

import Quotes from './containers/Quotes/Quotes';
import QuoteForm from './containers/QuoteForm/QuoteForm';
import QuoteItem from './containers/Quotes/QuoteItem';
import QuoteDelete from './containers/Quotes/QuoteDelete';

function App() {
  const quotesDetails = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Celebrities', id: 'celebrities'},
    {title: 'Motivational', id: 'motivational'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humour', id: 'humour'},
  ];

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
            {quotesDetails.map(quoteDetail => (
              <li><NavLink to={"/quotes/" + quoteDetail.id} >{quoteDetail.title}</NavLink></li>
            ))}
          </ul>
        </div>
        <div className="flex-fill ms-5">
          <Routes>
            <Route path='/' element={(<Quotes />)}></Route>
            <Route path='/quotes' element={(<Quotes/>)}></Route>
            <Route path='/new-quote' element={(<QuoteForm/>)}></Route>
            <Route path='/quote/:quoteId/edit' element={(<QuoteForm/>)}></Route>
            <Route path='/quote/:quoteId' element={(<QuoteDelete/>)}></Route>
            {quotesDetails.map(quoteDetail => (
              <Route path={"/quotes/:quoteDetailId"}  element={(<QuoteItem/>)}>{quoteDetail.title}</Route>
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
