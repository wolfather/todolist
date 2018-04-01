import { Injectable } from "@angular/core";
import { Itodo } from "../app/todo/todo.interface";

@Injectable()
export class StorageService {
    private wl = window.localStorage;
    private TASKS: string = 'tasksData';

    private checkSupport(): boolean {
        return !!this.wl;
    }

    setTasksData(data: Array<Itodo>): void {
        this.checkSupport() && this.wl.setItem(this.TASKS, JSON.stringify(data));
    }
    
    getTasksData(): Array<Itodo> {
        return this.checkSupport() && JSON.parse(this.wl.getItem(this.TASKS));
    }
    checkStorageContent(): boolean {
        return !!this.wl[this.TASKS];
    }

    delTasksData(): void {
        this.checkSupport() && this.wl.removeItem(this.TASKS);
    }
}