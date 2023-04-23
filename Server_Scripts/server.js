//EXPRESS
const express = require("express"); //Including express package for creating a server
const app = express();
const port = 8000
app.listen(port)
app.use(express.static('Public')) //the public folder is what is visible to the client (actually a subset of that folder (depending on the currently rendered webpage and it's used resources))
app.use(express.json({limit : '1mb'} )); //telling that my app will be sending/recieving data in json format (limiting to 1MB)


const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

app.get("/",(req,res)=>{
  
    folderPath1 = (path.join(__dirname, "../abc")) 
    folderPath2 = (path.join(__dirname, "../abc2")) 

    console.log(folderPath1)
    console.log(folderPath2)

    console.log(fs.existsSync(folderPath1))
    console.log(fs.existsSync(folderPath2))

    // create a new zip archive

    const archive = archiver('zip', {
      zlib: { level: 9 } // compression level for the archive
    });
    
    
    res.setHeader('Content-disposition', 'attachment; filename=databases.zip'); // set the content-disposition header to attachment and set the filename   
    archive.pipe(res); // pipe the archive data to the response object
    archive.directory(folderPath1, 'database_a'); // add the folder to the archive with the specified name  
    archive.directory(folderPath2, 'database_b'); // add the folder to the archive with the specified name  
    archive.finalize(); // finalize the archive (write the zip data to the response)
    //res.send("asda")
});

 