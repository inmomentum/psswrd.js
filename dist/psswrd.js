'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Psswrd = function () {
    function Psswrd() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Psswrd);

        /**
         * Force the object generate the password with cryptographically secure random values
         * @type {boolean}
         */
        this.strict = typeof args.strict === 'undefined' ? true : args.strict;

        /**
         * Default password length
         * @type {number}
         */
        this.length = typeof args.length === 'undefined' ? 12 : args.length;

        /**
         * Default alphabetic characters
         * @type {string}
         */
        this.letters = typeof args.letters === 'undefined' ? 'AaBaCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz' : args.letters;

        /**
         * Default numeric characters
         * @type {string}
         */
        this.numbers = typeof args.numbers === 'undefined' ? '0123456789' : args.numbers;

        /**
         * Default special characters
         * @type {string}
         */
        this.special = typeof args.special === 'undefined' ? '!$%@#' : args.special;
    }

    /**
     * getRandomPassword - Generate a (by default cryptographically) secure random password
     *
     * @param  {number} length the length of password being generated
     * @return {string}        generated password
     */


    _createClass(Psswrd, [{
        key: 'getRandomPassword',
        value: function getRandomPassword() {
            var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.length;

            if (!Number.isInteger(length)) {
                throw new Error("Length must be an integer.");
                return;
            }

            var characters = this._getCharacters();

            var password = '';
            for (var i = 0; i < length; i++) {
                password += characters.charAt(this._getRandomInt(0, characters.length - 1));
            }

            return password;
        }

        /**
         * _getRandomInt - Generate and return a random generated integer
         *
         * @param  {number} min minimum interger being returned
         * @param  {number} max maximum interger being returned
         * @return {number}     random integer
         */

    }, {
        key: '_getRandomInt',
        value: function _getRandomInt(min, max) {
            var array = new Uint8Array(1);
            array = this._getRandomValues(array);

            if (!(array[0] >= min && array[0] <= max)) {
                return this._getRandomInt(min, max);
            }

            return array[0];
        }

        /**
         * _getCharacters - Combine numbers, alphabetic- and special characters
         *
         * @return {string}  the full string of characters
         */

    }, {
        key: '_getCharacters',
        value: function _getCharacters() {
            return this.letters + this.numbers + this.special;
        }

        /**
         * _getRandomValues - Create an array with (by default cryptographically) random values
         *
         * @param  {type} array an empty typed array
         * @return {type}       array with (by default cryptographically) random values
         */

    }, {
        key: '_getRandomValues',
        value: function _getRandomValues(array) {
            if (window.crypto && window.crypto.getRandomValues) {
                window.crypto.getRandomValues(array);
            } else if (_typeof(window.msCrypto) === "object" && typeof window.msCrypto.getRandomValues === 'function') {
                window.msCrypto.getRandomValues(array);
            } else if (this.strict === false) {
                array[0] = Math.floor(Math.random() * 256) + 1;
            } else {
                throw new Error("There was a problem with generating cryptographically random values.");
            }

            return array;
        }
    }]);

    return Psswrd;
}();