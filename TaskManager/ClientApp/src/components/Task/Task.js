import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {} from './Task.css';
import { Pen, Trash } from 'react-bootstrap-icons';

export class Task extends Component {
  static displayName = Task.name;

  constructor(props) {
    super(props);
    this.state = { tasks: [], loading: true };
    this.deleteAction = this.deleteAction.bind(this);
  }

  componentDidMount() {
    this.populateTasksData();
  }

  deleteAction(id) {
    fetch(`api/tasks/${id}`, { method: 'DELETE' }).then((response) => {
      if (response.ok) {
        this.setState({ tasks: this.state.tasks.filter((t) => t.id !== id) });
      } else {
        console.error('Something went wrong');
      }
    });
  }

  renderTasksTable(tasks) {
    return (
      <table className='table table-striped' aria-labelledby='tabelLabel'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th style={{width: '5%'}}></th>
            <th style={{width: '5%'}}></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.details}</td>
              <td>
                <Link to={`tasks/task/${task.id}`}>
                  <button type='button' className='btn btn-outline-dark'>
                    <Pen />
                  </button>
                </Link>
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-outline-dark'
                  onClick={() => this.deleteAction(task.id)}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderTasksTable(this.state.tasks)
    );

    return (
      <div>
        <h1 id='tabelLabel'>Tasks</h1>
        <p>This component demonstrates fetching data from the server.</p>
        <Link to='/tasks/task'>
          <button type='button' className='btn btn-primary'>
            New
          </button>
        </Link>
        {contents}
      </div>
    );
  }

  async populateTasksData() {
    const response = await fetch('api/tasks');
    const data = await response.json();
    this.setState({ tasks: data, loading: false });
  }
}
