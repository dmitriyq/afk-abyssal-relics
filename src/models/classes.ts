import { RelicId } from './relic';
const classLevels = [1, 2, 3, 4, 5] as const;
export type ClassLevels = (typeof classLevels)[number];

export type Classes = 'war' | 'tank' | 'ranger' | 'mage' | 'supp';
export const classLevelRelics = {
  war: {
    1: [2, 17, 4, 20, 1, 14] as const,
    2: [23, 24, 18, 19, 21, 22] as const,
    3: [28, 29, 30, 31, 34, 35] as const,
    4: [37, 40, 41, 42, 46, 47] as const,
    5: [61, 63, 64, 65, 69, 70] as const,
  } as const,
  tank: {
    1: [12, 1, 7, 2, 14, 16] as const,
    2: [32, 21, 51, 23, 22, 36] as const,
    3: [43, 34, 58, 28, 35, 48] as const,
    4: [66, 46, 72, 37, 47, 71] as const,
    5: [79, 69, 89, 61, 70, 88] as const,
  } as const,
  ranger: {
    1: [17, 11, 5, 3, 1, 2] as const,
    2: [24, 25, 26, 27, 21, 23] as const,
    3: [29, 49, 50, 45, 34, 28] as const,
    4: [40, 73, 74, 68, 46, 37] as const,
    5: [63, 83, 90, 85, 69, 61] as const,
  } as const,
  mage: {
    1: [12, 15, 6, 9, 11, 3] as const,
    2: [32, 39, 52, 53, 25, 27] as const,
    3: [43, 38, 56, 57, 49, 45] as const,
    4: [66, 62, 75, 76, 73, 68] as const,
    5: [79, 80, 81, 82, 83, 85] as const,
  },
  supp: {
    1: [15, 10, 8, 13, 12, 3] as const,
    2: [39, 55, 54, 33, 32, 27] as const,
    3: [38, 59, 60, 44, 43, 45] as const,
    4: [62, 77, 78, 67, 66, 68] as const,
    5: [80, 87, 86, 84, 79, 85] as const,
  },
} as const;

export const getClassName = (_class: Classes) => {
  switch (_class) {
    case 'war':
      return 'Войны';
    case 'tank':
      return 'Танки';
    case 'ranger':
      return 'Ловкие';
    case 'mage':
      return 'Маги';
    case 'supp':
      return 'Саппорты';
  }
};
export const getClassImage = (_class: Classes) => new URL(`./../assets/classes/${_class}.png`, import.meta.url).href;

export type ClassState = Record<Classes, { level: ClassLevels; owned: RelicId[] }>;
export type NormalizedClassState = Record<Classes, { level: ClassLevels; owned: (RelicId | null)[] }>;
export const normalizeClassesState = (classState: NormalizedClassState): NormalizedClassState => {
  const normalize = (classType: Classes, currentLevel: ClassLevels, owned: (RelicId | null)[]) => {
    const srcRelics = classLevelRelics[classType][currentLevel];
    const normalizedRelics = srcRelics.map((val) => (owned.includes(val) ? val : null));
    if (normalizedRelics.filter((v) => v !== null).length === srcRelics.length && currentLevel < 5) {
      return { level: (currentLevel + 1) as ClassLevels, relics: new Array<null>(srcRelics.length).fill(null) };
    }
    return { level: currentLevel, relics: normalizedRelics };
  };

  const normalizedWar = normalize('war', classState.war.level, classState.war.owned);
  const normalizedTank = normalize('tank', classState.tank.level, classState.tank.owned);
  const normalizedRanger = normalize('ranger', classState.ranger.level, classState.ranger.owned);
  const normalizedMage = normalize('mage', classState.mage.level, classState.mage.owned);
  const normalizedSupp = normalize('supp', classState.supp.level, classState.supp.owned);

  return {
    war: {
      level: normalizedWar.level,
      owned: normalizedWar.relics,
    },
    tank: {
      level: normalizedTank.level,
      owned: normalizedTank.relics,
    },
    ranger: {
      level: normalizedRanger.level,
      owned: normalizedRanger.relics,
    },
    mage: {
      level: normalizedMage.level,
      owned: normalizedMage.relics,
    },
    supp: {
      level: normalizedSupp.level,
      owned: normalizedSupp.relics,
    },
  };
};

export const getMergedMinClassState = (
  src: NormalizedClassState,
  minClasses: NormalizedClassState
): NormalizedClassState => {
  const merge = (classType: Classes) => {
    const s = src[classType];
    const min = minClasses[classType];

    if (s.level < min.level) return min;
    else if (s.level > min.level) return s;

    const relics = new Set(...[s.owned.concat(min.owned)]);
    return { level: s.level, owned: [...relics] };
  };

  const state = {
    mage: merge('mage'),
    ranger: merge('ranger'),
    supp: merge('supp'),
    tank: merge('tank'),
    war: merge('war'),
  };
  return normalizeClassesState(state);
};

export const serializeClassState = (classes: NormalizedClassState) => {
  const serializeClass = (type: Classes) => {
    const lvlString = `${type[0]}l(${classes[type].level})`;
    const relics = classes[type].owned.filter((v) => v !== null);
    const relicString = `${type[0]}r(${relics.map((v) => v!.toString()).join('.')})`;
    return [lvlString, relicString].join('!');
  };

  const classString = [
    serializeClass('war'),
    serializeClass('tank'),
    serializeClass('ranger'),
    serializeClass('mage'),
    serializeClass('supp'),
  ].join('!');

  return classString;
};

export const deserializeClassState = (classState: string | string[]) => {
  const parts = Array.isArray(classState) ? classState : classState.split('!');

  const getBracketsData = (str: string) => str.substring(str.indexOf('(') + 1, str.indexOf(')'));
  const deserializeClass = (type: Classes) => {
    const typeId = type[0];

    const lvlPart = parts.find((v) => v.startsWith(`${typeId}l`))!;
    const level = parseInt(getBracketsData(lvlPart), 10) as ClassLevels;

    const relicPart = parts.find((v) => v.startsWith(`${typeId}r`))!;
    const relics = getBracketsData(relicPart)
      .split('.')
      .map((v) => parseInt(v, 10)) as RelicId[];

    return { level, owned: relics };
  };

  const state = {
    mage: deserializeClass('mage'),
    ranger: deserializeClass('ranger'),
    supp: deserializeClass('supp'),
    tank: deserializeClass('tank'),
    war: deserializeClass('war'),
  };
  return normalizeClassesState(state);
};
