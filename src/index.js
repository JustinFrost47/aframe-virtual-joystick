// Import NippleJS
import nipplejs from 'nipplejs';

// Define default values
const defaultJoystickAreaStyle = "position:fixed;display:block;width:50%;height:100%;left:0px;bottom:0px;background-color:rgba(0,0,0,0);z-index:20;";
const defaultTextOverlayStyle = "position:fixed;bottom:0px; left:0px;margin-top:99%;font-size:12px Roboto; opacity:.3;";
const defaultTextContent = "";
const defaultSpeedCoeff = 50;

let moveData = "";



// Joystick initialization function
function createJoystick(joystickAreaStyle, textOverlayStyle, textContent, speedCoeff) {
  // Initialize joystick area element
  const d = document.createElement("div");
  d.setAttribute("id", "np");
  d.setAttribute("style", joystickAreaStyle);
  document.body.appendChild(d);

  // Create text overlay
  const p = document.createElement("p");
  p.setAttribute("style", textOverlayStyle);
  p.textContent = textContent;
  d.appendChild(p);

  const options = {
    mode: 'dynamic',
    zone: d,
    color: "#0F0000",
    fadeTime: 10,
  };

  const manager = nipplejs.create(options);
  bindNipple(manager);
}

// Bind NippleJS events
function bindNipple(manager) {
  manager.on('move', (evt, data) => {
    moveData = data;
  });
  manager.on('end', () => {
    moveData = "";
  });
}

// Update camera position based on joystick input
function updatePosition(data, speedCoeff) {
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


export default AFRAME.registerComponent('joystick', {
    schema: {
      joystickAreaStyle: { type: 'string', default: defaultJoystickAreaStyle },
      textOverlayStyle: { type: 'string', default: defaultTextOverlayStyle },
      textContent: { type: 'string', default: defaultTextContent },
      speedCoeff: { type: 'number', default: defaultSpeedCoeff }
    },
  
    init: function() {
      console.log("aframe-virtual-joystick initialized");
  
      // Create joystick area
      const joystickAreaStyle = this.data.joystickAreaStyle;
      const textOverlayStyle = this.data.textOverlayStyle;
      const textContent = this.data.textContent;
      const speedCoeff = this.data.speedCoeff;
  
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        createJoystick(joystickAreaStyle, textOverlayStyle, textContent, speedCoeff);
      } else {
        console.log("Touch is not available");
      }
    },
  
    tick: function() {
      if (moveData) {
        updatePosition(moveData, this.data.speedCoeff);
      }
    }
  });