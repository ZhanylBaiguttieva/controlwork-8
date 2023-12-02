import {Link, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import  {Quote} from '../../types';
import axiosApi from '../../axiosApi';

const QuoteItem = () => {
  const [quoteInfo, setQuoteInfo] = useState<Quote[]>();

  const params = useParams() as {quoteDetailId: string, quoteId: string};

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
          <div className="col-sm-12 rounded-start bg-warning m-2 d-flex" key={quote?.id}>
            <div className="card-body mt-3">
              <div className="card-title"><strong>{quote?.author} said: </strong></div>
              <div>"{quote?.description}"</div>
            </div>
            <div className="float-end m-3">
              <Link to={'/quote/'+ quote.id + '/edit'}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteItem;