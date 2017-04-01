module.exports = {
  class Snippet {
    constructor (name, description, author, language, code, tags, id = null) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.author = author;
      this.language = language;
      this.code = code;
      this.tags = tags;
    }

    get json() {
      return JSON.stringify(this);
    }
  }
}
