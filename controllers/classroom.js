const db = require("../db/db");

const createClassRoom = async (req, res) => {
  const { subjectName, subjectCode, subGroups, email } = req.body;
  let classroom_id = "asdfghjft";
  db.query(
    "SELECT tid FROM teachers where email = ?",
    [email],
    (err, results, fields) => {
      if (err){
        throw new Error(err);
      }
      const tid = results[0].tid;
      db.query(
        "SELECT * FROM classrooms where classroom_id = ?",
        [classroom_id],
        (err, results, fields) => {
          if (err) {
            throw new Error(err);
          }
          if (results.length === 0) {
            try {
              db.query(
                "INSERT INTO classrooms VALUES (?, ?, ?, ?)",
                [classroom_id, subjectName, subjectCode, subGroups],
                (err, results, fields) => {
                  if (err) {
                    throw new Error(err);
                  } 
                  for (let i = 1; i <= subGroups; i++) {
                    db.query(
                      "INSERT INTO sub_class(class_id,grp_no) VALUES (?,?)",
                      [classroom_id, parseInt(i)],
                      (err, results, fields) => {
                        if (err) {
                          throw new Error(err);
                        }
                        db.query(
                          "SELECT sub_class_id FROM sub_class WHERE class_id = ?",
                          [classroom_id],
                          (err, results, fields) => {
                            if(err) {
                              throw new Error(err);
                            }
                            db.query(
                              "INSERT INTO teach_class(tid, sub_class_id) VALUES (?, ?)",
                              [tid, results[i-1].sub_class_id],
                              (err, results, fields) => {
                                if(err) {
                                  throw new Error(err);
                                }
                              } 
                            );
                          }
                        );
                      }
                    );
                  }
                  res.status(200).send(results);
                }
              );
            } catch (err) {
              throw new Error(err);
            }
          }
        }
      );
    }
  );
};

const getClassroom=async(req,res)=>{
  const classid=req.params.id;
  db.query(
    "SELECT * FROM classrooms WHERE classroom_id=?",
    [classid],
    (err, results, fields) => {
      if (err) {
        throw new Error(err);
      }
      res.status(200).send(results);
    }
  )
  //res.status(400).send();
}

const joinClassroom=async(req,res)=>{
  const {classid,email,selected_grp_no}=req.body;
  console.log(classid,email,selected_grp_no);
  db.query(
    "SELECT sub_class_id FROM sub_class WHERE class_id=? AND grp_no=?",
    [classid,selected_grp_no],
    (err, results, fields) => {
      if (err) {
        throw new Error(err);
      }
      console.log(results)
      const sub_class_id=results[0].sub_class_id;
      db.query(
        "SELECT sid FROM students WHERE email=?",
        [email],
        (err, results, fields) => {
          if (err) {
            throw new Error(err);
          }
          const sid=results[0].sid;
          db.query(
            "INSERT INTO stud_class VALUES(?,?)",
            [sid,sub_class_id],
            (err, results, fields) => {
              if(err) {
                throw new Error(err);
              }
              res.status(200).send(results);
            }
          )
        }
      )
    }
  )
}

module.exports = { createClassRoom ,getClassroom,joinClassroom};
