// 引入主页的css
import "./assets/index.css"


class Point {
    toString() {
        return 'i am father'
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
      }
    
      toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
      }
}
let color = new ColorPoint(1,2,'233')
console.log(color.toString())
console.log('halo webpack')
