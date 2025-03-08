import { Router } from "express";
import { connectionRequest } from "../controllers/requests/connectionRequest.controller.js";
import {userAuth} from "../middleware/auth.middleware.js";
import { recievedRequestsController } from "../controllers/requests/receivedRequests.controller.js";
import { sentRequestsFeed } from "../controllers/requests/sentRequestsFeed.controller.js";
import { reviewRequestController } from "../controllers/requests/reviewRequest.controller.js";
import { acceptedRequestsController } from "../controllers/requests/acceptedRequests.controller.js";
const router = Router();

router.post("/request/send/:status/:toUserId",userAuth,connectionRequest);
//we are adding dynamic status => status can be ignored or interested only.
router.get("/connection-requests-feed",userAuth,recievedRequestsController);
router.get("/sent-requests-feed",userAuth,sentRequestsFeed);
router.post("/request/review/:status/:requestId",userAuth,reviewRequestController);
router.get("/accepted-requests-feed",userAuth,acceptedRequestsController);



export default router;