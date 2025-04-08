const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = {
  get: async (endpoint) => {
        try {
            console.log(`${BASE_URL}/${endpoint}`);
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        credentials: 'include',
      });
        
      return await res.json();
    } catch (err) {
      console.error("GET Error:", err);
      throw err;
    }
  },

  // POST 
  post: async (endpoint, payload) => {
    try {
      console.log("payload data", payload);
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        body:payload,
        credentials: 'include',
      });
      return await res.json();
    } catch (err) {
      console.error("POST Error:", err);
      throw err;
    }
  },
};

export default api;
