export class BinaryHeap {
  constructor(weightFunc, compareFunc) {
    this.weightFunc = weightFunc || x => x;
    this.compareFunc = compareFunc || (x, y) => x === y;
    this.heap = [];
  }

  get size(): number {
    return this.heap.length;
  }

  push(node) {
    this.heap.push(node);
    bubbleUp(this.heap, this.weightFunc, this.heap.length - 1);
  }

  peek() {
    return this.heap[0];
  }

  pop() {
    let front = this.heap[0];
    let end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      bubbleDown(this.heap, this.weightFunc, 0);
    }

    return front;
  }

  remove(node) {
    let length = this.heap.length;

    for (let i = 0; i < length; i++) {
      if (this.compareFunc(this.heap[i], node)) {
        let removed = this.heap[i];
        let end = this.heap.pop();
        if (i !== length - 1) {
          this.heap[i] = end;
          bubbleUp(this.heap, this.weightFunc, i);
          bubbleDown(this.heap, this.weightFunc, i);
        }

        return removed;
      }
    }

    return null;
  }

  removeAll() {
    this.heap = [];
  }
}

function bubbleUp(heap, weightFunc, n) {
  let element = heap[n];
  let weight = weightFunc(element);
  // When at 0, an element can not go up any further.
  while (n > 0) {
    // Compute the parent element's index, and fetch it.
    let parentN = Math.floor((n + 1) / 2) - 1;
    let _parent = heap[parentN];
    // If the parent has a lesser weight, things are in order and we
    // are done.
    if (weight >= weightFunc(_parent)) {
      break;
    } else {
      heap[parentN] = element;
      heap[n] = _parent;
      n = parentN;
    }
  }
}

function bubbleDown(heap, weightFunc, n) {
  let length = heap.length;
  let node = heap[n];
  let nodeWeight = weightFunc(node);

  while (true) {
    let child2N = (n + 1) * 2;
    let child1N = child2N - 1;
    let swap = null;

    if (child1N < length) {
      let child1 = heap[child1N];
      let child1Weight = weightFunc(child1);
      // If the score is less than our node's, we need to swap.
      if (child1Weight < nodeWeight) {
        swap = child1N;
      }
    }
    // Do the same checks for the other child.
    if (child2N < length) {
      let child2 = heap[child2N];
      let child2Weight = weightFunc(child2);

      if (child2Weight < (swap === null ? nodeWeight : weightFunc(heap[child1N]))) {
        swap = child2N;
      }
    }

    if (swap === null) {
      break;
    } else {
      heap[n] = heap[swap];
      heap[swap] = node;
      n = swap;
    }
  }
}
