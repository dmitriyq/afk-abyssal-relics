export type RelicGrade = 'common' | 'rare' | 'elite' | 'legendary' | 'mythical';

export const getGradeName = (grade: RelicGrade) => {
  switch (grade) {
    case 'common':
      return 'Обычные';
    case 'rare':
      return 'Редкие';
    case 'elite':
      return 'Элитные';
    case 'legendary':
      return 'Легендарные';
    case 'mythical':
      return 'Мифические';
  }
};

export const getGradeColor = (grade: RelicGrade) => {
  switch (grade) {
    case 'common':
      return '#4F864F';
    case 'rare':
      return '#6097D3';
    case 'elite':
      return '#78349A';
    case 'legendary':
      return '#C27E3A';
    case 'mythical':
      return '#A42830';
  }
};

type RelicGradeOrder = Record<RelicGrade, number>;
export const relicGradeOrder: RelicGradeOrder = {
  common: 1,
  rare: 2,
  elite: 3,
  legendary: 4,
  mythical: 5,
};
export const getRelicGradeOrder = (grade: RelicGrade) => relicGradeOrder[grade];
