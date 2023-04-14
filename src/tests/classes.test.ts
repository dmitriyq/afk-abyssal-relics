import { describe, expect, it } from 'vitest';
import { NormalizedClassState, normalizeClassesState } from 'src/models/classes';

describe('class normalization', () => {
  it('check correct normalization', () => {
    const state: NormalizedClassState = {
      war: {
        level: 4,
        owned: [42, 47, 37, 46, 40, 41],
      },
      tank: { level: 1, owned: [] },
      ranger: { level: 1, owned: [] },
      mage: { level: 2, owned: [39, 32, 52, 25, 27] },
      supp: { level: 1, owned: [] },
    };
    const normalizedState = normalizeClassesState(state);
    expect(normalizedState.war.level).eq(5);
    expect(normalizedState.war.owned.every((v) => v === null)).eq(true);
    expect(JSON.stringify(normalizedState.mage.owned)).eq(JSON.stringify([32, 39, 52, null, 25, 27]));
    expect(JSON.stringify(normalizedState.tank.owned)).eq(JSON.stringify([null, null, null, null, null, null]));
  });
});
