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

const RegisterPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<string>();

  const firstNameInputRef = useRef<HTMLIonInputElement>(null);
  const lastNameInputRef = useRef<HTMLIonInputElement>(null);
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLIonInputElement>(null);

  const handleRegister = async () => {
    try {
      const firstName = firstNameInputRef.current?.value;
      const lastName = lastNameInputRef.current?.value;
      const email = emailInputRef.current?.value;
      const password = passwordInputRef.current!.value || "";
      const confirmPassword = confirmPasswordInputRef.current?.value;

      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }

      if (password.toString().length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      const userData = {
        name: firstName,
        email,
        password,
      };

      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/register",
        data: userData,
        validateStatus: function (status) {
          return status === 201; // default
        },
      });

      const { status, data } = response;
      // handle correct registration
      if (status === 201) {
        history.push("/login");
        console.log(data);
      }

      resetInputs();
    } catch (err) {
      console.log(err);
    }
  };

  const resetInputs = () => {
    firstNameInputRef.current!.value = "";
    lastNameInputRef.current!.value = "";
    emailInputRef.current!.value = "";
    passwordInputRef.current!.value = "";
    confirmPasswordInputRef.current!.value = "";
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
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">First Name</IonLabel>
                <IonInput type="text" ref={firstNameInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput type="text" ref={lastNameInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
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
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput type="password" ref={confirmPasswordInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin ion-text-center">
            <IonCol>
              <IonButton onClick={handleRegister}>Register</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
