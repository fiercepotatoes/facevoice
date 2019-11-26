import { observable } from 'mobx';

let obx = observable({
  direction: {
    x: null,
    y: null
  },
  position: {
    x: 0,
    y: 0
  }
});

export default obx;