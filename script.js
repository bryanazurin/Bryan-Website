const button = document.getElementById("hello-btn");
const message = document.getElementById("greeting-message");

button.addEventListener("click", function() {
  if (message .textContent === "") {
    message.textContent = "Thanks for visiting my page!";
  } else {
    message.textContent = "";
  }
});


const waveHand = document.querySelector('.wave');
let angle = 0;

function animateWave() {
  angle += 0.08; // Controls waving speed (higher = faster)
  const rotation = Math.sin(angle) * 30; // Controls wave angle
  waveHand.style.transform = `rotate(${rotation}deg)`;
  requestAnimationFrame(animateWave);
}

animateWave();


const nextArrow = document.querySelector('.next-arrow');

if (nextArrow) {
  nextArrow.addEventListener('click', function(event) {
    event.preventDefault(); // Stops the page from changing immediately
    const destination = this.href; // Saves "fc.html"
    let position = 0;
    let opacity = 1;

    function shootArrow() {
      position += 6; // Speed of the arrow shooting right
      opacity -= 0.06; // Fades out as it shoots away
      nextArrow.style.transform = `translateX(${position}px)`;
      nextArrow.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(shootArrow);
      } else {
        window.location.href = destination; // Opens fc.html after shooting
      }
    }

    shootArrow();
  });
}

// Resets the arrow if the visitor clicks the browser's Back button
window.addEventListener('pageshow', function() {
  if (nextArrow) {
    nextArrow.style.transform = 'translateX(0px)';
    nextArrow.style.opacity = '1';
  }

const stickmanBody = document.querySelector('.stickman-body');
const stickmanArm = document.querySelector('.stickman-arm');
let sneakTimer = 0;

function animateStickman() {
  if (stickmanBody && stickmanArm) {
    sneakTimer += 0.012;

    // Controls peeking in and out smoothly (-1 to 1)
    const peekCycle = Math.sin(sneakTimer);
    const slideX = peekCycle > 0 ? 0 : peekCycle * 22; // Hides behind photo on negative cycle
    const tiltBody = peekCycle > 0 ? -8 : 12;

    stickmanBody.style.transform = `translateX(${slideX}px) rotate(${tiltBody}deg)`;
    stickmanBody.style.transformOrigin = '50px 65px';

    // Waves the arm quickly while peeking out
    const armWave = Math.sin(sneakTimer * 12) * 20;
    stickmanArm.style.transform = `rotate(${armWave}deg)`;
    stickmanArm.style.transformOrigin = '41px 40px';
  }
  requestAnimationFrame(animateStickman);
}

animateStickman();

});









