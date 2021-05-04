import { ITodoDTO, PartialBy } from 'fed-todo-journey_todo-common';

export type ITodoPartialDTO = PartialBy<ITodoDTO, 'userId'>;
