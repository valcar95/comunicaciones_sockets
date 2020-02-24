
const bulletVelocity = 5;


var arrdis = false
var derdis = true
var izqdis = false
var abadis = false

var arrdis2 = false
var derdis2 = false
var izqdis2 = true
var abadis2 = false

var gameId, userType;

function gameKeyPress(elEvento) {
    var evento = window.event || elEvento;
    var val = evento.keyCode;
    console.log("val",val);
    console.log("usertype",userType);
    console.log("game id",gameId);
    execKeyPress1(val);
    execKeyPress2(val);
    let data = { type: "notify-key-press", data:{
        gameId: gameId, 
        keyValue:val
    } };
    connection.send(JSON.stringify(data));
}

function execKeyPress1(val){
    if (val == 50) {
        if (tiempo < 0) {
            incre += bulletVelocity
        }
        else {
            tiempo -= bulletVelocity
        }

    }

    if (val == 49) {
        if (incre > 10) {
            incre -= bulletVelocity
        }
        else {
            tiempo += bulletVelocity
        }
    }

    if (val == 13) {
        atacar()
    }

    if (val == 119) {
        aba = true
        arrdis = true
        abadis = false
    }
    if (val == 97) {
        izq = true
        derdis = false
        izqdis = true
    }
    if (val == 115) {
        arr = true
        arrdis = false
        abadis = true
    }
    if (val == 100) {
        der = true
        derdis = true
        izqdis = false
    }
}

function execKeyPress2(val){
    if (val == 43) {
        if (tiempo2 < 0) {
            incre2 += bulletVelocity
        }
        else {
            tiempo2 -= bulletVelocity
        }

    }

    if (val == 180) {
        if (incre2 > 10) {
            incre2 -= bulletVelocity
        }
        else {
            tiempo2 += bulletVelocity
        }
    }
    
    if (val == 32) {
        atacar2()
    }

    if (val == 111) {
        aba2 = true
        arrdis2 = true
        abadis2 = false
    }
    if (val == 107) {
        izq2 = true
        derdis2 = false
        izqdis2 = true
    }
    if (val == 108) {
        arr2 = true
        arrdis2 = false
        abadis2 = true
    }
    if (val == 241) {
        der2 = true
        derdis2 = true
        izqdis2 = false
    }
}


function gameKeyUp(elEvento) {
    var evento = window.event || elEvento;
    var val = evento.keyCode
    console.log("val",val);
    console.log("usertype",userType);
    execKeyUp1(val);
    execKeyUp2(val);
    let data = { type: "notify-key-up", data:{
        gameId: gameId, 
        keyValue:val
    } };
    connection.send(JSON.stringify(data));
}

function execKeyUp2(val){

    if (val == 79) {
        aba2 = false
        arrdis2 = true
        derdis2 = false
        izqdis2 = false
        abadis2 = false

    }
    if (val == 75) {
        izq2 = false
        arrdis2 = false
        derdis2 = false
        izqdis2 = true
        abadis2 = false
    }
    if (val == 76) {
        arr2 = false
        arrdis2 = false
        derdis2 = false
        izqdis2 = false
        abadis2 = true
    }
    if (val == 192) {
        der2 = false
        arrdis2 = false
        derdis2 = true
        izqdis2 = false
        abadis2 = false
    }

    if (val == 16) {
        cambiararma2()
    }
}

function execKeyUp1(val){
    if (val == 17) {
        cambiararma()
    }
    if (val == 87) {
        aba = false
        arrdis = true
        derdis = false
        izqdis = false
        abadis = false
    }
    if (val == 65) {
        izq = false
        arrdis = false
        derdis = false
        izqdis = true
        abadis = false
    }
    if (val == 83) {
        arr = false
        arrdis = false
        derdis = false
        izqdis = false
        abadis = true

    }
    if (val == 68) {
        der = false
        arrdis = false
        derdis = true
        izqdis = false
        abadis = false
    }
}


function createGameScreen(gameId) {
    createUsers();
    let balls=createBalls();
    let data = { type: "set-game-data", gameId: gameId, gameData:{balls:balls} };
    connection.send(JSON.stringify(data));
    drawBalls(balls);
}

function createUsers(){
    var res = document.getElementById("recibe")

    var bol = document.createElement("div")
    bol.id = "bola"
    bol.inmune = false
    bol.style.width = "30px"
    bol.style.height = "30px"

    var bol2 = document.createElement("div")
    bol2.id = "bola2"
    bol2.inmune = false
    bol2.style.width = "30px"
    bol2.style.height = "30px"

    tamx = window.innerWidth - 50
    tamy = window.innerHeight - mincero - 50

    posX2 = tamx + 20
    posY2 = tamy + mincero + 20

    bol2.style.left = tamx + 20 + "px"
    bol2.style.top = tamy + mincero + 20 + "px"

    res.appendChild(bol2)
    res.appendChild(bol)
}

function createBalls(){
    let balls=[];
    tamx = window.innerWidth - 50
    tamy = window.innerHeight - mincero - 50
    for (i = 0; i <= 20; i++) {
        var px = Math.floor(Math.random() * (1 + tamx + 1)) + 20;
        var py = Math.floor(Math.random() * (1 + tamy + 1)) + mincero + 20;

        var c1 = Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        var c2 = Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        var c3 = Math.floor(Math.random() * (1 + 225 + 1)) + 1;

        balls.push({
            x:px,
            y:py,
            color:"rgb(" + c1 + "," + c2 + "," + c3 + ")"
        });
    }
    return balls;

}

function drawBalls(balls){
    var res = document.getElementById("recibe");
    balls.forEach(x=>{
        var n = document.createElement("div")
        n.className = "otros"
        n.style.top = x.y + "px"
        n.style.left = x.x + "px"
        n.style.width = "20px"
        n.style.height = "20px"
        n.style.backgroundColor = x.color;
        n.style.boxShadow = "0px 0px 20px rgb(0,0,0) inset"
        res.appendChild(n)
    });
}


//ganadores
function gansdor2() {
    alert('gano el 2')
    self.location = 'warj.html'

}

function gansdor1() {
    alert('gano el 1')
    self.location = 'warj.html'
}

//sonido

function sonido(dir) {
    var cam = document.getElementById("misonido")
    cam.innerHTML = '<audio src="' + dir + '" autoplay="true"></audio>'
}

//cambio de imagen 1
function imagen1(dir) {
    var cam = document.getElementById("arma1")
    cam.style.backgroundImage = "url(" + dir + ")"
}

//cambio de imagen 1
function imagen2(dir) {
    var cam = document.getElementById("arma2")
    cam.style.backgroundImage = "url(" + dir + ")"
}

//numero de volas
function contarvolas() {
    var total = numcapturas + numcapturas2
    if (total == 21) {
        if (numcapturas > numcapturas2) {
            mensaje1("Protegete si deseas ganar")
            mensaje2("Perderas si no lo matas")
        }
        else {
            mensaje2("Protegete si deseas ganar")
            mensaje1("Perderas si no lo matas")
        }

        Reloj()
    }
}

//animacion de las minas
function animaminas() {
    //minas 1
    var tod1 = document.getElementsByClassName("minas1")
    for (i = 0; i < tod1.length; i++) {
        numer = tod1[i].anima
        numer += 1
        if (numer > 10) {
            numer = 0
        }

        if (numer <= 5) {
            tod1[i].style.backgroundColor = "rgba(0,255,0,1)"
        }
        else {
            tod1[i].style.backgroundColor = "rgba(1,1,1,0)";
        }
        tod1[i].anima = numer
    }

    //minas 2
    var tod2 = document.getElementsByClassName("minas2")
    for (i = 0; i < tod2.length; i++) {
        numer = tod2[i].anima
        numer += 1
        if (numer > 10) {
            numer = 0
        }

        if (numer <= 5) {
            tod2[i].style.backgroundColor = "rgba(255,102,255,1)"
        }
        else {
            tod2[i].style.backgroundColor = "rgba(1,1,1,0)";
        }
        tod2[i].anima = numer
    }

    setTimeout("animaminas()", 100)
}

//conteo para estayar bomba
function conteodeBombas() {

    //bombas1
    var b1 = document.getElementsByClassName("contabomba1")
    for (i = 0; i < b1.length; i++) {
        val = b1[i].valor
        val -= 1
        if (val < 1 && b1[i].activa == true) {
            estayarBomba(b1[i].padre, "jugador1")
            b1[i].style.display = "none"
            b1[i].activa = false
        }
        b1[i].valor = val
        b1[i].innerHTML = val
    }

    //bombas2
    var b1 = document.getElementsByClassName("contabomba2")
    for (i = 0; i < b1.length; i++) {
        val = b1[i].valor
        val -= 1
        if (val < 1 && b1[i].activa == true) {
            estayarBomba(b1[i].padre, "jugador2")
            b1[i].style.display = "none"
            b1[i].activa = false
        }
        b1[i].valor = val
        b1[i].innerHTML = val
    }

    setTimeout("conteodeBombas()", 1000)
}

function estayarBomba(padre, jugador) {
    var mibom = document.getElementById(padre)
    mibom.style.backgroundImage = "url(warj/estallido.png)"
    mibom.style.width = "60px"
    mibom.style.height = "60px"
    mibom.estayada = true
    sonido("warj/pisamina.mp3")

    var dX = mibom.style.left
    dX = dX.split('px')
    dX = dX[0]
    dX = parseInt(dX)

    var dY = mibom.style.top
    dY = dY.split('px')
    dY = dY[0]
    dY = parseInt(dY)

    mibom.style.top = dY - 15 + "px"
    mibom.style.left = dX - 15 + "px"

    lX = mibom.pX
    lY = mibom.pY



    anX = lX - 85
    anY = lY - 85

    var res = document.getElementById("recibe")

    var llama1 = document.createElement("div")
    llama1.style.left = lX + 5 + "px"
    llama1.style.top = lY + "px"
    llama1.className = "llama1"
    llama1.style.height = "0px"
    llama1.style.width = "20px"
    llama1.cont = 0
    llama1.ly = lY
    llama1.creador = jugador
    llama1.viva = true
    llama1.op = 1
    llama1.bom = padre

    var llama2 = document.createElement("div")
    llama2.style.left = lX + "px"
    llama2.style.top = lY + 5 + "px"
    llama2.className = "llama2"
    llama2.style.height = "20px"
    llama2.style.width = "0px"
    llama2.creador = jugador
    llama2.viva = true
    llama2.op = 1

    llama2.cont = 0
    llama2.lx = lX



    res.appendChild(llama1)
    res.appendChild(llama2)




}





function crecerllama() {

    //verticales
    var lla1 = document.getElementsByClassName("llama1")
    for (i = 0; i < lla1.length; i++) {
        co = lla1[i].cont
        mlY = lla1[i].ly
        mlY -= 4.2
        co += 10
        if (co <= 200) {


            lla1[i].style.height = co + "px"
            lla1[i].cont = co

            lla1[i].style.top = mlY + "px"
            lla1[i].ly = mlY
        }
        else {
            lla1[i].viva = false
        }
    }


    //horizontales
    var lla2 = document.getElementsByClassName("llama2")
    for (i = 0; i < lla2.length; i++) {
        co = lla2[i].cont
        mlX = lla2[i].lx
        mlX -= 4.2
        co += 10
        if (co <= 200) {
            lla2[i].style.width = co + "px"
            lla2[i].cont = co

            lla2[i].style.left = mlX + "px"
            lla2[i].lx = mlX
        }
        else {
            lla2[i].viva = false
        }
    }

    setTimeout("crecerllama()", 10)
}

function quitarLlama() {
    //verticales
    var lla1 = document.getElementsByClassName("llama1")
    for (i = 0; i < lla1.length; i++) {
        if (lla1[i].viva == false && lla1[i].op > 0) {
            var bom = document.getElementById(lla1[i].bom)
            opa = lla1[i].op
            opa -= 0.1
            lla1[i].op = opa

            if (opa < 0) {

                lla1[i].style.top = "-200px"
                lla1[i].style.left = "-200px";
                bom.style.top = "-200px"
                bom.style.left = "-200px";
            }
            lla1[i].style.opacity = opa
            bom.style.opacity = opa

        }
    }

    //horizontales
    var lla2 = document.getElementsByClassName("llama2")
    for (i = 0; i < lla2.length; i++) {
        if (lla2[i].viva == false && lla2[i].op > 0) {
            opa = lla2[i].op
            opa -= 0.1
            lla2[i].op = opa
            if (opa < 0) {
                lla2[i].style.top = "-200px"
                lla2[i].style.left = "-200px";
            }
            lla2[i].style.opacity = opa

        }
    }

    setTimeout("quitarLlama()", 100)
}

//mover bombas
function moverbombas() {
    //bombas 1
    var bom = document.getElementsByClassName("bombas1")
    for (i = 0; i < bom.length; i++) {
        if (bom[i].estayada == false) {
            bX = bom[i].pX
            bY = bom[i].pY

            if (bom[i].der == true) {
                if (bX > window.innerWidth - 130) {
                    bom[i].der = false
                }
                else {
                    bX += 5
                }
            }
            if (bom[i].izq == true) {
                if (bX < 30) {
                    bom[i].izq = false
                }
                else {
                    bX -= 5
                }

            }
            if (bom[i].aba == true) {
                if (bY > window.innerHeight - 130) {
                    bom[i].aba = false
                }
                else {
                    bY += 5
                }

            }
            if (bom[i].arr == true) {
                if (bY < 200) {
                    bom[i].arr = false
                }
                else {
                    bY -= 5
                }

            }

            bom[i].pX = bX
            bom[i].pY = bY

            bom[i].style.left = bX + "px"
            bom[i].style.top = bY + "px"
        }
    }

    //bombas 1
    var bom = document.getElementsByClassName("bombas2")
    for (i = 0; i < bom.length; i++) {
        if (bom[i].estayada == false) {
            bX = bom[i].pX
            bY = bom[i].pY

            if (bom[i].der == true) {
                if (bX > window.innerWidth - 130) {
                    bom[i].der = false
                }
                else {
                    bX += 5
                }
            }
            if (bom[i].izq == true) {
                if (bX < 30) {
                    bom[i].izq = false
                }
                else {
                    bX -= 5
                }

            }
            if (bom[i].aba == true) {
                if (bY > window.innerHeight - 130) {
                    bom[i].aba = false
                }
                else {
                    bY += 5
                }

            }
            if (bom[i].arr == true) {
                if (bY < 200) {
                    bom[i].arr = false
                }
                else {
                    bY -= 5
                }

            }

            bom[i].pX = bX
            bom[i].pY = bY

            bom[i].style.left = bX + "px"
            bom[i].style.top = bY + "px"
        }
    }

    setTimeout("moverbombas()", 10)
}

//imagen explocion 
function explocion(enX, enY) {
    var ima = document.getElementById("explocionmina")
    ima.src = "warj/explocion.gif"
    ima.style.left = enX + "px"
    ima.style.top = enY + "px"
}

//activar la bomba
function activarbomba(bom) {
    bom.activa = true
}


var partir1 = 0
var cadena1 = "";
var mitexto1 = ""
var finttex1 = 0
function reparte1() {
    var part = mitexto1.split('')
    var mes = document.getElementById("mimens1")
    if (partir1 < finttex1) {
        cadena1 += part[partir1]
        setTimeout("reparte1()", 100)
    }
    mes.innerHTML = cadena1
    partir1 += 1
}
function mensaje1(tex) {
    document.getElementById("mimens1").innerHTML = ""
    cadena1 = ""
    mitexto1 = ""
    var part = tex.split('')
    var f1 = part.length
    partir1 = 0
    mitexto1 = tex
    finttex1 = f1
    reparte1()
}


var partir2 = 0
var cadena2 = "";
var mitexto2 = ""
var finttex2 = 0
function reparte2() {
    var part = mitexto2.split('')
    var mes = document.getElementById("mimens2")
    if (partir2 < finttex2) {
        cadena2 += part[partir2]
        setTimeout("reparte2()", 100)
    }
    mes.innerHTML = cadena2
    partir2 += 1
}
function mensaje2(tex) {
    document.getElementById("mimens2").innerHTML = ""
    mitexto2 = ""
    cadena2 = ""
    var part = tex.split('')
    var f2 = part.length
    partir2 = 0
    mitexto2 = tex
    finttex2 = f2
    reparte2()
}

var conteo = 60
function Reloj() {
    var cam = document.getElementById("reloj")
    if (conteo > 0) {
        setTimeout("Reloj()", 1000)
    }
    else {
        if (numcapturas > numcapturas2) {
            gansdor1()
        }
        else {
            gansdor2()
        }
    }
    conteo -= 1
    cam.innerHTML = conteo
}


//jugador 1
var tamx = 0
var tamy = 0
var mincero = 100



var der = false
var izq = false
var arr = false
var aba = false






var posX = 0
var posY = 0
var tiempo = 50
var bola = ""
var masenX = 0
var masenY = 0
var incre = 15
function mover() {

    var cam = document.getElementById("bola")

    var bx = cam.style.width
    bx = bx.split('px')
    bx = bx[0]
    masenX = bx

    var by = cam.style.height
    by = by.split('px')
    by = by[0]
    masenY = by


    bola = cam

    if (der == true) {

        posX += incre
    }
    if (izq == true) {
        posX -= incre
    }

    if (arr == true) {
        posY += incre
    }
    if (aba == true) {
        posY -= incre
    }

    if (posY < mincero) {
        posY = mincero
    }

    tamx = window.innerWidth
    tamy = window.innerHeight

    if (posY > tamy - masenY) {
        posY = tamy - masenY
    }

    if (posX > tamx - masenX) {
        posX = tamx - masenX
    }

    if (posX < 0) {
        posX = 1
    }

    cam.style.top = posY + "px"
    cam.style.left = posX + "px"

    masenX = parseInt(masenX)
    masenY = parseInt(masenY)


    masenX += posX
    masenY += posY

    tocarMiBomba(posX - 1, posY - 1, masenX + 1, masenY - 1)
    pisarmina(posX, posY, masenX, masenY)
    chocarConBomba(posX, posY, masenX, masenY)
    intersepta(posX, posY, masenX, masenY)

    setTimeout("mover()", tiempo)




}

var poscapturaX = 23
var poscapturaY = 65
var numcapturas = 0
function intersepta(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("otros")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]

        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]


        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            yes = true
            if (fy - 10 >= mincero + 20) {

                tod[i].style.top = fy - 10 + "px"
            }

        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            yes = true
            tamy = window.innerHeight
            if (fy + 10 < tamy - 40) {
                tod[i].style.top = fy + 10 + "px"
            }
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes = true
            tamx = window.innerWidth
            if (fx + 10 < tamx - 40) {
                tod[i].style.left = fx + 10 + "px"
            }
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            yes = true
            if (fx - 10 > 20) {
                tod[i].style.left = fx - 10 + "px"
            }
        }

        if (yes == true) {

            numcapturas += 1
            tod[i].style.left = poscapturaX + "px"
            tod[i].style.top = poscapturaY + "px"
            tod[i].style.zIndex = numcapturas
            tod[i].style.webkitTransition = "all 0.1s ease-in"
            var camcon = document.getElementById("contacapturas1")
            camcon.innerHTML = numcapturas
            contarvolas()

            /* var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
             var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
             var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
         	
             tod[i].style.backgroundColor="rgb("+c1+","+c2+","+c3+")"
         	
             var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
             var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
             var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
         	
             tod[i].style.boxShadow="0px 0px 20px rgb("+c1+","+c2+","+c3+")"*/
        }




    }

}

var vidas = 10
function erir(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("valas")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]

        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]


        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            if (tod[i].mortal == true) {
                yes = true
            }
            else {
                if (tod[i].creador == "jugador2") {
                    yes = true
                }
            }
        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            if (tod[i].mortal == true) {
                yes = true
            }
            else {
                if (tod[i].creador == "jugador2") {
                    yes = true
                }
            }
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            if (tod[i].mortal == true) {
                yes = true
            }
            else {
                if (tod[i].creador == "jugador2") {
                    yes = true
                }
            }
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            if (tod[i].mortal == true) {
                yes = true
            }
            else {
                if (tod[i].creador == "jugador2") {
                    yes = true
                }
            }
        }

        if (yes == true && bola.inmune == false) {
            medieron()
            tod[i].style.left = "-30px"
            tod[i].style.top = "-30px"
            tod[i].activa = false
            tod[i].ab = false
            tod[i].ar = false
            tod[i].de = false
            tod[i].iz = false
            tod[i].mortal = false

        }

    }

}


function pisarmina(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("minas2")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]



        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]



        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes2 = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            yes2 = true
        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            yes2 = true
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes2 = true
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            yes2 = true
        }

        if (yes2 == true && bola.inmune == false) {
            tod[i].style.left = "-40px"
            tod[i].style.top = "-40px"
            tod[i].activa = false
            sonido("warj/pisamina.mp3")
            medieron()
            explocion(mix, miy)

            /*var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        	
            tod[i].style.backgroundColor="rgb("+c1+","+c2+","+c3+")"
        	
            var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        	
            tod[i].style.boxShadow="0px 0px 20px rgb("+c1+","+c2+","+c3+")"*/
        }




    }
}

function tocarMiBomba(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("bombas1")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]

        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]


        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes = false



        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {

            if (tod[i].activa == true) {
                yes = true
            }


        }


        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {

            if (tod[i].activa == true) {
                yes = true
            }


        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {

            if (tod[i].activa == true) {
                yes = true
            }


        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            if (tod[i].activa == true) {
                yes = true
            }
        }

        if (yes == true) {
            tod[i].der = der
            tod[i].izq = izq
            tod[i].aba = arr
            tod[i].arr = aba
            tod[i].activa = false
            setTimeout("activarbomba(" + tod[i].id + ")", tiempo + 1000)
            /* var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
             var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
             var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
         	
             tod[i].style.backgroundColor="rgb("+c1+","+c2+","+c3+")"
         	
             var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
             var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
             var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
         	
             tod[i].style.boxShadow="0px 0px 20px rgb("+c1+","+c2+","+c3+")"*/
        }




    }

}

function chocarConBomba(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("llama1")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]



        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]



        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes2 = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            yes2 = true
        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            yes2 = true
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes2 = true
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            yes2 = true
        }

        if (yes2 == true && bola.inmune == false && tod[i].creador == "jugador2") {
            sonido("warj/quemar2.mp3")
            medieron()
            explocion(mix, miy)

            /*var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        	
            tod[i].style.backgroundColor="rgb("+c1+","+c2+","+c3+")"
        	
            var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        	
            tod[i].style.boxShadow="0px 0px 20px rgb("+c1+","+c2+","+c3+")"*/
        }




    }


    var tod = document.getElementsByClassName("llama2")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]



        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]



        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes2 = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            yes2 = true
        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            yes2 = true
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes2 = true
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            yes2 = true
        }

        if (yes2 == true && bola.inmune == false && tod[i].creador == "jugador2") {
            sonido("warj/quemar2.mp3")
            medieron()
            explocion(mix, miy)

            /*var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        	
            tod[i].style.backgroundColor="rgb("+c1+","+c2+","+c3+")"
        	
            var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        	
            tod[i].style.boxShadow="0px 0px 20px rgb("+c1+","+c2+","+c3+")"*/
        }




    }

}

function medieron() {
    bola.inmune = true
    aninmun = 20
    color1 = bola.style.backgroundColor
    inmunidad1()
    vidas -= 1
    if (vidas > 0) {
        var convid = document.getElementById("contenvidas1")
        convid.innerHTML = ""
        for (j = 1; j <= vidas; j++) {
            convid.innerHTML += "<div class='vidas1'></div>"
        }
    }
    else {
        gansdor2()
    }
}



var aninmun = 0
var color1 = "rgba(0,255,0,1)"
function inmunidad1() {
    if (aninmun % 2 == 0) {
        bola.style.backgroundColor = "black"
        bola.style.color = "black"
    }
    else {
        bola.style.backgroundColor = color1
        bola.style.color = color1
    }

    aninmun -= 1
    if (aninmun > 0) {
        setTimeout("inmunidad1()", 100)
    }
    else {
        bola.inmune = false
        bola.style.backgroundColor = color1
        bola.style.color = color1
    }
}

var armas1 = new Array("dbvfdjk", "warj/vala.png", "warj/muestramina1.png", "warj/muestrabomba1.png")

function cambiararma() {
    arma += 1
    if (arma > 3) {
        arma = 1
    }
    sonido("warj/cambiodearma.mp3")
    imagen1(armas1[arma])

    var cam = document.getElementById("numarma1")
    if (arma == 1) {
        cam.innerHTML = numvalas
    }
    if (arma == 2) {
        cam.innerHTML = numminas
    }
    if (arma == 3) {
        cam.innerHTML = numbombas
    }
}

var arma = 1
function atacar() {

    if (arma == 1) {
        disparar()
    }

    if (arma == 2) {
        sembrarMina()
    }

    if (arma == 3) {
        dejarbomba()
    }
}

//arma tipo bomba
var numbombas = 5

function dejarbomba() {
    var cam = document.getElementById("numarma1")
    var res = document.getElementById("recibe")

    var posvalida = true

    if ((posX > window.innerWidth - 130) || (posY > window.innerHeight - 130) || (posY < 200)) {
        posvalida = false
    }


    if (numbombas > 0 && posvalida == true) {
        numbombas -= 1
        cam.innerHTML = numbombas

        var bomba = document.createElement("div")
        bomba.className = "bombas1"
        bomba.style.left = posX + "px"
        bomba.style.top = posY + "px"
        bomba.style.height = "30px"
        bomba.style.width = "30px"
        bomba.activa = true
        bomba.anima = 0
        bomba.numero = numbombas
        bomba.id = "mibomba1" + numbombas
        bomba.pX = posX
        bomba.pY = posY
        bomba.estayada = false
        bomba.izq = false
        bomba.der = false
        bomba.aba = false
        bomba.arr = false
        bomba.activa = false
        setTimeout("activarbomba(" + bomba.id + ")", tiempo + 1000)

        var conta = document.createElement("div")
        conta.className = "contabomba1"
        conta.innerHTML = "10"
        conta.id = "contabom" + numbombas
        conta.padre = "mibomba1" + numbombas
        conta.valor = 10
        conta.activa = true

        bomba.appendChild(conta)

        res.appendChild(bomba)
        mensaje1("")

    }
    else {
        if (numbombas > 0) {
            mensaje1("No puedes dejar bombas cerca de los bordos")
            contaanim1 = 10
            alertavalas()
        }
        else {
            contaanim1 = 10
            alertavalas()
        }

    }
}


//arma tipo mina
var numminas = 10;
function sembrarMina() {
    var cam = document.getElementById("numarma1")
    var res = document.getElementById("recibe")

    var posvalida = true

    if ((posX > window.innerWidth - 30) || (posY > window.innerHeight - 30)) {
        posvalida = false
    }


    if (numminas > 0 && posvalida == true) {
        numminas -= 1
        cam.innerHTML = numminas

        var mina = document.createElement("div")
        mina.className = "minas1"

        var masX = bola.style.width
        masX = masX.split('px')
        masX = masX[0]
        masX = parseInt(masX)
        masX = masX / 2

        var masY = bola.style.height
        masY = masY.split('px')
        masY = masY[0]
        masY = parseInt(masY)
        masY = masY / 2

        masX = masX - 10
        masY = masY - 10

        mina.style.left = posX + masX + "px"
        mina.style.top = posY + masY + "px"
        mina.style.height = "20px"
        mina.style.width = "20px"
        mina.activa = true
        mina.anima = 0

        res.appendChild(mina)


    }
    else {
        contaanim1 = 10
        alertavalas()
    }
}





//arma tipo vals
var numvalas = 100
function disparar() {
    var res = document.getElementById("recibe")
    var vala = document.createElement("div")
    vala.className = "valas"

    var h = 5;
    var w = 5;

    var masX = bola.style.width
    masX = masX.split('px')
    masX = masX[0]
    masX = parseInt(masX)
    masX = masX / 2

    var masY = bola.style.height
    masY = masY.split('px')
    masY = masY[0]
    masY = parseInt(masY)
    masY = masY / 2

    var sumX = 0
    var sumY = 0
    if (abadis == true) {
        vala.ab = true
        vala.ar = false

        sumX = parseInt(masX)
        sumY = parseInt(masY * 2)
    }
    if (arrdis == true) {
        vala.ab = false
        vala.ar = true

        sumX = parseInt(masX)
    }

    if (derdis == true) {
        vala.de = true
        vala.iz = false

        sumX = parseInt(masX * 2)
        sumY = parseInt(masY)
    }

    if (izqdis == true) {
        vala.de = false
        vala.iz = true

        sumY = parseInt(masY)
    }

    var posvX = posX + sumX
    var posvY = posY + sumY

    vala.x = posvX
    vala.y = posvY
    vala.mortal = false
    vala.activa = true
    vala.style.height = h + "px"
    vala.style.width = w + "px"
    vala.style.top = posvY + "px"
    vala.style.left = posvX + "px"
    vala.creador = "jugador1"



    numvalas -= 1
    if (numvalas >= 0) {
        sonido("warj/disparo.mp3")
        res.appendChild(vala)
        var numv = document.getElementById("numarma1")
        numv.innerHTML = numvalas
    }
    else {
        contaanim1 = 10
        alertavalas()
    }


}

var contaanim1 = 0
function alertavalas() {
    var cam = document.getElementById("numarma1")
    if (contaanim1 % 2 == 0) {
        cam.style.backgroundColor = "red"
    }
    else {
        cam.style.backgroundColor = "rgba(0,204,0,0.6)"
    }
    contaanim1 -= 1
    if (contaanim1 > 0) {
        setTimeout("alertavalas()", 100)
    }
    else {
        cam.style.backgroundColor = "rgba(0,204,0,0.6)"
    }
}





function movervalas() {
    var tod = document.getElementsByClassName("valas")
    fin = tod.length

    for (i = 0; i < fin; i++) {
        var mix = tod[i].x
        var miy = tod[i].y
        if (tod[i].ab == true) {
            miy += 10
            tamy = window.innerHeight - 20
            if (miy > tamy) {
                tamy = miy
                tod[i].ab = false
                tod[i].ar = true
                tod[i].mortal = true
            }
        }
        if (tod[i].ar == true) {
            miy -= 10
            if (miy < mincero) {
                miy = mincero
                tod[i].ab = true
                tod[i].ar = false
                tod[i].mortal = true
            }
        }
        if (tod[i].de == true) {
            mix += 10
            tamx = window.innerWidth - 20
            if (mix > tamx) {
                mix = tamx
                tod[i].de = false
                tod[i].iz = true
                tod[i].mortal = true
            }
        }
        if (tod[i].iz == true) {
            mix -= 10

            if (mix < 0) {
                mix = 0
                tod[i].de = true
                tod[i].iz = false
                tod[i].mortal = true
            }
        }

        if (tod[i].activa == true) {
            tod[i].x = mix
            tod[i].y = miy
            tod[i].style.top = miy + "px"
            tod[i].style.left = mix + "px"
        }

    }

    var cam = document.getElementById("bola")

    var bx = cam.style.width
    bx = bx.split('px')
    bx = bx[0]
    masenX = bx

    var by = cam.style.height
    by = by.split('px')
    by = by[0]
    masenY = by

    masenX = parseInt(masenX)
    masenY = parseInt(masenY)


    masenX += posX
    masenY += posY



    erir(posX, posY, masenX, masenY)

    var cam = document.getElementById("bola2")

    var bx = cam.style.width
    bx = bx.split('px')
    bx = bx[0]
    masenX = bx

    var by = cam.style.height
    by = by.split('px')
    by = by[0]
    masenY = by

    masenX = parseInt(masenX)
    masenY = parseInt(masenY)


    masenX += posX2
    masenY += posY2

    erir2(posX2, posY2, masenX, masenY)

    setTimeout("movervalas()", 10)
}








//jugador 2
var tamx2 = 0
var tamy2 = 0
var mincero = 100



var der2 = false
var izq2 = false
var arr2 = false
var aba2 = false








var posX2 = 0
var posY2 = 0
var tiempo2 = 50
var bola2 = ""
var masenX2 = 0
var masenY2 = 0
var incre2 = 15
function mover2() {

    var cam = document.getElementById("bola2")

    var bx = cam.style.width
    bx = bx.split('px')
    bx = bx[0]
    masenX2 = bx

    var by = cam.style.height
    by = by.split('px')
    by = by[0]
    masenY2 = by


    bola2 = cam

    if (der2 == true) {

        posX2 += incre2
    }
    if (izq2 == true) {
        posX2 -= incre2
    }

    if (arr2 == true) {
        posY2 += incre2
    }
    if (aba2 == true) {
        posY2 -= incre2
    }

    if (posY2 < mincero) {
        posY2 = mincero
    }

    tamx2 = window.innerWidth
    tamy2 = window.innerHeight

    if (posY2 > tamy2 - masenY2) {
        posY2 = tamy2 - masenY2
    }

    if (posX2 > tamx2 - masenX2) {
        posX2 = tamx2 - masenX2
    }

    if (posX2 < 0) {
        posX2 = 1
    }

    cam.style.top = posY2 + "px"
    cam.style.left = posX2 + "px"

    masenX2 = parseInt(masenX2)
    masenY2 = parseInt(masenY2)


    masenX2 += posX2
    masenY2 += posY2

    tocarMiBomba2(posX2 - 1, posY2 - 1, masenX2 + 1, masenY2 + 1)
    pisarmina2(posX2, posY2, masenX2, masenY2)
    chocarConBomba2(posX2, posY2, masenX2, masenY2)
    intersepta2(posX2, posY2, masenX2, masenY2)


    setTimeout("mover2()", tiempo2)




}
var numcapturas2 = 0
var poscapturaX2 = window.innerWidth - 43
var poscapturaY2 = 65

function intersepta2(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("otros")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]

        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]


        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            yes = true
            if (fy - 10 >= mincero + 20) {

                tod[i].style.top = fy - 10 + "px"
            }

        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            yes = true
            tamy = window.innerHeight
            if (fy + 10 < tamy - 40) {
                tod[i].style.top = fy + 10 + "px"
            }

        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes = true
            tamx = window.innerWidth
            if (fx + 10 < tamx - 40) {
                tod[i].style.left = fx + 10 + "px"
            }
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            yes = true
            if (fx - 10 > 20) {
                tod[i].style.left = fx - 10 + "px"
            }
        }

        if (yes == true) {

            numcapturas2 += 1
            tod[i].style.left = poscapturaX2 + "px"
            tod[i].style.top = poscapturaY2 + "px"
            tod[i].style.zIndex = numcapturas2
            tod[i].style.webkitTransition = "all 0.1s ease-in"
            var camcon = document.getElementById("contacapturas2")
            camcon.innerHTML = numcapturas2
            contarvolas()

            /*var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        	
            tod[i].style.backgroundColor="rgb("+c1+","+c2+","+c3+")"
        	
            var c1=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c2=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
            var c3=Math.floor(Math.random() * (1 + 225 + 1)) + 1;
        	
            tod[i].style.boxShadow="0px 0px 20px rgb("+c1+","+c2+","+c3+")"*/
        }




    }
}



var armas2 = new Array("dbvfdjk", "warj/vala.png", "warj/muestramina2.png", "warj/muestrabomba2.png")

function cambiararma2() {
    arma2 += 1
    if (arma2 > 3) {
        arma2 = 1
    }
    sonido("warj/cambiodearma.mp3")
    imagen2(armas2[arma2])

    var cam = document.getElementById("numarma2")
    if (arma2 == 1) {
        cam.innerHTML = numvalas2
    }
    if (arma2 == 2) {
        cam.innerHTML = numminas2
    }
    if (arma2 == 3) {
        cam.innerHTML = numbombas2
    }
}




var arma2 = 1
function atacar2() {
    if (arma2 == 1) {
        disparar2()
    }

    if (arma2 == 2) {
        sembrarMina2()
    }

    if (arma2 == 3) {
        dejarbomba2()
    }
}

//arma tipo bomba
var numbombas2 = 5

function dejarbomba2() {

    var cam = document.getElementById("numarma2")
    var res = document.getElementById("recibe")

    var posvalida = true

    if ((posX2 > window.innerWidth - 130) || (posY2 > window.innerHeight - 130) || (posY2 < 200)) {
        posvalida = false
    }


    if (numbombas2 > 0 && posvalida == true) {
        numbombas2 -= 1
        cam.innerHTML = numbombas2

        var bomba = document.createElement("div")
        bomba.className = "bombas2"
        bomba.style.left = posX2 + "px"
        bomba.style.top = posY2 + "px"
        bomba.style.height = "30px"
        bomba.style.width = "30px"
        bomba.activa = true
        bomba.anima = 0
        bomba.numero = numbombas2
        bomba.id = "mibomba2" + numbombas2
        bomba.pX = posX2
        bomba.pY = posY2

        bomba.estayada = false
        bomba.izq = false
        bomba.der = false
        bomba.aba = false
        bomba.arr = false
        bomba.activa = false
        setTimeout("activarbomba(" + bomba.id + ")", tiempo2 + 1000)

        var conta = document.createElement("div")
        conta.className = "contabomba2"
        conta.innerHTML = "10"
        conta.id = "contabom2" + numbombas2
        conta.padre = "mibomba2" + numbombas2
        conta.valor = 10
        conta.activa = true

        bomba.appendChild(conta)

        res.appendChild(bomba)
        mensaje2("")

    }
    else {
        if (numbombas2 > 0) {
            mensaje2("No puedes dejar bombas cerca de los bordos")
            contaanim2 = 10
            alertavalas2()
        }
        else {
            contaanim2 = 10
            alertavalas2()
        }

    }
}




var numminas2 = 10;
//arma tipo mina
function sembrarMina2() {
    var cam = document.getElementById("numarma2")
    var res = document.getElementById("recibe")

    var posvalida = true

    if ((posX2 > window.innerWidth - 30) || (posY2 > window.innerHeight - 30)) {
        posvalida = false
    }


    if (numminas2 > 0 && posvalida == true) {
        numminas2 -= 1
        cam.innerHTML = numminas2

        var mina = document.createElement("div")
        mina.className = "minas2"

        var masX = bola2.style.width
        masX = masX.split('px')
        masX = masX[0]
        masX = parseInt(masX)
        masX = masX / 2

        var masY = bola2.style.height
        masY = masY.split('px')
        masY = masY[0]
        masY = parseInt(masY)
        masY = masY / 2

        masX = masX - 10
        masY = masY - 10

        mina.style.left = posX2 + masX + "px"
        mina.style.top = posY2 + masY + "px"
        mina.style.height = "20px"
        mina.style.width = "20px"
        mina.activa = true
        mina.anima = 0

        res.appendChild(mina)


    }
    else {
        contaanim2 = 10
        alertavalas2()
    }
}



var numvalas2 = 100
function disparar2() {
    var res = document.getElementById("recibe")
    var vala = document.createElement("div")
    vala.className = "valas"

    var h = 5;
    var w = 5;

    var masX = bola2.style.width
    masX = masX.split('px')
    masX = masX[0]
    masX = parseInt(masX)
    masX = masX / 2

    var masY = bola.style.height
    masY = masY.split('px')
    masY = masY[0]
    masY = parseInt(masY)
    masY = masY / 2

    var sumX = 0
    var sumY = 0

    if (abadis2 == true) {
        vala.ab = true
        vala.ar = false
        sumX = parseInt(masX)
        sumY = parseInt(masY * 2)
    }
    if (arrdis2 == true) {
        vala.ab = false
        vala.ar = true
        sumX = parseInt(masX)
    }

    if (derdis2 == true) {
        vala.de = true
        vala.iz = false
        sumY = masenY2
        sumX = parseInt(masX * 2)
        sumY = parseInt(masY)
    }

    if (izqdis2 == true) {
        vala.de = false
        vala.iz = true
        sumY = parseInt(masY)
    }

    var posvX = posX2 + sumX
    var posvY = posY2 + sumY

    vala.x = posvX
    vala.y = posvY
    vala.activa = true
    vala.mortal = false
    vala.style.height = h + "px"
    vala.style.width = w + "px"
    vala.style.top = posvY + "px"
    vala.style.left = posvX + "px"
    vala.creador = "jugador2"

    numvalas2 -= 1
    if (numvalas2 >= 0) {
        sonido("warj/disparo.mp3")
        res.appendChild(vala)
        var numv = document.getElementById("numarma2")
        numv.innerHTML = numvalas2
    }
    else {
        contaanim2 = 10
        alertavalas2()
    }

}


var contaanim2 = 0
function alertavalas2() {
    var cam = document.getElementById("numarma2")
    if (contaanim2 % 2 == 0) {
        cam.style.backgroundColor = "red"
    }
    else {
        cam.style.backgroundColor = "rgba(153,102,204,1)"
    }
    contaanim2 -= 1
    if (contaanim2 > 0) {
        setTimeout("alertavalas2()", 100)
    }
    else {
        cam.style.backgroundColor = "rgba(153,102,204,1)"
    }
}


var vidas2 = 10
function erir2(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("valas")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]

        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]


        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            if (tod[i].mortal == true) {
                yes = true
            }
            else {
                if (tod[i].creador == "jugador1") {
                    yes = true
                }
            }
        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            if (tod[i].mortal == true) {
                yes = true
            }
            else {
                if (tod[i].creador == "jugador1") {
                    yes = true
                }
            }
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            if (tod[i].mortal == true) {
                yes = true
            }
            else {
                if (tod[i].creador == "jugador1") {
                    yes = true
                }
            }
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            if (tod[i].mortal == true) {
                yes = true
            }
            else {
                if (tod[i].creador == "jugador1") {
                    yes = true
                }
            }
        }

        if (yes == true && bola2.inmune == false) {
            medieron2()
            tod[i].style.left = "-30px"
            tod[i].style.top = "-30px"
            tod[i].activa = false
            tod[i].ab = false
            tod[i].ar = false
            tod[i].de = false
            tod[i].iz = false
            tod[i].mortal = false

        }

    }

}


function pisarmina2(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("minas1")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]



        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]



        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes2 = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            yes2 = true
        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            yes2 = true
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes2 = true
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            yes2 = true
        }

        if (yes2 == true && bola2.inmune == false) {
            tod[i].style.left = "-40px"
            tod[i].style.top = "-40px"
            tod[i].activa = false
            sonido("warj/pisamina.mp3")
            medieron2()
            explocion(mix, miy)
        }




    }
}


function tocarMiBomba2(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("bombas2")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]

        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]


        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes = false



        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            if (tod[i].activa == true) {
                yes = true
            }
        }


        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            if (tod[i].activa == true) {
                yes = true
            }
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            if (tod[i].activa == true) {
                yes = true
            }
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            if (tod[i].activa == true) {
                yes = true
            }
        }

        if (yes == true) {
            tod[i].der = der2
            tod[i].izq = izq2
            tod[i].aba = arr2
            tod[i].arr = aba2
            tod[i].activa = false
            setTimeout("activarbomba(" + tod[i].id + ")", tiempo2 + 1000)
        }




    }

}


function chocarConBomba2(mix, miy, meX, meY) {
    var tod = document.getElementsByClassName("llama1")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]



        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]



        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes2 = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            yes2 = true
        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            yes2 = true
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes2 = true
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            yes2 = true
        }

        if (yes2 == true && bola2.inmune == false && tod[i].creador == "jugador1") {
            sonido("warj/quemar2.mp3")
            medieron2()
            explocion(mix, miy)
        }




    }


    var tod = document.getElementsByClassName("llama2")
    fin = tod.length
    for (i = 0; i < fin; i++) {

        mx = tod[i].style.left
        mx = mx.split('px')
        fx = mx[0]



        my = tod[i].style.top
        my = my.split('px')
        fy = my[0]



        tx = tod[i].style.width
        tx = tx.split('px')
        ftx = tx[0]

        ty = tod[i].style.height

        ty = ty.split('px')
        fty = ty[0]

        fy = parseInt(fy)
        fty = parseInt(fty)
        fty = parseInt(fty + fy)

        fx = parseInt(fx)
        ftx = parseInt(ftx)
        ftx = parseInt(ftx + fx)

        var yes2 = false

        //intercepcion por debajo
        if (miy <= fty && miy >= fy && ((mix >= fx && mix <= ftx) || (meX >= fx && mix <= ftx) || (mix >= fx && meX <= ftx) || (meX >= fx && meX <= ftx))) {
            yes2 = true
        }

        //intercepcion por encima
        if (meY >= fy && meY <= fty && ((fx <= meX && fx >= mix) || (ftx <= meX && ftx >= mix))) {
            yes2 = true
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes2 = true
        }

        //intercepcion por la derecha
        if (mix <= ftx && mix >= fx && ((miy >= fy && miy <= fty) || (meY >= fy && miy <= fty) || (miy >= fy && meY <= fty) || (meY >= fy && meY <= fty))) {
            yes2 = true
        }

        if (yes2 == true && bola2.inmune == false && tod[i].creador == "jugador1") {
            sonido("warj/quemar2.mp3")
            medieron2()
            explocion(mix, miy)
        }




    }

}



function medieron2() {
    bola2.inmune = true
    aninmun2 = 20
    color2 = bola2.style.backgroundColor
    inmunidad2()
    vidas2 -= 1
    if (vidas2 > 0) {
        var convid = document.getElementById("contenvidas2")
        convid.innerHTML = ""
        for (j = 1; j <= vidas2; j++) {
            convid.innerHTML += "<div class='vidas2'></div>"
        }
    }
    else {
        gansdor1()
    }
}

var aninmun2 = 0
var color2
function inmunidad2() {
    if (aninmun2 % 2 == 0) {
        bola2.style.backgroundColor = "black"
        bola2.style.color = "black"
    }
    else {
        bola2.style.backgroundColor = color2
        bola2.style.color = color2
    }

    aninmun2 -= 1
    if (aninmun2 > 0) {
        setTimeout("inmunidad2()", 100)
    }
    else {
        bola2.inmune = false
        bola2.style.backgroundColor = color2
        bola2.style.color = color2
    }
}



function initGame(gameIdParam){
    userType=1;
    createGameScreen(gameIdParam);
    initCommon(gameIdParam);
    
}

function initCommon(gameIdParam){
    gameId=gameIdParam;
    $("#inicio").hide();
    $("#game").show();
    document.onkeyup = gameKeyUp;
    document.onkeypress = gameKeyPress
    mover()
    mover2()
    movervalas()
    animaminas()
    moverbombas()
    conteodeBombas()
    crecerllama()
    quitarLlama()

    w = window.innerWidth - 10
    h = window.innerHeight - 10
    $("#game").css({width:w + "px", height:h + "px"});
}

function initGame2(gameIdParam,data){
    userType=2;
    createUsers();
    drawBalls(data.balls);
    initCommon(gameIdParam);
}





