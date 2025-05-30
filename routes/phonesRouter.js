const { Router } = require('express');
const { phonesController } = require('../controllers');
const { paginate } = require('../middleware');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(paginate.paginatePhones, phonesController.getPhones)
  .post(phonesController.createPhone);

phonesRouter
  .route('/:id')
  .get(phonesController.getPhoneById)
  .patch(phonesController.updatePhone)
  .delete(phonesController.deletePhone);

module.exports = phonesRouter;
