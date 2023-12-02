
import {useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';

const QuoteDelete = () => {

  const params = useParams() as {quoteId: string};
  const navigate = useNavigate();
  const onDelete = async () => {
    try {
      await axiosApi.delete('quotes/' + params.quoteId + '.json');
      console.log(params.quoteId);
      navigate('/');
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const notDelete = () => {
    navigate('/');
  };

  return (
    <div>
      <h4> Are you sure?</h4>
      <button className="btn btn-success me-2" onClick={notDelete}>No</button>
      <button className="btn btn-danger" onClick={onDelete}>Yes</button>
    </div>
  );
};

export default QuoteDelete;