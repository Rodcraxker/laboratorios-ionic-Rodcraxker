import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import './Tab3.css';
import React from 'react';
import { GithubUser } from '../interfaces/GithubUser';
import { fetchUserInfo } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab3: React.FC = () => {

  const[userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const[loading, setLoading] = React.useState(false);
  const[errorMsg, setErrorMsg] = React.useState("");

  useIonViewWillEnter(() => {
    setLoading(true);
    fetchUserInfo().then((user) => {
      setUserInfo(user);
    })
    .catch((error) => {
      setErrorMsg("Error al cargar la información del usuario: " + error);
    })
    .finally(() => setLoading(false))


  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          { userInfo &&(
              <IonCard className='card'>

                <img src={userInfo.avatar_url} alt="Avatar"/>
                <IonHeader>
                  <IonCardTitle> {userInfo.name} </IonCardTitle>
                  <IonCardSubtitle> {userInfo.login}</IonCardSubtitle>
                </IonHeader>
                <IonCardContent> 
                  <p> {userInfo.bio} </p>  
                </IonCardContent>
                
              </IonCard>
          )}
          {errorMsg &&<IonText color="danger">{errorMsg}</IonText>}
        </div>
        {loading && <LoadingSpinner />} 
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
