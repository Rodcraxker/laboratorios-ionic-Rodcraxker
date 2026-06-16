import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Form de Repository</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Form de Repository</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className='form-container'>
          <IonInput
            className= 'form-field'
            label="Nombre del repo"
            labelPlacement= 'floating'
            placeholder='Ingrese la descripcion del repo'
          />
          <IonTextarea
            className="form-field"
            label='Description'
            labelPlacement='floating'
            placeholder='Ingrese la descripcion del repo'

          />

          <IonButton
            className='form-field'
            expand='block'
            color="primary"

            >
              Guardar
            </IonButton>

        </div>



      
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
