export default class ToDoCreator {
  constructor(name, status = false, id = Number(new Date())){
    this.id = id;
    this.name = name;
    this.status = status; 
  }
}
 