import { Router } from 'express';
import multer from 'multer';
import { health,uploadController,generatorController } from '../controllers/api.js';
const router=Router();
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:12*1024*1024,files:1},fileFilter:(req,file,cb)=>cb(null,/\.zip$/i.test(file.originalname)&&['application/zip','application/x-zip-compressed','application/octet-stream',''].includes(file.mimetype))});
router.get('/health',health);
for(const [route,mode] of [['zip/analyze','zip'],['resource-pack/analyze','resource-pack'],['java-converter','java-converter'],['compiler','compiler']])router.post('/'+route,upload.single('file'),uploadController(mode));
for(const [route,kind] of [['plugin/generate','plugin'],['config/generate','config'],['gui/generate','gui'],['sprite/generate','sprite']])router.post('/'+route,generatorController(kind));
export default router;
