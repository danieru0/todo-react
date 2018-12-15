import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './details.css';

const styles = {
    cssRoot: {
        backgroundColor: '#4a148c',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#7E57C2'
        },
        marginTop: '20px'
    }
}

class Details extends Component {
  constructor() {
    super();
    this.state = {
        idk: ''
    }
  }

  render() {
    let { todos, clickedTodo, classes } = this.props;
    let clickedTodoData;
    if (todos && clickedTodo) {
        todos[clickedTodo.date].map((item) => {
            if (Object.keys(item).toString() === clickedTodo.id) {
                clickedTodoData =  item[clickedTodo.id]
            }
            return '';
        });
        console.log(clickedTodoData);
    }
    return (
        <div className="details">
            {
                clickedTodo ? (
                    <div className="details__task">
                        <div className="task__info">
                            <div className="task-remove">
                                <button title="remove task" className="task-remove-btn">
                                    <Icon style={{ fontSize: 32 }} className="btn-icon">delete_forever</Icon>
                                </button>
                            </div>
                            <p className="task-fromNow">13 days ago</p>
                        </div>
                        <div className="task__description">
                            <p className="task-title">Tytuł jakiegoś taska</p>
                            <textarea className="description__textarea" placeholder="Description"></textarea>
                            <Button className={classes.cssRoot} variant="contained">Save</Button>
                        </div>
                    </div>
                ) : (
                    <div className="details__center">Click a task title to view its details</div>
                )
            }
        </div>
    )
  }
}

export default withStyles(styles)(Details);