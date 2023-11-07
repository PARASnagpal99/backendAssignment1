const Session = require('../models/Session');
exports.listFreeSessions = async (req, res) => {
  try {
    // Find all sessions with availability set to "Available"
    const freeSessions = await Session.find({ availability: 'Available' });

    // You can customize the response format as needed
    const sessionList = freeSessions.map((session) => ({
      date: session.date,
      startDateTime: session.startDateTime,
      endDateTime: session.endDateTime,
    }));

    res.json({ sessions: sessionList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list free sessions' });
  }
};

exports.bookSession = async (req, res) => {
    try {
      const student = req.student;
      const { sessionID } = req.body;
  
      const session = await Session.findById(sessionID);
  
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      if (session.availability === 'Booked') {
        return res.status(400).json({ error: 'Session is already booked' });
      }
  
      // Check if the session's start time is in the future
      const currentDateTime = new Date();
      if (currentDateTime >= session.startDateTime) {
        return res.status(400).json({ error: 'Session start time has already passed' });
      }
  
      // Update the session's availability, associate it with the student, and save the start and end times
      session.availability = 'Booked';
      session.studentID = student._id;
      await session.save();
  
      res.json({ message: 'Session booked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to book the session' });
    }
  };
  
  exports.listPendingSessions = async (req, res) => {
    try {
      const dean = req.dean;
  
      // Find sessions associated with the dean where the start time is in the future and status is 'Scheduled'
      const pendingSessions = await Session.find({
        deanID: dean._id,
        startDateTime: { $gt: new Date() },
        status: 'Scheduled',
      }).populate('studentID', 'universityID');
  
      // Customize the response format as needed
      const pendingSessionList = pendingSessions.map((session) => ({
        studentName: session.studentID.universityID,
        sessionDate: session.date,
      }));
  
      res.json({ sessions: pendingSessionList });
    } catch (error) {
      res.status(500).json({ error: 'Failed to list pending sessions' });
    }
  };
  

// Insert sessions logic
exports.insertSessions = async (req, res) => {
  try {
    // Assuming you have attached the dean object in the previous authentication middleware
    const dean = req.dean;

    // You can get session data from the request body (modify this as per your requirements)
    const { sessions } = req.body;

    // Create an array to hold the sessions to be inserted
    const sessionsToInsert = [];

    // Iterate over the sessions data and prepare the sessions for insertion
    for (const sessionData of sessions) {
      const newSession = new Session({
        deanID: dean._id,
        date: sessionData.date,
        startDateTime: sessionData.startDateTime,
        endDateTime: sessionData.endDateTime,
        availability: 'Available', // Set the initial availability status
      });

      sessionsToInsert.push(newSession);
    }

    // Insert the prepared sessions into the database
    await Session.insertMany(sessionsToInsert);

    res.json({ message: 'Sessions inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to insert sessions' });
  }
};
