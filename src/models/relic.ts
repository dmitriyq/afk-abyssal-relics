import { RelicGrade } from './grade';

export type RelicId = number;

export type Relic = {
  id: RelicId;
  name: string;
  grade: RelicGrade;
  price: number;
  parts: RelicId[];
};

export const getRelicById = (id: RelicId) => relics.find((r) => r.id === id)!;
export const getRelicImage = (id: RelicId) => new URL(`./../assets/relics/${id}.png`, import.meta.url).href;

export const relics: Relic[] = [
  { id: 1, name: 'Алтарное кадило', grade: 'common', price: 1680, parts: [] },
  { id: 2, name: 'Безжалостный тесак', grade: 'common', price: 1200, parts: [] },
  { id: 3, name: 'Ботинки путешественника', grade: 'common', price: 2820, parts: [] },
  { id: 4, name: 'Камень доблести', grade: 'common', price: 2100, parts: [] },
  { id: 5, name: 'Камень ловкости', grade: 'common', price: 1500, parts: [] },
  { id: 6, name: 'Камень мудрости', grade: 'common', price: 1980, parts: [] },
  { id: 7, name: 'Камень решимости', grade: 'common', price: 2220, parts: [] },
  { id: 8, name: 'Камень сострадания', grade: 'common', price: 2400, parts: [] },
  { id: 9, name: 'Книга ученых', grade: 'common', price: 1800, parts: [] },
  { id: 10, name: 'Кубок поэта', grade: 'common', price: 1560, parts: [] },
  { id: 11, name: 'Маска страха', grade: 'common', price: 2400, parts: [] },
  { id: 12, name: 'Наручи мечника', grade: 'common', price: 1620, parts: [] },
  { id: 13, name: 'Печать ученика', grade: 'common', price: 2160, parts: [] },
  { id: 14, name: 'Плащ стражника', grade: 'common', price: 2160, parts: [] },
  { id: 15, name: 'Подвеска оракула', grade: 'common', price: 1140, parts: [] },
  { id: 16, name: 'Простой каплевидный щит', grade: 'common', price: 2760, parts: [] },
  { id: 17, name: 'Спрятанный клинок', grade: 'common', price: 1980, parts: [] },
  { id: 18, name: 'Око доблести', grade: 'rare', price: 1500, parts: [4, 4] },
  { id: 19, name: 'Офицерский ремень', grade: 'rare', price: 360, parts: [20, 14, 11] },
  { id: 20, name: 'Пояс стражника', grade: 'common', price: 2880, parts: [] },
  { id: 21, name: 'Храмовое кадило', grade: 'rare', price: 2760, parts: [1, 13] },
  { id: 22, name: 'Объятия разведчика', grade: 'rare', price: 1140, parts: [14, 11] },
  { id: 23, name: 'Зов ярости', grade: 'rare', price: 2040, parts: [2, 17] },
  { id: 24, name: 'Цареубийство', grade: 'rare', price: 900, parts: [17, 2, 15] },
  { id: 25, name: 'Маска исповедника', grade: 'rare', price: 2040, parts: [11, 13] },
  { id: 26, name: 'Око ловкости', grade: 'rare', price: 1860, parts: [5, 5] },
  { id: 27, name: 'Сапоги кавалериста', grade: 'rare', price: 3240, parts: [3, 15] },
  { id: 28, name: 'Благородный клинок', grade: 'elite', price: 5760, parts: [23, 24] },
  { id: 29, name: 'Изгиб молнии', grade: 'elite', price: 3360, parts: [24, 23] },
  { id: 30, name: 'Ядро доблести', grade: 'elite', price: 2400, parts: [18, 18] },
  { id: 31, name: 'Пояса бессмертного', grade: 'elite', price: 4080, parts: [19, 32, 33] },
  { id: 32, name: 'Наручи наемника', grade: 'rare', price: 1680, parts: [12, 12] },
  { id: 33, name: 'Печать солнцехода', grade: 'rare', price: 1020, parts: [13, 15, 1] },
  { id: 34, name: 'Соборное кадило', grade: 'elite', price: 10800, parts: [21, 33] },
  { id: 35, name: 'Благодать для тела', grade: 'elite', price: 1740, parts: [22, 36, 16] },
  { id: 36, name: 'Щит из темной стали', grade: 'rare', price: 120, parts: [16, 14, 13] },
  { id: 37, name: 'Вечный воин', grade: 'legendary', price: 12600, parts: [28, 29, 38] },
  { id: 38, name: 'Корона бессмертного', grade: 'elite', price: 1320, parts: [39, 39, 39] },
  { id: 39, name: 'Клятва заходящего солнца', grade: 'rare', price: 540, parts: [15, 15, 15] },
  { id: 40, name: 'Пронзающий облака', grade: 'legendary', price: 3600, parts: [29, 28, 38] },
  { id: 41, name: 'Сердце доблести', grade: 'legendary', price: 24600, parts: [30, 30, 30] },
  { id: 42, name: 'Вечная решимость', grade: 'legendary', price: 12000, parts: [31, 43, 44, 45] },
  { id: 43, name: 'Наручи арены', grade: 'elite', price: 2880, parts: [32, 21] },
  { id: 44, name: 'Перстень святого', grade: 'elite', price: 4200, parts: [33, 19] },
  { id: 45, name: 'Сапоги бродяги', grade: 'elite', price: 9600, parts: [27, 33] },
  { id: 46, name: 'Кадило базилики', grade: 'legendary', price: 31200, parts: [34, 34, 44] },
  { id: 47, name: 'Сияние проповедника', grade: 'legendary', price: 2400, parts: [35, 35, 48, 36] },
  { id: 48, name: 'Стена', grade: 'elite', price: 1500, parts: [36, 36, 22] },
  { id: 49, name: 'Вуаль тишины', grade: 'elite', price: 2340, parts: [25, 22, 39] },
  { id: 50, name: 'Ядро ловкости', grade: 'elite', price: 2280, parts: [26, 26] },
  { id: 51, name: 'Око решимости', grade: 'rare', price: 1380, parts: [7, 7] },
  { id: 52, name: 'Око мудрости', grade: 'rare', price: 1320, parts: [6, 6] },
  { id: 53, name: 'Книга рун', grade: 'rare', price: 1440, parts: [9, 9, 10] },
  { id: 54, name: 'Око сострадания', grade: 'rare', price: 1020, parts: [8, 8] },
  { id: 55, name: 'Чаша света', grade: 'rare', price: 1680, parts: [10, 10, 9] },
  { id: 56, name: 'Ядро мудрости', grade: 'elite', price: 5040, parts: [52, 52] },
  { id: 57, name: 'Наставление', grade: 'elite', price: 6120, parts: [53, 52] },
  { id: 58, name: 'Ядро решимости', grade: 'elite', price: 2160, parts: [51, 51] },
  { id: 59, name: 'Кольцо из Куилина', grade: 'elite', price: 4440, parts: [55, 53, 10] },
  { id: 60, name: 'Ядро сострадания', grade: 'elite', price: 3960, parts: [54, 54] },
  { id: 61, name: 'Прилежание', grade: 'mythical', price: 69600, parts: [37, 40, 62] },
  { id: 62, name: 'Корона монарха', grade: 'legendary', price: 10200, parts: [38, 38, 59] },
  { id: 63, name: 'Милосердие и злоба', grade: 'mythical', price: 21600, parts: [40, 37, 62] },
  { id: 64, name: 'Звезда доблести', grade: 'mythical', price: 156000, parts: [41, 41, 41] },
  { id: 65, name: 'Суровая решимость', grade: 'mythical', price: 58200, parts: [42, 66, 67, 68] },
  { id: 66, name: 'Нерушимый', grade: 'legendary', price: 15000, parts: [43, 34] },
  { id: 67, name: 'Звездный образ', grade: 'legendary', price: 17400, parts: [44, 31, 45] },
  { id: 68, name: 'Рассветные ходоки', grade: 'legendary', price: 30600, parts: [45, 44, 49] },
  { id: 69, name: 'Коготь мастера', grade: 'mythical', price: 75000, parts: [46, 67] },
  { id: 70, name: 'Свет надежды', grade: 'mythical', price: 50400, parts: [47, 47, 71, 48] },
  { id: 71, name: 'Бастион', grade: 'legendary', price: 12000, parts: [48, 48, 35, 35] },
  { id: 72, name: 'Сердце решимости', grade: 'legendary', price: 24600, parts: [58, 58, 58] },
  { id: 73, name: 'Вуаль молчания', grade: 'legendary', price: 16800, parts: [49, 35, 38] },
  { id: 74, name: 'Сердце ловкости', grade: 'legendary', price: 36000, parts: [50, 50, 50] },
  { id: 75, name: 'Сердце мудрости', grade: 'legendary', price: 25200, parts: [56, 56, 56] },
  { id: 76, name: 'Аксиома божественности', grade: 'legendary', price: 15000, parts: [57, 56, 34] },
  { id: 77, name: 'Отметка сострадания', grade: 'legendary', price: 17400, parts: [59, 57, 55, 29] },
  { id: 78, name: 'Сердце сострадания', grade: 'legendary', price: 25200, parts: [60, 60, 60] },
  { id: 79, name: 'Горн презрения', grade: 'mythical', price: 61200, parts: [66, 46] },
  { id: 80, name: 'Свет истины', grade: 'mythical', price: 5400, parts: [62, 77, 37] },
  { id: 81, name: 'Звезда мудрости', grade: 'mythical', price: 96000, parts: [75, 75, 75] },
  { id: 82, name: 'Шпиль чародея', grade: 'mythical', price: 36000, parts: [76, 46, 46] },
  { id: 83, name: 'Вечное завоевание', grade: 'mythical', price: 100200, parts: [73, 47, 62] },
  { id: 84, name: 'Священный грааль', grade: 'mythical', price: 9000, parts: [67, 42, 68] },
  { id: 85, name: 'Наследие падших', grade: 'mythical', price: 159000, parts: [68, 67, 73] },
  { id: 86, name: 'Звезда сострадания', grade: 'mythical', price: 132000, parts: [78, 78, 78] },
  { id: 87, name: 'Наследие времени', grade: 'mythical', price: 51000, parts: [77, 76, 59, 40] },
  { id: 88, name: 'Обет героя', grade: 'mythical', price: 48000, parts: [71, 71, 47, 47] },
  { id: 89, name: 'Звезда решимости', grade: 'mythical', price: 132000, parts: [72, 72, 72] },
  { id: 90, name: 'Звезда ловкости', grade: 'mythical', price: 114000, parts: [74, 74, 74] },
];

export const relicFullPrice = (relic: RelicId): number => {
  const relicObj = getRelicById(relic);
  if (relicObj.parts.length === 0) return relicObj.price;

  return relicObj.price + relicObj.parts.reduce((prev, curr) => prev + relicFullPrice(curr), 0);
};

export type RelicPriceCalculation = { price: number; relics: RelicId[] };
export const relicPrice = (relic: RelicId, ownedRelics: RelicId[]): RelicPriceCalculation => {
  const ownTargetRelic = ownedRelics.findIndex((r) => r === relic);
  if (ownTargetRelic >= 0) return { price: 0, relics: ownedRelics.filter((_r, i) => i !== ownTargetRelic) };

  const relicObj = getRelicById(relic);
  if (relicObj.parts.length === 0) return { price: relicObj.price, relics: ownedRelics };

  return relicObj.parts.reduce(
    (prev, curr) => {
      const subRelicPrice = relicPrice(curr, prev.relics);
      return { price: prev.price + subRelicPrice.price, relics: subRelicPrice.relics };
    },
    { price: relicObj.price, relics: ownedRelics } as RelicPriceCalculation
  );
};
