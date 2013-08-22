require 'should'
thisify = require '../src/thisify'


describe "thisify method", ->
	person =  
		firstName: "Fred"
		lastName: "Flintstone"
		greet: (p, greeting) -> "#{greeting} #{p.firstName}"
		getFullName: (p) -> "#{p.firstName} #{p.lastName}"
		getSelf: -> this
	thisifiedPerson = null
	
	describe "when used", ->
		before ->
			thisifiedPerson = thisify person, noThisCheck: true

		it "should pass the object itself as the first parameter to all methods", ->
			thisifiedPerson.getFullName().should.equal "Fred Flintstone"

		it "should should still work when forcing `this` to a different value", ->
			thisifiedPerson.getFullName.call({}).should.equal "Fred Flintstone"

		it "will shift over other parameters", ->
			thisifiedPerson.greet("Hi").should.equal "Hi Fred"

		# it "should pass the undefined as `this` to all methods", ->
		# 	thisifiedPerson.getSelf().should.equal undefined

	describe "when instantiated", ->
		it "should throw an error if there is a use of `this`", ->
			(-> thisify (returnThis: -> this)).should.throw()

		it "should not throw an error if there is no use of `this`", ->
			(-> thisify (doNothing: ->)).should.not.throw()