const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const registrationController = require("../controllers/registrationController");
const resultController = require('../controllers/resultController');
const upload = require("../middlewares/multerMiddleware");
const videoController = require("../controllers/videoController");
const eventController = require('../controllers/eventController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const notificationController = require("../controllers/notificationController");
const multerImageMiddleware = require('../middlewares/multerImageMiddleware');
const { getAdminData } = require('../controllers/userController');
const paymentController = require("../controllers/paymentController");
const volunteerController = require("../controllers/volunteerController");

router.post('/register', userController.register);
router.post('/login', userController.login);


router.post("/register-participant", jwtMiddleware, registrationController.registerParticipant);
router.get("/participants", jwtMiddleware, registrationController.getAllParticipants);


router.post("/results", resultController.createResult);
router.get("/results", resultController.getResults);


router.post("/upload-video", upload.single("video"), videoController.uploadVideo);
router.get("/videos", videoController.getAllVideos);


router.post("/add-event", eventController.addEvent);
router.get("/events", eventController.getEvents);


router.post("/add-not", notificationController.createNotification);
router.get("/get-notifications", notificationController.getNotifications);


router.get("/users", jwtMiddleware, userController.getAllUsers);
router.put('/admin/updateAdmin', jwtMiddleware, multerImageMiddleware.single('profile'), userController.updateAdmin);

router.get("/admin", jwtMiddleware, userController.getAdminData);
router.delete("/videos/:id", videoController.deleteVideo); 

router.post("/pay-water", paymentController.payForWater);



router.post("/volunteer-request", jwtMiddleware, volunteerController.createRequest); 
router.get("/volunteer-requests", jwtMiddleware, volunteerController.getAllRequests); 
 router.put("/volunteer-requests/:id", jwtMiddleware, volunteerController.updateRequestStatus);


router.get("/participant", jwtMiddleware,userController.getParticipantData);
router.put("/participant/update", jwtMiddleware, upload.single("profile"),userController.updateParticipant);

router.put(
  '/organizer/update',
  jwtMiddleware,
  upload.single('profile'), 
  userController.updateOrganizer
);

router.get("/organizer", jwtMiddleware, userController.getOrganizerData);

router.post("/google-login", userController.googleLogin);
module.exports = router;
