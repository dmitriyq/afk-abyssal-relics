import { NormalizedClassState, deserializeClassState, serializeClassState } from './classes';
import { Bag, deserializeBag, serializeBag } from './bag';

export type Player = {
  bag: Bag;
  classes: NormalizedClassState;
};

export const serializePlayer = (player: Player) => {
  // 'e(0)!r(i1c3)!ml(1)!mr()'
  return [serializeClassState(player.classes), serializeBag(player.bag)].join('!');
};

export const deserializePlayer = (obj: string): Player => {
  return {
    classes: deserializeClassState(obj),
    bag: deserializeBag(obj),
  };
};
