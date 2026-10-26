const pipe = document.querySelector<HTMLElement>(".pipe");
const mario = document.querySelector<HTMLImageElement>(".mario");
const clouds = document.querySelector<HTMLElement>(".clouds");
const score = document.querySelector<HTMLElement>(".score-text");
const buttonReload = document.querySelector<HTMLElement>(".btn-reload");
const modalGameOver = document.querySelector<HTMLElement>(".modal-game-over");
const gameOverImage = new Image();
gameOverImage.src = "img/game-over.png";
gameOverImage.onload = () => {
    console.log("Dead Mario sprite has been loaded")
}

let pontuation: number = 0;
let pipePassed: boolean = false;

if (score) {
    score.textContent = `${pontuation} pontos`;
}

let lastPipePosition = 0;

const scoreInterval = setInterval(() => {
    if (!pipe || !mario) return;

    const pipePosition = pipe.getBoundingClientRect();
    const marioPosition = mario.getBoundingClientRect();

    if (pipePosition.right < marioPosition.left && !pipePassed) {
        pontuation++;
        pipePassed = true;
        
        if (score) {
            score.textContent = `${pontuation} ${pontuation === 1 ? "ponto" : "pontos"}`;
        }
    }
    if (pipePosition.left > lastPipePosition && pipePosition.left > window.innerWidth - 50) {
        pipePassed = false;
    }

    lastPipePosition = pipePosition.left;
}, 10);

const jump = () => {
    mario?.classList.add("jump");

    setTimeout(() => {
        mario?.classList.remove("jump");
    }, 500);
};

const loop = setInterval(() => {

    if (!pipe || !mario || !clouds || !modalGameOver) {
        return;
    }

    const pipePosition = pipe?.offsetLeft;
    const cloudsPosition = clouds?.offsetLeft;
    const marioPosition: number = parseFloat(window.getComputedStyle(mario).bottom.replace("px", ""));

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 85) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.src = gameOverImage.src;
        mario.style.bottom = `${marioPosition}px`;
        mario.style.width = "85px";
        mario.style.marginLeft = "50px";

        clouds.style.animation = "none";
        clouds.style.left = `${cloudsPosition}px`;
        modalGameOver.style.display = "block";

        clearInterval(scoreInterval);
        clearInterval(loop);

        buttonReload?.addEventListener("click", () => {
            location.reload();
        });
    }
}, 10);

document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.code === "Space") {
        jump();
    }
});

document.addEventListener("pointerdown", () => {
    jump();
});