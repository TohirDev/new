import { token } from '../sections/@dashboard/user/addingUsers';

const { useState, useCallback } = require('react');

const useGetAllUsers = (url) => {
  const [data, setData] = useState(null);
  const [laoding, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUsers = useCallback(() => {
    console.log('Loading boshlandi');
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        // localStorage.removeItem('token');
        console.log('error in murojat page');
      })
      .finally(() => {
        console.log('loading tugadi');
        setLoading(false);
      });
  }, [url]);

  return { data, laoding, error, getAllUsers };
};

export default useGetAllUsers;
