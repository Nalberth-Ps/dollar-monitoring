import { Router } from 'express';
import { handleDatasetUpload } from '../controllers/dataController';

const router = Router();

router.post('/upload', handleDatasetUpload);

export default router;
