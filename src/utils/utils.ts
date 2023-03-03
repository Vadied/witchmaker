import { IParams } from "@/models/params.model";

export const isAuthorized = (userRoles: string[], availablesRoles: string[]) =>
  userRoles.some((r) => availablesRoles.includes(r));

  export const handleEnter = (
    key: string,
    callback: (params: IParams) => void,
    params: IParams = {}
) => {
    if (key !== "Enter") return;

    callback(params);
};

export const generateName = () => {
  const prefixes = [
    "Al",
    "Be",
    "Ca",
    "De",
    "El",
    "Fa",
    "Ga",
    "He",
    "Ig",
    "Jo",
    "Ke",
    "La",
    "Ma",
    "No",
    "Or",
    "Pa",
    "Qu",
    "Re",
    "Si",
    "To",
    "Ul",
    "Va",
    "Wi",
    "Xa",
    "Yo",
    "Ze",
  ];
  const suffixes = [
    "bar",
    "dox",
    "fer",
    "gal",
    "hax",
    "jox",
    "kas",
    "lim",
    "mox",
    "nox",
    "pax",
    "quix",
    "rax",
    "sax",
    "tax",
    "vex",
    "wax",
    "yox",
    "zax",
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix}${suffix}`;
};
