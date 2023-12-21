

import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    console.log("console", req.body);
    console.log("console", req.body.Fname);
    console.log("console", req.body.Phone);

    

    // CHECK EXISTING USER
    const q = "SELECT * FROM student WHERE email = ? OR NRC = ?";
    // const latestStudentQuery = "select max(userid) as latestStudent from user"

    db.query(q, [req.body.email, req.body.NRC], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // var StudentID = 241200335;

        // db.query(latestStudentQuery,(err,res)=>{
        //     console.log("results",res)
        // })

        const insertQuery = "INSERT INTO student(`StudentID`,`email`,`Gender`,`Date`,`DOB`,`NRC`,`Nationality`,`FName`,`LName`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const insertUserQuery = "INSERT INTO user(`UserID`,`Date`,`NRC`,`Password`,`Jwt`,`Email`) VALUES (?, ?, ?, ?, ?,?)";
        

                    // CHECKING FOR NEXT STUDENT NUMBER


                        //     const latestStudentNumber = res[0].latestStudent || 0;
                        //     console.log("latestStudent",res[0].latestStudent)

                        // // Get the current date to determine the month
                        // const currentDate = new Date();
                        // const currentYear = currentDate.getFullYear();
                        // const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month

                        // // Assuming latestStudent is in the format YearMonthStudentNumber
                        // const latestYear = String(latestStudentNumber).substring(0, 2);
                        // const latestMonth = String(latestStudentNumber).substring(2, 4);

                        // if (latestYear === currentYear.toString() 
                        // && 
                        //     latestMonth === currentMonth
                        //     ) 
                        // {
                        //     // Increment the existing student number by 1
                        //     const nextStudentNumber = parseInt(latestStudentNumber) + 1;
                        //     console.log("Next Student Number:", nextStudentNumber);
                        // } else {
                        //     // Generate a new student number for the current year and month
                        //     const YearnMonthMultiplier = parseInt(`${currentYear}${currentMonth}`) * 100000;
                        //     const nextStudentNumber = YearnMonthMultiplier + 1;
                        //     console.log("Next Student Number:", nextStudentNumber);
                        // }

                         // END OF CHECKING FOR NEXT STUDENT NUMBER



     

        // const nextStudentNumber = ''

        const latestStudentQuery = "SELECT MAX(StudentID) AS latestStudent FROM student";
        // const latestStudentQuery = "SELECT MAX(userid) AS latestStudent FROM user";

        db.query(latestStudentQuery, (err, data) => {
            if (err) {
                console.error("Error fetching latest student:", err);
                return;
            }
        
            const latestStudentNumber = data[0].latestStudent || 0;
            console.log("latestStudent", data[0].latestStudent);
        
            // Get the current date to determine the month
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month
            // const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month
        
            // Assuming latestStudent is in the format YearMonthStudentNumber
            const latestYear = String(latestStudentNumber).substring(0, 2);
            const latestMonth = String(latestStudentNumber).substring(2, 4);
        
             let nextStudentNumber; // Declare nextStudentNumber outside of the if statement

             const valuesSec = [

                // nextStudentNumber,
                // req.body.email,
                // req.body.Gender,
                new Date(),
                // "02/11/92",
                req.body.NRC,
                hash,
                "Jwt sample",
                req.body.email,
            ];

            const values = [ 
                // nextStudentNumber,
                req.body.email,
                req.body.Gender,
                new Date(),
                "02/11/92",
                req.body.NRC,
                "Zambia",
                req.body.Fname,
                req.body.Lname,
            ];

            // console.log("CURRENT YEAR",String(currentYear).substring(2,5).trim())
            // console.log("CURRENT YEAR JUST",String(currentYear))
            // console.log("LATEST YEAR",latestYear)
            // console.log("CURRENT MONTH",currentMonth)
            // console.log("LATEST MONTH",latestMonth)
    
        
            if (latestYear === String(currentYear).substring(2,5).trim() && latestMonth === currentMonth) {
            

                console.log("iN EQUAL");

                // Increment the existing student number by 1
                 nextStudentNumber = parseInt(latestStudentNumber) + 1;
                console.log("Next Student Number:", nextStudentNumber);
                console.log("VALUES:", values);
                   // Continue with your code using nextStudentNumber

                 
                    db.query(insertQuery, [nextStudentNumber,...values], (err, data) => {
                        if (err) return res.status(500).json(err);
                        
                        console.log("ress",data)
                        db.query(insertUserQuery, [nextStudentNumber,...valuesSec], (err, data) => {
                            if (err) return res.status(500).json(err);
                            return res.status(200).json("User has been created.");
                        });
                    });

            } else {
                // Generate a new student number for the current year and month
                const YearnMonthMultiplier = parseInt(`${String(currentYear).substring(2,5)}${currentMonth}`) * 100000;
                    nextStudentNumber = YearnMonthMultiplier + 1;
                console.log("iN NO EQUAL");
                console.log("Next Student Number:", nextStudentNumber);
                console.log("VALUES:", values);

                   // Continue with your code using nextStudentNumber
        
                    db.query(insertQuery, [nextStudentNumber,...values], (err, data) => {
                        if (err) return res.status(500).json(err);
                
                        db.query(insertUserQuery,[nextStudentNumber,...valuesSec], (err, data) => {
                            if (err) return res.status(500).json(err);
                            return res.status(200).json("User has been created.");
                        });
                    });


            }
        
         
        });
        
        
        

        // db.query(insertQuery, values, (err, data) => {
        //     if (err) return res.status(500).json(err);      
                
        //     db.query(insertUserQuery, valuesSec, (err, data) => {

        //         if (err) return res.status(500).json(err);  
        //         return res.status(200).json("User has been created.");


        //     })



            
        // });
    });
};




export const login = (req, res) => {
  //CHECK USER
  console.log("in login",req.body)

  const q = "SELECT * FROM user WHERE Email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    console.log("data",data)
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].Password
    );
    console.log("geeting here",isPasswordCorrect)

    const latestStudentQuery = "select max(userid) as latestStudent from user"



    if (!isPasswordCorrect)
      return res.status(200).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res.cookie("access_token", token, {
        httpOnly: true,
      })
    //   .status(200)
    //   .json(other);

    return res.status(200).json("Success!");
  


  }
  
  );
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};