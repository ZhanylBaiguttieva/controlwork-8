import {useNavigate} from 'react-router-dom';
import {useCallback, useState} from 'react';
import axiosApi from '../../axiosApi';

const QuoteForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const[newQuote, setNewQuote] = useState({
    category: '',
    author: '',
    description: '',
  });

  const quoteChanged = useCallback((event: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    setNewQuote(prevState => ({
      ...prevState,
      [name]:value,
    }));
  }, []);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axiosApi.post('quotes.json', newQuote);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };


  const form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="Category" className="me-3">Category: </label>
        <select  className="form-control" id="category" value={newQuote.category} onChange={quoteChanged} name="category"  required >
          <option value=""> </option>
          <option value="Star wars">Star wars</option>
          <option value="Famous people">Famous people</option>
          <option value="Motivational">Motivational</option>
          <option value="Saying">Saying</option>
          <option value="Humour">Humour</option>
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