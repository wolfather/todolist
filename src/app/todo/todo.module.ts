import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoComponent } from "./todo.component";
import { FormsModule } from "@angular/forms";
import { SearchPipe } from "../../pipes/search.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TodoComponent,
        SearchPipe
    ],
    exports: [TodoComponent],
})
export class TodoModule {}