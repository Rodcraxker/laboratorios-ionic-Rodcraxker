import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { GithubUser } from "../interfaces/GithubUser";


const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || " https://api.github.com "
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN

const apiClient = axios.create({
    baseURL : GITHUB_API_URL,
    headers:{
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
    }
});

export const fetchRepositories = async () : Promise<Repository[]> => {

    try {
        const response = await apiClient.get ("user/repos", {

            params:{

                sort : "created",
                direction: "desc",
                per_page: 100,
                affiliation: "owner",
                t:Date.now()
            }
        });
        if (response.status !==200){
            throw new Error(response.statusText);
        }
        return response.data as Repository[]
    

        console.log(response.data);
        
        return response.data as Repository[];

    } catch (error){
        console.error("Error obtenido repositorios:", error);
        throw new Error((error as Error).message);
    }
    
}

export const fetchUserInfo = async (): Promise<GithubUser | null> => {

    try{
        const response = await apiClient.get("user");
        if (response.status !== 200) {
            throw new Error (`${response.statusText}`);

        }
        return response.data as GithubUser;

    }catch (error) {
        throw new Error(`${(error as Error).message}`);
    }

}

export const createRepository = async (repoData: { name: string, description: string, private?: boolean }): Promise<Repository> =>{
    try {
        const response = await apiClient.post<Repository>("user/repos",{
            name: repoData.name,
            description: repoData.description,
            private: repoData.private ?? false 
        });
        return response.data;
    } catch (error: unknown) {
    console.error("Error al crear el repositorio:", error);

    if (axios.isAxiosError(error)) {

            if (error.response?.status === 422) {
                throw new Error("Ya existe un repositorio con ese nombre en tu cuenta.");
            }
    
            throw new Error(error.response?.data?.message || "Error del servidor al crear el repositorio");
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Error desconocido al crear el repositorio");
}
};