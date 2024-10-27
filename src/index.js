// Import NippleJS (ensure you add it as a dependency in package.json)
import nipplejs from 'nipplejs';

const joystickAreaStyle = "position:fixed;display:block;width:50%;height:100%;left:0px;bottom:0px;background-color:rgba(0,0,0,0);z-index:20;";
const textOverlayStyle = "position:fixed;bottom:0px; left:0px;margin-top:99%;font-size:12px Roboto; opacity:.3;";
const speedCoeff = 50

function initJoystick() {
  // Create joystick area element
  const d = document.createElement("div");
  d.setAttribute("id", "np");
  d.setAttribute("style", joystickAreaStyle);
  document.body.appendChild(d);

  // Create text overlay
  const p = document.createElement("p");
  p.setAttribute("style", textOverlayStyle);
  p.textContent = "Drag on Left to move, Right to look around";
  d.appendChild(p);
}

let moveData = "";

function createJoystick() {
  initJoystick();

  const options = {
    mode: 'dynamic',
    zone: document.getElementById('np'),
    color: "#0F0000",
    fadeTime: 10,
  };

  const manager = nipplejs.create(options);
  bindNipple(manager);

  function bindNipple(manager) {
    manager.on('move', (evt, data) => {
      moveData = data;
    });
    manager.on('end', () => {
      moveData = "";
    });
  }
}

function updatePosition(data) {
  const f = data.force;
  const ang = data.angle.radian;
  const cam = document.getElementById("camera");

  const x_vec = Math.cos(ang + (Math.PI / 180) * cam.getAttribute('rotation').y);
  const y_vec = Math.sin(ang + (Math.PI / 180) * cam.getAttribute('rotation').y);

  const x = cam.getAttribute("position").x + (f / speedCoeff) * x_vec;
  const y = cam.getAttribute("position").y;
  const z = cam.getAttribute("position").z - (f / speedCoeff) * y_vec;

  cam.setAttribute("position", `${x} ${y} ${z}`);
}

// Export the A-Frame component
export default AFRAME.registerComponent('joystick', {
  init: function() {
    console.log("aframe-virtual-joystick initialized")
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      createJoystick();
    } else {
      console.log("Touch is not available");
    }
  },
  tick: function() {
    if (moveData) {
      updatePosition(moveData);
    }
  },
});
