import { countries } from '../pages/login-register/register/interfaces';

const countryCodes = Object.fromEntries(
  Object.entries(countries).map(([name, code]) => [code, name]),
);

export function getCountryNameByCode(code: string): string {
  return countryCodes[code] ? countryCodes[code] : code;
}

export function getCountryCodeByName(name: string): string {
  return countries[name] ? countries[name] : name;
}
