import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">

      @if(imgTemplate(); as img) {
        <ng-container [ngTemplateOutlet]="img"></ng-container>
      }
      <section>
        @for (item of list(); track item) {
          <ng-container [ngTemplateOutlet]="itemTemplate()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
          
      </section>
      
      <!-- @if (type() === CardType.TEACHER) {
        <img ngSrc="assets/img/teacher.png" width="200" height="200" alt="" />
      }
      @if (type() === CardType.STUDENT) {
        <img ngSrc="assets/img/student.webp" width="200" height="200" alt="" />
      } -->

      <!-- <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            [type]="type()"></app-list-item>
        }
      </section> -->

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  // private teacherStore = inject(TeacherStore);
  // private studentStore = inject(StudentStore);
  // readonly type = input.required<CardType>();
  // CardType = CardType;

  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly addItem = output<void>();

  readonly imgTemplate = contentChild<TemplateRef<unknown>>('imgTemplate');
  readonly itemTemplate = contentChild<TemplateRef<unknown>>('itemTemplate');

  addNewItem() {
    this.addItem.emit();
    // const type = this.type();
    // if (type === CardType.TEACHER) {
    //   this.teacherStore.addOne(randTeacher());
    // } else if (type === CardType.STUDENT) {
    //   this.studentStore.addOne(randStudent());
    // }
  }
}
