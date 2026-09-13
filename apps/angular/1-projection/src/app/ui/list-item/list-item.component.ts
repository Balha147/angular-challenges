import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="flex justify-between border border-gray-300 px-2 py-1">
      {{ name() }}
      <button (click)="delete()">
        <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  // private teacherStore = inject(TeacherStore);
  // private studentStore = inject(StudentStore);

  //readonly id = input.required<number>();
  //readonly type = input.required<CardType>();
  readonly name = input.required<string>();

  readonly deleteItem = output<void>();

  delete() {
    this.deleteItem.emit();
  }
}
