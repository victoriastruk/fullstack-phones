const _ = require('lodash');
const { Phone, Cpu } = require('../db/models');
const createHttpError = require('http-errors');

module.exports.createPhone = async (req, res, next) => {
  const { body, file } = req;

  try {
    if (file) {
      body.image = file.filename;
    }

    const createdPhone = await Phone.create(body);
    if (!createdPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const preparedPhone = await Phone.findByPk(createdPhone.id, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'cpu_id'] },
      include: [
        {
          model: Cpu,
          attributes: ['name', 'manifacturer'],
        },
      ],
    });

    const plainPhone = preparedPhone.get({ plain: true });

    const result = {
      ..._.omit(plainPhone, ['Cpu']),
      name: preparedPhone.Cpu?.name || null,
      manufacturer: preparedPhone.Cpu?.manifacturer || null,
    };

    res.status(201).send({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundPhones = await Phone.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'cpu_id'],
      },
      include: [
        {
          model: Cpu,
          attributes: ['name', 'manifacturer'],
        },
      ],
      limit,
      offset,
      order: ['id'],
    });

    const result = foundPhones.map((phone) => {
      const plainPhone = phone.get({ plain: true });
      return {
        ..._.omit(plainPhone, ['Cpu']),
        name: phone.Cpu?.name || null,
        manufacturer: phone.Cpu?.manifacturer || null,
      };
    });
    res.status(200).send({ data: result });
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

module.exports.updatePhoneImage = async (req, res, next) => {
  const { id } = req.params;
  const filename = req.file?.filename;

  if (!filename) {
    return next(createHttpError(422, 'Image is required'));
  }

  try {
    const [updatedPhonesCount, [updatedPhone]] = await Phone.update(
      { image: filename },
      { where: { id }, returning: true }
    );

    if (!updatedPhonesCount) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(200).send({ data: updatedPhone });
  } catch (err) {
    next(err);
  }
};
