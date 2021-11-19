import React from "react";
import {
    IonButton,
    IonRow,
    IonCol,
    IonIcon
    } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

const BmiControlls: React.FC<{
    onCalculate:()=>void;
    onReset:()=>void;
}> = (props)=>{
    return(
        <IonRow>
        <IonCol className="ion-text-left">
            <IonButton onClick={props.onCalculate}>
                calculate
                <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
            </IonButton>
        </IonCol>
        <IonCol className="ion-text-right">        
            <IonButton onClick={props.onReset}>
                Reset
                <IonIcon slot="start" icon={refreshOutline}></IonIcon>
            </IonButton>
        </IonCol>
    </IonRow>
    
    );
};

export default BmiControlls;