class ClsTurno {
    constructor (){
        this.area = "";
        this.dia = "";
        this.hora = "";
    }
}

class ClsTurnero {
    constructor (){
        this.turnos = [];
    }
    addTurno(area,dia,hora){
        let blnAgregar = true;
        let localTurno = new ClsTurno();
        localTurno.area = area;
        localTurno.dia = dia;
        localTurno.hora = hora;
        for (let miTurno of this.turnos){
            if (miTurno.area == localTurno.area && miTurno.dia == localTurno.dia && miTurno.hora == localTurno.hora){
                blnAgregar = false;
            }
        }
        if (blnAgregar){
            this.turnos.push(localTurno);
        }
        return blnAgregar;
    }
    clearTurnero(){
        this.turnos.length = 0;
    }
}

var miTurnero = new ClsTurnero();
