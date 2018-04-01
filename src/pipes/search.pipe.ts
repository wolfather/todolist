import { Pipe, PipeTransform } from '@angular/core';
import { Itodo } from '../app/todo/todo.interface';

@Pipe({
    name: 'searchpipe',
    pure: false
})
export class SearchPipe implements PipeTransform {
  toLower(str: string): string {
    return str.toLowerCase();
  }

  transform(todos: Array<Itodo>, filter: string): Array<Itodo> {
    if(filter === undefined) {
        return todos;
    }
    return todos.filter((e: Itodo) => this.toLower(e.name).includes(this.toLower(filter)));
  }
}