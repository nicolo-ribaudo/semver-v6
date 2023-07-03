'use strict'

var tap = require('tap')
var test = tap.test
var semver = require('../semver.js')
var Range = semver.Range;
var SemVer = semver.SemVer;
var Comparator = semver.Comparator
var validRange = semver.validRange
var minVersion = semver.minVersion
var minSatisfying = semver.minSatisfying
var maxSatisfying = semver.maxSatisfying

function s(n) {
  return ' '.repeat(n || 500000)
}

test('regex dos via range whitespace', (t) => {
  // a range with this much whitespace would take a few minutes to process if
  // any redos susceptible regexes were used. there is a global tap timeout per
  // file set in the package.json that will error if this test takes too long.
  var r = `1.2.3 ${s()} <1.3.0`

  t.equal(new Range(r).range, '1.2.3 <1.3.0')
  t.equal(validRange(r), '1.2.3 <1.3.0')
  t.equal(minVersion(r).version, '1.2.3')
  t.equal(minSatisfying(['1.2.3'], r), '1.2.3')
  t.equal(maxSatisfying(['1.2.3'], r), '1.2.3')

  t.end()
})

test('semver version', (t) => {
  var v = `${s(125)}1.2.3${s(125)}`
  var tooLong = `${s()}1.2.3${s()}`
  t.equal(new SemVer(v).version, '1.2.3')
  t.throws(() => new SemVer(tooLong))
  t.end()
})

test('comparator', (t) => {
  var c = `${s()}<${s()}1.2.3${s()}`
  t.equal(new Comparator(c).value, '<1.2.3')
  t.end()
})
