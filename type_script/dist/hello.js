"use strict";
function greett(name, greeting = 'hello', times = 1) {
    for (let i = 0; i < times; i++) {
        console.log(greeting + " " + name);
    }
}
greett('Shiva Patel');
greett('Shiva Patel', 'Heyy', 7);
