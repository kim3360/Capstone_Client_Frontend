import axios from 'axios';

export interface HostSession {
    hostId: number;
    hostName: string;
    imgUrl: string;
    estimatedTime: string;
    waitingCount: number;
}

export const getAllHostSessions = async (): Promise<HostSession[]> => {
    try {
        const response = await axios.get('http://134.185.99.89:8080/host/sessions');
        return response.data;
    } catch (error) {
        console.error('Error fetching host sessions:', error);
        throw error; 
    }
};