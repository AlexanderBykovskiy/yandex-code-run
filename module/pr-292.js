module.exports = function solveCaptcha(captcha) {

    const captchaArr = captcha.trim().split("\n").map(item => item.trim().split(""));
    //console.log(captchaArr)
    console.log("x", captchaArr[0].length, "y", captchaArr.length)

    let signCount = 0;
    for(let i= 0; i < captcha.length; i++) {
        if (captcha[i] === "S") signCount++;
    }
    if (!(0 < signCount < 10)) return [];
    //console.log(signCount)

    const fullS = captchaArr.length * captchaArr[0].length;
    //console.log(fullS)

    if (fullS % signCount !== 0) return [];
    const partS = fullS / signCount;
    console.log("S =",partS)

    let rectangles = [];
    for (let i = captchaArr[0].length; i > 0; i--) {
        if (partS % i === 0 && (partS / i) <= captchaArr.length) rectangles.push([i, partS / i]);
    }
    console.log(rectangles)

    // variants — это массив слоев
    // каждый слой — это двумерный массив, в котором
    // отмечены клетки, занятые определенным фрагментом
    const variants = [];

    // поиск решения перебором
    function placeNext(signCount) {
        if (signCount === 0) {
            return variants;
        } else {
            // иначе...

            // находим самую левую свободную ячейку в самой верхней
            // строке, которая не полностью заполнена
            const pos = getEmptyPos();

            // по очереди пробуем поставить фрагменты всех размеров
            for (let i = 0; i < rectangles.length; i++) {
                // размер прямоугольника, который пробуем поставить
                const size = rectangles[i];

                // получаем слой с фрагментом нужного размера на нужном месте
                // если фрагмент поставить нельзя (он не подходит на свободное место
                // или количество дорожных знаков !== 1), получаем null
                const layer = getLayer(pos, size);

                // если удалось поставить фрагмент
                if (layer) {
                    // добавляем слой на поле
                    variants.push(layer);

                    // пробуем поставить следующие фрагменты
                    const res = placeNext(signCount - 1);

                    // если получилось, выходим
                    if (res) return res;

                    // иначе убираем фрагмент с поля
                    // и пробуем следующий
                    variants.pop();
                }
            }
        }
    }

    // запускаем перебор
    return placeNext(signCount);
}
