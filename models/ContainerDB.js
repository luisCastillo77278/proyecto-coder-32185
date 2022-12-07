//todo falta realizar el throw error
export class Container {
  constructor(knex, table) {
    this.table = table;
    this.knex = knex;
  }

  async getAll() {
    try {
      const resp = await this.knex.from(this.table).select();
      return resp;
    } catch (err) {
      throw err
    }
  }

  async getById(id) {
    try {
      const { 0: resp } = await this.knex.from(this.table).where("id", id);
      return resp;
    } catch (err) {
      throw err
    }
  }

  async save(obj) {
    try {
      const { 0: resp } = await this.knex.from(this.table).insert(obj);
      if (resp !== 0) return;
      const element = await this.getById(obj.id);
      return element;
    } catch (err) {
      throw err
    }
  }

  async deleteById(id) {
    try {
      const element = await this.getById(id);
      if(!element) return 
      await this.knex.from(this.table).where("id", id).del();
      return element;
    } catch (err) {
      throw err
    }
  }

  async updateById(id, obj) {
    try {
      const resp = await this.knex.from(this.table).where("id", id).update(obj);
      if (resp !== 1) return;
      const element = await this.getById(id);
      return element;
    } catch (err) {
      throw err
    }
  }
}
