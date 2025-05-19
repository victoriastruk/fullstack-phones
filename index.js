const { Op } = require('sequelize');
const { sequelize, Phone } = require('./models');

(async function () {
  //  додавання нового телефону
  const newPhone = {
    model: 'Realme GT',
    brand: 'Realme',
    year: 2021,
    ram: 8,
    cpu: 'Snapdragon 870',
    screen_size: 6.43,
    has_nfc: true,
  };

  const createdPhone = await Phone.create(newPhone);
  console.log('createdPhone: ', createdPhone.get());

  //  отримання списку телефонів (* 3-я сторінка при перегляді по 4 телефони на сторінці, упорядкованих за роком виробництва)
  const page = 3;
  const limit = 4;
  const offset = (page - 1) * limit;

  const pagedPhones = await Phone.findAll({
    raw: true,
    order: [['year', 'DESC']],
    limit: limit,
    offset: offset,
  });
  console.log('pagedPhones: ', pagedPhones);

  //  *отримання списку телефонів певного року видання
  const foundPhonesByYear = await Phone.findAll({
    raw: true,
    where: { year: 2021 },
  });
  console.log('foundPhonesByYear: ', foundPhonesByYear);

  //  *отримання списку телефонів старше 2020 року випуску
  const olderPhones = await Phone.findAll({
    raw: true,
    where: {
      year: {
        [Op.lt]: 2020,
      },
    },
  });
  console.log('olderPhones: ', olderPhones);

  //  оновлення: змінити розмір оперативної пам'яті телефону з id: 1
  const ramUpdatedPhone = await Phone.update(
    { ram: 4 },
    {
      raw: true,
      where: { id: 4 },
      returning: true,
    }
  );

  console.log('ramUpdatedPhone: ', ramUpdatedPhone[1][0]);

  //  *оновлення: додати нфс всім телефонам 2021 року випуску
  const nfcUpdatedPhone = await Phone.update(
    { has_nfc: true },
    {
      raw: true,
      where: { year: 2021 },
      returning: true,
    }
  );

  console.log('nfcUpdatedPhone: ', nfcUpdatedPhone);

  //  видалення телефону з id: 2.
  const deletedPhoneCount = await Phone.destroy({
    where: { id: 1 },
  });
  console.log('deletedPhoneCount: ', deletedPhoneCount);

  //  *видалення телефонів 2010 року випуску.
  const deletedByYearPhoneCount = await Phone.destroy({
    where: { year: 2010 },
  });
  console.log('deletedPByYearhoneCount: ', deletedByYearPhoneCount);
})();
