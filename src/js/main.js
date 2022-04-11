console.log('hello');
import kaboom from 'kaboom';

// var canva = document.querrySelctorAll('canvas');
// console.log(canva);
// canva[1].style.display="none";

kaboom({
    //global: false,
    canvas: document.querySelector('#canvas2'),
    background: [0, 0, 0, 0.0],
    fullscreen: false,
    width: 600,
    height: 300,
    scale: 2,
    debug: true

});


/// les sprites 

loadSprite('neo', 'neo.png', {
    x: 0,
    y: 0,
    width: 128,
    height: 32,
    sliceX: 4,
    anims: {
        'walk': { from: 0, to: 3, loop: true, speed: 15 }
    }
});

loadSprite('sol1', 'solMatrixProject__01.png');
loadSprite('sol2', 'MatrixSpriteFloor__02.png');
loadSprite('floor', 'floor.png');
loadSprite('solBig', 'MatrixSolBig.png');
loadSprite('cable1', 'MatrixSpriteFloorCable__01.png');
loadSprite('cable1', 'MatrixFloorCable__02.png');

const FLOOR_HEIGHT = 32;
const JUMP_FORCE = 720;
const JUMP_FORCE_SMALL = 420;
const SPEED = 300;

var nbPlayer = 0;


/// scene d'intro

scene('start', () => {

    area({ cursor: "auto", }),

        add([

            //rect(width(), 20),
            sprite('floor'),
            outline(1),
            pos(0, height() - 32),
            area(),
            solid(),
            // color(0, 240, 0),
            opacity(0.8)
        ]);

    add([
        text('Bienvenu dans le Matrix Game', {
            size: 28,

        }),
        origin('center'),
        pos(width() / 2, 40)
    ]);

    const btnStart = add([
        text('Rentre dans la matrice!', {
            size: 18
        }),
        pos(width() / 2 - 120, 220),
        area({ cursor: "pointer", }),
        'btn'

    ])

    btnStart.onUpdate(() => {
        if (btnStart.isHovering()) {
            btnStart.color = rgb(0, 240, 0)

        } else {
            btnStart.color = rgb()
        }
    })

    add([
        rect(300, 60, { radius: 6 }),
        pos(width() / 4, 120),
        color(98, 187, 113),
        opacity(0.8),
        outline(6 , {color: (0, 0,255)})


    ])
    add([
        text('Rentre ton pseudo : ', {
            size: 16
        }),
        pos(width() / 4 + 10, 130),

    ])
    const input = add([
        text('|', {
            size: 16,

        }),
        area(),
        pos(width() / 4 + 10, 150),
        'input1'
    ])
    onClick('input1', () => {
        input.text = ''
    })
    onCharInput((ch) => {
        input.text += ch
    })
    if (nbPlayer > 0) {
        console.log(nbPlayer);
    }
    onKeyPress('enter', () => {
        if (input.text != "|") {
            go('neoGame')
            let nameVar = input.text.slice(1)
            localStorage.setItem('name' + nbPlayer, nameVar)
        }
    });
    onClick('btn', () => {
        if (input.text != "|") {
            go('neoGame')
            let nameVar = input.text.slice(1)
            localStorage.setItem('name' + nbPlayer, nameVar)
        }
    })

    /*** add un input pour le pseudo avec kaboom  */

});







/************************ */
/// scene de jeu
scene("neoGame", () => {


    gravity(2200)

    // le joueur son intégration
    const player = add([
        sprite('neo'),
        body(),
        area(),
        solid(),
        pos(80, 20),
        origin('botleft'),
        scale(1.2)
    ]);

    // le sol
    add([

        //rect(width(), 20),
        sprite('floor'),
        outline(1),
        pos(0, height() - 32),
        area(),
        solid(),
        // color(0, 240, 0),
        opacity(0.8)
    ]);

    // action du joueur 
    let i = 0;
    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE)
            i = 0;
        } else {

            console.log(i);
            if (i < 3) {
                player.jump(JUMP_FORCE_SMALL)
                console.log(i);
                i++
            } else if (i == 3) {
                i = 0;
                console.log(i);
            }

        }
    }

    onKeyPress('space', () => {
        jump()
    });
    onClick(() => {
        jump()
    })

    player.onCollide('boxee', () => {
        go('lose', score),
            burp()

    })

    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(24, 24),
        scale(0.5)
    ]);

    onUpdate(() => {
        score++,
            scoreLabel.text = score
    })
    /// Les box et leur apparitions 

    function spanBox() {

        // creation de la box
        let alphaText;
        if (rand(32, 96) < 70) {
            alphaText = 'sol2'
        } else {
            alphaText = 'solBig'
        }
        add([

            rect(32, rand(32, 96)),
            console.log(rand(32, 96)),
            sprite(alphaText),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            origin('botleft'),
            color(150, 150, 60),
            move(LEFT, SPEED),
            cleanup(),
            'boxee'
        ]);

        //temps de respawn des boxees
        wait(rand(0.3, 1.5), spanBox)

    }

    spanBox();



});




/************************ */
// scene de fin la loose

scene('lose', (score) => {

    add([
        text(score),
        pos(width() / 2, height() / 2 - 60),
        scale(1.5),
        origin('center')
    ])
    add([
        text('Press space for restart'),
        pos(width() / 2, height() / 2),
        origin('center'),
        scale(0.4)
    ])

    const restartName = add([
        text('Change de joueur', {
            size: 18
        }),
        pos(width() / 2 - 90, 260),
        area(),
        'btn'
    ])
    restartName.onUpdate(() => {
        if (restartName.isHovering()) {
            restartName.color = rgb(0, 240, 0)
        } else {
            restartName.color = rgb()
        }
    })
    let io = 0;
    wait(0.5, () => {
        onKeyPress('space', () => {
           go('neoGame');
        })

       
    })
    onClick('btn', () => {
        nbPlayer++;
        // newSpan.textContent = localStorage.getItem('score') + ' pts'
        // newP.textContent = localStorage.getItem('name' + nbPlayer) + ' : ';
        // newP.appendChild(newSpan)
        // newLi.appendChild(newP);
        // newLi.classList.add('sect__el');
        go('start')
    })
    localStorage.setItem('score', score)
    var newLi = document.createElement('li');
    let newP = document.createElement('p');
    let newSpan = document.createElement('span');
    // newLi.textContent = localStorage.getItem('name'+nbPlayer) +' :'+ localStorage.getItem('score')+' pts';

    // if (document.querySelectorAll('.sect__el').length === 0) {
    //     newSpan.textContent = localStorage.getItem('score') + ' pts'
    //     newP.textContent = localStorage.getItem('name' + nbPlayer) + ' : ';
    //     newP.appendChild(newSpan)
    //     newLi.appendChild(newP);
    //     newLi.classList.add('sect__el');
    // } else {
    //     if (keyPress('space')) {
    //         document.querySelector('.sect__el p span').innerHTML = localStorage.getItem('score') + ' pts';
    //         console.log(localStorage.getItem('name' + nbPlayer).slice(-1));
    //     } else {
    //         onClick('btn', () => {
    //             newSpan.textContent = localStorage.getItem('score') + ' pts'
    //             newP.textContent = localStorage.getItem('name' + nbPlayer) + ' : ';
    //             newP.appendChild(newSpan)
    //             newLi.appendChild(newP);
    //             newLi.classList.add('sect__el');
    //         })
    //         /// ne va aps 

    //     }

    // }
    // var allEl = document.querySelectorAll('.sect__el');
    // let io = 0;
    // if (io === 0) {
    //     io++
    //     newSpan.textContent = localStorage.getItem('score') + ' pts';
    //     newP.textContent = localStorage.getItem('name' + nbPlayer) + ' : ';
    //     newP.appendChild(newSpan)
    //     newLi.appendChild(newP);
    //     newLi.classList.add('sect__el');
    //     document.querySelector('.sect__list').append(newLi);
    //     console.log(io);
        
    // } else if(io > 1){
    //         console.log('coucou');
    //     onUpdate(() => {
    //         var allEl = document.querySelectorAll('.sect__el');
    //         document.querrySelctor('.sect__list').removeChild(allEl[0]);
    //         // if (isKeyDown("space")) {
    //         //     console.log('okk');
    //         //     let el = allEl[allEl.length - 1];
    //         //     el.innerHTML = localStorage.getItem('score') + ' pts' + ' pute';
    //         //     // document.querySelectorAll('.sect__el').lastElementChild
    //         //     // document.querySelector('.sect__el p span').innerHTML = localStorage.getItem('score') + ' pts';
    //         //     console.log(localStorage.getItem('name' + nbPlayer).slice(-1));
    //         // }
    //     })
    // }
    //     // onUpdate(() => {
    //     //     var allEl = document.querySelectorAll('.sect__el');
    //     //     document.querrySelctor('.sect__list').removeChild(allEl[0]);
    //     //     if (isKeyDown("space")) {
    //     //         console.log(allEl[allEl.length - 1]);
    //     //         let el = allEl[allEl.length - 1];
    //     //         el.innerHTML = localStorage.getItem('score') + ' pts' + ' pute';
    //     //         // document.querySelectorAll('.sect__el').lastElementChild
    //     //         // document.querySelector('.sect__el p span').innerHTML = localStorage.getItem('score') + ' pts';
    //     //         console.log(localStorage.getItem('name' + nbPlayer).slice(-1));
    //     //     }
    //     // })
    

    // onKeyPress('enter', () => {
    //     console.log(allEl[0]);
    //     let el = allEl[allEl.length - 1];
    //     el.innerHTML = localStorage.getItem('score') + ' pts';
    //     // document.querySelectorAll('.sect__el').lastElementChild
    //     // document.querySelector('.sect__el p span').innerHTML = localStorage.getItem('score') + ' pts';
    //     console.log(localStorage.getItem('name' + nbPlayer).slice(-1));
    // })
    newSpan.textContent = localStorage.getItem('score') + ' pts';
    newP.textContent = localStorage.getItem('name' + nbPlayer) + ' : ';
    newP.appendChild(newSpan)
    newLi.appendChild(newP);
    newLi.classList.add('sect__el');
    document.querySelector('.sect__list').append(newLi);
    // console.log(allEl[allEl.length - 1].textContent);
    console.log(document.querySelectorAll('.sect__el').length);

})


/// lance le jeux 

// go('neoGame')
go('start')

