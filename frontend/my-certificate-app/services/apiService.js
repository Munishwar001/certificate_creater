import api from './api';

const apiService = {

  uploadFile: async (excelData) => { 
    const response = await api.post('upload', excelData);
    console.log(response);
  },

};

export default apiService;
