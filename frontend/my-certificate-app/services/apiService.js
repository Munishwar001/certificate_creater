import api from './api';

const apiService = {

  uploadFile: async (excelData) => { 
    return await api.post('upload', excelData);
  },

};

export default apiService;
