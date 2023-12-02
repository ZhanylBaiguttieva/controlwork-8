import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {Quote} from '../../types';

const QuoteForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newQuote, setNewQuote] = useState({
    id: '',
    category: '',
    author: '',
    description: '',
  });

  const params = useParams() as {quoteId: string};

  const quoteChanged = useCallback((event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    setNewQuote(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

      try {
        if(params.quoteId === undefined) {
          await axiosApi.post('quotes.json', newQuote);
        } else {
          await axiosApi.put('quotes/' + params.quoteId + '.json', newQuote);
        }
        navigate('/');
      } finally {
        setLoading(false);
      }
  };

  const editQuote = useCallback(async () => {
    const url = 'quotes/' + params.quoteId + '.json';
    const response = await axiosApi.get(url);
    const data: Quote = response.data;
    setNewQuote(data);
  }, [params.quoteId]);

  useEffect(() => {
    if(params.quoteId) {
      void editQuote();
    }
  }, [params.quoteId,editQuote]);

  const form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="Category" className="me-3">Category: </label>
        <select  className="form-control" id="category" value={newQuote.category} onChange={quoteChanged} name="category"  required >
          <option value=""> </option>
          <option value="star-wars">Star wars</option>
          <option value="celebrities">Famous people</option>
          <option value="motivational">Motivational</option>
          <option value="saying">Saying</option>
          <option value="humour">Humour</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="Author">Author:</label>
        <input
          id="author" type="text" name="author" required
          className="form-control"
          value={newQuote.author}
          onChange={quoteChanged}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="Description">Quote text:</label>
        <input
          id="description" type="text" name="description" required
          className="form-control"
          value={newQuote.description}
          onChange={quoteChanged}
        />
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary m-3">
        Submit new quote
      </button>
    </form>
  );

  return (
    <div>
      <div>{form}</div>
    </div>
  );
};

export default QuoteForm;