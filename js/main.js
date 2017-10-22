'use strict';
$(document).ready(function () {

    var controller = new MainController();
    var buttonsPrivacyArr = document.querySelectorAll(' [name="privacyCaller"] ');
    var buttonsAgreementArr = document.querySelectorAll(' [name="agreementCaller"] ');
    var formCallButtons = document.querySelectorAll(' [name*="formCaller"] ');
    var formDocumentLinkArr = document.querySelectorAll(' [class*="order-form__consent"] ');

    formDocumentLinkArr.forEach(function(button) {
        button.addEventListener("click", function () {
            controller.closeForm();
        });
    });

    buttonsAgreementArr.forEach(function(button) {
        button.addEventListener("click", function () {
            controller.callElem('document__wrapper-agreement');
            // controller.closeForm();
        });
    });

    buttonsPrivacyArr.forEach(function(button) {
        button.addEventListener("click", function () {
            controller.callElem('document__wrapper-privacy');
            // controller.closeForm();
        });
    });

    buttonsPrivacyArr.forEach(function(button) {
        button.addEventListener("click", function () {
            controller.closeForm();
            controller.callElem('document__wrapper-privacy');
        });
    });

    buttonsAgreementArr.forEach(function(button) {
        button.addEventListener("click", function () {
            controller.closeForm();
            controller.callElem('document__wrapper-agreement');
        });
    });

    formCallButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            $("[name = price]")[0].value = this.getAttribute('data');
            controller.callElem('order-form__wrapper');
        });
    });

    var buttonsCLosesArr = document.querySelectorAll('[class$="close"]');
    buttonsCLosesArr.forEach(
        function (button) {
            button.addEventListener("click", controller.closeForm);
        }
    );

    $(".order-form").submit(function() {
        var validator = new Validator();
        var inputArr = $(this).find('input[class*=order-form__input]');
        var results = [];
        var formData =[];

        inputArr.each(function (num) {
            console.log (inputArr[num].value);
            results.push( validator.validate(inputArr[num]) );
        });

        for (var i = 0; i < inputArr.length; i++) {
            if (!results[i]) {
                // console.log(results[i]);
                return false;
            }
        }

        formData = $(this).serializeArray();
        console.log (formData);

        $.ajax({
            url: "index.php",
            type: "POST",
            data: {
                'price': formData[0].value,
                'name': formData[1].value,
                'e-mail': formData[2].value,
                'phone': formData[3].value
            },
            datatype: "json",
            cache: false,
            success: function(response)
            {
                console.log (response);
                controller.closeForm();
                controller.callElem('thanks-order__wrapper');
                setTimeout(function () {
                    controller.closeForm();
                }, 2500);
            },
            error: function (error) {
                controller.closeForm();
                controller.callElem('error__wrapper');
            }
        });

    return false;
    });

    $(".contact").submit(function() {
        var validator =  new Validator();
        var inputTel = $(this).find('input[name*=phone]')[0];
        // console.log (inputTel);
        var formData =[];

        var result = validator.validate(inputTel);
        // console.log (result);

        if (!result) {
            return false;
        }

        formData = $(this).serializeArray();
        console.log (formData[0].value);

        $.ajax({
            url: "index.php",
            type: "POST",
            data: {
                'phone': formData[0].value
            },
            datatype: "json",
            cache: false,
            success: function(response)
            {
                console.log (response);
                controller.callElem('thanks__wrapper');
                setTimeout(function () {
                    controller.closeForm();
                }, 2500);
            },
            error: function (error) {
                controller.callElem('error__wrapper');
            }
        });

        return false;
    });

    function Validator () {

        var regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
        var regTel = /^(\+7|8)\d\d\d\d\d\d\d\d\d\d$/;
        var regName = /(^([A-z]+)$)|(^([А-я]+)$)/;

        function validate(elem) {
            if (!elem) {
                elem.className += ' order-form__input_incorrect';
            }
            if (elem.name == 'name') {

                var result = testRegExp(regName, elem)
                return result

            } else if (elem.name == 'e-mail') {

                var result = testRegExp(regEmail, elem)
                return result

            } else if (elem.name == 'phone') {

                var result = testRegExp(regTel, elem)
                return result
            }
            return false
        }

        function testRegExp(regExp, elem) {
            if(!regExp.test(elem.value)) {
                elem.className += ' order-form__input_incorrect';
                // console.log (elem.className);
                return false
            }

            elem.className = 'order-form__input';
            // console.log (elem.className);
            return true
        }
        this.validate = validate;
    }

    function MainController () {
        var еlemClassName = '';

        function callElem(className) {
            var hiddenClassName = className + '_hidden';
            var visibleClassName = className + '_visible';
            // console.log (hiddenClassName);

            if (event) {
                event.preventDefault();
            }

            changeClassName(hiddenClassName, visibleClassName, 0);
        }

        function closeForm() {
            // console.log ('closeForm');
            var elem = document.querySelector('[class$="visible"]');
            // console.log (elem);
            // console.log (visibleElemClassName);
            elem.className = еlemClassName;

            if (event) {
                event.preventDefault();
            }
        }

        function changeClassName(name, newName, num) {
            еlemClassName = name;
            // console.log(еlemClassName);
            var elem = document.getElementsByClassName(name)[num];
            elem.className = newName;
            // console.log(newName);
        }

        this.callElem = callElem;
        this.closeForm = closeForm;
    }
});
