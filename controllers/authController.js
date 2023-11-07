const Dean = require('../models/Dean');
const Student = require('../models/Student');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

// Student authentication logic
exports.studentAuthentication = async (req, res) => {
    try {
      const { universityID, password } = req.body;
  
      // Check if the student already exists
      const existingStudent = await Student.findOne({ universityID });
      if (existingStudent) {
        return res.status(400).json({ error: 'Student already exists' });
      }
  
      // Generate a unique UUID token for the student
      const token = uuid.v4();
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new student
      const student = new Student({
        universityID,
        password: hashedPassword,
        token,
      });
  
      await student.save();
  
      res.json({ message: 'Student registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Student registration failed' });
    }
};

exports.deanAuthentication = async (req, res) => {
  try {
    const { universityID, password } = req.body;

    // Check if the dean already exists
    const existingDean = await Dean.findOne({ universityID });
    if (existingDean) {
      return res.status(400).json({ error: 'Dean already exists' });
    }

    // Generate a unique UUID token for the dean
    const token = uuid.v4();

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new dean
    const dean = new Dean({
      universityID,
      password: hashedPassword,
      token,
    });

    await dean.save();
    res.json({ message: 'Dean registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Dean registration failed' });
  }
}
