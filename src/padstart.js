/*
 * @Author: Haojin Sun
 * @Date: 2019-12-04 11:13:06
 * @LastEditors: Haojin Sun
 * @LastEditTime: 2019-12-04 13:38:10
 */
myPad();
function myPad() {
  let aaa = 'asd';
  var fnc = (data)=>{
    var aa = {
      'asd': 123,
      "rwf": 234,
    }
    console.log({...aa})
  }
  aaa.padStart(10, '-');
  fnc()
  console.log(aaa);
  console.log(aaa.padStart(10, '-'));
}


