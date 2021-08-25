// link do rozwizania
//https://stackoverflow.com/a/21070876
class TwoWayMap {
  constructor(map) {
    this.map = map;
    this.reverseMap = {};
    for (const key in map) {
      const value = map[key];
      this.reverseMap[value] = key;
    }
  }
  get(key) {
    return this.map[key];
  }
  revGet(key) {
    return this.reverseMap[key];
  }
}
///to jest zwykly dictionary
//var RIS = {
// TY: "type",
// AU: "author",
//PY: "year",
//};

//2 sposob
const RISTwoWayMap = new TwoWayMap({
  TY: "type",
  AU: "author",
  PY: "year",
});

export default TwoWayMap;
