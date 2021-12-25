import React from "react";
import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react";

const BmiResults: React.FC<{ result: number }> = ({ result }) => (
  <IonRow>
    <IonCol>
      <IonCard>
        <IonCardContent className="ion-text-center">
          <h2>Your BMI</h2>
          <h1>{result.toFixed(2)}</h1>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
);
export default BmiResults;
