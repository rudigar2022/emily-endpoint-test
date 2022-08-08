export * from "./enums/enums";
import { join } from "path";
import { readdirSync, statSync } from "fs";

export const firstOrDefault = <T>(data: Array<T>): T => {
  if (!data.length) {
    return null;
  }

  return data[0];
};

export const findAllFiles = (
  dir: string,
  extn: string,
  regex?: RegExp,
  files?: string[],
  result?: string[]
): Array<string> => {
  files = files || readdirSync(dir);
  result = result || [];
  regex = regex || new RegExp(`\\${extn}$`);

  for (let i = 0; i < files.length; i++) {
    let file = join(dir, files[i]);
    if (statSync(file).isDirectory()) {
      try {
        result = findAllFiles(file, extn, regex, readdirSync(file), result);
      } catch (error) {
        continue;
      }
    } else {
      if (regex.test(file)) {
        result.push(file);
      }
    }
  }

  return result;
};
