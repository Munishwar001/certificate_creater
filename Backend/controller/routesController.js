const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { getIO } = require("../socketHandling/connection");
const controller = {
    
    handleUploads: (req, res) => {
        const io = getIO();
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
            data.forEach((student, index) => {
                console.log("student", student);
                const templateFile = req.files.templateFile[0];
                console.log(templateFile.path);
                 const content = fs.readFileSync(templateFile.path, "binary");
                 const zip = new PizZip(content);
                const doc = new Docxtemplater(zip.clone(), { paragraphLoop: true, linebreaks: true });

                doc.render({
                    Name: student.Name,
                    RollNo: student.RollNo,
                    Marks: student.Marks,
                    School: student.School
                });
                    // console.log()
               try {
                    const buf = doc.getZip().generate({ type: "nodebuffer" });
               
                    fs.writeFileSync(path.resolve('./output', `certificate_${student.RollNo}.docx`), buf);
                   console.log(`Generated certificate for ${student.Name}`);
                   io.emit('output', {
                       name: student.Name,
                       link:`http://localhost:3000/certificates/certificate_${student.RollNo}.docx`
                   }) 
                    } catch (error) {
                   console.error("Error rendering document:", error);
            }  
            })
            res.json({ success: true, fileLinks : fileLinks });
            
        } catch (error) {
            console.log("error in handleUploads",error);
        }
    }
}

module.exports = controller