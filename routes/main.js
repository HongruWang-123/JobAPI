const express = require('express');
const router = express.Router();

const {login,register} = require('../controller/auth');
const {getAllJobs,getJob,createJob,updateJob,deleteJob} = require('../controller/job');

const auth = require('../middleware/auth');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/job').get(auth,getAllJobs).post(auth,createJob);
router.route('/job/:id').get(auth,getJob).patch(auth,updateJob).delete(auth,deleteJob);

module.exports = router;