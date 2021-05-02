import { Classes } from 'jss';

export type JSSStyles = {[key: string]: { [key: string]: { [key: string]: string } | string }};
export type JSSClasses = Classes<string | number>