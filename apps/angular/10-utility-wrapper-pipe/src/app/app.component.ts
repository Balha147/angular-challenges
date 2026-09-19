import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonUtilsPipe } from './person-utility.pipe';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [PersonUtilsPipe],
  template: `
    @for (activity of activities; track activity.name) {
      {{ activity.name }} :
      @for (
        person of persons;
        track person.name;
        let index = $index;
        let isFirst = $first
      ) {
        {{ 'showName' | personUtils: person.name : index }}
        {{ 'isAllowed' | personUtils: person.age : isFirst : activity.minimumAge }}
      }
    }
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  activities = [
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ];

  // showName = PersonUtils.showName;

  // isAllowed = PersonUtils.isAllowed;
}
