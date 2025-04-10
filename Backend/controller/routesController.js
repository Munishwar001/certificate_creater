const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const { extractExcelData } = require('../services/excel');
const { generateDocx } = require('../services/wordService');
const { convertToPDF } = require("../services/pdfService");
const { getIO } = require("../socketHandling/connection");
const controller = {
    handleVerification: async (req, res) => { 
        try {
            console.log("in the verification route");
            const { email } = req.body;
            console.log("getted the email", email);
            res.status(200).json({ success: true })
        } catch (err) {
            console.log("Error while inserting email",err);
        }
    },

    handleUploads: async (req, res) => { 
         const io = getIO();
         const socket = req.body.socket;
         console.log(socket);
        try {
            const excelPath = req.files.excelFile[0].path;
            console.log("excelPath", excelPath);
            const data = await extractExcelData(excelPath);
            const allfields = Object.keys(data[0]);
            console.log(allfields);
            console.log("file data", data);
            
            const fileLinks = [];
             for (const student of data){
                 console.log("student", student);
                   const hasEmptyField = allfields.some(
                       field => !student[field] || student[field].toString().trim() === ''
                       );
                  if (hasEmptyField) {
                            console.warn(`Skipping entry due to missing/empty fields: ${JSON.stringify(student)}`);
                          continue; 
                 }
                 
                const templateFile = req.files.templateFile[0];
                 console.log(templateFile.path);

                 const bufferData = await generateDocx(templateFile.path, student);

               try { 
                    const docxFileName = `certificate_${student.RollNo}.docx`;
                    const pdfFileName = `certificate_${student.RollNo}.pdf`;
                    const docxPath = path.resolve('./output', docxFileName);
                    const pdfPath = path.resolve('./output', pdfFileName);
                   
                    fs.writeFileSync(docxPath, bufferData);
                    await convertToPDF(docxPath, pdfPath,student);
                    fs.unlinkSync(docxPath);
                   
                   const fileLink = `http://localhost:3000/certificates/${pdfFileName}`;
                    fileLinks.push(fileLink);
                   io.to(socket).emit('output', {
                       name: student.Name,
                       link:fileLink
                   }) 
                    } catch (error) {
                   console.error("Error rendering document:", error);
            }  
            }
            res.json({ success: true, fileLinks : fileLinks });
            
        } catch (error) {
            console.log("error in handleUploads",error);
        }
    }
}

module.exports = controller