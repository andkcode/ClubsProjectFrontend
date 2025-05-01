import axios from "axios";

const API_URL = "http://localhost:8080/clubs";
const AUTH_HEADER = {
    headers: {
      "Content-Type": "multipart/form-data",
    },

  };
  

export default class ClubsService {
    static async getAllClubs() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching clubs:", error);
            throw new Error("Failed to fetch clubs");
        }
    }

    static async getClubById(id: number) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching club ${id}:`, error);
            throw error;
        }
    }

    static async joinClub(id: number) {
        try {   
            const response = await axios.post(`${API_URL}/${id}/join`, {});
            return response.data;
        } catch (error) {
            console.error(`Error joining club ${id} by user`, error);
            throw error;
        }
    }

    static async createClub(club: any) {
        try {
            const response = await axios.post(`${API_URL}/admin`, club, AUTH_HEADER);
            return response.data;
        } catch (error) {
            console.error("Error creating club:", error);
            throw error;
        }
    }

    static async updateClub(id: number, club: any) {
        try {
            const response = await axios.put(`${API_URL}/admin/${id}`, club, AUTH_HEADER);
            return response.data;
        } catch (error) {
            console.error(`Error updating club ${id}:`, error);
            throw error;
        }
    }

    static async deleteClub(id: number) {
        try {
            await axios.delete(`${API_URL}/admin/${id}`, AUTH_HEADER);
        } catch (error) {
            console.error(`Error deleting club ${id}:`, error);
            throw error;
        }
    }
}
