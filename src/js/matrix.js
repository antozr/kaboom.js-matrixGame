

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient2 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient2.addColorStop(0, 'rgba(0, 255, 0, 0.2)');
gradient2.addColorStop(0.2, 'rgba(0, 240, 0, 0.4)');
gradient2.addColorStop(0.22, 'rgba(255, 0, 0, 1)');
gradient2.addColorStop(0.24, 'rgba(0, 240, 0, 0.8)');
gradient2.addColorStop(0.6, 'rgba(0, 240, 0, 0.99)');
gradient2.addColorStop(0.65, 'rgba(0, 0, 250, 0.1)');
gradient2.addColorStop(0.70, 'rgba(0, 240, 0, 0.8)');
gradient2.addColorStop(1, 'rgba(0, 240, 0, 0.2)');

let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, canvas.width / 2);
gradient.addColorStop(0, 'rgba(0, 240, 0, 1)');
gradient.addColorStop(0.2, 'rgba(0, 240, 0, 0.4)');
gradient.addColorStop(0.4, 'rgba(0, 240, 0, 0.6)');
gradient.addColorStop(0.6, 'rgba(0, 240, 0, 0.8)');
gradient.addColorStop(0.8, 'rgba(0, 240, 0, 0.2)');
gradient.addColorStop(1, 'rgba(0, 240, 0, 0.02)');


class Symbol {
    constructor(x, y, fontSize, canvasHeight) {

        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;

    }
    draw(context) {

        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));

        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }
    #initialize() {

        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();


    }
}

const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 60;
const nextFrame = 1000 / fps;
let timer = 0;


function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient;//'#0aff0a';
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));

        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(0, 240, 0, 1)');
    gradient.addColorStop(0.2, 'rgba(0, 240, 0, 1)');
    gradient.addColorStop(0.4, 'rgba(0, 240, 0, 1)');
    gradient.addColorStop(0.6, 'rgba(0, 240, 0, 0.8)');
    gradient.addColorStop(0.8, 'rgba(0, 240, 0, 1)');
    gradient.addColorStop(1, 'rgba(0, 240, 0, 0.02)');

    gradient2 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient2.addColorStop(0, 'rgba(0, 255, 0, 0.2)');
    gradient2.addColorStop(0.2, 'rgba(0, 240, 0, 0.4)');
    gradient2.addColorStop(0.25, 'rgba(255, 0, 0, 1)');
    gradient2.addColorStop(0.3, 'rgba(0, 240, 0, 0.8)');
    gradient2.addColorStop(0.6, 'rgba(0, 240, 0, 0.99)');
    gradient2.addColorStop(0.65, 'rgba(0, 0, 250, 0.1)');
    gradient2.addColorStop(0.70, 'rgba(0, 240, 0, 0.8)');
    gradient2.addColorStop(1, 'rgba(0, 240, 0, 0.2)');
})



// var red = document.querySelector('.box__red');
// var blue = document.querySelector('.box__blue');

// setTimeout(function(){
//     red.classList.add('animationFull');
//     blue.classList.add('animationFull');
// }, 18000);