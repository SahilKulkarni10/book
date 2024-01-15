import express from "express";
import mysql from "mysql2"; // Use mysql2 instead of mysql
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sahil@2004",
    database: "test",
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL');
    }
});

// Handle MySQL errors
db.on('error', (err) => {
    console.error('MySQL error:', err.message);
});

// Handle MySQL connection close
db.on('close', () => {
    console.log('MySQL connection closed');
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello ");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800, () => {
    console.log("Connected to backend");
});
