// server.js

const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;
const dbPath = path.join(__dirname, 'pra3.db');
const db = new sqlite3.Database(dbPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// チャンピオンの情報を取得
app.get('/champions', (req, res) => {
  const query = 'SELECT * FROM Champions';

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// チャンピオンの情報を追加
app.post('/add-champion', (req, res) => {
  const { Me, Enemy, Com, Push, Wave } = req.body;

  // チェックボックスの値を〇か×に変換
  const pushValue = Push ? '〇' : '×';
  const waveValue = Wave ? '〇' : '×';

  const insertQuery = 'INSERT INTO Champions (Me, Enemy, Com, Push, Wave) VALUES (?, ?, ?, ?, ?)';
  
  db.run(insertQuery, [Me, Enemy, Com, pushValue, waveValue], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// ...（その他のAPIエンドポイントを追加する場合はここに）

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
