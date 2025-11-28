import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();
  const [filter, setFilter] = useState('all'); // all, active, completed

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }

  const handleToggleComplete = (task) => {
    const config = { 
      url: `/tasks/${task._id}`, 
      method: "put", 
      headers: { Authorization: authState.token },
      data: { description: task.description, completed: !task.completed }
    };
    fetchData(config).then(() => fetchTasks());
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const getFilteredTasks = () => {
    if (filter === 'active') return tasks.filter(task => !task.completed);
    if (filter === 'completed') return tasks.filter(task => task.completed);
    return tasks;
  }

  const filteredTasks = getFilteredTasks();
  const activeTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;


  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">

        {tasks.length !== 0 && (
          <>
            <h2 className='my-4 ml-2 md:ml-0 text-2xl font-bold'>Your Tasks</h2>
            
            {/* Filter Tabs */}
            <div className='flex gap-2 mb-4 ml-2 md:ml-0'>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({tasks.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'active'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Active ({activeTasks})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Completed ({completedTasks})
              </button>
            </div>
          </>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div>
            {filteredTasks.length === 0 ? (

              <div className='w-full h-[300px] flex items-center justify-center gap-4 flex-col'>
                <span className='text-gray-500 text-lg'>
                  {tasks.length === 0 ? 'No tasks found' : `No ${filter} tasks found`}
                </span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">
                  + Add new task
                </Link>
              </div>

            ) : (
              filteredTasks.map((task, index) => (
                <div 
                  key={task._id} 
                  className={`bg-white my-4 p-4 rounded-md shadow-md transition ${
                    task.completed ? 'opacity-75 bg-gray-50' : ''
                  }`}
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => handleToggleComplete(task)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            task.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {task.completed && <i className="fa-solid fa-check text-white text-sm"></i>}
                        </button>
                        <span className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                          Task #{index + 1}
                        </span>
                      </div>
                      <div className={`mt-2 whitespace-pre-wrap text-gray-600 ml-9 ${task.completed ? 'line-through' : ''}`}>
                        {task.description}
                      </div>
                      <div className='mt-3 ml-9 text-xs text-gray-400 space-y-1'>
                        <div><i className="fa-solid fa-calendar-plus mr-2"></i>Created: {formatDate(task.createdAt)}</div>
                        {task.updatedAt && task.createdAt !== task.updatedAt && (
                          <div><i className="fa-solid fa-calendar-check mr-2"></i>Updated: {formatDate(task.updatedAt)}</div>
                        )}
                      </div>
                    </div>

                    <div className='flex gap-3 flex-shrink-0'>
                      <Tooltip text={"Edit this task"} position={"top"}>
                        <Link to={`/tasks/${task._id}`} className='text-green-600 hover:text-green-700 cursor-pointer'>
                          <i className="fa-solid fa-pen"></i>
                        </Link>
                      </Tooltip>

                      <Tooltip text={"Delete this task"} position={"top"}>
                        <span className='text-red-500 hover:text-red-600 cursor-pointer' onClick={() => handleDelete(task._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))

            )}
          </div>
        )}
      </div>
    </>
  )

}

export default Tasks