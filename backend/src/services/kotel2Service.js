import { Kotel2Model } from '../models/kotelModel.js';

export const readDataKotel2 = async (modbusClient, deviceID, deviceLabel) => {
  try {
    // НЕ вызываем modbusClient.connect();

    const raw = await modbusClient.readInt32(deviceID, 0x0000, deviceLabel);
    const dec1 = raw & 0xffff;
    const dec0 = (raw >>> 16) & 0xffff;

    const alarmsMap = {
      'Уровень высок': 0,
      'Уровень низок': 1,
      'Разрежение мало': 2,
      'Давление воздуха низко': 3,
      'Давление газа низко': 4,
      'Давление газа высоко': 5,
      'Факел горелки погас': 6,
      'Дымосос отключен': 7,
      'Останов по команде': 8,
      'Давление пара высоко': 9,
      'Ложное срабатывание датчика пламени': 10,
      'Запальник не разжегся': 11,
      'Пламя запальника погасло': 12,
    };

    const extraInfoMap = {
      'Клапан запальника': 13,
      'Искрообразование': 14,
      'Розжиг запальника': 15,
    };

    const infoMap = {
      'Останов котла': 0,
      'Режим вентиляции': 1,
      'Режим стабилизации запальника': 2,
      'Розжиг горелки': 3,
      'Режим стабилизации горелки': 4,
      'Клапан отсекатель': 5,
      'Рабочий режим': 6,
      'Факел запальника': 7,
      'Пламя горелки': 8,
      'Работа дымососа': 9,
    };

    function decodeFlags(word, map) {
      return Object.fromEntries(
        Object.entries(map).map(([label, bit]) => [label, Boolean(word & (1 << bit))])
      );
    }

    const baseInfo = decodeFlags(dec1, infoMap);
    const extraInfo = decodeFlags(dec0, extraInfoMap);

    const info = {
      ...baseInfo,
      ...extraInfo,
    };

    const alarms = decodeFlags(dec0, alarmsMap);

    const parameters = {
      'Уровень в барабане котла': (
        await modbusClient.readInt16(deviceID, 0x0006, deviceLabel)
      ).toFixed(0),
      'Разрежение в топке котла': (
        await modbusClient.readFloat(deviceID, 0x0008, deviceLabel)
      ).toFixed(1),
      'Давление воздуха перед горелкой': (
        await modbusClient.readFloat(deviceID, 0x000a, deviceLabel)
      ).toFixed(0),
      'Давление газа перед горелкой': (
        await modbusClient.readFloat(deviceID, 0x000c, deviceLabel)
      ).toFixed(0),
      'Давление пара на выходе': (
        await modbusClient.readFloat(deviceID, 0x000e, deviceLabel)
      ).toFixed(1),
    };

    const im = {
      'ИМ уровня': (await modbusClient.readFloat(deviceID, 0x0010, deviceLabel)).toFixed(0),
      'ИМ разрежения': (await modbusClient.readFloat(deviceID, 0x0012, deviceLabel)).toFixed(0),
      'ИМ воздуха': (await modbusClient.readFloat(deviceID, 0x0014, deviceLabel)).toFixed(0),
      'ИМ газа': (await modbusClient.readFloat(deviceID, 0x0016, deviceLabel)).toFixed(0),
    };

    const others = {
      'Время вентиляции': await modbusClient.readFloat(deviceID, 0x0018, deviceLabel),
      'Задание на уровень': await modbusClient.readFloat(deviceID, 0x001a, deviceLabel),
    };

    // Формирование объекта данных
    const formattedDataKotel2 = {
      parameters: parameters,
      info: info,
      alarms: alarms,
      im: im,
      others: others,
      lastUpdated: new Date(),
    };

    // Сохранение данных в базу данных
    await new Kotel2Model(formattedDataKotel2).save();
    console.log(formattedDataKotel2);
  } catch (err) {
    console.error(`[${deviceLabel}] Ошибка при чтении данных:`, err);
  }
};
