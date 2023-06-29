const parcer = require('./modules/pr-275');

// Товары в памяти
const Good1 = { type: 'good', name: 'Смесь Friso Frisolaс Gold 2035', comments: [], related: [] };
const Good2 = { type: 'good', name: 'МакБук PRO 2035 13\' w/ clickbar', comments: [], related: [] };
const Good3 = { type: 'good', name: 'Фигурка Funko POP! Vinyl: Overwatch Уинстон', comments: [], related: [] };

// Отзывы в памяти
const Comment1 = { type: 'comment', text: 'Классный ноутбук!', comments: [], parent: null };
const Comment2 = { type: 'comment', text: 'Не понравился! Кликбар не работает совсем!', comments: [], parent: null };
const Comment3 = { type: 'comment', text: 'Хорошая цена, у малыша не было аллергии на неё', comments: [], parent: null };

// Похожие товары
Good3.related.push(Good1, Good2)
Good1.related.push(Good3)
Good2.related.push(Good3)

// Расставляем комментарии
Comment1.parent = Good2;
Good2.comments.push(Comment1);

Comment2.parent = Comment1;
Comment1.comments.push(Comment2);

Comment3.parent = Good1;
//Good.comments.push(Comment3);

console.log(parcer(Comment3));
