import { Directive } from 'vue';
import { boot } from 'quasar/wrappers';

type MaskType = 'integer' | 'decimal';
type MaskModel = {
  type: MaskType;
  maxFractionDigits?: number;
  maxSignificantDigits?: number;
  allowNegative?: boolean;
  format?: boolean;
};
type InputMaskBinding = MaskModel;
type InputMaskElement = HTMLInputElement;

export const inputMaskDirective: Directive<InputMaskElement, InputMaskBinding> = (el, binding) => {
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    el = el.getElementsByTagName('input')[0];
  }

  el.oninput = function () {
    const mask = binding.value;
    mask.maxFractionDigits = mask.maxFractionDigits ?? 2;
    mask.maxSignificantDigits = mask.maxSignificantDigits ?? 10;
    mask.allowNegative = mask.allowNegative ?? false;
    mask.format = mask.format ?? true;

    let newValue = el.value;

    if (mask.type === 'integer')
      newValue = integerMask(newValue, mask.allowNegative, mask.format, mask.maxSignificantDigits);
    else if (mask.type === 'decimal')
      newValue = decimalMaks(newValue, mask.maxFractionDigits, mask.allowNegative, mask.format);
    el.value = newValue;

    el.dispatchEvent(event('change'));
  };
};

const event = (name: string) => new Event(name, { bubbles: true, cancelable: true });
const charCount = (val: string, char: string) => {
  let count = 0;
  for (let index = 0; index < val.length; index++) {
    const element = val[index];
    if (element === char) count++;
  }
  return count;
};
const endsWithAny = (val: string, ...args: string[]) => args.some((v) => val.endsWith(v));

const integerMask = (val: string, allowNegative: boolean, format: boolean, maxSignificantDigits: number) => {
  if (allowNegative) {
    if (val === '-') return val;
    if (val === '0-') return '-0';
  }
  const regex = allowNegative ? /[^-|\d]/g : /\D/g;
  const escapedVal = val.replace(regex, '');

  const number = parseInt(escapedVal.substring(0, maxSignificantDigits), 10);
  if (isNaN(number)) return '';
  return format ? number.toLocaleString('ru-RU') : number.toString();
};

const decimalMaks = (val: string, maxFractionDigits: number, allowNegative: boolean, format: boolean) => {
  if (allowNegative) {
    if (val === '-') return val;
    if (val === '0-') return '-0';
  }
  const regex = allowNegative ? /[a-zA-Zа-яА-Я]/g : /[a-zA-Zа-яА-Я|-]/g;
  let value = val.replace(regex, '').replaceAll(',', '.');
  const dotCount = charCount(value, '.');
  if (dotCount > 0) {
    if (dotCount > 1) {
      return value.substring(0, value.lastIndexOf('.'));
    }
    if (value.length - value.lastIndexOf('.') - 1 > maxFractionDigits) {
      value = value.substring(0, value.lastIndexOf('.') + 1 + maxFractionDigits);
    }
    if (endsWithAny(value, '.', '0')) return value;
  }

  const number = parseFloat(value.replace(/\s/g, ''));
  if (isNaN(number)) return '';
  return format ? number.toLocaleString('ru-RU') : number.toString();
};

export default boot(({ app }) => {
  // something to do
  app.directive('input--mask', inputMaskDirective);
});
