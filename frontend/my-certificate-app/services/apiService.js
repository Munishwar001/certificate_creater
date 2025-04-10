import api from './api';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
const apiService = {

  uploadFile: async (excelData) => { 
    try {
      const response = await api.post('/upload', excelData);
      if (response.status == 200) {
        toast.info("Generation Complete");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },

  download: async (link, name) => {
    const blob = await api.getBlob(link);
    saveAs(blob,name);
  },
  
  verify: async (email) => {
    const payload = JSON.stringify({
      email: email
    });
    const response = await api.post('/verify', payload);
  }

};

export default apiService;
