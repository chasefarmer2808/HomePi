import React from "react";

interface SwitchProps {
  enabled: boolean;
  onEnable: () => void;
  onDisable: () => void;
}

export const Switch: React.FC<SwitchProps> = ({
  enabled,
  onEnable,
  onDisable,
}) => {
  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    enabled ? onDisable() : onEnable();
  };

  return (
    <label className='switch'>
      <input type='checkbox' checked={enabled} onChange={onToggle} />
      <span className='slider round'></span>
    </label>
  );
};
