import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeavyPipe } from './heavy.pipe';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [HeavyPipe],
  template: `
    @for (person of persons; track person) {
      {{ person | heavy:$index }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  heavyComputation(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
