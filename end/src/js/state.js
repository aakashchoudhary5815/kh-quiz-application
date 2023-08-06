let page =0;

class State{
  get page()  {
    return page;
  }

  set page(value) {
    value >= 0 ? (page = value) : (page = 0)
  }
}

export default new State();