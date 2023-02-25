// eslint-disable-next-line no-unused-vars
class Task {
  constructor(title, id, list) {
    this.title = title;
    this.id = id;
    this.list = list;

    this.add();
  }

  add() {
    let task = `<li id=${this.id}>${this.title}</li>`; 
    this.list.append(task);
  }

  changeTitle(title) {
    let task = $(`#${this.id}`);
    task.innerHTML = title;
  }

  remove() {
    let task = $(`#${this.id}`);
    task.remove();
  }
}