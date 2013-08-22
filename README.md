I'll go ahead and say it. The `this` keyword in javascript is evil. It is evil because it is confusing. So very very confusing. And it doesn't do what most developers think it does.

The thing is that in js `this` is just a parameter like any other. Except it's one whose name you cannot change. Let me explain.

Most developers are aware that you can invoke a function in js `likeThis()` or `likeThis.call()`. 
When you use the `call` form (or its sibling `apply`) the first parameter is *the value for `this`*.

So you've got

    function greet(greeting) { 
    	return greeting + ": " + this.firstName + " " + this.lastName 
    }
    var person = {
    	 firstName:   "Fred"
    	,lastName:    "Flintstone"
    	,greet: 	  greet
    	,sayHi:       function() { console.log( this.greet("Hi") ) }
    }

    person.greet("Greetings");
    //is equivalent to
    greet.call(person, "Greetings");

So how exactly is `this` not a parameter? It is, and if we only ever used the `call` form that's the only way that we would ever think of it. But we use the other form and what does that do? It makes the javascript language take a guess at what `this` might be. Depending on how exactly the method was called `this` might be the person object, undefined, the global window, or some other object altogether. 

    var sayHiToFred = person.sayHi;
    sayHiToFred(); 	             //fail because `this` is `window`

    $('li').each(person.sayHi); //fail because `this` is a DOM element each time

The rules are not terribly complicated but they *are* terribly unnecessary. `this` is Just. A. Simple. Parameter.

After explaining this to another developer for the 20th time I decided to just do something about it.

# Introducing thisify

Thisify is a very simple library that removes the need and want for `this` from your code. So you can write your code as if `this` is just a normal parameter

    function greet(person, greeting) { 
    	return greeting + ": " + person.firstName + " " + person.lastName 
    }
    var person = thisify({
    	 firstName:   "Fred"
    	,lastName:    "Flintstone"
    	,greet: 	  greet
    	,sayHi:       function(p) { console.log( p.greet("Hi") ) }
    })
    
and get the expected behavior eveyr time:

    var sayHiToFred = person.sayHi;
    sayHiToFred(); 	            //works

    $('li').each(person.sayHi); //fail because `this` is a DOM element each time
