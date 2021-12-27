import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
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
import { useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<string>();

  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  const saveJwtToStorage = (token: string) => {
    localStorage.setItem("token", token);
  };

  const handleLogin = async () => {
    try {
      const email = emailInputRef.current?.value;
      const password = passwordInputRef.current?.value;

      if (!email || !password) {
        setError("Please fill in email & password");
        return;
      }

      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/login",
        data: {
          email,
          password,
        },
        validateStatus: function (status) {
          return status === 200 || status === 401; // default
        },
      });

      const { status, data } = response;
      // handle correct login
      if (status === 200) {
        const { token } = data.data;
        saveJwtToStorage(token);
        history.push("/dashboard");
        console.log(data);
      }

      // handle unauthenticated user
      if (status === 401) {
        setError(data.message);
        console.log(data);
      }

      resetInputs();
    } catch (err) {
      console.log(err);
    }
  };

  const resetInputs = () => {
    emailInputRef.current!.value = "";
    passwordInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
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
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="text" ref={emailInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" ref={passwordInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin ion-text-center">
            <IonCol>
              <IonButton onClick={handleLogin}>Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/register">Register</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
