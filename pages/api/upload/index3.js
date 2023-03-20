// // const uploadFile = async (req, res) => {
// //     if (req.method !== 'POST') {
// //       res.status(405).json({ error: 'Method not allowed' });
// //       return;
// //     }

// //     const file = req.files.file;
// //     const bucketName = 'sample01_bucket';
// //     const bucket = storage.bucket(bucketName);
// //     const blob = bucket.file(file.name);

// //     // Create a writable stream and pipe the file to it
// //     const stream = blob.createWriteStream({
// //       resumable: false
// //     });
// //     stream.on('error', (err) => {
// //       console.error(err);
// //       res.status(500).json({ error: 'Internal server error' });
// //     });
// //     stream.on('finish', () => {
// //       console.log(`File uploaded to ${bucketName}/${file.name}`);
// //       res.status(200).json({ success: true });
// //     });
// //     stream.end(file.data);
// //   }

// //   export default uploadFile;

// // pages/api/upload-photo.js
// import { Storage } from '@google-cloud/storage';
// import multer from 'multer';
// // import { NextApiRequest, NextApiResponse } from 'next';

// const storage = new Storage({
//   projectId: ' gmap-sample-prohect',
//   keyFilename: 'key.json'
// });
// const bucket = storage.bucket('sample01_bucket');

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 // limit file size to 5MB
//   }
// });

// // var bodyParser = require('body-parser')

// // bodyParser.json([options])

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     res.status(405).json({ error: 'Method not allowed' });
//     return;
//   }

//   // Use multer to parse the file upload
//   const multerUpload = upload.single('file');
//   multerUpload(req, res, async err => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     const { originalname, buffer } = req.file;

//     // Create a new file in the bucket
//     const file = bucket.file(originalname);
//     const stream = file.createWriteStream({ resumable: false });

//     // Write the file data to the bucket
//     stream.on('error', err => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
//     stream.on('finish', () => {
//       res.status(200).json({ success: true });
//     });
//     stream.end(buffer);
//   });
// }
