import fs from 'fs';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export class FileCustom {
  #pathFile
  constructor(file) {
    this.#pathFile = join(__dirname, `../data/${file}.txt`)
  }

  async readFile() {
    try {
      if (!fs.existsSync(this.#pathFile))
        return []

      const products = await fs.promises.readFile(
        this.#pathFile,
        { encoding: 'utf-8' }
      );
      return JSON.parse(products);

    } catch (err) {
      throw err
    }
  }

  async writeFile(products) {
    try {
      await fs.promises.writeFile(
        this.#pathFile,
        JSON.stringify(products, null, 2)
      );
    } catch (err) {
      throw err
    }
  }

}
