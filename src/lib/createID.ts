function createID(){
    // let dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // let id = "";
    // for(var i = 0; i < 10; i++){
    //     id += dict[Math.floor(Math.random() * dict.length)];
    // }

    // Math.random().toString(36).substr(2, 10);

    // 生成 UUID
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //     return v.toString(16);
    // })

    return Math.random().toString(36).substr(2, 10);
}

export default createID;