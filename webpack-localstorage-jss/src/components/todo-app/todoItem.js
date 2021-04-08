import { jss } from '../../js/utils';

const styles = {
    todoApp__list__item : {
      margin: '8px auto',
      textAlign: 'center',
      minHeight: '35px',
      marginRight: '3px',
      marginLeft: '3px',
      borderRadius: '25px',
      border: 'solid 2px black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      '&:hover $todo-app__list__item__actions':{
            opacity: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
      }
    },
    'todo-app__list__item__actions' : {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      opacity: 0,
      transition: 'all 0.5s ease',
        // '& todoApp__list__item:hover':{
        //   opacity: 1,
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   position: 'absolute',
        //   right: 0,
        // }
    }, 
    todoApp__list__item__content : {
      fontSize: '1.2em',
      width: '55%',
      overflowWrap: 'break-word',
      position: 'absolute',
      top:'50%',
      left:'50%',
      transform:'translate(-50%, -50%)',
    },
    todoApp__list__item__editInput:{
      position: 'absolute',
      top:'50%',
      left:'50%',
      transform:'translate(-50%, -50%)',
      zIndex: '400',
      border:'none',
      fontSize: '1.2em',
      textAlign: 'center',
      display: 'none',
    },
    todoApp__list__item__actions__done : {
      margin: '0px 3px',
      cursor: 'pointer',
      fill: 'green',
    },
    todoApp__list__item__actions__delete : {
      margin: '0px 3px',
      cursor: 'pointer',
      fill: 'red',
    },
    todoApp__list__item__actions__edit : {
      margin: '0px 3px',
      cursor: 'pointer',
      fill: 'rgb(177, 177, 41)',
    },
    todoApp__list__emptyState : {
      position: 'absolute',
      left:'50%',
      top:'50%',
      transform:'translate(-50%, -50%)',
      fontSize: '1.4em',
      opacity:0,
    }
  };

const { classes } = jss.createStyleSheet(styles).attach();
export const todoItemClasses = classes;


export const createTodoItem = (props) => {
    return `
    <div class="${classes.todoApp__list__item}" id="${props.id}">
        <input type="text" class="${classes.todoApp__list__item__editInput}">
        <div class="${classes.todoApp__list__item__content} ${
          props.isDone && 'crossed-content'
        }">${props.content}</div>
        <div class="${classes['todo-app__list__item__actions']}">
          <svg
            class="${classes.todoApp__list__item__actions__done}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
            />
          </svg>
          <svg
            class="${classes.todoApp__list__item__actions__delete}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
            />
          </svg>
          <svg
            class="${classes.todoApp__list__item__actions__edit}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z"
            />
          </svg>
        </div>
      </div>`;
}