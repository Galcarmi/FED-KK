export const isTestEnv = (args) =>{
    args.forEach(arg=>{
        if(arg === '--testenv'){
            return true;
        }
    })
    
    return false;
}