
const bulletVelocity = 5;
var gameId, userType;
var conteo = 60
const mincero = 100
var poscapturaX = 23;
var poscapturaY = 65;
var poscapturaX2 = window.innerWidth - 43;
var poscapturaY2 = 65;
var bombLifeTime=5;
var armas = new Array("dbvfdjk", "warj/vala.png", "warj/muestramina1.png", "warj/muestrabomba1.png");
var armas2 = new Array("dbvfdjk", "warj/vala.png", "warj/muestramina2.png", "warj/muestrabomba2.png");

//jugador 1
var user1={
     arrdis : false,
     derdis : true,
     izqdis : false,
     abadis : false,
     partir1 : 0,
     cadena1 : "",
     mitexto1 : "",
     finttex1 : 0,
     tamx : 0,
     tamy : 0,
     der : false,
     izq : false,
     arr : false,
     aba : false,
     posX : 0,
     posY : 0,
     tiempo : 50,
     bola : "",
     masenX : 0,
     masenY : 0,
     incre : 15,
     numcapturas : 0,
     vidas : 10,
     aninmun : 0,
     color1 : "rgba(0,255,0,1)",
     arma : 1,
     numbombas : 5,
     numminas : 10,
     numvalas : 20,
     contaanim1 : 0,
}


//jugador 2
var user2={
     partir2 : 0,
     cadena2 : "",
     mitexto2 : "",
     finttex2 : 0,
     tamx2 : 0,
     tamy2 : 0,
     der2 : false,
     izq2 : false,
     arr2 : false,
     aba2 : false,
     posX2 : 0,
     posY2 : 0,
     tiempo2 : 50,
     bola2 : "",
     masenX2 : 0,
     masenY2 : 0,
     incre2 : 15,
     numcapturas2 : 0,
     arma2 : 1,
     numbombas2 : 5,
     numminas2 : 10,
     numvalas2 : 20,
     contaanim2 : 0,
     vidas2 : 10,
     aninmun2 : 0,
     color2:"",
     arrdis2 : false,
     derdis2 : false,
     izqdis2 : true,
     abadis2 : false,
}


function gameKeyPress(elEvento) {
    var evento = window.event || elEvento;
    var val = evento.keyCode;
    if(userType==1){
        execKeyPress1(val);
    }
    else{
        execKeyPress2(val);
    }
    notifyUpdateScreen();
}

function execKeyPress1(val){
    if (val == 50) {
        if (user1.tiempo < 0) {
            user1.incre += bulletVelocity
        }
        else {
            user1.tiempo -= bulletVelocity
        }

    }

    if (val == 49) {
        if (user1.incre > 10) {
            user1.incre -= bulletVelocity
        }
        else {
            user1.tiempo += bulletVelocity
        }
    }

    if (val == 32) {
        atacar();
        notificarAtaque();
    }

    if (val == 119) {
        user1.aba = true
        user1.arrdis = true
        user1.abadis = false
    }
    if (val == 97) {
        user1.izq = true
        user1.arrdis = false
        user1.izqdis = true
    }
    if (val == 115) {
        user1.arr = true
        user1.arrdis = false
        user1.abadis = true
    }
    if (val == 100) {
        user1.der = true
        user1.arrdis = true
        user1.izqdis = false
    }
}

function notificarAtaque(){
    let data = { type: "notify-attack", data:{
        gameId: gameId
    } };
    connection.send(JSON.stringify(data));
}

function opponentAttack(){
    if(userType==1){
        atacar2();
    }
    else{
        atacar();
    }
}

function execKeyPress2(val){
    if (val == 50) {
        if (user2.tiempo2 < 0) {
            user2.incre2 += bulletVelocity
        }
        else {
            user2.tiempo2 -= bulletVelocity
        }

    }

    if (val == 49) {
        if (user2.incre2 > 10) {
            user2.incre2 -= bulletVelocity
        }
        else {
            user2.tiempo2 += bulletVelocity
        }
    }
    
    if (val == 32) {
        atacar2();
        notificarAtaque();
    }

    if (val == 119) {
        user2.aba2 = true
        user2.arrdis2 = true
        user2.abadis2 = false
    }
    if (val == 97) {
        user2.izq2 = true
        user2.derdis2 = false
        user2.izqdis2 = true
    }
    if (val == 115) {
        user2.arr2 = true
        user2.arrdis2 = false
        user2.abadis2 = true
    }
    if (val == 100) {
        user2.der2 = true
        user2.derdis2 = true
        user2.izqdis2 = false
    }
}


function gameKeyUp(elEvento) {
    var evento = window.event || elEvento;
    var val = evento.keyCode;
    if(userType==1){
        execKeyUp1(val);
    }
    else{
        execKeyUp2(val);
    }
    notifyUpdateScreen();
}

function notifyUpdateScreen(){
    let data = { type: "update-screen", data:{
        gameId: gameId, 
        html:document.getElementById("game").innerHTML,
        userData:(userType==1)?user1:user2
    } };
    connection.send(JSON.stringify(data));
}

function updateHtml(userData){
    if(userType==1){
        user2=userData;
    }
    else{
        user1=userData;
    }
}

function execKeyUp2(val){

    if (val == 87) {
        user2.aba2 = false
        user2.arrdis2 = true
        user2.derdis2 = false
        user2.izqdis2 = false
        user2.abadis2 = false

    }
    if (val == 65) {
        user2.izq2 = false
        user2.arrdis2 = false
        user2.derdis2 = false
        user2.izqdis2 = true
        user2.abadis2 = false
    }
    if (val == 83) {
        user2.arr2 = false
        user2.arrdis2 = false
        user2.derdis2 = false
        user2.izqdis2 = false
        user2.abadis2 = true
    }
    if (val == 68) {
        user2.der2 = false
        user2.arrdis2 = false
        user2.derdis2 = true
        user2.izqdis2 = false
        user2.abadis2 = false
    }

    if (val == 16) {
        cambiararma2()
    }
}

function execKeyUp1(val){
    if (val == 16) {
        cambiararma()
    }
    if (val == 87) {
        user1.aba = false
        user1.arrdis = true
        user1.arrdis = false
        user1.izqdis = false
        user1.abadis = false
    }
    if (val == 65) {
        user1.izq = false
        user1.arrdis = false
        user1.arrdis = false
        user1.izqdis = true
        user1.abadis = false
    }
    if (val == 83) {
        user1.arr = false
        user1.arrdis = false
        user1.arrdis = false
        user1.izqdis = false
        user1.abadis = true

    }
    if (val == 68) {
        user1.der = false
        user1.arrdis = false
        user1.arrdis = true
        user1.izqdis = false
        user1.abadis = false
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

    user1.tamx = window.innerWidth - 50
    user1.tamy = window.innerHeight - mincero - 50

    user2.posX2 = user1.tamx + 20
    user2.posY2 = user1.tamy + mincero + 20

    bol2.style.left = user1.tamx + 20 + "px"
    bol2.style.top = user1.tamy + mincero + 20 + "px"

    res.appendChild(bol2)
    res.appendChild(bol)
}

function createBalls(){
    let balls=[];
    user1.tamx = window.innerWidth - 50
    user1.tamy = window.innerHeight - mincero - 50
    for (i = 0; i <= 20; i++) {
        var px = Math.floor(Math.random() * (1 + user1.tamx + 1)) + 20;
        var py = Math.floor(Math.random() * (1 + user1.tamy + 1)) + mincero + 20;

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
    self.location = 'index.html'

}

function gansdor1() {
    alert('gano el 1')
    self.location = 'index.html'
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
    var total = user1.numcapturas + user2.numcapturas2
    if (total == 21) {
        if (user1.numcapturas > user2.numcapturas2) {
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

function reparte1() {
    var part = user1.mitexto1.split('')
    var mes = document.getElementById("mimens1")
    if (user1.partir1 < user1.finttex1) {
        user1.cadena1 += part[user1.partir1]
        setTimeout("reparte1()", 100)
    }
    mes.innerHTML = user1.cadena1
    user1.partir1 += 1
}
function mensaje1(tex) {
    document.getElementById("mimens1").innerHTML = ""
    user1.cadena1 = ""
    user1.mitexto1 = ""
    var part = tex.split('')
    var f1 = part.length
    user1.partir1 = 0
    user1.mitexto1 = tex
    user1.finttex1 = f1
    reparte1()
}

function reparte2() {
    var part = user2.mitexto2.split('')
    var mes = document.getElementById("mimens2")
    if (user2.partir2 < user2.finttex2) {
        user2.cadena2 += part[user2.partir2]
        setTimeout("reparte2()", 100)
    }
    mes.innerHTML = user2.cadena2
    user2.partir2 += 1
}

function mensaje2(tex) {
    document.getElementById("mimens2").innerHTML = ""
    user2.mitexto2 = ""
    user2.cadena2 = ""
    var part = tex.split('')
    var f2 = part.length
    user2.partir2 = 0
    user2.mitexto2 = tex
    user2.finttex2 = f2
    reparte2()
}

function Reloj() {
    var cam = document.getElementById("reloj")
    if (conteo > 0) {
        setTimeout("Reloj()", 1000)
    }
    else {
        if (user1.numcapturas > user2.numcapturas2) {
            gansdor1()
        }
        else {
            gansdor2()
        }
    }
    conteo -= 1
    cam.innerHTML = conteo
}

function mover() {

    var cam = document.getElementById("bola")

    var bx = cam.style.width
    bx = bx.split('px')
    bx = bx[0]
    user1.masenX = bx

    var by = cam.style.height
    by = by.split('px')
    by = by[0]
    user1.masenY = by


    user1.bola = cam

    if (user1.der == true) {

        user1.posX += user1.incre
    }
    if (user1.izq == true) {
        user1.posX -= user1.incre
    }

    if (user1.arr == true) {
        user1.posY += user1.incre
    }
    if (user1.aba == true) {
        user1.posY -= user1.incre
    }

    if (user1.posY < mincero) {
        user1.posY = mincero
    }

    user1.tamx = window.innerWidth
    user1.tamy = window.innerHeight

    if (user1.posY > user1.tamy - user1.masenY) {
        user1.posY = user1.tamy - user1.masenY
    }

    if (user1.posX > user1.tamx - user1.masenX) {
        user1.posX = user1.tamx - user1.masenX
    }

    if (user1.posX < 0) {
        user1.posX = 1
    }

    cam.style.top = user1.posY + "px"
    cam.style.left = user1.posX + "px"

    user1.masenX = parseInt(user1.masenX)
    user1.masenY = parseInt(user1.masenY)


    user1.masenX += user1.posX
    user1.masenY += user1.posY

    tocarMiBomba(user1.posX - 1, user1.posY - 1, user1.masenX + 1, user1.masenY - 1)
    pisarmina(user1.posX, user1.posY, user1.masenX, user1.masenY)
    chocarConBomba(user1.posX, user1.posY, user1.masenX, user1.masenY)
    intersepta(user1.posX, user1.posY, user1.masenX, user1.masenY)

    setTimeout("mover()", user1.tiempo)




}

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
            user1.tamy = window.innerHeight
            if (fy + 10 < user1.tamy - 40) {
                tod[i].style.top = fy + 10 + "px"
            }
        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes = true
            user1.tamx = window.innerWidth
            if (fx + 10 < user1.tamx - 40) {
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

            user1.numcapturas += 1
            tod[i].style.left = poscapturaX + "px"
            tod[i].style.top = poscapturaY + "px"
            tod[i].style.zIndex = user1.numcapturas
            tod[i].style.webkitTransition = "all 0.1s ease-in"
            var camcon = document.getElementById("contacapturas1")
            camcon.innerHTML = user1.numcapturas
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

function erir(mix, miy, meX, meY) {
    setUser1Ball();
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

        if (yes == true && user1.bola.inmune == false) {
            erirUser1(tod[i].id);
            let data = { type: "user-hurted", data:{
                gameId: gameId, 
                userType:1,
                shotId:tod[i].id
            } };
            connection.send(JSON.stringify(data));
        }

    }

}

function erirUser1(shotId){
    let shot=document.getElementById(shotId);
    if(shot){
        medieron()
        shot.style.left = "-30px"
        shot.style.top = "-30px"
        shot.activa = false
        shot.ab = false
        shot.ar = false
        shot.de = false
        shot.iz = false
        shot.mortal = false
    }
}

function pisarmina(mix, miy, meX, meY) {
    setUser1Ball();
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

        if (yes2 == true && user1.bola.inmune == false) {
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
            tod[i].der = user1.der
            tod[i].izq = user1.izq
            tod[i].aba = user1.arr
            tod[i].arr = user1.aba
            tod[i].activa = false
            setTimeout("activarbomba(" + tod[i].id + ")", user1.tiempo + 1000)
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
    setUser1Ball();
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

        if (yes2 == true && user1.bola.inmune == false && tod[i].creador == "jugador2") {
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

        if (yes2 == true && user1.bola.inmune == false && tod[i].creador == "jugador2") {
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
    setUser1Ball();
    user1.bola.inmune = true
    user1.aninmun = 20
    user1.color1 = user1.bola.style.backgroundColor
    inmunidad1()
    user1.vidas -= 1
    if (user1.vidas > 0) {
        var convid = document.getElementById("contenvidas1")
        convid.innerHTML = ""
        for (j = 1; j <= user1.vidas; j++) {
            convid.innerHTML += "<div class='vidas1'></div>"
        }
    }
    else {
        gansdor2()
    }
}

function setUser1Ball(){
    if(!(user1.bola && user1.bola.style)){
        user1.bola=document.getElementById("bola");
    }
}

function setUser2Ball(){
    if(!(user2.bola2 && user2.bola2.style)){
        user2.bola2=document.getElementById("bola2");
    }
}

function inmunidad1() {
    setUser1Ball();
    if (user1.aninmun % 2 == 0) {
        user1.bola.style.backgroundColor = "black"
        user1.bola.style.color = "black"
    }
    else {
        user1.bola.style.backgroundColor = user1.color1
        user1.bola.style.color = user1.color1
    }

    user1.aninmun -= 1
    if (user1.aninmun > 0) {
        setTimeout("inmunidad1()", 100)
    }
    else {
        user1.bola.inmune = false
        user1.bola.style.backgroundColor = user1.color1
        user1.bola.style.color = user1.color1
    }
}

function cambiararma() {
    user1.arma += 1
    if (user1.arma > 3) {
        user1.arma = 1
    }
    sonido("warj/cambiodearma.mp3")
    imagen1(armas[user1.arma])

    var cam = document.getElementById("numarma1")
    if (user1.arma == 1) {
        cam.innerHTML = user1.numvalas
    }
    if (user1.arma == 2) {
        cam.innerHTML = user1.numminas
    }
    if (user1.arma == 3) {
        cam.innerHTML = user1.numbombas
    }
}

function atacar() {

    if (user1.arma == 1) {
        disparar()
    }

    if (user1.arma == 2) {
        sembrarMina()
    }

    if (user1.arma == 3) {
        dejarbomba()
    }
}

//arma tipo bomba
function dejarbomba() {
    var cam = document.getElementById("numarma1")
    var res = document.getElementById("recibe")

    var posvalida = true

    if ((user1.posX > window.innerWidth - 130) || (user1.posY > window.innerHeight - 130) || (user1.posY < 200)) {
        posvalida = false
    }


    if (user1.numbombas > 0 && posvalida == true) {
        user1.numbombas -= 1
        cam.innerHTML = user1.numbombas

        var bomba = document.createElement("div")
        bomba.className = "bombas1"
        bomba.style.left = user1.posX + "px"
        bomba.style.top = user1.posY + "px"
        bomba.style.height = "30px"
        bomba.style.width = "30px"
        bomba.activa = true
        bomba.anima = 0
        bomba.numero = user1.numbombas
        bomba.id = "mibomba1" + user1.numbombas
        bomba.pX = user1.posX
        bomba.pY = user1.posY
        bomba.estayada = false
        bomba.izq = false
        bomba.der = false
        bomba.aba = false
        bomba.arr = false
        bomba.activa = false
        setTimeout("activarbomba(" + bomba.id + ")", user1.tiempo + 1000)

        var conta = document.createElement("div")
        conta.className = "contabomba1"
        conta.innerHTML = bombLifeTime;
        conta.id = "contabom" + user1.numbombas
        conta.padre = "mibomba1" + user1.numbombas
        conta.valor = bombLifeTime;
        conta.activa = true

        bomba.appendChild(conta)

        res.appendChild(bomba)
        mensaje1("")

    }
    else {
        if (user1.numbombas > 0) {
            mensaje1("No puedes dejar bombas cerca de los bordos")
            user1.contaanim1 = 10
            alertavalas()
        }
        else {
            user1.contaanim1 = 10
            alertavalas()
        }

    }
}

//arma tipo mina
function sembrarMina() {
    setUser1Ball();
    var cam = document.getElementById("numarma1")
    var res = document.getElementById("recibe")

    var posvalida = true

    if ((user1.posX > window.innerWidth - 30) || (user1.posY > window.innerHeight - 30)) {
        posvalida = false
    }


    if (user1.numminas > 0 && posvalida == true) {
        user1.numminas -= 1
        cam.innerHTML = user1.numminas

        var mina = document.createElement("div")
        mina.className = "minas1"

        var masX = user1.bola.style.width
        masX = masX.split('px')
        masX = masX[0]
        masX = parseInt(masX)
        masX = masX / 2

        var masY = user1.bola.style.height
        masY = masY.split('px')
        masY = masY[0]
        masY = parseInt(masY)
        masY = masY / 2

        masX = masX - 10
        masY = masY - 10

        mina.style.left = user1.posX + masX + "px"
        mina.style.top = user1.posY + masY + "px"
        mina.style.height = "20px"
        mina.style.width = "20px"
        mina.activa = true
        mina.anima = 0

        res.appendChild(mina)


    }
    else {
        user1.contaanim1 = 10
        alertavalas()
    }
}

//arma tipo vals
function disparar() {
    setUser1Ball();
    var res = document.getElementById("recibe")
    var vala = document.createElement("div")
    vala.className = "valas"
    vala.id="user-1-vala"+user1.numvalas;

    var h = 5;
    var w = 5;

    var masX = user1.bola.style.width
    masX = masX.split('px')
    masX = masX[0]
    masX = parseInt(masX)
    masX = masX / 2

    var masY = user1.bola.style.height
    masY = masY.split('px')
    masY = masY[0]
    masY = parseInt(masY)
    masY = masY / 2

    var sumX = 0
    var sumY = 0
    if (user1.abadis == true) {
        vala.ab = true
        vala.ar = false

        sumX = parseInt(masX)
        sumY = parseInt(masY * 2)
    }
    if (user1.arrdis == true) {
        vala.ab = false
        vala.ar = true

        sumX = parseInt(masX)
    }

    if (user1.arrdis == true) {
        vala.de = true
        vala.iz = false

        sumX = parseInt(masX * 2)
        sumY = parseInt(masY)
    }

    if (user1.izqdis == true) {
        vala.de = false
        vala.iz = true

        sumY = parseInt(masY)
    }

    var posvX = user1.posX + sumX
    var posvY = user1.posY + sumY

    vala.x = posvX
    vala.y = posvY
    vala.mortal = false
    vala.activa = true
    vala.style.height = h + "px"
    vala.style.width = w + "px"
    vala.style.top = posvY + "px"
    vala.style.left = posvX + "px"
    vala.creador = "jugador1"



    user1.numvalas -= 1
    if (user1.numvalas >= 0) {
        sonido("warj/disparo.mp3")
        res.appendChild(vala)
        var numv = document.getElementById("numarma1")
        numv.innerHTML = user1.numvalas
    }
    else {
        user1.contaanim1 = 10
        alertavalas()
    }


}

function alertavalas() {
    var cam = document.getElementById("numarma1")
    if (user1.contaanim1 % 2 == 0) {
        cam.style.backgroundColor = "red"
    }
    else {
        cam.style.backgroundColor = "rgba(0,204,0,0.6)"
    }
    user1.contaanim1 -= 1
    if (user1.contaanim1 > 0) {
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
            user1.tamy = window.innerHeight - 20
            if (miy > user1.tamy) {
                user1.tamy = miy
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
            user1.tamx = window.innerWidth - 20
            if (mix > user1.tamx) {
                mix = user1.tamx
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
    user1.masenX = bx

    var by = cam.style.height
    by = by.split('px')
    by = by[0]
    user1.masenY = by

    user1.masenX = parseInt(user1.masenX)
    user1.masenY = parseInt(user1.masenY)


    user1.masenX += user1.posX
    user1.masenY += user1.posY



    erir(user1.posX, user1.posY, user1.masenX, user1.masenY)

    var cam = document.getElementById("bola2")

    var bx = cam.style.width
    bx = bx.split('px')
    bx = bx[0]
    user1.masenX = bx

    var by = cam.style.height
    by = by.split('px')
    by = by[0]
    user1.masenY = by

    user1.masenX = parseInt(user1.masenX)
    user1.masenY = parseInt(user1.masenY)


    user1.masenX += user2.posX2
    user1.masenY += user2.posY2

    erir2(user2.posX2, user2.posY2, user1.masenX, user1.masenY)

    setTimeout("movervalas()", 10)
}

function mover2() {

    var cam = document.getElementById("bola2")

    var bx = cam.style.width
    bx = bx.split('px')
    bx = bx[0]
    user2.masenX2 = bx

    var by = cam.style.height
    by = by.split('px')
    by = by[0]
    user2.masenY2 = by


    user2.bola2 = cam

    if (user2.der2 == true) {

        user2.posX2 += user2.incre2
    }
    if (user2.izq2 == true) {
        user2.posX2 -= user2.incre2
    }

    if (user2.arr2 == true) {
        user2.posY2 += user2.incre2
    }
    if (user2.aba2 == true) {
        user2.posY2 -= user2.incre2
    }

    if (user2.posY2 < mincero) {
        user2.posY2 = mincero
    }

    user2.tamx2 = window.innerWidth
    user2.tamy2 = window.innerHeight

    if (user2.posY2 > user2.tamy2 - user2.masenY2) {
        user2.posY2 = user2.tamy2 - user2.masenY2
    }

    if (user2.posX2 > user2.tamx2 - user2.masenX2) {
        user2.posX2 = user2.tamx2 - user2.masenX2
    }

    if (user2.posX2 < 0) {
        user2.posX2 = 1
    }

    cam.style.top = user2.posY2 + "px"
    cam.style.left = user2.posX2 + "px"

    user2.masenX2 = parseInt(user2.masenX2)
    user2.masenY2 = parseInt(user2.masenY2)


    user2.masenX2 += user2.posX2
    user2.masenY2 += user2.posY2

    tocarMiBomba2(user2.posX2 - 1, user2.posY2 - 1, user2.masenX2 + 1, user2.masenY2 + 1)
    pisarmina2(user2.posX2, user2.posY2, user2.masenX2, user2.masenY2)
    chocarConBomba2(user2.posX2, user2.posY2, user2.masenX2, user2.masenY2)
    intersepta2(user2.posX2, user2.posY2, user2.masenX2, user2.masenY2)


    setTimeout("mover2()", user2.tiempo2)




}

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
            user1.tamy = window.innerHeight
            if (fy + 10 < user1.tamy - 40) {
                tod[i].style.top = fy + 10 + "px"
            }

        }

        //intercepcion por la izquierda
        if (meX >= fx && meX <= ftx && ((fy <= meY && fy >= miy) || (fty <= meY && fty >= miy))) {
            yes = true
            user1.tamx = window.innerWidth
            if (fx + 10 < user1.tamx - 40) {
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

            user2.numcapturas2 += 1
            tod[i].style.left = poscapturaX2 + "px"
            tod[i].style.top = poscapturaY2 + "px"
            tod[i].style.zIndex = user2.numcapturas2
            tod[i].style.webkitTransition = "all 0.1s ease-in"
            var camcon = document.getElementById("contacapturas2")
            camcon.innerHTML = user2.numcapturas2
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

function cambiararma2() {
    user2.arma2 += 1
    if (user2.arma2 > 3) {
        user2.arma2 = 1
    }
    sonido("warj/cambiodearma.mp3")
    imagen2(armas2[user2.arma2])

    var cam = document.getElementById("numarma2")
    if (user2.arma2 == 1) {
        cam.innerHTML = user2.numvalas2
    }
    if (user2.arma2 == 2) {
        cam.innerHTML = user2.numminas2
    }
    if (user2.arma2 == 3) {
        cam.innerHTML = user2.numbombas2
    }
}

function atacar2() {
    if (user2.arma2 == 1) {
        disparar2()
    }

    if (user2.arma2 == 2) {
        sembrarMina2()
    }

    if (user2.arma2 == 3) {
        dejarbomba2()
    }
}

//arma tipo bomba
function dejarbomba2() {

    var cam = document.getElementById("numarma2")
    var res = document.getElementById("recibe")

    var posvalida = true

    if ((user2.posX2 > window.innerWidth - 130) || (user2.posY2 > window.innerHeight - 130) || (user2.posY2 < 200)) {
        posvalida = false
    }


    if (user2.numbombas2 > 0 && posvalida == true) {
        user2.numbombas2 -= 1
        cam.innerHTML = user2.numbombas2

        var bomba = document.createElement("div")
        bomba.className = "bombas2"
        bomba.style.left = user2.posX2 + "px"
        bomba.style.top = user2.posY2 + "px"
        bomba.style.height = "30px"
        bomba.style.width = "30px"
        bomba.activa = true
        bomba.anima = 0
        bomba.numero = user2.numbombas2
        bomba.id = "mibomba2" + user2.numbombas2
        bomba.pX = user2.posX2
        bomba.pY = user2.posY2

        bomba.estayada = false
        bomba.izq = false
        bomba.der = false
        bomba.aba = false
        bomba.arr = false
        bomba.activa = false
        setTimeout("activarbomba(" + bomba.id + ")", user2.tiempo2 + 1000)

        var conta = document.createElement("div")
        conta.className = "contabomba2"
        conta.innerHTML = bombLifeTime;
        conta.id = "contabom2" + user2.numbombas2
        conta.padre = "mibomba2" + user2.numbombas2
        conta.valor = bombLifeTime;
        conta.activa = true

        bomba.appendChild(conta)

        res.appendChild(bomba)
        mensaje2("")

    }
    else {
        if (user2.numbombas2 > 0) {
            mensaje2("No puedes dejar bombas cerca de los bordos")
            user2.contaanim2 = 10
            alertavalas2()
        }
        else {
            user2.contaanim2 = 10
            alertavalas2()
        }

    }
}

function sembrarMina2() {
    setUser2Ball();
    var cam = document.getElementById("numarma2")
    var res = document.getElementById("recibe")

    var posvalida = true

    if ((user2.posX2 > window.innerWidth - 30) || (user2.posY2 > window.innerHeight - 30)) {
        posvalida = false
    }


    if (user2.numminas2 > 0 && posvalida == true) {
        user2.numminas2 -= 1
        cam.innerHTML = user2.numminas2

        var mina = document.createElement("div")
        mina.className = "minas2"

        var masX = user2.bola2.style.width
        masX = masX.split('px')
        masX = masX[0]
        masX = parseInt(masX)
        masX = masX / 2

        var masY = user2.bola2.style.height
        masY = masY.split('px')
        masY = masY[0]
        masY = parseInt(masY)
        masY = masY / 2

        masX = masX - 10
        masY = masY - 10

        mina.style.left = user2.posX2 + masX + "px"
        mina.style.top = user2.posY2 + masY + "px"
        mina.style.height = "20px"
        mina.style.width = "20px"
        mina.activa = true
        mina.anima = 0

        res.appendChild(mina)


    }
    else {
        user2.contaanim2 = 10
        alertavalas2()
    }
}

function disparar2() {
    setUser1Ball();
    setUser2Ball();
    var res = document.getElementById("recibe")
    var vala = document.createElement("div")
    vala.className = "valas";
    vala.id="user-2-vala"+user2.numvalas2;

    var h = 5;
    var w = 5;

    var masX = user2.bola2.style.width
    masX = masX.split('px')
    masX = masX[0]
    masX = parseInt(masX)
    masX = masX / 2

    var masY = user1.bola.style.height
    masY = masY.split('px')
    masY = masY[0]
    masY = parseInt(masY)
    masY = masY / 2

    var sumX = 0
    var sumY = 0

    if (user2.abadis2 == true) {
        vala.ab = true
        vala.ar = false
        sumX = parseInt(masX)
        sumY = parseInt(masY * 2)
    }
    if (user2.arrdis2 == true) {
        vala.ab = false
        vala.ar = true
        sumX = parseInt(masX)
    }

    if (user2.derdis2 == true) {
        vala.de = true
        vala.iz = false
        sumY = user2.masenY2
        sumX = parseInt(masX * 2)
        sumY = parseInt(masY)
    }

    if (user2.izqdis2 == true) {
        vala.de = false
        vala.iz = true
        sumY = parseInt(masY)
    }

    var posvX = user2.posX2 + sumX
    var posvY = user2.posY2 + sumY

    vala.x = posvX
    vala.y = posvY
    vala.activa = true
    vala.mortal = false
    vala.style.height = h + "px"
    vala.style.width = w + "px"
    vala.style.top = posvY + "px"
    vala.style.left = posvX + "px"
    vala.creador = "jugador2"

    user2.numvalas2 -= 1
    if (user2.numvalas2 >= 0) {
        sonido("warj/disparo.mp3")
        res.appendChild(vala)
        var numv = document.getElementById("numarma2")
        numv.innerHTML = user2.numvalas2
    }
    else {
        user2.contaanim2 = 10
        alertavalas2()
    }

}

function alertavalas2() {
    var cam = document.getElementById("numarma2")
    if (user2.contaanim2 % 2 == 0) {
        cam.style.backgroundColor = "red"
    }
    else {
        cam.style.backgroundColor = "rgba(153,102,204,1)"
    }
    user2.contaanim2 -= 1
    if (user2.contaanim2 > 0) {
        setTimeout("alertavalas2()", 100)
    }
    else {
        cam.style.backgroundColor = "rgba(153,102,204,1)"
    }
}

function erir2(mix, miy, meX, meY) {
    setUser2Ball();
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

        if (yes == true && user2.bola2.inmune == false) {
            erirUser2(tod[i].id);
            let data = { type: "user-hurted", data:{
                gameId: gameId, 
                userType:2,
                shotId:tod[i].id
            } };
            connection.send(JSON.stringify(data));
        }

    }

}

function erirUser2(shotId){
    let shot=document.getElementById(shotId);
    if(shot){
        medieron2()
        shot.style.left = "-30px"
        shot.style.top = "-30px"
        shot.activa = false
        shot.ab = false
        shot.ar = false
        shot.de = false
        shot.iz = false
        shot.mortal = false
    }
}

function pisarmina2(mix, miy, meX, meY) {
    setUser2Ball();
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

        if (yes2 == true && user2.bola2.inmune == false) {
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
            tod[i].der = user2.der2
            tod[i].izq = user2.izq2
            tod[i].aba = user2.arr2
            tod[i].arr = user2.aba2
            tod[i].activa = false
            setTimeout("activarbomba(" + tod[i].id + ")", user2.tiempo2 + 1000)
        }




    }

}

function chocarConBomba2(mix, miy, meX, meY) {
    setUser2Ball();
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

        if (yes2 == true && user2.bola2.inmune == false && tod[i].creador == "jugador1") {
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

        if (yes2 == true && user2.bola2.inmune == false && tod[i].creador == "jugador1") {
            sonido("warj/quemar2.mp3")
            medieron2()
            explocion(mix, miy)
        }




    }

}

function medieron2() {
    setUser2Ball();
    user2.bola2.inmune = true
    user2.aninmun2 = 20
    user2.color2 = user2.bola2.style.backgroundColor
    inmunidad2()
    user2.vidas2 -= 1
    if (user2.vidas2 > 0) {
        var convid = document.getElementById("contenvidas2")
        convid.innerHTML = ""
        for (j = 1; j <= user2.vidas2; j++) {
            convid.innerHTML += "<div class='vidas2'></div>"
        }
    }
    else {
        gansdor1()
    }
}

function inmunidad2() {
    setUser2Ball();
    if (user2.aninmun2 % 2 == 0) {
        user2.bola2.style.backgroundColor = "black"
        user2.bola2.style.color = "black"
    }
    else {
        user2.bola2.style.backgroundColor = user2.color2
        user2.bola2.style.color = user2.color2
    }

    user2.aninmun2 -= 1
    if (user2.aninmun2 > 0) {
        setTimeout("inmunidad2()", 100)
    }
    else {
        user2.bola2.inmune = false
        user2.bola2.style.backgroundColor = user2.color2
        user2.bola2.style.color = user2.color2
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





