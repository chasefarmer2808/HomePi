import { useRef, useState } from "react";
import { LEDState, updateLed } from "./api/led";
import "./App.css";
import { Color, ColorPicker } from "./components/ColorPicker";
import { Switch } from "./components/Switch";

function App() {
  const ipInputRef = useRef<HTMLInputElement | null>(null);
  const [ledState, setLEDState] = useState<LEDState>({
    status: false,
    r: false,
    g: false,
    b: false,
  });

  const enableLed = async () => {
    if (!ipInputRef.current) return;
    await updateLed(ipInputRef.current.value, { status: true });
    setLEDState((c) => {
      return { ...c, status: true };
    });
  };

  const disableLed = async () => {
    if (!ipInputRef.current) return;
    await updateLed(ipInputRef.current.value, { status: false });
    setLEDState((c) => {
      return { ...c, status: false };
    });
  };

  const onColorSelect = async (color: Color) => {
    console.log(color);
    if (!ipInputRef.current) return;
    await updateLed(ipInputRef.current.value, color);
    setLEDState((c) => {
      return { ...c, ...color };
    });
  };

  return (
    <div className='App'>
      <div>
        <h3>1. Input Raspberry Pi local IP Address and Port Number</h3>
        <input ref={ipInputRef} placeholder='127.0.0.1:5000' />
      </div>
      <div>
        <h3>2. Enable the LED if it is disabled</h3>
        <Switch
          enabled={ledState.status || false}
          onEnable={enableLed}
          onDisable={disableLed}
        />
      </div>
      <div>
        <h3>3. Select a color!</h3>
        <ColorPicker onSelect={onColorSelect} />
      </div>
    </div>
  );
}

export default App;
