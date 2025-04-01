
import axios from "axios";

const CLUBS_API = "https://localhost:8080/api/clubs";

export default class ClubsService {
    static async getAllClubs() {
        try {
            const response = await axios.get(CLUBS_API);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch clubs");
        }
    }
}