import Assets from "./svg/svgs.json";

class Hash {
  constructor(id) {
    this.hash = this.fh5(id);
    this.assets = Assets;
  }
  fh5(s) {
    //Knuth multiplicative hash
    let h = 0xdeadbeef;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
    return (h ^ (h >>> 16)) >>> 0;
  }
  xor() {
    return this.hash % 2;
  }
  pick(arr, seed) {
    // Convert to hash+seed, then to hex
    // then get from pos 3 2 chars
    const digit2 = Math.sqrt(parseInt(`${this.hash}${seed}`, 16))
      .toString()
      .substr(3, 4);
    return arr.length ? arr[parseInt(digit2) % arr.length] : null;
  }
}

const colors = [
  "#CBC0D3",
  "#EFD3D7",
  "#FEEAFA",
  "#DEE2FF",
  "#EDEEC9",
  "#DDE7C7",
  "#BFD8BD",
  "#DEE2FF",
  "#A0E8AF",
  "#FFCF56",
  "#F9E784",
  "#E58F65",
  "#F1E8B8",
  "#9BBDF9",
  "#B95F89",
  "#C4E0F9",
  "#5EB1BF",
  "#7CFEF0",
  "#EF959D",
  "#E0C879"
];

export class Config {
  constructor(starter = {}) {
    this.colors = (starter.colors || []).length ? starter.colors : colors;
    this.size = starter.size || 42;
    this.radius = starter.radius || 0.12;
  }
}

export function strToColor(str) {
  let config = new Config();
  return new Hash(str).pick(config.colors);
}

export default class Face {
  constructor(id, config = {}) {
    this.id = id;
    this.config = new Config(config);
    this.hash = new Hash(id);
    this.color = this.hash.pick(this.config.colors) || "red";
    this.base = ``;
    this.assets = Assets;
  }
  svg() {
    let base = [];
    //const assetKeys = Object.keys(this.assets);
    // console.log("assetKeys", assetKeys);
    const assetKeys = ["c-wear"];
    base = assetKeys.map(layer => {
      return this.hash.pick(this.assets[layer], layer);
    });
    // Define Style
    const style = [
      `display:inline-block; overflow:hidden;`,
      `border-radius: ${this.config.size * this.config.radius}px;`,
      `position:relative; background-color: ${this.color};`,
      `width:${this.config.size}px; height:${this.config.size}px;`,
      `box-shadow:inset 0px -4px 10px rgba(0,0,0,0.2),inset 0px 4px 10px 3px rgba(255,255,255,0.1)`
    ];
    //${pickedWear}
    const svg = `<div class="dymoji-character" style="${style.join(" ")}">
      <svg height="${this.config.size}px" viewBox="0 0 252 252" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${base.join("")}
      </svg>
    </div>`;
    return svg;
  }
}