const db = require("../db/db");

const login = (req, res) => {
  const { email, name } = req.body;
  db.query(
    "SELECT * FROM teachers WHERE email = ?",
    [email],
    (err, results, fields) => {
      if (err) {
        throw new Error(err);
      }
      if (results.length === 0) {
        db.query(
          "INSERT INTO teachers (name, email) VALUES (?, ?)",
          [name, email],
          (err, results, fields) => {
            if (err) {
              throw new Error(err);
            } else {
              res.status(200).send();
            }
          }
        );
      }
      res.status(200).send();
    }
  );
};

const getTimeTable = (req, res) => {
  const email = req.params.email;
  db.query(
    `SELECT
    class_id,
    grp_no,
    branchname,
    branchyear,
    course_name,
    course_code,
    type,
    day,
    start_time,
    end_time
  FROM (SELECT
    *
  FROM (SELECT
    sc_id,
    start_time,
    end_time,
    day,
    type,
    course_name,
    course_code
  FROM timetable t
  JOIN (SELECT
    class_id,
    sub_class_id AS sc_id,
    course_name,
    course_code
  FROM sub_class s
  JOIN classrooms c
    ON s.class_id = c.classroom_id
  WHERE sub_class_id IN (SELECT
    sub_class_id
  FROM teach_class
  WHERE tid IN (SELECT
    tid
  FROM teachers
  WHERE email = "adm.tita.cms@gmail.com"))) u
    ON t.sub_class_id = u.sc_id) A
  JOIN (SELECT
    *
  FROM sub_class) B
    ON A.sc_id = B.sub_class_id) X
  JOIN (SELECT
    classroom_id,
    branchname,
    branchyear
  FROM classrooms
  WHERE classroom_id IN (SELECT
    class_id
  FROM sub_class
  WHERE sub_class_id IN (SELECT
    sub_class_id
  FROM teach_class
  WHERE tid IN (SELECT
    tid
  FROM teachers
  WHERE email = "adm.tita.cms@gmail.com")))) Y
    ON X.class_id = Y.classroom_id`,
    [email],
    (err, results, fields) => {
      if (err) throw new Error(err);
      res.status(200).send(results);
    }
  );
};

const getClassrooms = (req, res) => {
  const email = req.params.email;
  db.query(
    `SELECT
      classroom_id,
      course_name,
      course_code,
      branchName,
      branchYear
    FROM classrooms
    WHERE classroom_id IN (SELECT
      class_id
    FROM sub_class
    WHERE sub_class_id IN (SELECT
      sub_class_id
    FROM teach_class
    WHERE tid IN (SELECT
      tid
    FROM teachers
    WHERE email = ?)))`,
    [email],
    (err, results, fields) => {
      if(err) throw new Error(err);
      res.status(200).send(results);  
    }
  );
};

module.exports = { login, getTimeTable, getClassrooms };
