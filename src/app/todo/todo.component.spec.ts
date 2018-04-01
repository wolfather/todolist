import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { StorageService } from '../../shared/storage.services';
import { Itodo } from './todo.interface';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';


describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  const mockTodo: Itodo = {
    id: "2",
    isMarkedAsDone: true,
    name: "new task",
    priority: 1
  };
  const TASKS: string = 'tasksData';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        TodoComponent,
        SearchPipe
      ],
      providers: [StorageService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    TestBed.get(StorageService);

    spyOn(component, 'onOnitialAppStateHandler').and.callThrough();
    spyOn(component, 'onIncrementTodoId').and.returnValue('1');
  }));

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be buttonClearStorageVisible equals to true', async(() => {
      component.onOnitialAppStateHandler();
      expect(component.buttonClearStorageVisible).toBe(true);
  }));
  
  it('should be the StorageService.checkStorageContent to have benn called 2 times', async(() => {
    inject([StorageService], (injectService: StorageService) => {
      component.onOnitialAppStateHandler();
      expect(injectService.checkStorageContent).toHaveBeenCalledTimes(2);
    });
  }));

  it('should calls StorageService.delTasksData', async(() => {
    inject([StorageService], (injectService: StorageService) => {
      component.onClickEraseLocalStorageHandler();
      
      expect(injectService.delTasksData).toHaveBeenCalled();
      expect(window.localStorage.getItem(TASKS)).toEqual(undefined);
    });
  }));

  it('should calls StorageService.setTasksData', async(() => {
    inject([StorageService], (injectService: StorageService) => {
      component.onClickEraseLocalStorageHandler();
      
      expect(injectService.setTasksData).toHaveBeenCalled();
    });
  }));
  
  it('should calls StorageService.addTasksData', async(() => {
      component.onAddTaskItemHandler(mockTodo.name);
      expect(component.onIncrementTodoId).toHaveBeenCalledTimes(1);
      expect(component.todoTasks.length).toEqual(1);
  }));

  it('should change the isMarkedAsDone value to equal true', async(() => {
    component.onAddTaskItemHandler(mockTodo.name);
    component.onChangeTaskDoneHandler(component.todoTasks[0]);

    expect(component.todoTasks[0].isMarkedAsDone).toEqual(true);

    inject([StorageService], (injectService: StorageService) => {
      expect(injectService.setTasksData).toHaveBeenCalled();
    });
  }));

  it('should calls onOnitialAppStateHandler on ngOnOnit', async(() => {
    component.ngOnInit()
    expect(component.onOnitialAppStateHandler).toHaveBeenCalled();
  }));
});
