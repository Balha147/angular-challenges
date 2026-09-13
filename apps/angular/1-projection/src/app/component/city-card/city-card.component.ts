import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { NgOptimizedImage } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { FakeHttpService, randomCity } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      (addItem)="addCity()">
      <ng-template #imgTemplate>
        <img ngSrc="assets/img/city.png" width="200" height="200" alt="" />
      </ng-template>
      <ng-template #itemTemplate let-item>
        <app-list-item
          [name]="item.name"
          (deleteItem)="deleteCity(item.id)" />
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
