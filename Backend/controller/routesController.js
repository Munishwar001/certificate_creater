const xlsx = require('xlsx');
// const path = require('path');

const controller = {
    
    handleUploads: (req, res) => {
        try {
            const path = req.files.excelFile[0].path;
            console.log("path", path);
            const workbook = xlsx.readFile(path);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(worksheet);
            console.log("file data",data);
            res.json({ success: true , data });
        } catch (error) {
            console.log("error in handleUploads",error);
        }
    }
}

module.exports = controller