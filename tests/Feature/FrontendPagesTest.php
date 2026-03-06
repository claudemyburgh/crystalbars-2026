<?php

test('trellis gates page loads', function () {
    $this->get(route('trellis.gates'))->assertOk();
});

test('gallery page loads', function () {
    $this->get(route('gallery'))->assertOk();
});

test('faqs page loads', function () {
    $this->get(route('faqs'))->assertOk();
});

test('quote page loads', function () {
    $this->get(route('quote'))->assertOk();
});
