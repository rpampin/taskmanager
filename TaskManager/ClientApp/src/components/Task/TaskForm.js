import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export function TaskForm() {
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm();

  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData(id) {
      const response = await fetch(`api/tasks/${id}`);
      const data = await response.json();
      setData(data);
    }
    if (!!id) fetchData(id);
  }, [id]);

  const onSubmit = (data) => {
    if (!!id) data.id = id;
    // POST request using fetch with error handling
    const requestOptions = {
      method: !!id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    fetch(`/api/tasks${!!id ? `/${id}` : ''}`, requestOptions)
      .then(async (response) => {
        // const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        history.push('/tasks');
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      {Object.keys(errors).length > 0 && (
        <div className='alert alert-danger' role='alert'>
          <strong>Error</strong>
          <ul>
            {Object.entries(errors).map((e) => (
              <li key={e[0]}>{e[1]['message']}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='form-control'
            name='title'
            id='title'
            placeholder='Title'
            ref={register({ required: 'Title field is required' })}
            defaultValue={(!!data && data.title) || ''}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='details'>Details</label>
          <textarea
            className='form-control'
            name='details'
            id='details'
            rows='3'
            ref={register({ required: 'Details field is required' })}
            defaultValue={(!!data && data.details) || ''}
          ></textarea>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}
