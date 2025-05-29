import { countries } from '../pages/register/interfaces';

const countryCodes = Object.fromEntries(
  Object.entries(countries).map(([name, code]) => [code, name]),
);

export function getCountryNameByCode(code: string): string | undefined {
  return countryCodes[code] ? countryCodes[code] : code;
}
