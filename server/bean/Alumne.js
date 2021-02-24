class Alumne{

    constructor(id_alumne, repetirdor, curs){
        this._id_alumne = id_alumne
        this._repetidor = repetirdor
        this._curs = curs
    };        

    get id_alumne(){
        return this._id_alumne;
    };

    set id_alumne(id){
        this._id_alumne = id;
    };

    get repetirdor(){
        return this._repetidor;
    };

    set repetirdor(repetirdor){
        this._repetidor = repetirdor;
    };

    get curs(){
        return this._curs;
    };

    set curs(curs){
        this._curs = curs;
    };

}

module.exports={
    Alumne: Alumne
}