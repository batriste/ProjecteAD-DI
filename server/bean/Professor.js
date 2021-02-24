class Professor{

    constructor(id_professor, departament){
        this._id_professor = id_professor
        this._departament = departament
    }    

    get id_professor(){
        return this._id_professor;
    }

    set id_professor(id){
        this._id_professor = id;
    }

    get departament(){
        return this._departament;
    }

    set departament(departament){
        this._departament = departament;
    }

}

module.exports={
    Professor: Professor
}