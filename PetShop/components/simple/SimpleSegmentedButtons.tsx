import { useState } from "react";
import { SegmentedButtons, SegmentedButtonsProps } from "react-native-paper";

export const SimpleSegmenteButtons = ({
  buttons,
}: {
  buttons: SegmentedButtonsProps["buttons"];
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const _Segment = (
    <SegmentedButtons
      multiSelect
      value={selected}
      onValueChange={setSelected}
      buttons={buttons}
    />
  );
  return {
    _Segment,
    selected,
  };
};
