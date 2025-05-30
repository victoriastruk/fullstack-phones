const { Router } = require('express');
const { cpusController } = require('../controllers');

const cpusRouter = Router();
cpusRouter
  .route('/:id/phones')
  .get(cpusController.getPhonesByCpu)
  .post(cpusController.createPhoneWithCpu);

module.exports = cpusRouter;
