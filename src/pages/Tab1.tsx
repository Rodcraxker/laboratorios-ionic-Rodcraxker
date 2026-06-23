import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import './Tab1.css';
import { Repository, } from '../interfaces/Repository';
import RepoItem from '../components/RepoItem';
import React from 'react';
import { fetchRepositories } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';


const Tab1: React.FC = () => {
  
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const[loading, setLoading]= React.useState<boolean>(false);

  const loadRepos = async () => {
    setLoading(true)
    const repos = await fetchRepositories();
    setRepositoryList(repos);
    setLoading(false);
  }


  
  useIonViewWillEnter(() => {
     loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding" > 
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repositoryList.map((repo)=> (
            <RepoItem {...repo} key={repo.id} />
          ))}

        </IonList>
        {loading && <LoadingSpinner />}
        
        
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
