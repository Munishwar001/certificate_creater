const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { toast } from 'react-toastify';
const api = {
  getBlob: async (endpoint) => {
      try {
      console.log(`${BASE_URL}${endpoint}`);
        const res = await fetch(`${BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error(`GET ${endpoint} failed`);    
      return await res.blob();
    } catch (err) {
      console.error("GET Error:", err);
      throw err;
    }
  },
 
  getJson: async (endpoint) => {
      try{
      console.log(`${BASE_URL}${endpoint}`);
      const res = await fetch(`${BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error(`GET ${endpoint} failed`);    
      return await res.json();
    } catch (err) {
      console.error("GET Error:", err);
      throw err;
    }
  },

  // POST 
  post: async (endpoint, payload) => {
          console.log(`${BASE_URL}${endpoint}`);
    try {
      console.log("payload data", payload);
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        body: payload
      });

      return await res.json();
    } catch (err) {
      console.error("POST Error:", err);
      if (err.response.status === 429) {
        console.log(err.response);
      toast.error(err.response.data.message);
         } else {
      toast.error("Something went wrong",err);
          }
    }
  },
};

export default api;
