import api from './api';
import { saveAs } from 'file-saver';
const apiService = {

  uploadFile: async (excelData) => { 
    const response = await api.post('/upload', excelData);
    console.log(response);
  },

  download: async (link,name) => {
    const blob = await api.get(link);
    // console.log(response);
    saveAs(blob,name);
  }

};

export default apiService;
