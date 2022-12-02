export interface LEDState {
  status?: boolean;
  r?: boolean;
  g?: boolean;
  b?: boolean;
}

export async function updateLed(hostname: string, newState: LEDState) {
  const resp = await fetch(`http://${hostname}/led`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newState),
  });
  return await resp.json();
}
