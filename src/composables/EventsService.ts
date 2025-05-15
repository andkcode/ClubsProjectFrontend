import axios from "axios";
import { useAuth } from "./useAuth";

const API_URL = "http://localhost:8080/events";
const { getAuthHeader } = useAuth();

export default class EventsService {
    static async getAllEvents() {
        try {
            const response = await axios.get(API_URL, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error("Error fetching events:", error);
            throw new Error("Failed to fetch events");
        }
    }

    static async getEventsById(id: number) {
        try {
            const response = await axios.get(`${API_URL}/event/${id}`, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error fetching events ${id}:`, error);
            throw error;
        }
    }

    static async getEventByClubId(id: number) {
        try {
            const response = await axios.get(`${API_URL}/club/${id}`, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error fetching events from club ${id}:`, error);
            throw error;
        }
    }

    static async createEvents(event: any, isMultipart = false) {
        try {
            const contentType = isMultipart ? 'multipart/form-data' : 'application/json';
            const response = await axios.post(`${API_URL}/admin`, event, getAuthHeader(contentType));
            return response.data;
        } catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    }

    static async updateEvent(id: number, event: any, isMultipart = false) {
        try {
            const contentType = isMultipart ? 'multipart/form-data' : 'application/json';
            const response = await axios.put(`${API_URL}/admin/${id}`, event, getAuthHeader(contentType));
            return response.data;
        } catch (error) {
            console.error(`Error updating event ${id}:`, error);
            throw error;
        }
    }

    static async deleteEvent(id: number) {
        try {
            await axios.delete(`${API_URL}/admin/${id}`, getAuthHeader());
        } catch (error) {
            console.error(`Error deleting event ${id}:`, error);
            throw error;
        }
    }
}