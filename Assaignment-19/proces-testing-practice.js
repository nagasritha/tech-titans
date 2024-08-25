

process.stdin.on('data',(data)=>{
    let command = (data.toString().trim());
    if(command == 'exit'){
        process.exit(0);
    }
    console.log(command);
})