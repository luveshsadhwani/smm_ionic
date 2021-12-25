import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";

const InputControl: React.FC<{
  currUnit: "mkg" | "ftlbs";
  changeUnit: (value: "mkg" | "ftlbs") => void;
}> = ({ currUnit, changeUnit }) => {
  const handleUnitChange = (event: CustomEvent) => {
    changeUnit(event.detail.value);
  };
  return (
    <IonSegment value={currUnit} onIonChange={handleUnitChange}>
      <IonSegmentButton value="mkg">
        <IonLabel>m/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
