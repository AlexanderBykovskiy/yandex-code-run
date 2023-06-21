/**
 * Сюда необходимо вставить разметку, которая будет находиться внутри тега <body>
 * ВАЖНО! тег <body> вставлять не надо, только то, что будет внутри (включая стили)
 */
const htmlFragment = `
<style>
.outerLayer {
    background: #F8F8F8;
    width: 181px;
    height: 221px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
}
.innerLayer {
    width: 149px;
    height: 138px;
    margin: 8px auto;
    background: #C4C4C4;
    border-radius: 16px;
}
.button {
    width: 149px;
    height: 35px;
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
    }
    section {
        display: flex;
        gap: 16px;
        justify-content: center;
    }
    .outerOuter {
        width: 607px;
        height: 291px;
    }
    .header {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        padding: 0 0 0 16px;
        margin: 16px 0;
    }
    

</style>
<div class='outerOuter'>
<p class='header'>Список товаров</p>
<section>
<div class='outerLayer'><div class='innerLayer'>
</div><div class='button'><p>Купить</p></div></div>
<div class='outerLayer'><div class='innerLayer'>
</div><div class='button'><p>Купить</p></div></div>
<div class='outerLayer'><div class='innerLayer'>
</div><div class='button'><p>Купить</p></div></div>
</section>
</div>
`;

module.exports = function () {
    return htmlFragment;
};
