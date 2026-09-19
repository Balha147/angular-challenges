import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'heavy' })
export class HeavyPipe implements PipeTransform {
    transform(name: string, index: number): string {
        return `${name} - ${index}`;
    }
}