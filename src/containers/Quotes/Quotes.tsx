import {useCallback, useEffect, useState} from 'react';
import {ListQuote, Quote} from '../../types';
import axiosApi from '../../axiosApi';
import {Link} from 'react-router-dom';


const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([
  ]);

  const fetchQuote = useCallback(async () => {
    const response = await axiosApi.get('quotes.json');
    const data: ListQuote = response.data;
    const quoteList = Object.entries(data).map(([quoteId, quote]) => {
      return {
        id: quoteId,
        category: quote.category,
        author: quote.author,
        description: quote.description,
      };
    });
    setQuotes(quoteList);
  },[]);

  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote]);


  return (
    <div>
      <h4 className="mb-1 fs-5">Quotes:</h4>
      {quotes.map(quote => (
        <div className="bg-warning m-3 rounded" key={quote.id}>
          <p className="mb-0"><strong>{quote.author} said:</strong></p>
          <p>" {quote.description} " </p>
          <Link to={'/quote/'+ quote.id + '/edit'}>Edit</Link>
          <div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quotes;