import {
  IonAlert,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React, { useState, useRef } from "react";
import BmiControls from "../../components/BmiControls";
import BmiResults from "../../components/BmiResults";
import InputControl from "../../components/InputControl";

const BmiCalculatorPage: React.FC = () => {
  const [bmi, setBmi] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [unit, setUnit] = useState<"mkg" | "ftlbs">("mkg");

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    const height = heightInputRef.current!.value;
    const weight = weightInputRef.current!.value;

    const checkInputExists = !weight || !height;
    const checkInputValid = +weight! <= 0 || +height! <= 0;

    if (checkInputExists || checkInputValid) {
      setError("Please enter a valid (non-negative) number.");
      return;
    }

    const KG_TO_LBS = 2.205;
    const M_TO_FT = 3.281;

    const isImperialUnit = unit === "ftlbs";

    const convertedWeight = isImperialUnit ? +weight / KG_TO_LBS : +weight;
    const convertedHeight = isImperialUnit ? +height / M_TO_FT : +height;

    const calculatedBmi = convertedWeight / (convertedHeight * convertedHeight);
    console.log(calculatedBmi);
    setBmi(calculatedBmi);
  };

  const resetInputs = () => {
    heightInputRef.current!.value = "";
    weightInputRef.current!.value = "";
    setBmi(0);
  };

  const clearError = () => {
    setError("");
  };

  const handleUnit = (unit: "mkg" | "ftlbs") => {
    setUnit(unit);
  };
  return (
    <IonPage>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "OK", handler: clearError }]}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl currUnit={unit} changeUnit={handleUnit} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Height ({unit === "mkg" ? "m" : "ft"})
                </IonLabel>
                <IonInput type="number" ref={heightInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Weight ({unit === "mkg" ? "kg" : "lbs"})
                </IonLabel>
                <IonInput type="number" ref={weightInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBmi} onReset={resetInputs} />
          {bmi > 0 && <BmiResults result={bmi} />}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BmiCalculatorPage;
