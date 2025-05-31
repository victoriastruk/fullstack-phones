const _ = require('lodash');
const { Phone } = require('../db/models');
const createHttpError = require('http-errors');

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;

  try {
    const createdPhone = await Phone.create(body);
    if (!createdPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    const preparedPhone = _.omit(createdPhone.get(), [
      'createdAt',
      'updatedAt',
    ]);
    res.status(201).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundPhones = await Phone.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      limit,
      offset,
      order: ['id'],
    });
    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundPhone = await Phone.findByPk(id, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!foundPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(200).send({ data: foundPhone });
  } catch (err) {
    next(err);
  }
};
module.exports.updatePhone = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedPhonesCount, [updatedPhone]] = await Phone.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });
    if (!updatedPhonesCount) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const preparedPhone = _.omit(updatedPhone, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};
module.exports.deletePhone = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPhonesCount = await Phone.destroy({ where: { id } });
    if (!deletedPhonesCount) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
