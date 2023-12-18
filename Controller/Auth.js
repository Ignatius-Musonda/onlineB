

import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    console.log("console", req.body);
    console.log("console", req.body.Fname);
    console.log("console", req.body.Phone);

    // CHECK EXISTING USER
    const q = "SELECT * FROM student WHERE email = ? OR NRC = ?";

    db.query(q, [req.body.email, req.body.NRC], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        var StudentID = 241200335;

        const insertQuery = "INSERT INTO student(`StudentID`,`email`,`Gender`,`Date`,`DOB`,`NRC`,`Nationality`,`FName`,`LName`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const insertUserQuery = "INSERT INTO user(`UserID`,`Date`,`NRC`,`Password`,`Jwt`) VALUES (?, ?, ?, ?, ?)";
        const values = [
            StudentID,
            req.body.email,
            req.body.Gender,
            new Date(),
            "02/11/92",
            req.body.NRC,
            "Zambia",
            req.body.Fname,
            req.body.Lname,
        ];
        const valuesSec = [

            StudentID,
            // req.body.email,
            // req.body.Gender,
            new Date(),
            // "02/11/92",
            req.body.NRC,
            // "Zambia",
            // req.body.Fname,
            // req.body.Lname,
            hash,
            "Jwt sample"
        ];

        db.query(insertQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);      
                
            db.query(insertUserQuery, valuesSec, (err, data) => {

                if (err) return res.status(500).json(err);  
                return res.status(200).json("User has been created.");


            })



            
        });
    });
};


// export const register = (req, res) => {

//     console.log("console",req.body)
//     console.log("console",req.body.Fname)
//     console.log("console",req.body.Phone)

//     // Fname,
//     // Lname,
//     // Gender,
//     // email,
//     // password,
//     // AccNo,
//     // Branch,
//     // OrgName,
//     // Phone
//   //CHECK EXISTING USER
// //   const q = "SELECT * FROM student WHERE email = ?";
//   const q = "SELECT * FROM student WHERE email = ? OR NRC = ?";

//   db.query(q, [req.body.email], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length) return res.status(409).json("User already exists!");

//     //Hash the password and create a user
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     var StudentID = 24120000;


//     const q = "INSERT INTO student(`StudentID`,`email`,`Gender`,`Date`,`DOB`,`NRC`,`Nationality`,`FName`,`LName`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//     const values = [
//         StudentID,
//         req.body.email,
//         req.body.Gender,
//         new Date(),
//         "02/11/92",
//         req.body.NRC,
//         "Zambia",
//         req.body.Fname,
//         req.body.Lname,
//         req.body.email
//     ];
    
//     //const values = [req.body.username, req.body.email, hash];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("User has been created.");
//     });
//   });
// };

export const login = (req, res) => {
  //CHECK USER
  console.log("in login",req.body)

  const q = "SELECT * FROM user WHERE NRC = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    // console.log("data",data)
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].Password
    );
    console.log("geeting here",isPasswordCorrect)

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    return res.status(400).json("Success!");
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};