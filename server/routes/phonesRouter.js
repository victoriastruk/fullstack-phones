const { Router } = require('express');
const { phonesController } = require('../controllers');
const { paginate, upload } = require('../middleware');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(paginate.paginatePhones, phonesController.getPhones)
  .post(upload.uploadPhonePhoto, phonesController.createPhone);

phonesRouter
  .route('/:id')
  .get(phonesController.getPhoneById)
  .patch(phonesController.updatePhone)
  .delete(phonesController.deletePhone);

phonesRouter.patch(
  '/:id/images',
  upload.uploadPhonePhoto,
  phonesController.updatePhoneImage
);

module.exports = phonesRouter;
