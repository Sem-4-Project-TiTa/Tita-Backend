const db = require("../db/db");

const createQuiz = (req, res) => {
    const { classroom_id, subGroups, quizName, startTime, endTime, quizLink } = req.body;
    db.query(
        "INSERT INTO quizzes (quiz_name, start_time, end_time, quiz_link) VALUES (?, ?, ?, ?)",
        [quizName, startTime, endTime, quizLink],
        (err, results, fields) => {
            if(err) {
                throw new Error(err);
            }
            db.query(
                "SELECT quiz_id FROM quizzes WHERE quiz_link = ?",
                [quizLink],
                (err, results, fields) => {
                    if (err) {
                        throw new Error(err);
                    }
                    const quiz_id = results[0].quiz_id;
                    for(let i=0; i<subGroups.length; i++){
                        db.query(
                            "SELECT sub_class_id FROM sub_class WHERE grp_no = ? AND class_id = ?",
                            [subGroups[i], classroom_id],
                            (err, results, fields) => {
                                if(err){
                                    throw new Error(err);
                                }
                                const sub_class_id = results[0].sub_class_id;
                                db.query(
                                    "INSERT INTO quiz_subclass VALUES (?, ?)",
                                    [quiz_id, sub_class_id],
                                    (err, results, fields) => {
                                        if(err) {
                                            throw new Error(err);
                                        }
                                    }
                                );
                            }
                        );
                    }
                    res.status(200).send(results);
                }
            );
        }
    );
}

module.exports = { createQuiz };