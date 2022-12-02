import { useEffect, useState } from "react";
import { LEDState, updateLed, getLed } from "./api/led";
import "./App.css";
import { Color, ColorPicker } from "./components/ColorPicker";
import { Switch } from "./components/Switch";

function App() {
  const [ledState, setLEDState] = useState<LEDState>({
    status: false,
    r: false,
    g: false,
    b: false,
  });

  useEffect(() => {
    getLed().then(state => setLEDState(state))
  }, [])

  const enableLed = async () => {
    await updateLed({ status: true });
    setLEDState((c) => {
      return { ...c, status: true };
    });
  };

  const disableLed = async () => {
    await updateLed({ status: false });
    setLEDState((c) => {
      return { ...c, status: false };
    });
  };

  const onColorSelect = async (color: Color) => {
    await updateLed(color);
    setLEDState((c) => {
      return { ...c, ...color };
    });
  };

  return (
    <div className='App'>
      <div>
        <h3>1. Enable the LED if it is disabled</h3>
        <Switch
          enabled={ledState.status || false}
          onEnable={enableLed}
          onDisable={disableLed}
        />
      </div>
      <div>
        <h3>2. Select a color!</h3>
        <ColorPicker onSelect={onColorSelect} />
      </div>
    </div>
  );
}

export default App;
