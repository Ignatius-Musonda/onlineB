



import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getApplications = (req, res) => {
  const q = "SELECT * FROM applicants";
//   const q = req.query.cat
//     ? "SELECT * FROM course WHERE cat=?"
//     : "SELECT * FROM course";

  db.query(q, (err, data) => {
//   db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    
    console.log("data",data)
    return res.status(200).json(data);
  });
};

export const getApplication = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addApplication = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "jwtkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

    // const q =
    //   "INSERT INTO applicants (`User_ID`, `NRC`, `FirstName`, `LastName`, `LastName`,`Email`,`CreationDate`,`IntakeID`,`Status`) VALUES (?,?,?,?,?,?,?,?,?)";

    // const values = [
    //   req.body.Branch,
    //   req.body.Branch,
    //   req.body.Branch,
    //   req.body.Branch,
    //   req.body.Branch,
    //   req.body.Branch,
    //   req.body.Branch,
    //   new Date(),
    //   req.body.Branch,
      
    // ];

    // db.query(q, [values], (err, data) => {
        const q =
        "INSERT INTO applicants (`User_ID`, `NRC`, `FirstName`, `LastName`, `Email`, `CreationDate`, `IntakeID`, `Status`) VALUES (?,?,?,?,?,?,?,?)";
      
      const values = [
        req.body.UserID,
        req.body.NRC,
        req.body.FName,
        req.body.LName,
        req.body.Email,
        new Date(),
        req.body.IntakeID,
        "Pending",
        
        // req.body.User_ID,
        // req.body.NRC,
        // req.body.FirstName,
        // req.body.LastName,
        // req.body.Email,
        // new Date(),
        // req.body.IntakeID,
        // req.body.Status,


      ];
      
      db.query(q, values, (err, data) => {
        // Your callback logic here
      
      
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });

//   });
};

export const deleteApplication = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updateApplication = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};