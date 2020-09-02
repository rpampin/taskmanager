import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export function TaskForm() {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // POST request using fetch with error handling
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    fetch('/api/tasks', requestOptions)
      .then(async (response) => {
        const data = await response.json();

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
      <p>Id: {id}</p>
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
          ></textarea>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}
