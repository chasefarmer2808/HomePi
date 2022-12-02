export interface LEDState {
  status?: boolean;
  r?: boolean;
  g?: boolean;
  b?: boolean;
}

export async function getLed(): Promise<LEDState> {
  const resp = await fetch(`http://${document.location.hostname}:5000/led`);
  return resp.json();
}

export async function updateLed(newState: LEDState) {
  const resp = await fetch(`http://${document.location.hostname}:5000/led`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newState),
  });
  return await resp.json();
}
