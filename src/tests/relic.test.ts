import { RelicId } from 'src/models/relic';
import { describe, it, expect } from 'vitest';
import { relicFullPrice, relicPrice } from '../models/relic';

describe('relic calculator full price', () => {
  const calcPriceTest = (id: RelicId, expectedValue: number) => {
    const price = relicFullPrice(id);
    expect(price).eq(expectedValue);
  };
  it('common', () => {
    calcPriceTest(10, 1560);
    calcPriceTest(15, 1140);
  });
  it('rare', () => {
    calcPriceTest(18, 5700);
    calcPriceTest(19, 7800);
    calcPriceTest(27, 7200);
  });
  it('elite', () => {
    calcPriceTest(28, 16200);
    calcPriceTest(34, 23400);
    calcPriceTest(31, 22800);
  });
  it('legendary', () => {
    calcPriceTest(42, 90000);
    calcPriceTest(37, 55800);
    calcPriceTest(73, 66000);
  });
  it('mythical', () => {
    calcPriceTest(79, 210000);
    calcPriceTest(88, 360000);
    calcPriceTest(84, 270000);
  });
});

describe('relic calculator with owned parts', () => {
  const calcPriceTest = (id: RelicId, owned: RelicId[], expectedValue: { price: number; relics: number[] }) => {
    const calcResult = relicPrice(id, owned);
    expect(calcResult.price).eq(expectedValue.price);
    const sortedCalcResultRelicIds = calcResult.relics.sort((a, b) => a - b);
    const sortedExpectedRelicIds = expectedValue.relics.sort((a, b) => a - b);
    expect(JSON.stringify(sortedCalcResultRelicIds)).eq(JSON.stringify(sortedExpectedRelicIds));
  };

  it('own relic', () => {
    calcPriceTest(9, [1, 2, 3, 4, 5, 6, 9], { price: 0, relics: [1, 2, 3, 4, 5, 6] });
    calcPriceTest(19, [1, 2, 3, 4, 5, 6, 9, 19], { price: 0, relics: [1, 2, 3, 4, 5, 6, 9] });
  });
  it('own all relic subparts', () => {
    calcPriceTest(19, [20, 14, 11, 11, 20, 14, 1, 2, 3], { price: 360, relics: [20, 14, 11, 1, 2, 3] });
    calcPriceTest(22, [14, 11], { price: 1140, relics: [] });

    calcPriceTest(28, [23, 24, 1], { price: 5760, relics: [1] });
    calcPriceTest(42, [31, 43, 44, 45], { price: 12000, relics: [] });
  });
  it('own partial relic subparts', () => {
    calcPriceTest(18, [4, 3], { price: 2100 + 1500, relics: [3] });
    calcPriceTest(31, [32, 33, 20], { price: 4080 + 360 + 2400 + 2160, relics: [] });
    calcPriceTest(80, [77, 37, 38, 38, 55, 53, 90], { price: 5400 + 10200 + 4440 + 1560, relics: [90] });
  });
});
