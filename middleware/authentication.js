const Student = require('../models/Student');
const Dean = require('../models/Dean');

exports.verifyStudentToken = async(req, res, next) => {
  const token = req.headers.authorization;

  try {
    const student = await Student.findOne({ token });

    if (!student) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach the student object to the request for further use
    req.student = student;

    next();
  } catch (error) {
    res.status(500).json({ error: 'Token verification failed' });
  }

};

exports.verifyDeanToken = async(req, res, next) => {
  const token = req.headers.authorization;

  try {
    const dean = await Dean.findOne({ token });

    if (!dean) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach the dean object to the request for further use
    req.dean = dean;

    next();
  } catch (error) {
    res.status(500).json({ error: 'Token verification failed' });
  }  
};
