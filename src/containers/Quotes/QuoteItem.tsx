import {Link, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import  {Quote} from '../../types';
import axiosApi from '../../axiosApi';

const QuoteItem = () => {
  const [quoteInfo, setQuoteInfo] = useState<Quote[]>();

  const params = useParams() as {quoteDetailId: string};

  const fetchQuoteInfo = useCallback(async () => {
    const response = await axiosApi.get('quotes.json?orderBy="category"&equalTo="' + params.quoteDetailId + '"');
    const data: Quote = response.data;
    const quoteItems = Object.entries(data).map(([quoteDetailId,quote]) => {
      return {
        id: quoteDetailId,
        category: quote.category,
        author: quote.author,
        description: quote.description,
      };
    });
    setQuoteInfo(quoteItems);
  },[params.quoteDetailId]);

  useEffect(() => {
    void fetchQuoteInfo();
  }, [fetchQuoteInfo]);

  return (
    <div>
      <div className="row">
        {quoteInfo?.map(quote => (
          <div className="col-sm-12 rounded-start">
            <div className="card-body mt-3  bg-warning" key={quote?.id}>
              <div className="card-title"> {quote?.author}</div>
              <div>{quote?.description}</div>
              <Link to={'/quote/'+ quote.id + '/edit'}>Edit quote</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteItem;