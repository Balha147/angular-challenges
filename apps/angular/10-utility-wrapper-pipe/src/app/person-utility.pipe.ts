import { Pipe, PipeTransform } from "@angular/core";
import { PersonUtils } from "./person.utils";

@Pipe({ name: 'personUtils' })
export class PersonUtilsPipe implements PipeTransform {
    transform<K extends keyof typeof PersonUtils>(fnName: K, ...args: Parameters<(typeof PersonUtils)[K]>)
        : ReturnType<(typeof PersonUtils)[K]> {
        return (PersonUtils[fnName] as (...a: unknown[]) => unknown)(...args) as ReturnType<(typeof PersonUtils)[K]>;
    }
}