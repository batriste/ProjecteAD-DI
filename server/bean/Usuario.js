  

class Usuario{

    constructor(id, username, password, full_name, avatar){
        this._id = id;
        this.username = username;
        this.password = password;
        this.full_name = full_name;
        this.avatar = avatar;
    }

    get id(){
        return this._id;
    }
    
    set id(id){
        this._id = id;
    }

    get username(){
        return this.username;
    }
    
    set username(username){
        this.username = username;
    }

    get password(){
        return this.password;
    }
    
    set password(password){
        this.password = password;
    }

    get full_name(){
        return this.full_name;
    }
    
    set full_name(full_name){
        this.full_name = full_name;
    }

    get avatar(){
        return this.avatar;
    }
    
    set avatar(avatar){
        this.avatar = avatar;
    }
}
module.exports = {
    Usuario: Usuario
}