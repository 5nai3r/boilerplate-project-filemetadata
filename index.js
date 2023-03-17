var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file
  const fileName = file.originalname
  const fileSize = file.size
  const fileType = file.mimetype

  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
