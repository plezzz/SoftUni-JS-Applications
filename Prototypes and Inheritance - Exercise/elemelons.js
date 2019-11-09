function solve() {


    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.weigth = weight;
            this.melonSort = melonSort;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = "Water";
        }

        get elementIndex() {
            return this.weigth * this.melonSort.length
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = "Fire";
        }

        get elementIndex() {
            return this.weigth * this.melonSort.length
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = "Earth";
        }

        get elementIndex() {
            return this.weigth * this.melonSort.length
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = "Air";
        }

        get elementIndex() {
            return this.weigth * this.melonSort.length
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        morph() {
            if (this.element === "Water") {
                this.element = "Fire";
            } else if (this.element === "Fire") {
                this.element = "Earth";
            } else if (this.element === "Earth") {
                this.element = "Air";
            } else {
                this.element = "Water";
            }
        }
    }

    return {Melon, Airmelon, Earthmelon, Watermelon, Firemelon,Melolemonmelon}
}


let classes = solve();
let watermelon = new classes.Watermelon(12.5, "Kingsize");
console.log(watermelon);
let test = new classes.Melolemonmelon(150, "Melo");
//
// expect(test.toString()).to.be.equal(
//     "Element: Water\n" +
//     "Sort: Melo\n" +
//     "Element Index: 600",
//     "'Melolemonmelon initial element' was not correctly set");
