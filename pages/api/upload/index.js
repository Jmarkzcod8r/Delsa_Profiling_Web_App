const express = require('express');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');


const storage = new Storage({
    projectId: ' gmap-sample-prohect',
    keyFilename: 'key.json'
  });

  const bucket = storage.bucket('sample01_bucket');
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // limit file size to 5MB
    }
  });

  const app = express();

  app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.post('/upload', upload.single('photo'), (req, res) => {
    const { originalname, buffer } = req.file;

    // Create a new file in the bucket
    const file = bucket.file(originalname);
    const stream = file.createWriteStream({ resumable: false });

    // Write the file data to the bucket
    stream.on('error', err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
    stream.on('finish', () => {
      res.status(200).json({ success: true });
    });
    stream.end(buffer);
  });

  app.listen(3000, () => {
    console.log('Server listening on port 3000.');
  });

