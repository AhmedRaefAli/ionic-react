import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonFooter,
  IonContent,
  IonInput,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from "@ionic/react";
import BmiControlls from "./components/BmiControlls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/inputControl";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [CalUnits, SetCalUnits] = useState<"mkg" | "ftlbs">("mkg");

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current?.value;
    const enteredHeight = heightInputRef.current?.value;

    if (
      !enteredWeight ||
      !enteredHeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      // alert("please enter valid not-negative number!");
      setError("please enter valid not-negative number!");
      return;
    }


    const weightConversionFactor=CalUnits==="ftlbs"?2.2:1;
    const heightConversionFactor=CalUnits==="ftlbs"?3.28:1;

    const weight=+enteredWeight/weightConversionFactor;
    const height=+enteredHeight/heightConversionFactor;
    
    const bmi = weight / (+height * +height);
    
    console.log(bmi);
    setCalculatedBmi(bmi);
  };

  const resetFunc = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selectControlValueHandler = (selectedValue: "mkg" | "ftlbs") => {
    SetCalUnits(selectedValue);
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {
            text: "okay",
            handler: clearError,
          },
        ]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonGrid className="ion-text-center ion-margin">
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={CalUnits}
                  onSelectValue={selectControlValueHandler}
                ></InputControl>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">your height  ({CalUnits ==="mkg" ? "meters":"feet"})</IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">your weight  ({CalUnits ==="mkg" ? "kg":"lps"})</IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <BmiControlls onCalculate={calculateBMI} onReset={resetFunc} />
            {calculatedBmi && <BmiResult result={calculatedBmi} />}
          </IonGrid>
        </IonContent>

        <IonFooter>
          <IonToolbar color="primary">
            <IonTitle>Footer</IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
