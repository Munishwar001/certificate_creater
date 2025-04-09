const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const convert = require('docx-pdf');
const { getIO } = require("../socketHandling/connection");
const controller = {
    
    handleUploads: async (req, res) => {
         const io = getIO();
         const socket = req.body.socket;
         console.log(socket);
        try {
            const excelPath = req.files.excelFile[0].path;
            console.log("excelPath", excelPath);
            const workbook = xlsx.readFile(excelPath);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(worksheet);
            console.log("file data", data);
            
            // reading the word file
            // console.log(zip);
            const fileLinks = [];
             for (const student of data){
                console.log("student", student);
                const templateFile = req.files.templateFile[0];
                console.log(templateFile.path);
                 const content = fs.readFileSync(templateFile.path, "binary");
                 const zip = new PizZip(content);
                const doc = new Docxtemplater(zip.clone(), { paragraphLoop: true, linebreaks: true });

                 doc.render(student);
                 
               try {
                    const buf = doc.getZip().generate({ type: "nodebuffer" });
                    const docxFileName = `certificate_${student.RollNo}.docx`;
                    const pdfFileName = `certificate_${student.RollNo}.pdf`;
                    const docxPath = path.resolve('./output', docxFileName);
                    const pdfPath = path.resolve('./output', pdfFileName);
                   
                   fs.writeFileSync(docxPath, buf);
                    await new Promise((resolve, reject) => { 
                   convert(docxPath, pdfPath, function (err, result) {
                   if (err) {
                   console.error("Conversion Error:", err);
                   reject(err);
                   } else {
                     console.log(`Converted PDF for ${student.Name}`);
                     resolve(result);
                    }
                   });
                 });
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