const multer = require('multer');
const path = require('path');
console.log("inside the multer middleWare");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("in the destination");
        cb(null, './uploads'); 
        console.log("request file",req.file);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

    if (file.fieldname === 'excelFile') {
      
    const excelTypes = ['.xlsx', '.xls', '.csv'];
    if (excelTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed for excelFile.'));
    }
  } else if (file.fieldname === 'templateFile') {
      
    const templateTypes = ['.doc', '.docx', '.html'];
    if (templateTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only Word or HTML files are allowed for templateFile.'));
    }
  } else {
    cb(new Error('Unknown field name.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload.fields([
    { name: 'excelFile', maxCount: 1 },
    { name: 'templateFile', maxCount: 1 },
]);