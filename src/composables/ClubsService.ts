import axios from "axios";
import { useAuth } from "./useAuth";// Import from your actual auth service path

const API_URL = "http://localhost:8080/clubs";
const { getAuthHeader } = useAuth();

export default class ClubsService {
  static async getAllClubs() {
    try {
      const response = await axios.get(API_URL, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error("Error fetching clubs:", error);
      throw new Error("Failed to fetch clubs");
    }
  }

  static async getClubById(id: number) {
    try {
      const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error(`Error fetching club ${id}:`, error);
      throw error;
    }
  }

  static async joinClub(id: number) {
    try {
      const response = await axios.post(`${API_URL}/${id}/join`, {}, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error(`Error joining club ${id}`, error);
      throw error;
    }
  }

  static async createClub(club: any, isMultipart = false) {
    try {
      const contentType = isMultipart ? 'multipart/form-data' : 'application/json';
      const response = await axios.post(`${API_URL}/admin`, club, getAuthHeader(contentType));
      return response.data;
    } catch (error) {
      console.error("Error creating club:", error);
      throw error;
    }
  }

  static async updateClub(id: number, club: any, isMultipart = false) {
    try {
      const contentType = isMultipart ? 'multipart/form-data' : 'application/json';
      const response = await axios.put(`${API_URL}/admin/${id}`, club, getAuthHeader(contentType));
      return response.data;
    } catch (error) {
      console.error(`Error updating club ${id}:`, error);
      throw error;
    }
  }

  static async deleteClub(id: number) {
    try {
      await axios.delete(`${API_URL}/admin/${id}`, getAuthHeader());
    } catch (error) {
      console.error(`Error deleting club ${id}:`, error);
      throw error;
    }
  }
}