import React from "react";
import {
    IonCard,
    IonCardContent,
    IonRow,
    IonCol,
    
    } from '@ionic/react';

const BmiResult: React.FC<{result:number}> = (props)=>{
    return(
        <IonRow>
                <IonCol>
                    <IonCard>
                        <IonCardContent className="ion-text-center">
                            <h2> you body-mass-index</h2>
                            <h3>
                                {props.result.toFixed(2)}
                            </h3>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
    
    );
};

export default BmiResult;