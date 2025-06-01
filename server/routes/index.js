const { Router } = require('express');
const phonesRouter = require('./phonesRouter');
const cpusRouter = require('./cpusRouter');

const router = Router();

router.use('/phones', phonesRouter);
router.use('/cpus', cpusRouter);

module.exports = router;
