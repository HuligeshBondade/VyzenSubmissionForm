const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 3500;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb+srv://huligeshbondade:sp9t454fK3H3ASmr@cluster0.nbqfwia.mongodb.net/VyzForm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const formDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    contactNumber: String,
    email: String,
    dateOfBirth: String,
    age: String,
    gender: String,
    maritalStatus: String,
    nationality: String,
    bloodGroup: String,
    currentAddress: String,
    permanentAddress: String,
    currentLocation: String,
    preferredLocation: String,
    hasPassport: String,
    passportNumber: String,
    passportCopy: String,
    aadhaarNumber: String,
    aadhaarCopy: String,
    panNumber: String,
    panCopy: String,
    drivingLicenseNumber: String,
    drivingLicenseCopy: String,
    voterIdNumber: String,
    voterIdCopy: String,
    photograph: String,
    workLink: String,
    resume: String,
    socialMediaLinks: String,
    portfolioLink: String,
    skills: String,
    languages: String,
    educationCourse: String,
    educationSpecialization: String,
    educationInstitution: String,
    educationYearOfCompletion: String,
    educationPassPercentage: String,
    educationProof: String,
    anyCertifications: String,
    certificatesObtained: String,
    certificationIssuingAuthority: String,
    certificationCompletionDate: String,
    certificationProof: String,
    tentativeJoiningDate: String,
    fresherStatus: String,
    backgroundCheck: String,
    drugTesting: String,
    criminalConvictions: String,
    criminalConvictionsDetails: String,
    acknowledgement: String
});

const FormData = mongoose.model('FormData', formDataSchema);

// API endpoint to handle form submission
app.post('/api/form/submit', (req, res) => {
    const formData = new FormData(req.body);

    formData.save()
        .then(() => {
            res.status(200).send('Form data saved successfully');
        })
        .catch((err) => {
            console.error('Error saving form data:', err);
            res.status(500).send('Error saving form data');
        });
});


// Routes to serve your HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/address', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'address.html'));
});

app.get('/identification', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'identification.html'));
});

app.get('/profession', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profession.html'));
});

app.get('/education', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'education.html'));
});

app.get('/acknowledgement', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'acknowledgement.html'));
});

app.get('/finalSubmission', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'finalSubmission.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
