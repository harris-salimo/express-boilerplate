import request from 'supertest';
import app from '../src/app';

describe("Functional Tests", function () {
    this.timeout(5000);
    describe("Integration tests with chai-http", function () {
        // #1
        test("Test GET /hello with no name", function (done) {
            request(app)
                .get("/hello")
                .end(function (err, res) {
                    expect(res.status).toBe(200);
                    expect(res.text).toEqual("hello Guest");
                    done();
                });
        });
        // #2
        test("Test GET /hello with your name", function (done) {
            request(app)
                .get("/hello?name=xy_z")
                .end(function (err, res) {
                    expect(res.status).toBe(200);
                    expect(res.text).toEqual("hello xy_z");
                    done();
                });
        });
        // #3
        test('Send {surname: "Colombo"}', function (done) {
            request(app)
                .put("/travellers")

                .end(function (err, res) {
                    // expect();

                    done();
                });
        });
        // #4
        test('Send {surname: "da Verrazzano"}', function (done) {
            // expect();

            done();
        });
    });
});

const Browser = require("zombie");

describe("Functional Tests with Zombie.js", function () {
    this.timeout(5000);

    describe("Headless browser", function () {
        test('should have a working "site" property', function () {
            expect(browser.site).not(null);
        });
    });

    describe('"Famous Italian Explorers" form', function () {
        // #5
        test('Submit the surname "Colombo" in the HTML form', function (done) {
            // expect();

            done();
        });
        // #6
        test('Submit the surname "Vespucci" in the HTML form', function (done) {
            // expect();

            done();
        });
    });
});
