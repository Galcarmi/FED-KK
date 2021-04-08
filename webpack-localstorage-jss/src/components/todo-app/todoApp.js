import { jss } from '../../js/utils';

const styles = {
  todoApp: {
    backgroundColor: 'white',
    minHeight: '100%',
    width: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  todoApp__inputContainer :{
    paddingBottom: '5px',
    display: 'flex',
    borderTop: 'solid 3px rgb(177, 184, 189)',
    paddingTop: '5px',
    position: 'fixed',
    width:'80%',
    bottom:0,
    zIndex: 1000,
    backgroundColor:'white',
  },
  todoApp__inputContainer__textInput : {
    flex: 1,
    borderRadius: '25px',
    padding:'0px 10px 0px 10px',
    overflow: 'visible',
    border: 'solid 2px rgb(62, 66, 70)',
    fontSize: '1.2em',
    marginRight: '5px',
    marginLeft: '5px',
    '&:focus':{
        flex: 1,
        borderRadius: '25px',
        padding:'0px 10px 0px 10px',
        overflow: 'visible',
        border: 'solid 3px rgba(82, 153, 229, 1)',
        fontSize: '1.2em',
        marginRight: '5px',
        marginLeft: '5px',
        outline: 'none',
    }
  },
  todoApp__inputContainer__addBtn : {
    marginRight: '5px',
    width: '80px',
    borderRadius: '25px',
    backgroundColor: 'rgba(82, 153, 229, 1)',
    color: 'white',
    fontSize: '1.2em',
    border: 'solid 3px rgba(82, 153, 229, 1)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
    '&:active' : {
        marginRight: '5px',
        width: '80px',
        borderRadius: '25px',
        backgroundColor: 'rgb(0, 123, 255)',
        color: 'white',
        fontSize: '1.2em',
        border: 'solid 3px rgb(22, 125, 255)',
        cursor: 'pointer',
    }
  }, 
  todoApp__list : {
    paddingBottom: '37px',
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
  
export const { classes } = jss.createStyleSheet(styles).attach();

export const createTodoApp = (children) => {
  return `<div class="${classes.todoApp}">
    <div class="${classes.todoApp__list}">
      <div class="${classes.todoApp__list__emptyState}">Add your first TODO !</div>
      ${children ? children : ''}
    </div>
    <div class="${classes.todoApp__inputContainer}">
      <input type="text" class="${classes.todoApp__inputContainer__textInput}"/>
      <button class="${classes.todoApp__inputContainer__addBtn}">Add</button>
    </div>
  </div>`;
};
