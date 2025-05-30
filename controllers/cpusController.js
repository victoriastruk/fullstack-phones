const createHttpError = require('http-errors');
const { Phone, Cpu } = require('../models');

module.exports.getPhonesByCpu = async (req, res, next) => {
  try {
    const { id } = req.params;

    const phones = await Phone.findAll({
      where: { cpu_id: id },
      attributes: { exclude: ['cpu_id', 'createdAt', 'updatedAt'] },
      include: {
        model: Cpu,
        attributes: ['name', 'manifacturer'],
      },
    });

    res.status(200).send({ data: phones });
  } catch (err) {
    next(err);
  }
};
module.exports.createPhoneWithCpu = async (req, res, next) => {
  try {
    const { model, brand, year, ram, screen_size, has_nfc } = req.body;

    const { id: cpu_id } = req.params;

    const cpu = await Cpu.findByPk(cpu_id);
    if (!cpu) {
      return next(createHttpError(404, 'CPU Not Found'));
    }

    const phone = await Phone.create({
      model,
      brand,
      year,
      ram,
      screen_size,
      has_nfc,
      cpu_id: Number(cpu_id),
    });

    res.status(201).send({ data: phone });
  } catch (err) {
    next(err);
  }
};
