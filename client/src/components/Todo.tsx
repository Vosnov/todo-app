import React from 'react'
import { ITodo } from '../redux/reducers/todos'

type TodoProps = ITodo & {
  onDeleteClick: (id: string) => any
  onToggleTodo: (id: string) => any
}

const Todo: React.FC<TodoProps> = (props) => {
  const handleCloseClick = () => {
    props.onDeleteClick(props._id)
  }
  
  const handleToggleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onToggleTodo(props._id)
    e.currentTarget.classList.toggle('checked')
  }

  return (
    <li className="todo list-group-item">
      <div className="todo-main" onClick={(e) => handleToggleClick(e)}>
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={props.checked}
          onChange={() => {}}
        />
        <p className="text">{props.text}</p>
        <div className="todo-create-date">
          <p>{props.date}</p>
        </div>
      </div>
      <a className="link-close" href="#" onClick={handleCloseClick}>
        <img className="link-img-close" src="./img/trash-solid.svg"/>
      </a>
    </li>
  )
}

export default Todo