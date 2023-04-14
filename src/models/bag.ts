import { RelicId } from './relic';

export type Bag = {
  essence: number;
  relics: RelicId[];
};

export const serializeBag = (bag: Bag) => {
  const essenceString = `e(${bag.essence.toString()})`;
  const grouppedRelics = bag.relics.reduce((prev, curr) => {
    const rIndex = prev.findIndex((v) => v.id === curr);
    if (rIndex === -1) prev.push({ id: curr, count: 1 });
    else prev[rIndex].count++;
    return prev;
  }, [] as { id: number; count: number }[]);
  const relicString = `r(${grouppedRelics.map((v) => `i${v.id}c${v.count}`).join('.')})`;

  return [essenceString, relicString].join('!');
};

export const deserializeBag = (obj: string | string[]): Bag => {
  const parts = Array.isArray(obj) ? obj : obj.split('!');

  const getBracketsData = (str: string) => str.substring(str.indexOf('(') + 1, str.indexOf(')'));

  const essencePart = parts.find((v) => v.startsWith('e('))!;
  const essence = parseInt(getBracketsData(essencePart), 10);

  const bagRelicPart = parts.find((v) => v.startsWith('r('))!;
  const bagRelics = getBracketsData(bagRelicPart)
    .split('.')
    .map((v) => {
      const id = parseInt(v.substring(v.indexOf('i') + 1, v.indexOf('c')), 10);
      const count = parseInt(v.substring(v.indexOf('c') + 1), 10);
      return { id, count };
    })
    .reduce((prev, curr) => {
      if (isNaN(curr.count) || isNaN(curr.id)) return prev;

      prev.push(...new Array(curr.count).fill(curr.id));
      return prev;
    }, [] as RelicId[]);

  return {
    essence: isNaN(essence) ? 0 : essence,
    relics: bagRelics,
  };
};
