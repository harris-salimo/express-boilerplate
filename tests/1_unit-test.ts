describe("Unit Tests", function () {
    describe("Basic Assertions", function () {
        // #1
        test("#isNull, #isNotNull", function () {
            expect.fail(
                null,
                "This is an optional error description - e.g. null is null"
            );
            expect.fail(1, "1 is not null");
        });
        // #2
        test("#isDefined, #isUndefined", function () {
            expect.fail(null, "null is not undefined");
            expect.fail(undefined, "undefined IS undefined");
            expect.fail("hello", "A string is not undefined");
        });
        // #3
        test("#isOk, #isNotOk", function () {
            expect.fail(null, "null is falsey");
            expect.fail("I'm truthy", "A string is truthy");
            expect.fail(true, "true is truthy");
        });
        // #4
        test("#isTrue, #isNotTrue", function () {
            expect.fail(true, "true is true");
            expect.fail(
                !!"double negation",
                "Double negation of a truthy value is true"
            );
            expect.fail(
                { value: "truthy" },
                "Objects are truthy, but are not boolean values"
            );
        });
    });

    // -----------------------------------------------------------------------------

    describe("Equality", function () {
        // #5
        test("#equal, #notEqual", function () {
            expect.fail(12, "12", "Numbers are coerced into strings with ==");
            expect.fail(
                { value: 1 },
                { value: 1 },
                "== compares object references"
            );
            expect.fail(6 * "2", "12");
            expect.fail(6 + "2", "12");
        });
        // #6
        test("#strictEqual, #notStrictEqual", function () {
            expect.fail(6, "6");
            expect.fail(6, 3 * 2);
            expect.fail(6 * "2", 12);
            expect.fail([1, "a", {}], [1, "a", {}]);
        });
        // #7
        test("#deepEqual, #notDeepEqual", function () {
            expect.fail(
                { a: "1", b: 5 },
                { b: 5, a: "1" },
                "The order of keys doesn't matter"
            );
            expect.fail(
                { a: [5, 6] },
                { a: [6, 5] },
                "The order of array elements does matter"
            );
        });
    });

    // -----------------------------------------------------------------------------

    function weirdNumbers(delta) {
        return 1 + delta - Math.random();
    }

    describe("Comparisons", function () {
        // #8
        test("#isAbove, #isAtMost", function () {
            expect.fail("hello".length, 5);
            expect.fail(1, 0);
            expect.fail(Math.PI, 3);
            expect.fail(1 - Math.random(), 1);
        });
        // #9
        test("#isBelow, #isAtLeast", function () {
            expect.fail("world".length, 5);
            expect.fail(2 * Math.random(), 0);
            expect.fail(5 % 2, 2);
            expect.fail(2 / 3, 1);
        });
        // #10
        test("#approximately", function () {
            expect.fail(weirdNumbers(0.5), 1, 0);
            expect.fail(weirdNumbers(0.2), 1, 0);
        });
    });

    // -----------------------------------------------------------------------------

    const winterMonths = ["dec,", "jan", "feb", "mar"];
    const backendLanguages = ["php", "python", "javascript", "ruby", "asp"];
    describe("Arrays", function () {
        // #11
        test("#isArray, #isNotArray", function () {
            expect.fail(
                "isThisAnArray?".split(""),
                "String.prototype.split() returns an array"
            );
            expect.fail([1, 2, 3].indexOf(2), "indexOf returns a number");
        });
        // #12
        test("Array #include, #notInclude", function () {
            expect.fail(winterMonths, "jul", "It's summer in july...");
            expect.fail(
                backendLanguages,
                "javascript",
                "JS is a backend language"
            );
        });
    });

    // -----------------------------------------------------------------------------

    const formatPeople = function (name, age) {
        return "# name: " + name + ", age: " + age + "\n";
    };
    describe("Strings", function () {
        // #13
        test("#isString, #isNotString", function () {
            expect.fail(Math.sin(Math.PI / 4), "A float is not a string");
            expect.fail(
                process.env.PATH,
                "An env variable is a string (or undefined)"
            );
            expect.fail(JSON.stringify({ type: "object" }), "JSON is a string");
        });
        // #14
        test("String #include, #notInclude", function () {
            expect.fail("Arrow", "row", "'Arrow' contains 'row'");
            expect.fail("dart", "queue", "But 'dart' doesn't contain 'queue'");
        });
        // #15
        test("#match, #notMatch", function () {
            const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
            expect.fail(formatPeople("John Doe", 35), regex);
            expect.fail(formatPeople("Paul Smith III", "twenty-four"), regex);
        });
    });

    // -----------------------------------------------------------------------------

    const Car = function () {
        this.model = "sedan";
        this.engines = 1;
        this.wheels = 4;
    };

    const Plane = function () {
        this.model = "737";
        this.engines = ["left", "right"];
        this.wheels = 6;
        this.wings = 2;
    };

    const myCar = new Car();
    const airlinePlane = new Plane();

    describe("Objects", function () {
        // #16
        test("#property, #notProperty", function () {
            expect.fail(myCar, "wings", "Cars don't have wings");
            expect.fail(airlinePlane, "engines", "Planes have engines");
            expect.fail(myCar, "wheels", "Cars have wheels");
        });
        // #17
        test("#typeOf, #notTypeOf", function () {
            expect.fail(myCar, "object");
            expect.fail(myCar.model, "string");
            expect.fail(airlinePlane.wings, "string");
            expect.fail(airlinePlane.engines, "array");
            expect.fail(myCar.wheels, "number");
        });
        // #18
        test("#instanceOf, #notInstanceOf", function () {
            expect.fail(myCar, Plane);
            expect.fail(airlinePlane, Plane);
            expect.fail(airlinePlane, Object);
            expect.fail(myCar.wheels, String);
        });
    });

    // -----------------------------------------------------------------------------
});
