const convert = require('docx-pdf');
const libreOffice = require('libreoffice-convert');









const convertToPDF = (docxPath, pdfPath ,data) => {
  return new Promise((resolve, reject) => { 
                    convert(docxPath, pdfPath, function (err, result) {
                     if (err) {
                          console.error("Conversion Error:", err);
                          reject(err);
                     } else {
                           console.log(`Converted PDF for ${data.Name}`);
                           resolve(result);
                      }
                     });
                   });
};

module.exports = { convertToPDF };
