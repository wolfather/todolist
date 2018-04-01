import { NgModule, ModuleWithProviders } from "@angular/core";
import { StorageService } from "./storage.services";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule]
})
export class SharedServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedServicesModule,
            providers: [
                StorageService
            ]
        }
    }
}