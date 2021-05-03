import { ITodoDTO } from 'fed-todo-journey_todo-common';

type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type ITodoClietDTO = PartialBy<ITodoDTO, 'userId'>;
