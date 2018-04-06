import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    amount = 3;
    teams = [];

    players = {
        setters: [],
        middleBlockers: [],
        wingSpikers: [],
        liberos: []
    };

    amountChanged(amount) {
        this.amount = amount = Math.abs(+amount);
        if(isNaN(amount)) return console.error("Variable `amount` should be a positive integer.");

        const p = this.players;
        if(amount > p.setters.length) {
            p.setters.push.apply(p.setters, new Array(amount - p.setters.length));
            p.middleBlockers.push.apply(p.middleBlockers, new Array(amount * 2 - p.middleBlockers.length));
            p.wingSpikers.push.apply(p.wingSpikers, new Array(amount * 4 - p.wingSpikers.length));
            p.liberos.push.apply(p.liberos, new Array(amount * 4 - p.liberos.length));
        }
        else {
            p.setters = p.setters.slice(0, amount);
            p.middleBlockers = p.middleBlockers.slice(0, amount * 2);
            p.wingSpikers = p.wingSpikers.slice(0, amount * 4);
            p.liberos = p.liberos.slice(0, amount * 4);
        }
    };

    go() {
        this.teams = [];
        for(let i = 0; i < this.amount; ++i) this.teams.push([]);

        ["setters", "middleBlockers"].forEach(pos => {
            let middle = this.players[pos].slice(); //< copy without changing the origin array
            for(let i = 0; middle.length; ++i) {
                const rand = Math.floor(Math.random() * middle.length);
                this.teams[i % this.amount].push(middle.splice(rand, 1)[0]);
            }
        });

        let nonLiberos = [];
        let liberos = [];
        this.players.liberos.forEach((isLibero, index) => {
            const player = this.players.wingSpikers[index];
            if(isLibero) liberos.push(player);
            else nonLiberos.push(player);
        });
        for(let i = 0; nonLiberos.length || liberos.length; ++i) {
            if(nonLiberos.length) {
                const rand = Math.floor(Math.random() * nonLiberos.length);
                this.teams[i % this.amount].push(nonLiberos.splice(rand, 1)[0]);
            }
            else {
                const rand = Math.floor(Math.random() * liberos.length);
                this.teams[i % this.amount].push(liberos.splice(rand, 1)[0]);
            }
        }
    };

    ngOnInit() {
        const p = this.players;
        /*p.setters = "歐貝利斯克\n歐西里斯\n太陽神".split("\n");
        p.middleBlockers = "水野亞美\n愛野美奈子\n地場衛\n火野麗\n木野真琴\n土萌螢".split("\n");
        p.wingSpikers = "爆裂丸\n赫魯斯\n加虎\n克莉姆\n龍哥\n阿蛇\n派卡拉\n詩芙麗\n蒙克\n塔露朵\n波奇郎\n烏力".split("\n");*/

        p.setters = "邱俊寬\n陳智浩\n未命名".split("\n");
        p.middleBlockers = "楊曜璘\n蘇九如\n楊博文\n李勝祐\n楊令帆\n王琮鴻".split("\n");
        p.wingSpikers = "陳俊宏\n黃耀賢\n王宏高\n張智傑\n陳哲佑\n楊筌凱\n彭奕璋\n蔡俊逸\n蕭力榮\n蔡佳勳\n魏冠杰\n黃柏瀚".split("\n");
        p.liberos = (new Array(12)).fill(false);
    }
}
