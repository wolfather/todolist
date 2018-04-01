import { Component, OnInit } from '@angular/core';
import { Itodo } from './todo.interface';
import { StorageService } from '../../shared/storage.services';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoTasks: Array<Itodo> = [];
  newTodo = '';
  todofilter = '';
  todoId = 0;//this.todoTasks.length;
  buttonClearStorageVisible: boolean = false;
  
  constructor(private storeService: StorageService) { }

  /*private */onSetStoreServiceHandler(): void {
    this.storeService.setTasksData(this.todoTasks);
    //console.log('service were called');
  }

  /*private */onIncrementTodoId(): string {
    this.todoId = this.todoId + 1;

    return this.todoId.toString();
  }

  /*private */onResetNewTodoValueHandler(): void {
    this.newTodo = '';
  }

  /*private */onAddTaskItemHandler(name: string): void {
    this.todoTasks.push({
      id: this.onIncrementTodoId(),
      name,
      isMarkedAsDone: false,
      priority: 0
    });
  }

  onBlurEditTaskHandler(todo: Itodo): void {
    todo.name = todo.name;

    this.onSetStoreServiceHandler();
  }

  onCreateTodoItemHandler($event: KeyboardEvent): void {
    if($event.which === 13 && this.newTodo !== '') {
      this.onAddTaskItemHandler(this.newTodo);

      this.onResetNewTodoValueHandler();

      this.onSetStoreServiceHandler();
    }
  }

  onChangeTaskDoneHandler(todo: Itodo): void {
    todo.isMarkedAsDone = !todo.isMarkedAsDone;

    this.onSetStoreServiceHandler();
  }

  onDeleteTaskHandler(todo: Itodo): void {
    const confirm = window.confirm('Are you sure you want to delete this item');

    if(confirm && todo.isMarkedAsDone === true) {
      this.todoTasks.splice(this.todoTasks.indexOf(todo), 1);

      this.onSetStoreServiceHandler();
    }
  }

  /*private */onSortTaskByPriorityHandler(): void {
    this.todoTasks.sort((a: Itodo, b: Itodo) => (b.priority - a.priority));
  }

  onClickChangePriorityHandler(todo: Itodo, param: string): void {
    if(param === 'plus') {
      todo.priority = (todo.priority + 1);
    }
    if(param === 'minus' && todo.priority >= 1) {
      todo.priority = (todo.priority - 1);
    }
    
    this.onSortTaskByPriorityHandler();

    this.onSetStoreServiceHandler();
  }

  
  onClickEraseLocalStorageHandler(): void {
    this.storeService.delTasksData();
  }
  
  onOnitialAppStateHandler(): void {
    if(this.storeService.checkStorageContent()) {
      this.todoTasks = this.storeService.getTasksData();
    }
    this.buttonClearStorageVisible = !this.storeService.checkStorageContent();
  }

  ngOnInit() {
    this.onOnitialAppStateHandler();  
  }

}
