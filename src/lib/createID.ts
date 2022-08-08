function createID(){
    let dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for(var i = 0; i < 10; i++){
        id += dict[Math.floor(Math.random() * dict.length)];
    }

    return id
}

export default createID;