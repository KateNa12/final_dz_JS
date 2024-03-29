"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");




/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click',payFine);
function payFine(){
    if (!isNumber(fineNumber.value)) {
        alert("Номер не співпадає");
        return;
    }

    var fine = DB.find((fine) => parseInt(fine.номер) == fineNumber.value);
    if (fine == undefined) {
        alert("Номер не співпадає");
        return;
    }
    if (fine.сума != amount.value) {
        alert("Сума не співпадає");
        return;
    }

    var passportReg = /^[а-яА-Я]{2}\d{6}$/;
    if (!passportReg.test(passport.value)) {
        alert("Не вірний паспортний номер");
        return;
    }

    var cardReg = /^\d{16}$/;
    if (!cardReg.test(creditCardNumber.value)) {
        alert("Не вірна кредитна картка");
        return;
    }

    var cvvReg = /^\d{3}$/;
    if (!cvvReg.test(cvv.value)) {
        alert("Не вірний cvv");
        return;
    }

    var index = DB.indexOf(fine);
    DB.splice(index, 1);
    alert("Штраф сплачено");
}

function isNumber(number) {
    return parseInt(number) == number;
}
