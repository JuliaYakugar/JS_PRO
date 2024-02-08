let specialization = new Map();
specialization
    .set({name: "Виктор"}, "Пицца")
    .set({name: "Ольга"}, "Суши")
    .set({name: "Дмитрий"}, "Десерты");

specialization.forEach((spec, chef) => {
    console.log(`У ${chef.name} специализация "${spec}".`);
})

let dishes = new Map();
dishes
    .set("Пицца 'Маргарита'", "Виктор")
    .set("Пицца 'Пепперони'", "Виктор")
    .set("Суши 'Филадельфия'", "Ольга")
    .set("Суши 'Калифорния'", "Ольга")
    .set("Тирамису", "Дмитрий")
    .set("Чизкейк", "Дмитрий");

console.log(`Пиццу 'Маргарита' приготовил повар: ${dishes.get("Пицца 'Маргарита'")}`);
console.log(`Суши 'Филадельфия' приготовил повар: ${dishes.get("Суши 'Филадельфия'")}`);
console.log(`Чизкейк приготовил повар: ${dishes.get("Чизкейк")}`);

let orders = new Map();

let client1 = { name: 'Алексей'};
let clientOrder1 = new Set();
clientOrder1
    .add("Пицца 'Пепперони'")
    .add("Тирамису");

let client2 = { name: 'Мария'};
let clientOrder2 = new Set();
clientOrder2
    .add("Суши 'Калифорния'")
    .add("Пицца 'Маргарита'");

let client3 = { name: 'Ирина'};
let clientOrder3 = new Set();
clientOrder3
    .add("Чизкейк");

orders.set(client1, clientOrder1)
    .set(client2, clientOrder2)
    .set(client3, clientOrder3)

console.log(`Заказ клиента ${client1.name}: ${[...orders.get(client1)]}`);
console.log(`Заказ клиента ${client2.name}: ${[...orders.get(client2)]}`);
console.log(`Заказ клиента ${client3.name}: ${[...orders.get(client3)]}`);
