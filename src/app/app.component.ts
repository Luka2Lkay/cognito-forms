import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FlowbiteService } from "./services/flowbite/flowbite.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService){}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
