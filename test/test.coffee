require 'should'
thisify = require '../src/thisify'


describe 'thisify method', ->
	person =  
		firstName: "Fred"
		lastName: "Flintstone"
		getFullName: (p) -> "#{p.firstName} #{p.lastName}"
		getSelf: -> this
	thisifiedPerson = null
	
	describe 'when used', ->
		before ->
			thisifiedPerson = thisify person, noThisCheck: true

		it 'should pass the object itself as the first parameter to all methods', ->
			thisifiedPerson.getFullName().should.equal "Fred Flintstone"

		# it 'should pass the undefined as `this` to all methods', ->
		# 	thisifiedPerson.getSelf().should.equal undefined

	describe 'when instantiated', ->
		it 'should throw an error if there is a use of `this`', ->
			(-> thisify (returnThis: -> this)).should.throw()