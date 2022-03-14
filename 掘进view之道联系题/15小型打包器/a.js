let obj = require('./b.js')
module.exports = {
  fn: ()  =>{
    console.log('this is fn');
    let name = 'zys'
    return () => {
      console.log('nested');
      console.log(name);
      console.log(obj.age);
    }
  },
  name: 'zys',
  age: obj.age
}