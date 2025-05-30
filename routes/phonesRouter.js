const { Router } = require('express');
const { phonesController } = require('../controllers');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(phonesController.getPhones)
  .post(phonesController.createPhone);

phonesRouter
  .route('/:id')
  .get(phonesController.getPhoneById)
  .patch(phonesController.updatePhone)
  .delete(phonesController.deletePhone);

module.exports = phonesRouter;
