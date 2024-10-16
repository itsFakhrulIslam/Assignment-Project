const Student = require('./models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({ name, email, password: hashedPassword });
    await newStudent.save();
    res.status(201).json({ message: 'Student registered' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student || !(await bcrypt.compare(password, student.password))) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Logged in' });
};

exports.getProfile = async (req, res) => {
    const student = await Student.findById(req.student.id);
    res.json(student);
};

exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;
    const student = await Student.findByIdAndUpdate(req.student.id, { name, email }, { new: true });
    res.json(student);
};





const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

exports.uploadFile = upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const student = await Student.findByIdAndUpdate(req.student.id, { profilePic: req.file.path }, { new: true });
    res.json(student);
};

exports.deleteFile = async (req, res) => {
    const student = await Student.findById(req.student.id);
    if (student.profilePic) {
        const fs = require('fs');
        fs.unlinkSync(student.profilePic);
        student.profilePic = null;
        await student.save();
        res.json({ message: 'File deleted' });
    } else {
        res.status(400).send('No file to delete');
    }
};
