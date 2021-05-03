export const isTestEnv = () : boolean =>{
    return process.env.production === 'false';
}