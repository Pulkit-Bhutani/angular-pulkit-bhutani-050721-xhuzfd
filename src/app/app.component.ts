import { Component, OnInit, VERSION } from '@angular/core';
import { Candidate } from './model/candidate';
import { DataService } from './services/data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Candidates';
  candidates: Candidate[];
  origCandidates: Candidate[];
  male: boolean = false;
  female: boolean = false;
  searchText: string = '';
  newCandidate: Candidate = new Candidate();

  constructor(private readonly dataService: DataService) {}

  ngOnInit() {
    this.candidates = this.dataService.getCandidateData();
    this.origCandidates = JSON.parse(JSON.stringify(this.candidates));
  }

  filter() {
    this.genderFilter();
    this.searchFilter();
  }

  genderFilter() {
    if ((this.male && this.female) || (!this.male && !this.female)) {
      this.candidates = JSON.parse(JSON.stringify(this.origCandidates));
    } else if (this.male && !this.female) {
      this.candidates = JSON.parse(
        JSON.stringify(this.origCandidates.filter(c => c.gender === 'Male'))
      );
    } else if (!this.male && this.female) {
      this.candidates = JSON.parse(
        JSON.stringify(this.origCandidates.filter(c => c.gender === 'Female'))
      );
    }
  }

  searchFilter() {
    this.candidates = JSON.parse(
      JSON.stringify(
        this.candidates.filter(
          (c: Candidate) =>
            c.first_name.includes(this.searchText) ||
            c.last_name.includes(this.searchText)
        )
      )
    );
  }

  addNewCandidate() {
    this.origCandidates = this.origCandidates.concat(this.newCandidate);
    this.filter();
  }
}
