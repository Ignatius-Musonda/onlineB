
import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";

// import authRoutes from "./routes/auth.js";
import authRoutes from "./Routes/Auth.js";
import CourseRoutes from "./Routes/Courses.js";
import Application from "./Routes/Application.js";
import userRoutes from "./Routes/User.js"
import cookieParser from "cookie-parser";



const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "testsec",
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/Application", Application);



app.listen(8800, () => {
  console.log("Connected to backend.");
});

// const storage = multer.diskStorage({

//      // cb is callbackfuncs
//      destination : (req, file, cb) => {
//       cb(null,"public/images")
//      },

//      filename : (req,file,cb) => {

//       cb(null,file.fieldname + "_" +Date.now()+path.extname(file.originalname))

//      }

    
// })
// // const storage = multer.diskStorage()

// const upload = multer({
//   storage : storage
// })



// app.get("/", (req, res) => {
//   console.log("INdex")
//   res.json("hello");
// });

// app.get("/books", (req, res) => {
//   const q = "SELECT * FROM books";
//   db.query(q, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     console.log("here",data)
//     return res.json(data);
//   });
// });

// app.post('/upload',upload.single('image'),(req,res)=>{

//   console.log(req.file)
//   // const image = req.file.filename;
//   const image = req.file.buffer;
//   const sql = "Update Books set Image = ?"
//   console.log("file",req.file.filename)
//   db.query(sql,[image], (error,result)=>{

//     if(error) return res.json({message : "error occured"});
//     res.json({status : "Success"});

//   })

// })

// app.post("/books", (req, res) => {
//   const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.delete("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = " DELETE FROM books WHERE id = ? ";

//   db.query(q, [bookId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.put("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.price,
//     req.body.cover,
//   ];

//   db.query(q, [...values,bookId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });


// console {
//   Fname: 'Chris',
//   Lname: 'Kunda',
//   Gender: 'Male',
//   email: 'b@dd.com',
//   password: '7985876',
//   AccNo: '',
//   Branch: '',
//   OrgName: '',
//   Phone: '1364262762572752',
//   NRC: '5575765763131'
// }
// console Chris
// console 1364262762572752
// [nodemon] restarting due to changes...
// [nodemon] starting `node index.js`
// Connected to backend.
// console {
//   Fname: 'Chris',
//   Lname: 'Kunda',
//   Gender: 'Male',
//   email: 'b@dd.om',
//   password: '7985876433356356334',
//   AccNo: '',
//   Branch: '',
//   OrgName: '',
//   Phone: '1364262762572752',
//   NRC: '5575765763131dga'
// }

