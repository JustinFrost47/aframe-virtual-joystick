
# aframe-virtual-joystick

`aframe-virtual-joystick` is an A-Frame component that integrates a virtual joystick into your VR scene. This joystick enables easy navigation in VR environments, especially for mobile and touch-based devices. The joystick can be customized to fit the look and feel of your application.

## Installation

You can install the package via npm:

```bash
npm install aframe-virtual-joystick
```

Alternatively, you can include the script tag in your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/aframe-virtual-joystick/dist/aframe-virtual-joystick.js"></script>
```

Then, import the package into your A-Frame project:

```javascript
import 'aframe-virtual-joystick';
```

## Usage

To use the `joystick` component in your A-Frame scene, ensure to add `id="camera"` to your camera element, or create a new camera entity with `id="camera"`:

```html
<a-entity camera id="camera" position="0 1.6 0" look-controls wasd-controls></a-entity>
```


### Example 1 (Default):

```html
<a-scene>
  <!-- Camera for navigating with the joystick -->
  <a-entity id="camera" camera look-controls wasd-controls></a-entity>

  <!-- Joystick component setup -->
  <a-entity joystick></a-entity>
</a-scene>
```

This setup makes the virtual joystick follow the default behavior. The left half of the touch screen will be reserved for movement, similar to most modern games.

### Example 2 (Custom Parameters):

```html
<a-scene>
  <!-- Camera for navigating with the joystick -->
  <a-entity id="camera" camera wasd-controls></a-entity>

  <!-- Joystick component setup -->
  <a-entity 
    joystick="joystickAreaStyle: position:fixed; display:block; width:40%; height:100%; left:0px; bottom:0px; background-color:rgba(0,0,0,0.1); z-index:20;
              textOverlayStyle: position:fixed; bottom:0px; left:10px; font-size:14px Arial; opacity:0.3;
              textContent: Use joystick to move;
              speedReductionFactor: 50;">
  </a-entity>
</a-scene>
```

This example demonstrates how to customize the joystick's appearance and behavior.

## Component Parameters

The `joystick` component supports various parameters for customization. You can either pass these parameters directly in the HTML or use the default settings.

### Available Parameters

- **`joystickAreaStyle`**: Customize the joystick area with CSS. Control the dimensions, position, background, and appearance of the joystick. Dragging on this area will trigger the movement joystick For example: 
  ```
  "position:fixed; display:block; width:40%; height:100%; left:10px; bottom:10px; background-color:rgba(255,255,255,0.1); z-index:20;"
  ```

- **`textOverlayStyle`**: Customize the text overlay appearance with CSS, controlling the font, position, size, and opacity. Example: 
  ```
  "position:fixed; bottom:10px; left:10px; font-size:14px Arial; opacity:0.5;"
  ```

- **`textContent`**: Set the text displayed on the joystick overlay (useful for instructions). For example: 
  ```
  "Use joystick to navigate"
  ```

- **`speedReductionFactor`**: Controls the movement speed relative to the joystick force. Higher values reduce speed, while lower values increase speed. Default is `50`.

### Default Parameters

- **`joystickAreaStyle`** (string): 
  ```
  "position:fixed; display:block; width:50%; height:100%; left:0px; bottom:0px; background-color:rgba(0,0,0,0); z-index:20;"
  ```

  by default the left half of the screen is reserved as joystickArea
  
- **`textOverlayStyle`** (string): 
  ```
  "position:fixed; bottom:0px; left:0px; margin-top:99%; font-size:12px Roboto; opacity:.3;"
  ```

  it is supposed to be shown on the bottom region
  
- **`textContent`** (string): `""` (no text by default)
  
- **`speedReductionFactor`** (number): `50` (lower values increase speed)

## Event Binding

The joystick component uses **NippleJS** for event handling. Events such as `move` and `end` are bound to provide a responsive and interactive experience. `moveData` is updated with the joystick’s `force` and `angle`, which are then used to adjust the camera's position.

## Example Configuration

Here’s an example that demonstrates all parameters with custom values:

```html
<a-entity 
  joystick="joystickAreaStyle: position:fixed; display:block; width:40%; height:100%; left:0px; bottom:0px; background-color:rgba(0,0,0,0.1); z-index:20;
            textOverlayStyle: position:fixed; bottom:0px; left:10px; font-size:14px Arial; opacity:0.3;
            textContent: Use joystick to move;
            speedReductionFactor: 30;">
</a-entity>
```

## Notes

- The `joystick` component checks for touch capability. It only initializes if the device supports touch events.
- The joystick component assumes that there’s an element with the `camera` ID in the scene.

## License

This project is licensed under the MIT License.
