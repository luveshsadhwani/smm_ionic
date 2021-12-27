import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";

const DashboardPage: React.FC<RouteComponentProps> = ({ history }) => {
  const getJwtFromStorage = () => {
    return localStorage.getItem("token");
  };

  const deleteJwtFromStorage = () => {
    return localStorage.removeItem("token");
  };

  const handleLogout = async () => {
    try {
      const token = getJwtFromStorage();
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/logout",
        data: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: function (status) {
          return status === 200; // default
        },
      });

      const { status, data } = response;
      // handle correct response
      if (status === 200) {
        deleteJwtFromStorage();
        history.push("/login");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton routerLink="/bmi-calculator">Add Item</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton routerLink="/login">Remove Item</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={handleLogout}>Logout</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
