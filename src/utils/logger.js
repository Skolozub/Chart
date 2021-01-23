export const logger = {
  render(name) {
    console.log(`%c render: ${name} `, "background: #222; color: #bada55");
  },
  data(d) {
    console.log(`%c data: ${d} `, "background: #222; color: #850db5");
  }
};
