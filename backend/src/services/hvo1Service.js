import { Hvo1Model } from '../models/hvo1Model.js';

export const readDataHvo1 = async (modbusClient, deviceID, deviceLabel) => {
  try {
    const pressures = {
      'Давление воды на входе установки': ((await modbusClient.readFloat(deviceID, 0x0000, deviceLabel)) * 0.1).toFixed(
        1,
      ),
      'Давление воды после насосов H1/1,2,3': (
        (await modbusClient.readFloat(deviceID, 0x0002, deviceLabel)) * 0.1
      ).toFixed(1),
      'Давление воды после насосов H2/1,2': (
        (await modbusClient.readFloat(deviceID, 0x0004, deviceLabel)) * 0.1
      ).toFixed(1),
      'Давление воды после насосов H3/1,2': (
        (await modbusClient.readFloat(deviceID, 0x0006, deviceLabel)) * 0.1
      ).toFixed(1),
    };
    const flows = {
      'Расход воды на установку': ((await modbusClient.readFloat(deviceID, 0x000c, deviceLabel)) * 1.5).toFixed(
        0,
      ),
      'Расход воды на промывку фильтров': (
        (await modbusClient.readFloat(deviceID, 0x000e, deviceLabel)) * 2
      ).toFixed(0),
    };
    const levels = {
      'Уровень воды в емкости E1/1': ((await modbusClient.readFloat(deviceID, 0x0008, deviceLabel)) * 16).toFixed(0),
      'Уровень воды в емкости E1/2': ((await modbusClient.readFloat(deviceID, 0x000a, deviceLabel)) * 16).toFixed(0),
      'Уровень воды в емкости E2/1,2': (await modbusClient.readFloat(deviceID, 0x0012, deviceLabel)).toFixed(0),
    };

    const frequency = {
      'Выход РАН давления воды для ПЧ H1/1': (await modbusClient.readFloat(deviceID, 0x0014, deviceLabel)).toFixed(
        0,
      ),
      'Рабочая частота насоса H1/1': (await modbusClient.readFloat(deviceID, 0x0016, deviceLabel)).toFixed(0),
      'Выход РАН давления воды для ПЧ H1/2': (await modbusClient.readFloat(deviceID, 0x0018, deviceLabel)).toFixed(
        0,
      ),
      'Рабочая частота насоса H1/2': (await modbusClient.readFloat(deviceID, 0x001a, deviceLabel)).toFixed(0),
      'Выход РАН давления воды для ПЧ H2/1': (await modbusClient.readFloat(deviceID, 0x001c, deviceLabel)).toFixed(
        0,
      ),
      'Рабочая частота насоса H2/1': (await modbusClient.readFloat(deviceID, 0x001e, deviceLabel)).toFixed(0),
      'Выход РАН давления воды для ПЧ H2/2': (await modbusClient.readFloat(deviceID, 0x0020, deviceLabel)).toFixed(
        0,
      ),
      'Рабочая частота насоса H2/2': (await modbusClient.readFloat(deviceID, 0x0022, deviceLabel)).toFixed(0),
    };
    const task = {
      'Задание уровня воды в емкостях E1/1,2': (await modbusClient.readFloat(deviceID, 0x0024, deviceLabel)).toFixed(0),
      'Задание рег-ру давления воды после H1/1,2': (
        await modbusClient.readFloat(deviceID, 0x0026, deviceLabel)
      ).toFixed(2),
      'Задание рег-ру давления воды после H2/1,2': (
        await modbusClient.readFloat(deviceID, 0x0028, deviceLabel)
      ).toFixed(2),
    };

    const others = {
      'Контроль положения ИМ1': (await modbusClient.readFloat(deviceID, 0x0010, deviceLabel)).toFixed(0),
      'УПД №1 (Шкаф №1)': (await modbusClient.readFloat(deviceID, 0x002c, deviceLabel)).toFixed(0),
      'УПД №2 (Шкаф №1)': (await modbusClient.readFloat(deviceID, 0x002e, deviceLabel)).toFixed(0),
    };

    // Формирование объекта данных
    const formattedDataHvo1 = {
      pressures: pressures,
      flows: flows,
      levels: levels,
      frequency: frequency,
      task: task,
      others: others,
      lastUpdated: new Date(),
    };

    // Сохранение данных в базу данных
    await new Hvo1Model(formattedDataHvo1).save();
    // console.log(formattedDataHvo1);
  } catch (err) {
    console.error(`[${deviceLabel}] Ошибка при чтении данных:`, err);
  }
};
