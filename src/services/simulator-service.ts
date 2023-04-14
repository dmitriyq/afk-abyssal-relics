import { cloneDeep } from 'lodash-es';
import { Classes, NormalizedClassState, classLevelRelics, normalizeClassesState } from 'src/models/classes';
import { Player } from 'src/models/player';
import { RelicId, relicPrice } from 'src/models/relic';

export const tryUpdateClasses = (player: Player, targetClasses: NormalizedClassState) => {
  let newPlayer = cloneDeep(player);
  Object.entries(newPlayer.classes).forEach(([key, _val]) => {
    const k = key as Classes;
    while (
      !(
        targetClasses[k].level === newPlayer.classes[k].level &&
        targetClasses[k].owned.every((r) => newPlayer.classes[k].owned.includes(r))
      )
    ) {
      const currentClassLevelRelics = classLevelRelics[k][newPlayer.classes[k].level] as readonly RelicId[];
      const remainingRelics =
        targetClasses[k].level !== newPlayer.classes[k].level
          ? currentClassLevelRelics.filter((r) => !newPlayer.classes[k].owned.includes(r))
          : (targetClasses[k].owned.filter((r) => r !== null && !newPlayer.classes[k].owned.includes(r)) as RelicId[]);

      remainingRelics.forEach((r) => {
        newPlayer = upgradePlayerClass(newPlayer, k, r, true) as Player;
      });
    }
  });
  return newPlayer;
};

export const upgradePlayerClass = (
  player: Player,
  classType: Classes,
  upgradeRelic: RelicId,
  allowNegativeEssence = false
) => {
  const relicCalc = relicPrice(upgradeRelic, player.bag.relics);
  if (allowNegativeEssence || player.bag.essence - relicCalc.price > 0) {
    player.bag.essence -= relicCalc.price;
    player.bag.relics = relicCalc.relics;

    player.classes[classType].owned.push(upgradeRelic);
    player.classes = normalizeClassesState(player.classes);
    return player;
  }
  return false as const;
};
