import axios from "axios";

const API_URL = "http://localhost:8080/events";
const AUTH_HEADER = {
    headers: {
        "Content-Type": "application/json",
    },
};

export default class EventsService {
    static async getAllEvents() {
        try {
            const response = await axios.get(API_URL, AUTH_HEADER);
            return response.data;
        } catch (error) {
            console.error("Error fetching events:", error);
            throw new Error("Failed to fetch events");
        }
    }

    static async getEventsById(id: number) {
        try {
            const response = await axios.get(`${API_URL}/${id}`, AUTH_HEADER);
            return response.data;
        } catch (error) {
            console.error(`Error fetching events ${id}:`, error);
            throw error;
        }
    }

    static async getEventByClubId(id: number) {
        try {
            const response = await axios.get(`${API_URL}/${id}`, AUTH_HEADER);
            return response.data;
        } catch (error) {
            console.error(`Error fetching events from certain ${id} of club:`, error);
            throw error;
        }
    }

    static async createEvents(event: any) {
        try {
            const response = await axios.post(`${API_URL}/admin`, event, AUTH_HEADER);
            return response.data;
        } catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    }

    static async updateEvent(id: number, event: any) {
        try {
            const response = await axios.put(`${API_URL}/admin/${id}`, event, AUTH_HEADER);
            return response.data;
        } catch (error) {
            console.error(`Error updating event ${id}:`, error);
            throw error;
        }
    }

    static async deleteEvent(id: number) {
        try {
            await axios.delete(`${API_URL}/admin/${id}`, AUTH_HEADER);
        } catch (error) {
            console.error(`Error deleting event ${id}:`, error);
            throw error;
        }
    }
}
