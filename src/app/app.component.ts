import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    amount = 3;

    input = {
        setters: "歐貝利斯克\n歐西里斯\n太陽神",
        middleBlockers: "水野亞美\n愛野美奈子\n地場衛\n火野麗\n木野真琴\n土萌螢",
        group: "爆裂丸\n赫魯斯\n加虎\n克莉姆\n龍哥\n阿蛇\n派卡拉\n詩芙麗\n蒙克\n塔露朵\n波奇郎\n烏力"
    };

    teams = [];

    go = function() {
        const input = this.input;

        this.teams = [];
        for(let i = 0; i < this.amount; ++i) this.teams.push([]);

        for(let pos in input) {
            let middle = input[pos].trim().split(/\s+/);
            for(let i = 0; middle.length; ++i) {
                const rand = Math.floor(Math.random() * middle.length);
                this.teams[i % this.amount].push(middle.splice(rand, 1)[0]);
            }
        }
    };
}
