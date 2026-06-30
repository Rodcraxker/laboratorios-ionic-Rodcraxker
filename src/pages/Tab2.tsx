import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react'; 
import { useIonLoading, useIonToast } from '@ionic/react'; 
import { createRepository } from '../services/GithubServices';
import { useHistory } from 'react-router-dom';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const history = useHistory();

  const handleSave = async () => {
    if (!name.trim()) {
      presentToast({ message: 'El nombre es obligatorio', duration: 2000, color: 'danger' });
      return;
    }

    await presentLoading('Creando repositorio...');

    try {
      await createRepository({ name, description });
      
      // Limpia los campos
      setName('');
      setDescription('');

      // mensaje succes y redirige a tab1
      presentToast({ message: 'Repositorio creado correctamente', duration: 2000, color: 'success' });
      history.push('/tab1'); 
      
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al crear el repositorio';
      presentToast({ message: message, duration: 3000, color: 'danger' });
    } finally {
      dismissLoading();
    }
  };

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
            className='form-field'
            label="Nombre del repo"
            labelPlacement='floating'
            placeholder='Ingrese el nombre del repo'
            value={name}
            onIonInput={(e) => setName(e.detail.value!)}
          />
          <IonTextarea
            className="form-field"
            label='Description'
            labelPlacement='floating'
            placeholder='Ingrese la descripción del repo'
            value={description}
            onIonInput={(e) => setDescription(e.detail.value!)}
          />

          <IonButton
            className='form-field'
            expand='block'
            color="primary"
            onClick={handleSave}
          >
            Guardar
          </IonButton>
        </div>



      
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
