// Import NippleJS
import nipplejs from 'nipplejs';

// Default configuration values for joystick appearance and behavior
const defaultJoystickAreaStyle = "position:fixed;display:block;width:50%;height:100%;left:0px;bottom:0px;background-color:rgba(0,0,0,0);z-index:20;";
const defaultTextOverlayStyle = "position:fixed;bottom:0px; left:0px;margin-top:99%;font-size:12px Roboto; opacity:.3;";
const defaultTextContent = "";
const defaultSpeedReductionFactor = 50;

// Variable to hold the current movement data from the joystick
let moveData = "";

/**
 * Initializes the joystick area and text overlay on the page
 * @param {string} joystickAreaStyle - CSS style for the joystick area
 * @param {string} textOverlayStyle - CSS style for the text overlay
 * @param {string} textContent - Text displayed in the overlay
 * @param {number} speedReductionFactor - Factor to reduce movement speed
 */
function createJoystick(joystickAreaStyle, textOverlayStyle, textContent, speedReductionFactor) {
  // Initialize joystick area element
  const joystickArea = document.createElement("div");
  joystickArea.setAttribute("id", "np");
  joystickArea.setAttribute("style", joystickAreaStyle);
  document.body.appendChild(joystickArea);

  // Create and append text overlay for instructions
  const textOverlay = document.createElement("p");
  textOverlay.setAttribute("style", textOverlayStyle);
  textOverlay.textContent = textContent;
  joystickArea.appendChild(textOverlay);

  // Configure joystick options and initialize
  const options = {
    mode: 'dynamic',
    zone: joystickArea,
    color: "#0F0000",
    fadeTime: 10,
  };

  const manager = nipplejs.create(options);
  bindNipple(manager);
}

/**
 * Binds NippleJS joystick events for tracking movement data
 * @param {object} manager - NippleJS manager instance
 */
function bindNipple(manager) {
  // Update movement data on joystick movement
  manager.on('move', (event, data) => {
    moveData = data;
  });

  // Reset movement data when joystick is released
  manager.on('end', () => {
    moveData = "";
  });
}

/**
 * Updates the camera position based on joystick input
 * @param {object} data - Joystick data object containing force and angle
 * @param {number} speedReductionFactor - Factor to reduce movement speed
 */
function updatePosition(data, speedReductionFactor) {
  const force = data.force;
  const angleInRadians = data.angle.radian;
  const camera = document.getElementById("camera");

  // Calculate direction vectors based on camera rotation and joystick angle
  const xVector = Math.cos(angleInRadians + (Math.PI / 180) * camera.getAttribute('rotation').y);
  const yVector = Math.sin(angleInRadians + (Math.PI / 180) * camera.getAttribute('rotation').y);

  // Calculate new position coordinates based on joystick force and speed reduction factor
  const xPosition = camera.getAttribute("position").x + (force / speedReductionFactor) * xVector;
  const yPosition = camera.getAttribute("position").y;
  const zPosition = camera.getAttribute("position").z - (force / speedReductionFactor) * yVector;

  // Update camera position
  camera.setAttribute("position", `${xPosition} ${yPosition} ${zPosition}`);
}

/**
 * A-Frame component for integrating joystick controls
 * Allows customization of joystick area and behavior via schema properties
 */
export default AFRAME.registerComponent('joystick', {
  schema: {
    joystickAreaStyle: { type: 'string', default: defaultJoystickAreaStyle },
    textOverlayStyle: { type: 'string', default: defaultTextOverlayStyle },
    textContent: { type: 'string', default: defaultTextContent },
    speedReductionFactor: { type: 'number', default: defaultSpeedReductionFactor }
  },

  init: function() {
    console.log("aframe-virtual-joystick initialized");

    // Retrieve schema properties for joystick customization
    const joystickAreaStyle = this.data.joystickAreaStyle;
    const textOverlayStyle = this.data.textOverlayStyle;
    const textContent = this.data.textContent;
    const speedReductionFactor = this.data.speedReductionFactor;

    // Initialize joystick only if touch support is available
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      createJoystick(joystickAreaStyle, textOverlayStyle, textContent, speedReductionFactor);
    } else {
      console.log("Touch is not available");
    }
  },

  // Update camera position on each tick based on joystick data
  tick: function() {
    if (moveData) {
      updatePosition(moveData, this.data.speedReductionFactor);
    }
  }
});
