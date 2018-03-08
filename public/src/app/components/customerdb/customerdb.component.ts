import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {Service} from '../../services/service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-customerdb',
  styleUrls: ['./customerdb.component.css'],
  templateUrl: './customerdb.component.html',
})
export class CustomerdbComponent implements OnInit{
    customerposts: any;
  constructor(
  public Service: Service
  ){}
  getallcustomers() {
    // Function to GET all blogs from database
    this.Service.getallcustomers().subscribe(data => {
      this.customerposts = data.customer; // Assign array to use in HTML
    });
  }

  ngOnInit() {
    this.getallcustomers();
  }
}

/** Constants used to fill up our data base. */
