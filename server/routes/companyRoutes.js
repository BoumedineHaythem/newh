import express from 'express';
import { regesterCmopany } from '../controllers/companyController';

const router = express.Router()

// regester a company
router.post('/register',regesterCmopany)

// company login 
// router.post('/logincompany',logincompany)

// get company data
// router.get('/getcompanydata',getCompanyData)

// post a new job
// router.post('/post-job',postJob)

// get company job applicatio 
// router.get('/getcompanyjobapplicants',getCompanyJobApplicants)
// 5.53
// get company posted jobs
// router.get('/getcompanypostedjobs',getCompanyPostedJobs)


// change job application status
// router.post('/changejobapplicationstatus',changeJobApplicationStatus)

// change job visibility
// router.post('/changejobvisibility',changeJobVisibility)

export default companyRoutes;