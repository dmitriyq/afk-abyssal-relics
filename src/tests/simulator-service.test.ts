import { describe, expect, it } from 'vitest';
import { Player } from '../models/player';
import { upgradePlayerClass } from '../services/simulator-service';

const stringify = (val: unknown) => JSON.stringify(val);

describe('upgrade player class', () => {
  it('can buy relic', () => {
    const initPlayer: Player = {
      classes: {
        mage: { level: 1, owned: [] },
        ranger: { level: 1, owned: [] },
        supp: { level: 1, owned: [] },
        tank: { level: 1, owned: [] },
        war: { level: 1, owned: [] },
      },
      bag: {
        essence: 10_000,
        relics: [],
      },
    };
    const playerAfterUpgrage = upgradePlayerClass(initPlayer, 'war', 2);
    if (!playerAfterUpgrage) {
      throw new Error('cant upgrade');
    }

    expect(playerAfterUpgrage.bag.essence).eq(8800);
    expect(playerAfterUpgrage.bag.relics.length).eq(0);
    expect(playerAfterUpgrage.classes.war.level).eq(1);
    expect(stringify(playerAfterUpgrage.classes.war.owned)).eq(stringify([2, null, null, null, null, null]));
  });

  it('can buy relic with subparts', () => {
    const initPlayer: Player = {
      classes: {
        mage: { level: 1, owned: [] },
        ranger: { level: 1, owned: [] },
        supp: { level: 1, owned: [] },
        tank: { level: 1, owned: [] },
        war: { level: 2, owned: [23, 24, 18] },
      },
      bag: {
        essence: 100_000,
        relics: [20, 85],
      },
    };

    const playerAfterUpgrage = upgradePlayerClass(initPlayer, 'war', 19);
    if (!playerAfterUpgrage) {
      throw new Error('cant upgrade');
    }

    expect(playerAfterUpgrage.bag.essence).eq(100_000 - 360 - 2160 - 2400);
    expect(playerAfterUpgrage.bag.relics.length).eq(1);
    expect(playerAfterUpgrage.classes.war.level).eq(2);
    expect(stringify(playerAfterUpgrage.classes.war.owned)).eq(stringify([23, 24, 18, 19, null, null]));
  });

  it('can upgrage lvl after buying relic', () => {
    const initPlayer: Player = {
      classes: {
        mage: { level: 1, owned: [] },
        ranger: { level: 1, owned: [] },
        supp: { level: 1, owned: [] },
        tank: { level: 1, owned: [] },
        war: { level: 2, owned: [23, 24, 18, 19] },
      },
      bag: {
        essence: 100_000,
        relics: [21],
      },
    };

    let playerAfterUpgrage = upgradePlayerClass(initPlayer, 'war', 22);
    if (playerAfterUpgrage) {
      playerAfterUpgrage = upgradePlayerClass(playerAfterUpgrage, 'war', 21);
    }

    if (!playerAfterUpgrage) {
      throw new Error('cant upgrade');
    }

    expect(playerAfterUpgrage.bag.essence).eq(100_000 - 5700);
    expect(playerAfterUpgrage.bag.relics.length).eq(0);
    expect(playerAfterUpgrage.classes.war.level).eq(3);
    expect(stringify(playerAfterUpgrage.classes.war.owned)).eq(stringify([null, null, null, null, null, null]));
  });

  it('can buy with negative essence allowed', () => {
    const initPlayer: Player = {
      classes: {
        mage: { level: 1, owned: [] },
        ranger: { level: 1, owned: [] },
        supp: { level: 1, owned: [] },
        tank: { level: 1, owned: [] },
        war: { level: 5, owned: [] },
      },
      bag: {
        essence: 1000,
        relics: [],
      },
    };

    const playerAfterUpgrage = upgradePlayerClass(initPlayer, 'war', 70, true);
    if (!playerAfterUpgrage) {
      throw new Error('cant upgrade');
    }

    expect(playerAfterUpgrage.bag.essence).eq(-294_000 + 1000);
    expect(stringify(playerAfterUpgrage.classes.war.owned)).eq(stringify([null, null, null, null, null, 70]));
  });
});
