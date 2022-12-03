import { useEffect, useState } from "react";
import { LEDState, updateLed, getLed } from "./api/led";
import "./App.css";
import { Color, ColorPicker } from "./components/ColorPicker";
import { Switch } from "./components/Switch";

const DEFAULT_BACKGROUND_COLOR = "#282c34";

function App() {
  const [ledState, setLEDState] = useState<LEDState>({
    status: false,
    r: false,
    g: false,
    b: false,
  });
  const [activeBackgroundColor, setActiveBackgroundColor] = useState<string>(
    DEFAULT_BACKGROUND_COLOR
  );

  useEffect(() => {
    getLed().then((state) => setLEDState(state));
  }, []);

  useEffect(() => {
    setActiveBackgroundColor(ledStateToBackgroundColor(ledState));
  }, [ledState]);

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

  const ledStateToBackgroundColor = (state: LEDState) => {
    const backgroundColor = !state.status
      ? DEFAULT_BACKGROUND_COLOR
      : state.r && !state.g && !state.b
      ? "red"
      : !state.r && state.g && !state.b
      ? "green"
      : !state.r && !state.g && state.b
      ? "blue"
      : state.r && state.g && !state.b
      ? "yellow"
      : !state.r && state.g && state.b
      ? "cyan"
      : state.r && !state.g && state.b
      ? "magenta"
      : DEFAULT_BACKGROUND_COLOR;

    return backgroundColor;
  };

  return (
    <div className='App' style={{ backgroundColor: activeBackgroundColor }}>
      <div className='App-inner'>
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
    </div>
  );
}

export default App;
