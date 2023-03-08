type ability = "str" | "dex" | "con" | "int" | "wis" | "cha";

interface IEntry {
  type: string;
  entry: string | string[];
}

interface IFeature {
  name: string;
  source: string;
  page: number;
  level: number;
  entries: IEntry[];
}

interface ISubclass {
  name: string;
  features: string[];
}

interface IOptionalFeatureProg {
  name: string;
  type: string[];
  progression: number[];
}

interface ITable {
  cols: string[];
  rows: number[][];
}

interface ISpellSettings {
  ability: ability;
  progression: string;
  prepared: string;
  cantrip: number[];
}

interface IProficiencies {
  saving: ability[];
  armors: string[];
  weapons: string[];
  tools: string[];
  skills: {
    choose: string[];
    chooseCount: number;
  };
}

interface IDice {
  quantity: number;
  faces: number;
}

interface IClassSettings {
  name: string;
  source: string;
  page: number;
  proficiency: IProficiencies;
  spell: ISpellSettings;
  optionalProg: IOptionalFeatureProg;
  hitDice: IDice;
  tables: ITable;
  subClasses: ISubclass[];
  features: {
    class: IFeature[];
    subClass: IFeature[];
  };
}
export interface IClass {
  code: string;
  class: IClassSettings;
}
