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

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<string>();

  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  const handleLogin = () => {
    const EMAIL_01 = "luveshs@gmail.com";
    const PASSWORD_01 = "urdad";

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (email !== EMAIL_01 && password !== PASSWORD_01) {
      setError("Email/Password is invalid");
      return;
    }

    history.push("/dashboard");
    resetInputs();
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
